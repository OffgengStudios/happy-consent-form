const SPREADSHEET_ID = '1D_LyM6SQFp2GjU88ytXe1yPkePuPxM4OeI0lgpzs8O4';
const LEGACY_SHEET_GID = 0;
const MASTER_SHEET_NAME = 'Master';
const AUDIT_SHEET_NAME = 'Audit_Log';
const CV_RESULTS_SHEET_NAME = 'CV_Parse_Results';
const JSON_MIME = ContentService.MimeType.JSON;
const PARTICIPANT_PREFIX = 'HAPPY-2026-';
const CONSENT_SIGNATURE_FOLDER_ID = '1uczj5UbNUqY0-j6Rn7bosXO13LvvACmV';
const CV_UPLOAD_FOLDER_ID = '1WEqqBy9AvnzMAkd6dJBXeaO_IqnO1bSc';
const REGISTRATION_SPREADSHEET_ID = '15wqqAiJIbw6lfzwZFG_fGiklG-jFMCCpQhkaWVtPSzA';
const REGISTRATION_SHEET_GID = 120260501;
const BACKEND_VERSION = '2026-05-21-consent-signature-folder';

const LIFECYCLE_HEADERS = [
  'participantId', 'legacyParticipantId', 'continuationTokenHash',
  'continuationTokenCreatedAt', 'consentStatus', 'consentSubmittedAt',
  'consentSubmissionId', 'consentName', 'consentPhone', 'consentEmail',
  'consentEmailSent', 'consentEmailSentAt', 'consentEmailSendError',
  'consentVenue', 'consentSignatureFileUrl', 'consentSignatureFileId',
  'consentSignatureFileName', 'participantInfoStatus', 'capacityBuildingStatus',
  'jobPlacementStatus', 'currentStage', 'lockedSections', 'cvStatus',
  'cvUploadedAt', 'cvFileUrl', 'cvFileId', 'cvParserCandidateId', 'cvParsedAt',
  'cvTemplateFolderAccessed', 'lastUpdatedAt', 'lastUpdatedBy', 'createdAt',
  'createdBy'
];

const REGISTRATION_HEADERS = [
  'submissionId', 'localQueueId', 'syncStatus', 'collectorName', 'deviceId',
  'submissionTimestamp', 'hamisId', 'onboardingDate', 'implementingPartner',
  'region', 'district', 'community', 'locationStatus', 'surname', 'firstName',
  'otherNames', 'sex', 'dob', 'age', 'participantTypeAge', 'telephone',
  'idType', 'ghanaCardId', 'voterId', 'refugeeStatus', 'nationality',
  'displacementStatus', 'displacementReason', 'originalCommunity',
  'hostCommunity', 'disabilityStatus', 'disabilitySpecify', 'educationLevel',
  'employmentStatus', 'currentOccupation', 'monthlyIncome', 'incomeFrequency',
  'sector', 'industry', 'jobType', 'jobRole', 'workRegion', 'workDistrict',
  'workCommunity', 'trainedByPartner', 'trainingStartDate', 'trainingEndDate',
  'trainingLocation', 'trainingMode', 'virtualPlatform', 'trainerType',
  'trainingPartner', 'completionStatus', 'certificateIssued', 'modules',
  'digitalSkills', 'wishTraining', 'previousTrainings', 'previousTrainingDesc',
  'placedByPartner', 'placementStartDate', 'placementRegion',
  'placementDistrict', 'placementCommunity', 'plSector', 'plIndustry',
  'plJobType', 'plJobRole', 'employmentType', 'employmentCategory',
  'placementIncome', 'placementIncomeFreq', 'employerName', 'contractType',
  'workHours', 'currentlyEmployed', 'currentEmployer', 'currentJobRoleAlt',
  'currentIncomeAlt', 'hasCv', 'cvUploadName', 'cvUploadType', 'cvUploadSize',
  'cvUploadDataUrl', 'cvDecisionAt', 'participantPhoneNormalized',
  'participantEmailNormalized', 'ghanaCardNormalized', 'adminNotes'
];

const MASTER_HEADERS = LIFECYCLE_HEADERS.concat(REGISTRATION_HEADERS);
const AUDIT_HEADERS = [
  'auditId', 'timestamp', 'participantId', 'actorType', 'actor', 'action',
  'section', 'field', 'oldValue', 'newValue', 'source', 'notes'
];
const CV_RESULT_HEADERS = [
  'participantId', 'cvParserCandidateId', 'cvStatus', 'filename', 'uploadedAt',
  'parsedAt', 'name', 'email', 'phone', 'skills', 'education', 'experience',
  'category', 'subcategory', 'confidence', 'yearsExperience', 'source', 'notes'
];

const CONSENT_LOG_HEADERS = [
  'Consent ID', 'Timestamp', 'Venue of Engagement', 'Participant Name',
  'Phone Number', 'Email', 'Accept to Participate', 'Language', 'Program', 'Signature'
];

const CAPACITY_BUILDING_FIELDS = [
  'trainedByPartner', 'trainingStartDate', 'trainingEndDate', 'trainingLocation',
  'trainingMode', 'virtualPlatform', 'trainerType', 'trainingPartner',
  'completionStatus', 'certificateIssued', 'modules', 'digitalSkills',
  'wishTraining', 'previousTrainings', 'previousTrainingDesc'
];

const JOB_PLACEMENT_FIELDS = [
  'placedByPartner', 'placementStartDate', 'placementRegion',
  'placementDistrict', 'placementCommunity', 'plSector', 'plIndustry',
  'plJobType', 'plJobRole', 'employmentType', 'employmentCategory',
  'placementIncome', 'placementIncomeFreq', 'employerName', 'contractType',
  'workHours', 'currentlyEmployed', 'currentEmployer', 'currentJobRoleAlt',
  'currentIncomeAlt'
];

function doPost(e) {
  try {
    const payload = parsePayload(e);
    const action = payload.action || 'saveParticipantInfo';

    if (action === 'initConsent') return jsonResponse(initConsent(payload));
    if (action === 'getParticipantByToken') return jsonResponse(getParticipantByToken(payload.token));
    if (action === 'getParticipantById') return jsonResponse(getParticipantById(payload.participantId));
    if (action === 'saveParticipantInfo') return jsonResponse(saveParticipantInfo(payload));
    if (action === 'submitCapacityBuilding') return jsonResponse(saveParticipantInfo(payload, 'capacity'));
    if (action === 'submitJobPlacement') return jsonResponse(saveParticipantInfo(payload, 'placement'));
    if (action === 'updateCvStatus') return jsonResponse(updateCvStatus(payload));
    if (action === 'adminUpdateParticipant') return jsonResponse(adminUpdateParticipant(payload));
    if (action === 'getSheetData') return jsonResponse(getProtectedSheetData(payload.adminPassword, payload.sheetName));
    if (action === 'getReportStats') return jsonResponse(getReportStats());
    if (action === 'refreshDashboard') return jsonResponse(refreshDashboardReport(payload.adminPassword));
    if (action === 'importFromSheet') return jsonResponse(importFromSheet(payload));

    throw new Error(`Unsupported action: ${action}`);
  } catch (err) {
    return jsonResponse({ status: 'ERROR', message: err.message });
  }
}

function doGet(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const callback = params.callback || '';
    let result;

    if (params.action === 'getParticipantByToken') {
      result = getParticipantByToken(params.token);
    } else if (params.action === 'getParticipantById') {
      result = getParticipantById(params.participantId);
    } else if (params.action === 'getStats' || params.action === 'getReportStats') {
      result = getReportStats();
    } else if (params.action === 'refreshDashboard') {
      result = refreshDashboardReport(params.adminPassword);
    } else if (params.action === 'getSheetData') {
      result = getProtectedSheetData(params.adminPassword, params.sheetName);
    } else {
      result = { status: 'OK', message: 'HAPPY lifecycle backend is running.', version: BACKEND_VERSION };
    }

    return callback ? javascriptResponse(callback, result) : jsonResponse(result);
  } catch (err) {
    return jsonResponse({ status: 'ERROR', message: err.message });
  }
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) throw new Error('No POST body received.');
  return JSON.parse(e.postData.contents);
}

function initConsent(payload) {
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const now = new Date().toISOString();
  const rawToken = createToken();
  const tokenHash = hashValue(rawToken);
  const registrationUrl = buildRegistrationUrl(rawToken, payload.appUrl);
  const consentSubmissionId = payload.submissionId || `CONSENT-${Date.now()}`;
  const phone = normalizePhone(payload.phone);
  const email = normalizeEmail(payload.email);
  let rowIndex = findParticipantRow(sheet, headers, {
    tokenHash,
    phone,
    email,
    ghanaCard: ''
  });

  let participantId;
  let signatureFile;
  if (rowIndex > 0) {
    const existing = rowToObject(headers, sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0]);
    participantId = existing.participantId || generateParticipantId(sheet, headers);
    signatureFile = saveConsentSignatureToDrive(payload, participantId);
    updateRow(sheet, headers, rowIndex, {
      participantId,
      continuationTokenHash: tokenHash,
      continuationTokenCreatedAt: now,
      consentStatus: 'complete',
      consentSubmittedAt: payload.timestamp || now,
      consentSubmissionId,
      consentName: payload.name || '',
      consentPhone: payload.phone || '',
      consentEmail: payload.email || '',
      consentVenue: payload.venue || '',
      consentSignatureFileUrl: signatureFile.url,
      consentSignatureFileId: signatureFile.id,
      consentSignatureFileName: signatureFile.name,
      currentStage: existing.currentStage || 'registration',
      lastUpdatedAt: now,
      lastUpdatedBy: 'participant',
      participantPhoneNormalized: phone,
      participantEmailNormalized: email
    });
  } else {
    participantId = generateParticipantId(sheet, headers);
    signatureFile = saveConsentSignatureToDrive(payload, participantId);
    const record = blankRecord(headers);
    Object.assign(record, {
      participantId,
      continuationTokenHash: tokenHash,
      continuationTokenCreatedAt: now,
      consentStatus: 'complete',
      consentSubmittedAt: payload.timestamp || now,
      consentSubmissionId,
      consentName: payload.name || '',
      consentPhone: payload.phone || '',
      consentEmail: payload.email || '',
      consentVenue: payload.venue || '',
      consentSignatureFileUrl: signatureFile.url,
      consentSignatureFileId: signatureFile.id,
      consentSignatureFileName: signatureFile.name,
      participantInfoStatus: 'not_started',
      capacityBuildingStatus: 'not_started',
      jobPlacementStatus: 'not_started',
      currentStage: 'registration',
      lockedSections: '',
      cvStatus: 'not_started',
      lastUpdatedAt: now,
      lastUpdatedBy: 'participant',
      createdAt: now,
      createdBy: 'consent',
      participantPhoneNormalized: phone,
      participantEmailNormalized: email
    });
    sheet.appendRow(headers.map(header => toSheetValue(record[header] || '')));
    rowIndex = sheet.getLastRow();
  }

  const consentLogId = generateConsentId();
  appendToConsentLog(payload, signatureFile, consentLogId);
  appendToRegistrationSheet(payload, signatureFile, consentLogId);

  appendAudit({
    participantId,
    actorType: 'participant',
    actor: payload.name || payload.phone || 'participant',
    action: 'initConsent',
    section: 'consent',
    source: 'happy-consent-form',
    notes: payload.venue || ''
  });

  const emailResult = sendConsentParticipantEmail({
    participantId,
    token: rawToken,
    registrationUrl,
    consentSubmissionId,
    name: payload.name || '',
    email
  });
  updateRow(sheet, headers, rowIndex, {
    consentEmailSent: emailResult.sent ? 'yes' : (email ? 'no' : ''),
    consentEmailSentAt: emailResult.sent ? new Date().toISOString() : '',
    consentEmailSendError: emailResult.error || ''
  });
  if (emailResult.sent || emailResult.error) {
    appendAudit({
      participantId,
      actorType: 'system',
      actor: 'apps-script',
      action: emailResult.sent ? 'sendConsentEmail' : 'sendConsentEmailFailed',
      section: 'consent',
      source: 'apps-script',
      notes: emailResult.sent ? email : emailResult.error
    });
  }

  return {
    status: 'OK',
    participantId,
    token: rawToken,
    row: rowIndex,
    registrationUrl,
    emailSent: emailResult.sent
  };
}

function getParticipantByToken(token) {
  if (!token) throw new Error('Missing continuation token.');
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const rowIndex = findParticipantRow(sheet, headers, { tokenHash: hashValue(token) });
  if (rowIndex < 1) throw new Error('Participant record was not found for this continuation link.');
  const row = sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0];
  const participant = rowToObject(headers, row);
  participant.continuationTokenHash = '';
  return { status: 'OK', participant, row: rowIndex };
}

function getParticipantById(participantId) {
  if (!participantId) throw new Error('Missing participant ID.');
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const rowIndex = findParticipantRow(sheet, headers, { participantId });
  if (rowIndex < 1) throw new Error('Participant record was not found for this participant ID.');
  const row = sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0];
  const participant = rowToObject(headers, row);
  participant.continuationTokenHash = '';
  return { status: 'OK', participant, row: rowIndex };
}

function saveParticipantInfo(payload, explicitSection) {
  if (explicitSection === 'capacity' || explicitSection === 'placement') {
    const adminPassword = getAdminPassword();
    if (!adminPassword || payload.adminPassword !== adminPassword) {
      throw new Error('Admin access is required for capacity building and job placement updates.');
    }
  }

  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const now = new Date().toISOString();
  const tokenHash = payload.token ? hashValue(payload.token) : '';
  const phone = normalizePhone(payload.telephone || payload.consentPhone);
  const email = normalizeEmail(payload.email || payload.consentEmail);
  const ghanaCard = normalizeGhanaCard(payload.ghanaCardId);
  let rowIndex = findParticipantRow(sheet, headers, {
    participantId: payload.participantId,
    tokenHash,
    phone,
    email,
    ghanaCard,
    localQueueId: payload.localQueueId,
    submissionId: payload.submissionId
  });

  const isNew = rowIndex < 1;
  const existing = isNew ? {} : rowToObject(headers, sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0]);
  const participantId = existing.participantId || payload.participantId || generateParticipantId(sheet, headers);
  const incoming = pickKnownHeaders(payload, headers);
  enforceSectionScope(incoming, explicitSection, existing);
  normalizeParticipantInfoDefaults(incoming, explicitSection);
  const blockedSections = enforceParticipantLocks(existing, incoming);
  const capacityStatus = resolveCapacityStatus(existing, incoming, explicitSection);
  const placementStatus = resolvePlacementStatus(existing, incoming, explicitSection);
  const lockedSections = buildLockedSections(capacityStatus, placementStatus);
  const record = Object.assign({}, incoming, {
    participantId,
    legacyParticipantId: incoming.legacyParticipantId || existing.legacyParticipantId || (payload.participantId && !String(payload.participantId).startsWith(PARTICIPANT_PREFIX) ? payload.participantId : ''),
    continuationTokenHash: existing.continuationTokenHash || tokenHash,
    participantInfoStatus: 'submitted',
    capacityBuildingStatus: capacityStatus,
    jobPlacementStatus: placementStatus,
    currentStage: resolveCurrentStage(capacityStatus, placementStatus),
    lockedSections,
    lastUpdatedAt: now,
    lastUpdatedBy: payload.actor || payload.collectorName || 'participant',
    createdAt: existing.createdAt || now,
    createdBy: existing.createdBy || 'registration',
    participantPhoneNormalized: explicitSection ? existing.participantPhoneNormalized : phone,
    participantEmailNormalized: explicitSection ? existing.participantEmailNormalized : email,
    ghanaCardNormalized: explicitSection ? existing.ghanaCardNormalized : ghanaCard,
    syncStatus: payload.syncStatus || 'synced'
  });

  if (isNew) {
    const full = blankRecord(headers);
    Object.assign(full, record);
    sheet.appendRow(headers.map(header => toSheetValue(full[header] || '')));
    rowIndex = sheet.getLastRow();
  } else {
    updateRow(sheet, headers, rowIndex, record);
  }

  appendAudit({
    participantId,
    actorType: payload.actorType || 'participant',
    actor: payload.actor || payload.collectorName || 'participant',
    action: isNew ? 'createRegistration' : 'updateRegistration',
    section: explicitSection || 'registration',
    source: 'happy-kollekt',
    notes: blockedSections.length ? `Blocked participant edit: ${blockedSections.join(',')}` : (lockedSections ? `Locked: ${lockedSections}` : '')
  });

  return {
    status: 'OK',
    duplicate: !isNew,
    participantId,
    referenceId: participantId,
    row: rowIndex,
    capacityBuildingStatus: capacityStatus,
    jobPlacementStatus: placementStatus,
    lockedSections,
    blockedSections
  };
}

function enforceSectionScope(incoming, explicitSection, existing) {
  if (explicitSection === 'capacity') {
    preserveParticipantSectionFields(incoming, CAPACITY_BUILDING_FIELDS, existing);
    removeIncomingFields(incoming, JOB_PLACEMENT_FIELDS);
    return;
  }
  if (explicitSection === 'placement') {
    preserveParticipantSectionFields(incoming, JOB_PLACEMENT_FIELDS, existing);
    removeIncomingFields(incoming, CAPACITY_BUILDING_FIELDS);
    return;
  }
  removeIncomingFields(incoming, CAPACITY_BUILDING_FIELDS);
  removeIncomingFields(incoming, JOB_PLACEMENT_FIELDS);
}

function preserveParticipantSectionFields(incoming, allowedSectionFields, existing) {
  const allowed = new Set(allowedSectionFields);
  REGISTRATION_HEADERS.forEach(header => {
    if (!allowed.has(header)) delete incoming[header];
  });
  if (existing && existing.participantInfoStatus) incoming.participantInfoStatus = existing.participantInfoStatus;
}

function normalizeParticipantInfoDefaults(incoming, explicitSection) {
  if (explicitSection) return;
  incoming.disabilityStatus = normalizeYesNo(incoming.disabilityStatus, 'No');
  if (incoming.disabilityStatus !== 'Yes') incoming.disabilitySpecify = '';
}

function normalizeYesNo(value, fallback) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'yes') return 'Yes';
  if (normalized === 'no') return 'No';
  return fallback;
}

function updateCvStatus(payload) {
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const rowIndex = findParticipantRow(sheet, headers, {
    participantId: payload.participantId,
    tokenHash: payload.token ? hashValue(payload.token) : ''
  });
  if (rowIndex < 1) throw new Error('Participant record not found for CV update.');

  const now = new Date().toISOString();
  const existing = rowToObject(headers, sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0]);
  const storedFile = payload.cvUploadDataUrl ? saveCvFileToDrive(payload, payload.participantId) : null;
  const clearExistingFile = payload.hasCv === 'No' || payload.cvStatus === 'no_cv';
  const update = {
    cvStatus: payload.cvStatus || (payload.hasCv === 'Yes' ? 'cv_uploaded' : 'no_cv'),
    hasCv: payload.hasCv || '',
    cvUploadedAt: payload.cvUploadedAt || (payload.hasCv === 'Yes' ? now : ''),
    cvUploadName: payload.cvUploadName || '',
    cvUploadType: payload.cvUploadType || '',
    cvUploadSize: payload.cvUploadSize || '',
    cvFileUrl: storedFile ? storedFile.url : (clearExistingFile ? '' : existing.cvFileUrl),
    cvFileId: storedFile ? storedFile.id : (clearExistingFile ? '' : existing.cvFileId),
    cvUploadDataUrl: '',
    cvDecisionAt: payload.cvDecisionAt || now,
    cvTemplateFolderAccessed: payload.cvTemplateFolderAccessed || '',
    lastUpdatedAt: now,
    lastUpdatedBy: payload.actor || 'participant'
  };
  updateRow(sheet, headers, rowIndex, update);

  appendAudit({
    participantId: payload.participantId,
    actorType: payload.actorType || 'participant',
    actor: payload.actor || 'participant',
    action: 'updateCvStatus',
    section: 'cv',
    source: 'happy-kollekt',
    notes: update.cvStatus
  });

  return { status: 'OK', participantId: payload.participantId, cvStatus: update.cvStatus };
}

function saveCvFileToDrive(payload, participantId) {
  const match = String(payload.cvUploadDataUrl || '').match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error('Invalid CV file payload.');

  const mimeType = payload.cvUploadType || match[1] || 'application/octet-stream';
  const bytes = Utilities.base64Decode(match[2]);
  const safeName = sanitizeFileName(payload.cvUploadName || 'participant-cv');
  const datedName = `${participantId}_${new Date().toISOString().replace(/[:.]/g, '-')}_${safeName}`;
  const blob = Utilities.newBlob(bytes, mimeType, datedName);
  const folder = DriveApp.getFolderById(CV_UPLOAD_FOLDER_ID);
  const file = folder.createFile(blob);

  return {
    id: file.getId(),
    url: file.getUrl()
  };
}

function saveConsentSignatureToDrive(payload, participantId) {
  const match = String(payload.signature || '').match(/^data:image\/png;base64,(.+)$/);
  if (!match) throw new Error('Invalid consent signature payload.');

  const bytes = Utilities.base64Decode(match[1]);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeName = sanitizeFileName(payload.name || participantId || 'participant');
  const fileName = `${participantId}_${timestamp}_${safeName}_consent-signature.png`;
  const blob = Utilities.newBlob(bytes, 'image/png', fileName);
  const folder = DriveApp.getFolderById(CONSENT_SIGNATURE_FOLDER_ID);
  const file = folder.createFile(blob);

  return {
    id: file.getId(),
    url: file.getUrl(),
    name: file.getName()
  };
}

function sanitizeFileName(value) {
  return String(value || 'participant-cv')
    .replace(/[\\/:*?"<>|#%{}~&]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120) || 'participant-cv';
}

function adminUpdateParticipant(payload) {
  const adminPassword = getAdminPassword();
  if (!adminPassword || payload.adminPassword !== adminPassword) throw new Error('Incorrect admin password.');
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const rowIndex = findParticipantRow(sheet, headers, { participantId: payload.participantId });
  if (rowIndex < 1) throw new Error('Participant record not found.');
  const updates = pickKnownHeaders(payload.updates || {}, headers);
  updates.lastUpdatedAt = new Date().toISOString();
  updates.lastUpdatedBy = payload.actor || 'admin';
  updateRow(sheet, headers, rowIndex, updates);
  Object.keys(updates).forEach(field => {
    if (field !== 'lastUpdatedAt' && field !== 'lastUpdatedBy') {
      appendAudit({
        participantId: payload.participantId,
        actorType: 'staff',
        actor: payload.actor || 'admin',
        action: 'adminUpdateParticipant',
        section: payload.section || 'admin',
        field,
        newValue: updates[field],
        source: 'happy-kollekt-admin'
      });
    }
  });
  return { status: 'OK', participantId: payload.participantId, updatedFields: Object.keys(updates) };
}

function getReportStats() {
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const records = getRecords(sheet, headers);
  const stats = {
    total: records.length,
    consentComplete: countWhere(records, 'consentStatus', 'complete'),
    registrationSubmitted: countWhere(records, 'participantInfoStatus', 'submitted'),
    capacitySubmitted: countWhere(records, 'capacityBuildingStatus', 'submitted'),
    placementSubmitted: countWhere(records, 'jobPlacementStatus', 'submitted'),
    noCv: countWhere(records, 'cvStatus', 'no_cv'),
    cvUploaded: countWhere(records, 'cvStatus', 'cv_uploaded'),
    templateAccessed: countWhere(records, 'cvTemplateFolderAccessed', 'yes')
  };
  return { status: 'OK', stats };
}

function refreshDashboardReport(password) {
  const adminPassword = getAdminPassword();
  if (!adminPassword || password !== adminPassword) throw new Error('Incorrect admin password.');

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Dashboard') || ss.insertSheet('Dashboard');
  const stats = getReportStats().stats;
  const master = getMasterSheet();
  const headers = ensureHeaders(master, MASTER_HEADERS);
  const records = getRecords(master, headers);

  sheet.clear();
  const rows = [
    ['HAPPY Lifecycle Dashboard', ''],
    ['Last refreshed', new Date()],
    ['', ''],
    ['Core KPIs', ''],
    ['Total participants', stats.total],
    ['Consent complete', stats.consentComplete],
    ['Registration submitted', stats.registrationSubmitted],
    ['Capacity building submitted', stats.capacitySubmitted],
    ['Job placement submitted', stats.placementSubmitted],
    ['No CV', stats.noCv],
    ['CV uploaded', stats.cvUploaded],
    ['CV template accessed', stats.templateAccessed],
    ['', ''],
    ['Participant Profile', ''],
    ['Female participants', countWhere(records, 'sex', 'Female')],
    ['Male participants', countWhere(records, 'sex', 'Male')],
    ['Youth 15-35', countYouth(records)],
    ['PWD participants', countWhere(records, 'disabilityStatus', 'Yes')],
    ['Refugee participants', countWhere(records, 'refugeeStatus', 'Yes')],
    ['', ''],
    ['Operational Scope', ''],
    ['Regions reached', countDistinct(records, 'region')],
    ['Districts reached', countDistinct(records, 'district')],
    ['Communities reached', countDistinct(records, 'community')],
    ['', ''],
    ['Employment / Placement', ''],
    ['New employment', countWhere(records, 'employmentCategory', 'New')],
    ['Improved employment', countWhere(records, 'employmentCategory', 'Improved')],
    ['Wage employment', countWhere(records, 'employmentType', 'Wage')],
    ['Self employment', countWhere(records, 'employmentType', 'Self')]
  ];

  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.getRange('A1:B1').merge()
    .setFontWeight('bold')
    .setFontSize(14)
    .setBackground('#1e40af')
    .setFontColor('#ffffff');
  [4, 14, 21, 26].forEach(row => {
    sheet.getRange(row, 1, 1, 2).setFontWeight('bold').setBackground('#dbeafe');
  });
  sheet.autoResizeColumns(1, 2);

  appendAudit({
    actorType: 'staff',
    actor: 'admin',
    action: 'refreshDashboard',
    section: 'reporting',
    source: 'apps-script',
    notes: 'Dashboard refreshed from Master'
  });

  return { status: 'OK', stats };
}

function getProtectedSheetData(password, sheetName) {
  const adminPassword = getAdminPassword();
  if (!adminPassword) return { status: 'ERROR', message: 'Admin password is not configured.' };
  if (password !== adminPassword) return { status: 'ERROR', message: 'Incorrect password.' };
  const sheet = sheetName === 'Sheet1' ? getLegacySheet() : getMasterSheet();
  const headers = ensureHeaders(sheet, sheetName === 'Sheet1' ? null : MASTER_HEADERS);
  return { status: 'OK', data: getRecords(sheet, headers) };
}

const SOURCE_TO_MASTER = {
  'HAMIS ID': 'hamisId',
  'Onboarding Date': 'onboardingDate',
  'Organization': 'employerName',
  'Sector': 'sector',
  'Sector Type': 'industry',
  'Job Role': 'jobRole',
  'Implementing Partner (or Sub-Partner)': 'implementingPartner',
  'Region': 'region',
  'District': 'district',
  'Community': 'community',
  'Location Status': 'locationStatus',
  'Participant Type - Support': 'participantTypeSupport',
  'Surname': 'surname',
  'First Name': 'firstName',
  'Other Name(s)': 'otherNames',
  'Sex': 'sex',
  'Date of Birth': 'dob',
  'Age': 'age',
  'Participant Type - Age': 'participantTypeAge',
  'Telephone': 'telephone',
  'Ghana Card ID Number': 'ghanaCardId',
  "Voter's ID Number": 'voterId',
  'Refugee Status': 'refugeeStatus',
  'Nationality (If "Yes" to Refugee)': 'nationality',
  'Disability Status': 'disabilityStatus',
  'Specify Disability': 'disabilitySpecify',
  'Education Level': 'educationLevel',
  'Employment Status': 'employmentStatus',
  'Occupation': 'currentOccupation',
  'Monthly Income': 'monthlyIncome'
};

function importFromSheet(payload) {
  const adminPassword = getAdminPassword();
  if (!adminPassword || payload.adminPassword !== adminPassword) {
    throw new Error('Admin access required for bulk import.');
  }

  const sourceId = payload.sourceSpreadsheetId || '1wmEH-iDZVBairol-4COpj1a5dUdHPz7wOfqCCZpWtso';
  const sourceGid = payload.sourceSheetGid !== undefined ? Number(payload.sourceSheetGid) : 0;

  const sourceSS = SpreadsheetApp.openById(sourceId);
  const sourceSheet = sourceSS.getSheets().find(s => s.getSheetId() === sourceGid) || sourceSS.getSheets()[0];

  if (sourceSheet.getLastRow() < 2) {
    return { status: 'OK', imported: 0, skipped: 0, message: 'No data rows found in source sheet.' };
  }

  const lastCol = sourceSheet.getLastColumn();
  const sourceHeaders = sourceSheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const sourceRows = sourceSheet.getRange(2, 1, sourceSheet.getLastRow() - 1, lastCol).getValues();

  const masterSheet = getMasterSheet();
  const masterHeaders = ensureHeaders(masterSheet, MASTER_HEADERS);
  const now = new Date().toISOString();

  let imported = 0;
  let skipped = 0;
  const errors = [];

  for (let r = 0; r < sourceRows.length; r++) {
    const row = sourceRows[r];
    if (row.every(cell => !String(cell).trim())) continue;

    try {
      const incoming = {};
      sourceHeaders.forEach((header, i) => {
        const masterKey = SOURCE_TO_MASTER[String(header).trim()];
        if (masterKey) incoming[masterKey] = String(row[i] || '').trim();
      });
      if (row[0]) incoming.legacyParticipantId = String(row[0]).trim();

      const phone = normalizePhone(incoming.telephone);
      const ghanaCard = normalizeGhanaCard(incoming.ghanaCardId);
      const existingRow = findParticipantRow(masterSheet, masterHeaders, { phone, ghanaCard });

      if (existingRow > 0) { skipped++; continue; }

      const participantId = generateParticipantId(masterSheet, masterHeaders);
      const record = blankRecord(masterHeaders);
      Object.assign(record, incoming, {
        participantId,
        consentStatus: 'complete',
        participantInfoStatus: 'submitted',
        capacityBuildingStatus: 'not_started',
        jobPlacementStatus: 'not_started',
        currentStage: 'registration_complete',
        lockedSections: '',
        cvStatus: 'not_started',
        syncStatus: 'synced',
        participantPhoneNormalized: phone,
        ghanaCardNormalized: ghanaCard,
        lastUpdatedAt: now,
        lastUpdatedBy: payload.actor || 'bulk_import',
        createdAt: now,
        createdBy: 'bulk_import'
      });

      masterSheet.appendRow(masterHeaders.map(h => toSheetValue(record[h] || '')));

      appendAudit({
        participantId,
        actorType: 'staff',
        actor: payload.actor || 'admin',
        action: 'bulkImport',
        section: 'registration',
        source: 'import-tool',
        notes: 'Legacy ID: ' + (incoming.legacyParticipantId || '')
      });

      imported++;
    } catch (err) {
      errors.push('Row ' + (r + 2) + ': ' + err.message);
    }
  }

  return {
    status: 'OK',
    imported,
    skipped,
    errors,
    message: 'Imported ' + imported + ' records. Skipped ' + skipped + ' duplicates.' + (errors.length ? ' ' + errors.length + ' errors.' : '')
  };
}

function runBulkImport() {
  const result = importFromSheet({
    adminPassword: getAdminPassword(),
    sourceSpreadsheetId: '1wmEH-iDZVBairol-4COpj1a5dUdHPz7wOfqCCZpWtso',
    sourceSheetGid: 0,
    actor: 'admin'
  });
  Logger.log(JSON.stringify(result));
  return result;
}

function generateConsentId() {
  return 'HAPPY-' + Utilities.getUuid().replace(/-/g, '').slice(0, 8).toUpperCase();
}

function getConsentLogSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheets().find(s => s.getSheetId() === LEGACY_SHEET_GID) || ss.getSheets()[0];
}

function appendToConsentLog(payload, signatureFile, consentId) {
  try {
    const sheet = getConsentLogSheet();
    ensureHeaders(sheet, CONSENT_LOG_HEADERS);
    const newRow = sheet.getLastRow() + 1;
    sheet.appendRow([
      consentId,
      payload.timestamp || new Date().toISOString(),
      payload.venue || '',
      payload.name || '',
      payload.phone || '',
      payload.email || '',
      'Yes',
      payload.language || 'en',
      'HAPPY Program',
      ''
    ]);
    if (signatureFile && signatureFile.url) {
      sheet.getRange(newRow, CONSENT_LOG_HEADERS.length)
        .setFormula('=HYPERLINK("' + signatureFile.url.replace(/"/g, '') + '","View")');
    }
  } catch (err) {
    appendAuditSafe({ action: 'appendToConsentLogFailed', section: 'consent', notes: err.message });
  }
}

function appendToRegistrationSheet(payload, signatureFile, consentId) {
  try {
    const ss = SpreadsheetApp.openById(REGISTRATION_SPREADSHEET_ID);
    const sheet = ss.getSheets().find(s => s.getSheetId() === REGISTRATION_SHEET_GID) || ss.getSheets()[0];
    ensureHeaders(sheet, CONSENT_LOG_HEADERS);
    const newRow = sheet.getLastRow() + 1;
    sheet.appendRow([
      consentId,
      payload.timestamp || new Date().toISOString(),
      payload.venue || '',
      payload.name || '',
      payload.phone || '',
      payload.email || '',
      'Yes',
      payload.language || 'en',
      'HAPPY Program',
      ''
    ]);
    if (signatureFile && signatureFile.url) {
      sheet.getRange(newRow, CONSENT_LOG_HEADERS.length)
        .setFormula('=HYPERLINK("' + signatureFile.url.replace(/"/g, '') + '","View")');
    }
  } catch (err) {
    appendAuditSafe({ action: 'appendToRegistrationSheetFailed', section: 'consent', notes: err.message });
  }
}

function appendAuditSafe(entry) {
  try { appendAudit(entry); } catch (_) {}
}

function getMasterSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(MASTER_SHEET_NAME) || ss.insertSheet(MASTER_SHEET_NAME);
  ensureHeaders(sheet, MASTER_HEADERS);
  return sheet;
}

function getLegacySheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheets().find(item => item.getSheetId() === LEGACY_SHEET_GID);
  if (!sheet) throw new Error(`Target legacy sheet gid=${LEGACY_SHEET_GID} was not found.`);
  return sheet;
}

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  ensureHeaders(sheet, headers);
  return sheet;
}

function ensureHeaders(sheet, desiredHeaders) {
  const lastColumn = Math.max(sheet.getLastColumn(), desiredHeaders ? desiredHeaders.length : 1);
  let headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].filter(Boolean);
  if (!headers.length && desiredHeaders) {
    headers = desiredHeaders;
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    return headers;
  }
  if (desiredHeaders) {
    const missing = desiredHeaders.filter(header => headers.indexOf(header) === -1);
    if (missing.length) {
      sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
      headers = headers.concat(missing);
    }
  }
  return headers;
}

function findParticipantRow(sheet, headers, criteria) {
  if (sheet.getLastRow() < 2) return -1;
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
  const indexes = {};
  headers.forEach((header, index) => indexes[header] = index);
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (criteria.tokenHash && row[indexes.continuationTokenHash] === criteria.tokenHash) return i + 2;
    if (criteria.participantId && row[indexes.participantId] === criteria.participantId) return i + 2;
    if (criteria.localQueueId && indexes.localQueueId >= 0 && row[indexes.localQueueId] === criteria.localQueueId) return i + 2;
    if (criteria.submissionId && indexes.submissionId >= 0 && row[indexes.submissionId] === criteria.submissionId) return i + 2;
    if (criteria.ghanaCard && row[indexes.ghanaCardNormalized] === criteria.ghanaCard) return i + 2;
    if (criteria.phone && row[indexes.participantPhoneNormalized] === criteria.phone) return i + 2;
    if (criteria.email && row[indexes.participantEmailNormalized] === criteria.email) return i + 2;
  }
  return -1;
}

function generateParticipantId(sheet, headers) {
  const idIndex = headers.indexOf('participantId');
  let max = 0;
  if (sheet.getLastRow() >= 2 && idIndex >= 0) {
    const ids = sheet.getRange(2, idIndex + 1, sheet.getLastRow() - 1, 1).getValues().flat();
    ids.forEach(id => {
      const match = String(id || '').match(/^HAPPY-2026-(\d+)$/);
      if (match) max = Math.max(max, Number(match[1]));
    });
  }
  return `${PARTICIPANT_PREFIX}${String(max + 1).padStart(6, '0')}`;
}

function updateRow(sheet, headers, rowIndex, values) {
  const existing = rowToObject(headers, sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0]);
  const merged = Object.assign({}, existing, values);
  sheet.getRange(rowIndex, 1, 1, headers.length).setValues([headers.map(header => toSheetValue(merged[header] || ''))]);
}

function appendAudit(entry) {
  const sheet = getOrCreateSheet(AUDIT_SHEET_NAME, AUDIT_HEADERS);
  const headers = ensureHeaders(sheet, AUDIT_HEADERS);
  const record = blankRecord(headers);
  Object.assign(record, {
    auditId: Utilities.getUuid(),
    timestamp: new Date().toISOString(),
    participantId: entry.participantId || '',
    actorType: entry.actorType || '',
    actor: entry.actor || '',
    action: entry.action || '',
    section: entry.section || '',
    field: entry.field || '',
    oldValue: entry.oldValue || '',
    newValue: entry.newValue || '',
    source: entry.source || '',
    notes: entry.notes || ''
  });
  sheet.appendRow(headers.map(header => toSheetValue(record[header] || '')));
}

function pickKnownHeaders(payload, headers) {
  const picked = {};
  headers.forEach(header => {
    if (Object.prototype.hasOwnProperty.call(payload, header)) picked[header] = payload[header];
  });
  return picked;
}

function blankRecord(headers) {
  const record = {};
  headers.forEach(header => record[header] = '');
  return record;
}

function rowToObject(headers, row) {
  const item = {};
  headers.forEach((header, index) => item[header] = fromSheetValue(row[index] || ''));
  return item;
}

function getRecords(sheet, headers) {
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length)
    .getValues()
    .map(row => rowToObject(headers, row))
    .filter(row => Object.values(row).some(Boolean));
}

function resolveCapacityStatus(existing, incoming, explicitSection) {
  if (existing.capacityBuildingStatus === 'submitted') return 'submitted';
  if (explicitSection === 'capacity') return 'submitted';
  if (incoming.trainedByPartner === 'Yes') return 'submitted';
  return existing.capacityBuildingStatus || 'not_started';
}

function resolvePlacementStatus(existing, incoming, explicitSection) {
  if (existing.jobPlacementStatus === 'submitted') return 'submitted';
  if (explicitSection === 'placement') return 'submitted';
  if (incoming.placedByPartner === 'Yes') return 'submitted';
  return existing.jobPlacementStatus || 'not_started';
}

function buildLockedSections(capacityStatus, placementStatus) {
  const locked = [];
  if (capacityStatus === 'submitted') locked.push('capacityBuilding');
  if (placementStatus === 'submitted') locked.push('jobPlacement');
  return locked.join(',');
}

function enforceParticipantLocks(existing, incoming) {
  const blocked = [];
  if (existing.capacityBuildingStatus === 'submitted') {
    removeIncomingFields(incoming, CAPACITY_BUILDING_FIELDS);
    blocked.push('capacityBuilding');
  }
  if (existing.jobPlacementStatus === 'submitted') {
    removeIncomingFields(incoming, JOB_PLACEMENT_FIELDS);
    blocked.push('jobPlacement');
  }
  return blocked;
}

function removeIncomingFields(incoming, fields) {
  fields.forEach(field => {
    if (Object.prototype.hasOwnProperty.call(incoming, field)) delete incoming[field];
  });
}

function resolveCurrentStage(capacityStatus, placementStatus) {
  if (placementStatus === 'submitted') return 'placement_complete';
  if (capacityStatus === 'submitted') return 'capacity_complete';
  return 'registration_complete';
}

function countWhere(records, field, value) {
  return records.filter(record => record[field] === value).length;
}

function countDistinct(records, field) {
  const values = {};
  records.forEach(record => {
    const value = String(record[field] || '').trim();
    if (value) values[value] = true;
  });
  return Object.keys(values).length;
}

function countYouth(records) {
  return records.filter(record => {
    const age = Number(record.age);
    return !isNaN(age) && age >= 15 && age <= 35;
  }).length;
}

function normalizePhone(value) {
  const digits = String(value || '').replace(/\D+/g, '');
  if (!digits) return '';
  if (digits.length === 10 && digits.startsWith('0')) return `233${digits.slice(1)}`;
  if (digits.length >= 9) return digits.slice(-12);
  return digits;
}

function toSheetValue(value) {
  if (typeof value !== 'string') return value;
  if (/^[=+\-@]/.test(value)) return `'${value}`;
  return value;
}

function fromSheetValue(value) {
  if (typeof value === 'string' && value.startsWith("'")) return value.slice(1);
  return value;
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeGhanaCard(value) {
  return String(value || '').trim().toUpperCase().replace(/\s+/g, '');
}

function createToken() {
  return Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
}

function hashValue(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(value || ''));
  return bytes.map(byte => {
    const normalized = byte < 0 ? byte + 256 : byte;
    return (`0${normalized.toString(16)}`).slice(-2);
  }).join('');
}

function sendConsentParticipantEmail(details) {
  if (!details.email) return { sent: false, error: '' };

  try {
    const name = details.name ? ` ${details.name}` : '';
    const subject = 'Your HAPPY Program Participant ID';
    const body = [
      `Hello${name},`,
      '',
      'Thank you for completing your consent for the HAPPY Program.',
      '',
      'Your Participant ID is:',
      details.participantId,
      '',
      'Your Consent ID is:',
      details.consentSubmissionId,
      '',
      'Please keep this ID safe. You will use it to continue your registration, update participant information, upload a CV, or continue to capacity building/job placement.',
      '',
      `Continuation link: ${details.registrationUrl}`,
      '',
      'Regards,',
      'HAPPY Program Team'
    ].join('\n');

    MailApp.sendEmail({
      to: details.email,
      subject,
      body,
      name: 'HAPPY Program'
    });
    return { sent: true, error: '' };
  } catch (err) {
    return { sent: false, error: err.message };
  }
}

function buildRegistrationUrl(token, fallbackBase) {
  const configured = PropertiesService.getScriptProperties().getProperty('REGISTRATION_URL');
  const base = configured || fallbackBase || '../happy-kollekt/index.html';
  return `${base}${base.indexOf('?') >= 0 ? '&' : '?'}token=${encodeURIComponent(token)}`;
}

function getAdminPassword() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
}

function authorizeDriveAccess() {
  const cvFolder = DriveApp.getFolderById(CV_UPLOAD_FOLDER_ID);
  const cvTestFile = cvFolder.createFile(
    Utilities.newBlob('HAPPY Drive authorization test', 'text/plain', 'happy-drive-auth-test.txt')
  );
  cvTestFile.setTrashed(true);
  const signatureFolder = DriveApp.getFolderById(CONSENT_SIGNATURE_FOLDER_ID);
  const signatureTestFile = signatureFolder.createFile(
    Utilities.newBlob('HAPPY consent signature authorization test', 'text/plain', 'happy-signature-drive-auth-test.txt')
  );
  signatureTestFile.setTrashed(true);
  return `Drive write access OK: CV folder ${cvFolder.getName()}, signature folder ${signatureFolder.getName()}`;
}

function authorizeEmailAccess() {
  const userEmail = Session.getActiveUser().getEmail() || Session.getEffectiveUser().getEmail();
  if (!userEmail) return 'Email authorization check completed. Active user email was not available.';
  MailApp.sendEmail({
    to: userEmail,
    subject: 'HAPPY Program email authorization test',
    body: 'This confirms the HAPPY Apps Script project is authorized to send participant ID emails.',
    name: 'HAPPY Program'
  });
  return `Email send access OK. Test email sent to ${userEmail}`;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(JSON_MIME);
}

function javascriptResponse(callback, payload) {
  const safeCallback = String(callback || '').replace(/[^\w.$]/g, '');
  if (!safeCallback) return jsonResponse({ status: 'ERROR', message: 'Invalid callback.' });
  return ContentService.createTextOutput(`${safeCallback}(${JSON.stringify(payload)});`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
