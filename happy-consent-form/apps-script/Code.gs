// ─── SPREADSHEET IDs ────────────────────────────────────────────────────────
const CONSENT_SPREADSHEET_ID   = '1D_LyM6SQFp2GjU88ytXe1yPkePuPxM4OeI0lgpzs8O4';
const KOLLECT_SPREADSHEET_ID   = '15wqqAiJIbw6lfzwZFG_fGiklG-jFMCCpQhkaWVtPSzA';

// ─── SHEET NAMES ─────────────────────────────────────────────────────────────
const CONSENT_TAB_NAME         = 'Consents';
const MASTER_SHEET_NAME        = 'Master';
const AUDIT_SHEET_NAME         = 'Audit_Log';

// ─── OTHER CONSTANTS ─────────────────────────────────────────────────────────
const PARTICIPANT_PREFIX       = 'HAPPY-2026-';
const CONSENT_SIGNATURE_FOLDER = '1uczj5UbNUqY0-j6Rn7bosXO13LvvACmV';
const BACKEND_VERSION          = '2026-05-25-consent-only';
const JSON_MIME                = ContentService.MimeType.JSON;

// ─── HEADERS ─────────────────────────────────────────────────────────────────
const CONSENT_LOG_HEADERS = [
  'Consent ID', 'Timestamp', 'Venue of Engagement', 'Participant Name',
  'Phone Number', 'Email', 'Accept to Participate', 'Language', 'Program', 'Signature'
];

const MASTER_HEADERS = [
  'participantId', 'continuationTokenHash', 'continuationTokenCreatedAt',
  'consentStatus', 'consentSubmittedAt', 'consentSubmissionId',
  'consentName', 'consentPhone', 'consentEmail',
  'consentEmailSent', 'consentEmailSentAt', 'consentEmailSendError',
  'consentVenue', 'consentSignatureFileUrl', 'consentSignatureFileId', 'consentSignatureFileName',
  'participantInfoStatus', 'capacityBuildingStatus', 'jobPlacementStatus',
  'currentStage', 'lockedSections', 'cvStatus',
  'lastUpdatedAt', 'lastUpdatedBy', 'createdAt', 'createdBy',
  'participantPhoneNormalized', 'participantEmailNormalized'
];

const AUDIT_HEADERS = [
  'auditId', 'timestamp', 'participantId', 'actorType', 'actor',
  'action', 'section', 'notes'
];

// ─── ROUTING ─────────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (payload.action === 'initConsent') return jsonResponse(initConsent(payload));
    throw new Error('Unsupported action: ' + payload.action);
  } catch (err) {
    return jsonResponse({ status: 'ERROR', message: err.message });
  }
}

function doGet(e) {
  return jsonResponse({ status: 'OK', version: BACKEND_VERSION });
}

// ─── CORE: INIT CONSENT ──────────────────────────────────────────────────────
function initConsent(payload) {
  const now      = new Date().toISOString();
  const rawToken = createToken();
  const tokenHash = hashValue(rawToken);
  const registrationUrl = buildRegistrationUrl(rawToken);
  const consentId = generateConsentId();
  const phone = normalizePhone(payload.phone);
  const email = normalizeEmail(payload.email);

  // Write participant record to Master (Kollect spreadsheet)
  const master  = getMasterSheet();
  const headers = ensureHeaders(master, MASTER_HEADERS);
  const existingRow = findParticipantRow(master, headers, { phone, email });

  let participantId;
  let rowIndex;

  const signatureFile = saveConsentSignatureToDrive(payload, 'tmp');

  if (existingRow > 0) {
    const existing = rowToObject(headers, master.getRange(existingRow, 1, 1, headers.length).getValues()[0]);
    participantId = existing.participantId;
    // Re-save signature with correct participant ID
    const sig = saveConsentSignatureToDrive(payload, participantId);
    updateRow(master, headers, existingRow, {
      continuationTokenHash:     tokenHash,
      continuationTokenCreatedAt: now,
      consentStatus:             'complete',
      consentSubmittedAt:        payload.timestamp || now,
      consentSubmissionId:       consentId,
      consentName:               payload.name  || '',
      consentPhone:              payload.phone || '',
      consentEmail:              payload.email || '',
      consentVenue:              payload.venue || '',
      consentSignatureFileUrl:   sig.url,
      consentSignatureFileId:    sig.id,
      consentSignatureFileName:  sig.name,
      currentStage:              'registration',
      lastUpdatedAt:             now,
      lastUpdatedBy:             'participant',
      participantPhoneNormalized: phone,
      participantEmailNormalized: email
    });
    rowIndex = existingRow;
  } else {
    participantId = generateParticipantId(master, headers);
    const sig = saveConsentSignatureToDrive(payload, participantId);
    const record = blankRecord(headers);
    Object.assign(record, {
      participantId,
      continuationTokenHash:     tokenHash,
      continuationTokenCreatedAt: now,
      consentStatus:             'complete',
      consentSubmittedAt:        payload.timestamp || now,
      consentSubmissionId:       consentId,
      consentName:               payload.name  || '',
      consentPhone:              payload.phone || '',
      consentEmail:              payload.email || '',
      consentVenue:              payload.venue || '',
      consentSignatureFileUrl:   sig.url,
      consentSignatureFileId:    sig.id,
      consentSignatureFileName:  sig.name,
      participantInfoStatus:     'not_started',
      capacityBuildingStatus:    'not_started',
      jobPlacementStatus:        'not_started',
      currentStage:              'registration',
      lockedSections:            '',
      cvStatus:                  'not_started',
      lastUpdatedAt:             now,
      lastUpdatedBy:             'participant',
      createdAt:                 now,
      createdBy:                 'consent',
      participantPhoneNormalized: phone,
      participantEmailNormalized: email
    });
    master.appendRow(headers.map(h => toSheetValue(record[h] || '')));
    rowIndex = master.getLastRow();
    // Re-fetch signature with real participant ID
    const sigFinal = saveConsentSignatureToDrive(payload, participantId);
    updateRow(master, headers, rowIndex, {
      consentSignatureFileUrl:  sigFinal.url,
      consentSignatureFileId:   sigFinal.id,
      consentSignatureFileName: sigFinal.name
    });
  }

  // Write to consent log (consent spreadsheet)
  appendToConsentLog(payload, consentId, participantId);

  // Audit
  appendAudit({
    participantId,
    actorType: 'participant',
    actor:     payload.name || phone || 'participant',
    action:    'initConsent',
    section:   'consent',
    notes:     payload.venue || ''
  });

  // Send email
  const emailResult = sendConsentParticipantEmail({
    participantId,
    token:               rawToken,
    registrationUrl,
    consentSubmissionId: consentId,
    name:                payload.name || '',
    email
  });

  updateRow(master, headers, rowIndex, {
    consentEmailSent:      emailResult.sent ? 'yes' : (email ? 'no' : ''),
    consentEmailSentAt:    emailResult.sent ? new Date().toISOString() : '',
    consentEmailSendError: emailResult.error || ''
  });

  if (emailResult.sent || emailResult.error) {
    appendAudit({
      participantId,
      actorType: 'system',
      actor:     'apps-script',
      action:    emailResult.sent ? 'sendConsentEmail' : 'sendConsentEmailFailed',
      section:   'consent',
      notes:     emailResult.sent ? email : emailResult.error
    });
  }

  return {
    status:        'OK',
    participantId,
    token:         rawToken,
    registrationUrl,
    emailSent:     emailResult.sent
  };
}

// ─── CONSENT LOG ─────────────────────────────────────────────────────────────
function getConsentLogSheet() {
  const ss = SpreadsheetApp.openById(CONSENT_SPREADSHEET_ID);
  return ss.getSheetByName(CONSENT_TAB_NAME) || ss.getSheets()[0];
}

function appendToConsentLog(payload, consentId, participantId) {
  try {
    const sheet = getConsentLogSheet();
    ensureHeaders(sheet, CONSENT_LOG_HEADERS);
    const row = sheet.getLastRow() + 1;
    sheet.appendRow([
      consentId,
      payload.timestamp || new Date().toISOString(),
      payload.venue || '',
      payload.name  || '',
      payload.phone || '',
      payload.email || '',
      'Yes',
      payload.language || 'en',
      'HAPPY Program',
      ''
    ]);
  } catch (err) {
    // Non-fatal — audit will still record the consent
  }
}

// ─── MASTER SHEET (Kollect spreadsheet) ──────────────────────────────────────
function getMasterSheet() {
  const ss    = SpreadsheetApp.openById(KOLLECT_SPREADSHEET_ID);
  const sheet = ss.getSheetByName(MASTER_SHEET_NAME) || ss.insertSheet(MASTER_SHEET_NAME);
  ensureHeaders(sheet, MASTER_HEADERS);
  return sheet;
}

// ─── AUDIT LOG (Kollect spreadsheet) ─────────────────────────────────────────
function appendAudit(entry) {
  try {
    const ss    = SpreadsheetApp.openById(KOLLECT_SPREADSHEET_ID);
    let sheet   = ss.getSheetByName(AUDIT_SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(AUDIT_SHEET_NAME);
    ensureHeaders(sheet, AUDIT_HEADERS);
    sheet.appendRow([
      Utilities.getUuid(),
      new Date().toISOString(),
      entry.participantId || '',
      entry.actorType     || '',
      entry.actor         || '',
      entry.action        || '',
      entry.section       || '',
      entry.notes         || ''
    ]);
  } catch (_) {}
}

// ─── EMAIL ───────────────────────────────────────────────────────────────────
function sendConsentParticipantEmail(details) {
  if (!details.email) return { sent: false, error: '' };
  try {
    const name = details.name ? ` ${details.name}` : '';
    MailApp.sendEmail({
      to:      details.email,
      subject: 'Your HAPPY Program Consent Confirmation',
      body: [
        `Hello${name},`,
        '',
        'Thank you for giving your consent to participate in the HAPPY Program.',
        '',
        'Here are your details — please keep them safe:',
        '',
        `  Consent ID:     ${details.consentSubmissionId}`,
        `  Participant ID: ${details.participantId}`,
        '',
        'Click the link below to complete your registration:',
        '',
        `  ${details.registrationUrl}`,
        '',
        'If you have any questions, please contact your HAPPY Program field officer.',
        '',
        'Regards,',
        'HAPPY Program Team'
      ].join('\n'),
      name: 'HAPPY Program'
    });
    return { sent: true, error: '' };
  } catch (err) {
    return { sent: false, error: err.message };
  }
}

// ─── DRIVE ───────────────────────────────────────────────────────────────────
function saveConsentSignatureToDrive(payload, participantId) {
  try {
    const match = String(payload.signature || '').match(/^data:image\/png;base64,(.+)$/);
    if (!match) return { id: '', url: '', name: '' };
    const bytes     = Utilities.base64Decode(match[1]);
    const safeName  = sanitizeFileName(payload.name || participantId || 'participant');
    const fileName  = `${participantId}_${new Date().toISOString().replace(/[:.]/g, '-')}_${safeName}_consent-signature.png`;
    const blob      = Utilities.newBlob(bytes, 'image/png', fileName);
    const folder    = DriveApp.getFolderById(CONSENT_SIGNATURE_FOLDER);
    const file      = folder.createFile(blob);
    return { id: file.getId(), url: file.getUrl(), name: file.getName() };
  } catch (_) {
    return { id: '', url: '', name: '' };
  }
}

// ─── URL ─────────────────────────────────────────────────────────────────────
function buildRegistrationUrl(token) {
  return 'https://murphy-richard.github.io/happy-kollekt/?token=' + encodeURIComponent(token);
}

// ─── SHEET UTILITIES ─────────────────────────────────────────────────────────
function ensureHeaders(sheet, desired) {
  if (!desired || !desired.length) return [];
  const lastCol = Math.max(sheet.getLastColumn(), desired.length);
  let current   = sheet.getRange(1, 1, 1, lastCol).getValues()[0].filter(Boolean);
  if (!current.length) {
    sheet.getRange(1, 1, 1, desired.length).setValues([desired]);
    sheet.setFrozenRows(1);
    return desired.slice();
  }
  const missing = desired.filter(h => !current.includes(h));
  if (missing.length) {
    sheet.getRange(1, current.length + 1, 1, missing.length).setValues([missing]);
    current = current.concat(missing);
  }
  return current;
}

function findParticipantRow(sheet, headers, criteria) {
  if (sheet.getLastRow() < 2) return -1;
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
  const idx  = {};
  headers.forEach((h, i) => idx[h] = i);
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (criteria.tokenHash && r[idx.continuationTokenHash] === criteria.tokenHash) return i + 2;
    if (criteria.participantId && r[idx.participantId] === criteria.participantId) return i + 2;
    if (criteria.phone && r[idx.participantPhoneNormalized] === criteria.phone) return i + 2;
    if (criteria.email && criteria.email && r[idx.participantEmailNormalized] === criteria.email) return i + 2;
  }
  return -1;
}

function generateParticipantId(sheet, headers) {
  const col = headers.indexOf('participantId');
  let max = 0;
  if (sheet.getLastRow() >= 2 && col >= 0) {
    sheet.getRange(2, col + 1, sheet.getLastRow() - 1, 1).getValues().flat().forEach(id => {
      const m = String(id || '').match(/^HAPPY-2026-(\d+)$/);
      if (m) max = Math.max(max, Number(m[1]));
    });
  }
  return PARTICIPANT_PREFIX + String(max + 1).padStart(6, '0');
}

function updateRow(sheet, headers, rowIndex, values) {
  const existing = rowToObject(headers, sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0]);
  const merged   = Object.assign({}, existing, values);
  sheet.getRange(rowIndex, 1, 1, headers.length).setValues([headers.map(h => toSheetValue(merged[h] || ''))]);
}

function rowToObject(headers, row) {
  const obj = {};
  headers.forEach((h, i) => obj[h] = fromSheetValue(row[i] !== undefined ? row[i] : ''));
  return obj;
}

function blankRecord(headers) {
  const obj = {};
  headers.forEach(h => obj[h] = '');
  return obj;
}

function toSheetValue(v) {
  if (typeof v !== 'string') return v;
  return /^[=+\-@]/.test(v) ? `'${v}` : v;
}

function fromSheetValue(v) {
  return typeof v === 'string' && v.startsWith("'") ? v.slice(1) : v;
}

// ─── STRING UTILITIES ────────────────────────────────────────────────────────
function createToken() {
  return Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
}

function hashValue(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(value || ''))
    .map(b => ('0' + (b < 0 ? b + 256 : b).toString(16)).slice(-2))
    .join('');
}

function generateConsentId() {
  return 'HAPPY-' + Utilities.getUuid().replace(/-/g, '').slice(0, 8).toUpperCase();
}

function normalizePhone(value) {
  const d = String(value || '').replace(/\D+/g, '');
  if (!d) return '';
  if (d.length === 10 && d.startsWith('0')) return '233' + d.slice(1);
  if (d.length >= 9) return d.slice(-12);
  return d;
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function sanitizeFileName(value) {
  return String(value || 'participant')
    .replace(/[\\/:*?"<>|#%{}~&]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120) || 'participant';
}

// ─── RESPONSE ────────────────────────────────────────────────────────────────
function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(JSON_MIME);
}

// ─── AUTH HELPERS ─────────────────────────────────────────────────────────────
function authorizeDriveAccess() {
  const folder = DriveApp.getFolderById(CONSENT_SIGNATURE_FOLDER);
  const test   = folder.createFile(Utilities.newBlob('auth-test', 'text/plain', 'auth-test.txt'));
  test.setTrashed(true);
  return 'Drive access OK: ' + folder.getName();
}

function authorizeEmailAccess() {
  const email = Session.getActiveUser().getEmail();
  if (!email) return 'No email available for auth test.';
  MailApp.sendEmail({ to: email, subject: 'HAPPY auth test', body: 'Auth OK.', name: 'HAPPY Program' });
  return 'Email access OK. Test sent to ' + email;
}
