// ===== HAPPY PROGRAM — CONSENT BACKEND =====
// Deploy this script from spreadsheet: 1D_LyM6SQFp2GjU88ytXe1yPkePuPxM4OeI0lgpzs8O4
// Handles consent form submissions only.

const CONSENT_SPREADSHEET_ID = '1D_LyM6SQFp2GjU88ytXe1yPkePuPxM4OeI0lgpzs8O4';
const CONSENT_SHEET_GID = 0;
const CONSENT_SIGNATURE_FOLDER_ID = '1uczj5UbNUqY0-j6Rn7bosXO13LvvACmV';
const REGISTRATION_SPREADSHEET_ID = '15wqqAiJIbw6lfzwZFG_fGiklG-jFMCCpQhkaWVtPSzA';
const REGISTRATION_MASTER_NAME = 'Master';
const PARTICIPANT_PREFIX = 'HAPPY-2026-';
const JSON_MIME = ContentService.MimeType.JSON;

const CONSENT_LOG_HEADERS = [
  'Consent ID', 'Timestamp', 'Venue of Engagement', 'Participant Name',
  'Phone Number', 'Email', 'Accept to Participate', 'Language', 'Program', 'Signature'
];

// Minimal columns seeded into the registration sheet so the token lookup works
const SEED_HEADERS = [
  'participantId', 'continuationTokenHash', 'continuationTokenCreatedAt',
  'consentStatus', 'consentSubmittedAt', 'consentName', 'consentPhone', 'consentEmail',
  'consentVenue', 'participantInfoStatus', 'capacityBuildingStatus', 'jobPlacementStatus',
  'currentStage', 'lockedSections', 'cvStatus', 'lastUpdatedAt', 'lastUpdatedBy',
  'createdAt', 'createdBy', 'participantPhoneNormalized', 'participantEmailNormalized'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(20000);
  try {
    const payload = JSON.parse(e.postData.contents);
    return jsonResponse(initConsent(payload));
  } catch (err) {
    return jsonResponse({ status: 'ERROR', message: err.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return jsonResponse({ status: 'OK', message: 'HAPPY Consent backend is running.' });
}

function initConsent(payload) {
  if (!String(payload.name || '').trim() || !String(payload.phone || '').trim()) {
    throw new Error('Name and phone are required.');
  }

  const now = new Date().toISOString();
  const rawToken = createToken();
  const tokenHash = hashValue(rawToken);
  const consentId = generateConsentId();
  const phone = normalizePhone(payload.phone);
  const email = normalizeEmail(payload.email);

  // Generate participantId from the registration sheet sequence
  const regSS = SpreadsheetApp.openById(REGISTRATION_SPREADSHEET_ID);
  const regSheet = regSS.getSheetByName(REGISTRATION_MASTER_NAME) || regSS.insertSheet(REGISTRATION_MASTER_NAME);
  const participantId = generateParticipantId(regSheet);

  // Save signature PNG to Drive
  const signatureFile = saveSignatureToDrive(payload, participantId);

  // Write consent log row (gid=0 of consent spreadsheet)
  writeConsentLog(payload, signatureFile, consentId, now);

  // Seed minimal row in registration Master so token lookup works
  seedRegistrationRecord(regSheet, participantId, tokenHash, phone, email, payload, now);

  // Build the URL the app will redirect to after consent
  const registrationUrl = buildRegistrationUrl(rawToken, payload.appUrl);

  // Send confirmation email if address provided
  const emailResult = sendConsentEmail({ participantId, token: rawToken, registrationUrl, name: payload.name, email });

  return {
    status: 'OK',
    participantId,
    token: rawToken,
    registrationUrl,
    emailSent: emailResult.sent
  };
}

// ===== CONSENT LOG =====

function writeConsentLog(payload, signatureFile, consentId, now) {
  const ss = SpreadsheetApp.openById(CONSENT_SPREADSHEET_ID);
  const sheet = ss.getSheets().find(s => s.getSheetId() === CONSENT_SHEET_GID) || ss.getSheets()[0];
  ensureSheetHeaders(sheet, CONSENT_LOG_HEADERS);
  const newRow = sheet.getLastRow() + 1;
  sheet.appendRow([
    consentId,
    payload.timestamp || now,
    String(payload.venue || '').trim(),
    String(payload.name || '').trim(),
    String(payload.phone || '').trim(),
    String(payload.email || '').trim(),
    'Yes',
    payload.language || 'en',
    'HAPPY Program',
    ''
  ]);
  if (signatureFile && signatureFile.url) {
    sheet.getRange(newRow, CONSENT_LOG_HEADERS.length)
      .setFormula('=HYPERLINK("' + signatureFile.url.replace(/"/g, '') + '","View")');
  }
}

// ===== REGISTRATION SEED =====

function seedRegistrationRecord(regSheet, participantId, tokenHash, phone, email, payload, now) {
  const headers = ensureSheetHeaders(regSheet, SEED_HEADERS);
  const idCol = headers.indexOf('participantId');
  if (regSheet.getLastRow() >= 2) {
    const ids = regSheet.getRange(2, idCol + 1, regSheet.getLastRow() - 1, 1).getValues().flat();
    if (ids.some(id => id === participantId)) return; // already seeded
  }
  const record = {};
  headers.forEach(h => record[h] = '');
  Object.assign(record, {
    participantId,
    continuationTokenHash: tokenHash,
    continuationTokenCreatedAt: now,
    consentStatus: 'complete',
    consentSubmittedAt: payload.timestamp || now,
    consentName: String(payload.name || '').trim(),
    consentPhone: String(payload.phone || '').trim(),
    consentEmail: String(payload.email || '').trim(),
    consentVenue: String(payload.venue || '').trim(),
    participantInfoStatus: 'not_started',
    capacityBuildingStatus: 'not_started',
    jobPlacementStatus: 'not_started',
    currentStage: 'registration',
    lockedSections: '',
    cvStatus: 'not_started',
    lastUpdatedAt: now,
    lastUpdatedBy: 'consent',
    createdAt: now,
    createdBy: 'consent',
    participantPhoneNormalized: phone,
    participantEmailNormalized: email
  });
  regSheet.appendRow(headers.map(h => toSheetValue(record[h] || '')));
}

// ===== DRIVE =====

function saveSignatureToDrive(payload, participantId) {
  try {
    const match = String(payload.signature || '').match(/^data:image\/png;base64,(.+)$/);
    if (!match) return { url: '', id: '', name: '' };
    const bytes = Utilities.base64Decode(match[1]);
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const safeName = String(payload.name || participantId).replace(/[\\/:*?"<>|#%{}~&]/g, '-').trim().slice(0, 50);
    const fileName = participantId + '_' + ts + '_' + safeName + '_consent-signature.png';
    const blob = Utilities.newBlob(bytes, 'image/png', fileName);
    const file = DriveApp.getFolderById(CONSENT_SIGNATURE_FOLDER_ID).createFile(blob);
    return { id: file.getId(), url: file.getUrl(), name: file.getName() };
  } catch (err) {
    Logger.log('Signature save error: ' + err);
    return { url: '', id: '', name: '' };
  }
}

// ===== EMAIL =====

function sendConsentEmail(details) {
  if (!details.email) return { sent: false };
  try {
    MailApp.sendEmail({
      to: details.email,
      subject: 'HAPPY Program — Your Participant ID',
      body: [
        'Hello ' + (details.name || '') + ',',
        '',
        'Thank you for completing your consent for the HAPPY Program.',
        '',
        'Your Participant ID: ' + details.participantId,
        '',
        'Use this link to continue your registration:',
        details.registrationUrl,
        '',
        'Regards,',
        'HAPPY Program Team'
      ].join('\n'),
      name: 'HAPPY Program'
    });
    return { sent: true };
  } catch (err) {
    Logger.log('Email error: ' + err);
    return { sent: false, error: err.message };
  }
}

// ===== HELPERS =====

function buildRegistrationUrl(token, fallbackBase) {
  const configured = PropertiesService.getScriptProperties().getProperty('REGISTRATION_URL');
  const base = configured || fallbackBase || '';
  return base + (base.indexOf('?') >= 0 ? '&' : '?') + 'token=' + encodeURIComponent(token);
}

function generateParticipantId(regSheet) {
  let max = 0;
  if (regSheet.getLastRow() >= 2 && regSheet.getLastColumn() >= 1) {
    const headers = regSheet.getRange(1, 1, 1, regSheet.getLastColumn()).getValues()[0];
    const idCol = headers.indexOf('participantId');
    if (idCol >= 0) {
      const ids = regSheet.getRange(2, idCol + 1, regSheet.getLastRow() - 1, 1).getValues().flat();
      ids.forEach(id => {
        const m = String(id || '').match(/^HAPPY-2026-(\d+)$/);
        if (m) max = Math.max(max, Number(m[1]));
      });
    }
  }
  return PARTICIPANT_PREFIX + String(max + 1).padStart(6, '0');
}

function ensureSheetHeaders(sheet, desired) {
  const lastCol = Math.max(sheet.getLastColumn(), desired.length);
  let existing = sheet.getLastRow() >= 1
    ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].filter(Boolean)
    : [];
  if (!existing.length) {
    sheet.getRange(1, 1, 1, desired.length).setValues([desired]);
    sheet.setFrozenRows(1);
    return desired;
  }
  const missing = desired.filter(h => !existing.includes(h));
  if (missing.length) {
    sheet.getRange(1, existing.length + 1, 1, missing.length).setValues([missing]);
    existing = existing.concat(missing);
  }
  return existing;
}

function generateConsentId() {
  return 'HAPPY-' + Utilities.getUuid().replace(/-/g, '').slice(0, 8).toUpperCase();
}

function createToken() {
  return Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
}

function hashValue(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(value || ''));
  return bytes.map(b => { const n = b < 0 ? b + 256 : b; return ('0' + n.toString(16)).slice(-2); }).join('');
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

function toSheetValue(value) {
  if (typeof value !== 'string') return value;
  if (/^[=+\-@]/.test(value)) return "'" + value;
  return value;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(JSON_MIME);
}
