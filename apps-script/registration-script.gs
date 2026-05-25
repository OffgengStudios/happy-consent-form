// ===== HAPPY PROGRAM — REGISTRATION BACKEND =====
// Deploy this script from spreadsheet: 15wqqAiJIbw6lfzwZFG_fGiklG-jFMCCpQhkaWVtPSzA
// Handles registration, capacity building, job placement, CV, admin, and bulk import.

const SPREADSHEET_ID = '15wqqAiJIbw6lfzwZFG_fGiklG-jFMCCpQhkaWVtPSzA';
const MASTER_SHEET_NAME = 'Master';
const AUDIT_SHEET_NAME = 'Audit_Log';
const CV_RESULTS_SHEET_NAME = 'CV_Parse_Results';
const CV_UPLOAD_FOLDER_ID = '1WEqqBy9AvnzMAkd6dJBXeaO_IqnO1bSc';
const JSON_MIME = ContentService.MimeType.JSON;
const PARTICIPANT_PREFIX = 'HAPPY-2026-';
const BACKEND_VERSION = '2026-05-25-split';

const LIFECYCLE_HEADERS = [
  'participantId', 'legacyParticipantId', 'continuationTokenHash',
  'continuationTokenCreatedAt', 'consentStatus', 'consentSubmittedAt',
  'consentName', 'consentPhone', 'consentEmail', 'consentVenue',
  'participantInfoStatus', 'capacityBuildingStatus', 'jobPlacementStatus',
  'currentStage', 'lockedSections', 'cvStatus', 'cvUploadedAt', 'cvFileUrl',
  'cvFileId', 'cvParserCandidateId', 'cvParsedAt', 'cvTemplateFolderAccessed',
  'lastUpdatedAt', 'lastUpdatedBy', 'createdAt', 'createdBy'
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

// ===== ROUTING =====

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(20000);
  try {
    const payload = parsePayload(e);
    const action = payload.action || 'saveParticipantInfo';
    if (action === 'getParticipantByToken') return jsonResponse(getParticipantByToken(payload.token));
    if (action === 'getParticipantById') return jsonResponse(getParticipantById(payload.participantId));
    if (action === 'saveParticipantInfo') return jsonResponse(saveParticipantInfo(payload));
    if (action === 'submitCapacityBuilding') return jsonResponse(saveParticipantInfo(payload, 'capacity'));
    if (action === 'submitJobPlacement') return jsonResponse(saveParticipantInfo(payload, 'placement'));
    if (action === 'updateCvStatus') return jsonResponse(updateCvStatus(payload));
    if (action === 'adminUpdateParticipant') return jsonResponse(adminUpdateParticipant(payload));
    if (action === 'getSheetData') return jsonResponse(getProtectedSheetData(payload.adminPassword));
    if (action === 'getReportStats') return jsonResponse(getReportStats());
    if (action === 'refreshDashboard') return jsonResponse(refreshDashboardReport(payload.adminPassword));
    if (action === 'importFromSheet') return jsonResponse(importFromSheet(payload));
    throw new Error('Unsupported action: ' + action);
  } catch (err) {
    return jsonResponse({ status: 'ERROR', message: err.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const callback = params.callback || '';
    let result;
    if (params.action === 'getParticipantByToken') result = getParticipantByToken(params.token);
    else if (params.action === 'getParticipantById') result = getParticipantById(params.participantId);
    else if (params.action === 'getStats') result = getReportStats();
    else if (params.action === 'getSheetData') result = getProtectedSheetData(params.adminPassword);
    else result = { status: 'OK', message: 'HAPPY Registration backend is running.', version: BACKEND_VERSION };
    return callback ? javascriptResponse(callback, result) : jsonResponse(result);
  } catch (err) {
    return jsonResponse({ status: 'ERROR', message: err.message });
  }
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) throw new Error('No POST body received.');
  return JSON.parse(e.postData.contents);
}

// ===== PARTICIPANT LOOKUP =====

function getParticipantByToken(token) {
  if (!token) throw new Error('Missing continuation token.');
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const rowIndex = findParticipantRow(sheet, headers, { tokenHash: hashValue(token) });
  if (rowIndex < 1) throw new Error('Participant not found for this continuation link.');
  const participant = rowToObject(headers, sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0]);
  participant.continuationTokenHash = '';
  return { status: 'OK', participant, row: rowIndex };
}

function getParticipantById(participantId) {
  if (!participantId) throw new Error('Missing participant ID.');
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const rowIndex = findParticipantRow(sheet, headers, { participantId });
  if (rowIndex < 1) throw new Error('Participant not found for this ID.');
  const participant = rowToObject(headers, sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0]);
  participant.continuationTokenHash = '';
  return { status: 'OK', participant, row: rowIndex };
}

// ===== SAVE PARTICIPANT INFO =====

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
    participantId: payload.participantId, tokenHash, phone, email, ghanaCard,
    localQueueId: payload.localQueueId, submissionId: payload.submissionId
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
    legacyParticipantId: incoming.legacyParticipantId || existing.legacyParticipantId || '',
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
    sheet.appendRow(headers.map(h => toSheetValue(full[h] || '')));
    rowIndex = sheet.getLastRow();
  } else {
    updateRow(sheet, headers, rowIndex, record);
  }
  appendAudit({
    participantId, actorType: payload.actorType || 'participant',
    actor: payload.actor || payload.collectorName || 'participant',
    action: isNew ? 'createRegistration' : 'updateRegistration',
    section: explicitSection || 'registration', source: 'happy-kollekt',
    notes: blockedSections.length ? 'Blocked: ' + blockedSections.join(',') : (lockedSections ? 'Locked: ' + lockedSections : '')
  });
  return { status: 'OK', duplicate: !isNew, participantId, referenceId: participantId, row: rowIndex, capacityBuildingStatus: capacityStatus, jobPlacementStatus: placementStatus, lockedSections, blockedSections };
}

// ===== CV STATUS =====

function updateCvStatus(payload) {
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const rowIndex = findParticipantRow(sheet, headers, {
    participantId: payload.participantId,
    tokenHash: payload.token ? hashValue(payload.token) : ''
  });
  if (rowIndex < 1) throw new Error('Participant not found for CV update.');
  const now = new Date().toISOString();
  const existing = rowToObject(headers, sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0]);
  const storedFile = payload.cvUploadDataUrl ? saveCvFileToDrive(payload, payload.participantId) : null;
  const clearFile = payload.hasCv === 'No' || payload.cvStatus === 'no_cv';
  const update = {
    cvStatus: payload.cvStatus || (payload.hasCv === 'Yes' ? 'cv_uploaded' : 'no_cv'),
    hasCv: payload.hasCv || '',
    cvUploadedAt: payload.cvUploadedAt || (payload.hasCv === 'Yes' ? now : ''),
    cvUploadName: payload.cvUploadName || '',
    cvUploadType: payload.cvUploadType || '',
    cvUploadSize: payload.cvUploadSize || '',
    cvFileUrl: storedFile ? storedFile.url : (clearFile ? '' : existing.cvFileUrl),
    cvFileId: storedFile ? storedFile.id : (clearFile ? '' : existing.cvFileId),
    cvUploadDataUrl: '',
    cvDecisionAt: payload.cvDecisionAt || now,
    cvTemplateFolderAccessed: payload.cvTemplateFolderAccessed || '',
    lastUpdatedAt: now, lastUpdatedBy: payload.actor || 'participant'
  };
  updateRow(sheet, headers, rowIndex, update);
  appendAudit({ participantId: payload.participantId, actorType: 'participant', actor: 'participant', action: 'updateCvStatus', section: 'cv', source: 'happy-kollekt', notes: update.cvStatus });
  return { status: 'OK', participantId: payload.participantId, cvStatus: update.cvStatus };
}

// ===== ADMIN =====

function adminUpdateParticipant(payload) {
  const adminPassword = getAdminPassword();
  if (!adminPassword || payload.adminPassword !== adminPassword) throw new Error('Incorrect admin password.');
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const rowIndex = findParticipantRow(sheet, headers, { participantId: payload.participantId });
  if (rowIndex < 1) throw new Error('Participant not found.');
  const updates = pickKnownHeaders(payload.updates || {}, headers);
  updates.lastUpdatedAt = new Date().toISOString();
  updates.lastUpdatedBy = payload.actor || 'admin';
  updateRow(sheet, headers, rowIndex, updates);
  Object.keys(updates).forEach(field => {
    if (field !== 'lastUpdatedAt' && field !== 'lastUpdatedBy') {
      appendAudit({ participantId: payload.participantId, actorType: 'staff', actor: payload.actor || 'admin', action: 'adminUpdateParticipant', section: payload.section || 'admin', field, newValue: updates[field], source: 'happy-kollekt-admin' });
    }
  });
  return { status: 'OK', participantId: payload.participantId, updatedFields: Object.keys(updates) };
}

function getProtectedSheetData(password) {
  const adminPassword = getAdminPassword();
  if (!adminPassword) return { status: 'ERROR', message: 'Admin password is not configured.' };
  if (password !== adminPassword) return { status: 'ERROR', message: 'Incorrect password.' };
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  return { status: 'OK', data: getRecords(sheet, headers) };
}

// ===== REPORTS =====

function getReportStats() {
  const sheet = getMasterSheet();
  const headers = ensureHeaders(sheet, MASTER_HEADERS);
  const records = getRecords(sheet, headers);
  return { status: 'OK', stats: {
    total: records.length,
    consentComplete: countWhere(records, 'consentStatus', 'complete'),
    registrationSubmitted: countWhere(records, 'participantInfoStatus', 'submitted'),
    capacitySubmitted: countWhere(records, 'capacityBuildingStatus', 'submitted'),
    placementSubmitted: countWhere(records, 'jobPlacementStatus', 'submitted'),
    noCv: countWhere(records, 'cvStatus', 'no_cv'),
    cvUploaded: countWhere(records, 'cvStatus', 'cv_uploaded')
  }};
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
    ['HAPPY Lifecycle Dashboard', ''], ['Last refreshed', new Date()], ['', ''],
    ['Core KPIs', ''], ['Total participants', stats.total],
    ['Consent complete', stats.consentComplete], ['Registration submitted', stats.registrationSubmitted],
    ['Capacity building submitted', stats.capacitySubmitted], ['Job placement submitted', stats.placementSubmitted],
    ['No CV', stats.noCv], ['CV uploaded', stats.cvUploaded], ['', ''],
    ['Participant Profile', ''],
    ['Female participants', countWhere(records, 'sex', 'Female')],
    ['Male participants', countWhere(records, 'sex', 'Male')],
    ['Youth 15-35', countYouth(records)],
    ['PWD participants', countWhere(records, 'disabilityStatus', 'Yes')],
    ['Refugee participants', countWhere(records, 'refugeeStatus', 'Yes')], ['', ''],
    ['Operational Scope', ''],
    ['Regions reached', countDistinct(records, 'region')],
    ['Districts reached', countDistinct(records, 'district')],
    ['Communities reached', countDistinct(records, 'community')]
  ];
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.getRange('A1:B1').merge().setFontWeight('bold').setFontSize(14).setBackground('#1e40af').setFontColor('#ffffff');
  sheet.autoResizeColumns(1, 2);
  appendAudit({ actorType: 'staff', actor: 'admin', action: 'refreshDashboard', section: 'reporting', source: 'apps-script', notes: 'Dashboard refreshed' });
  return { status: 'OK', stats };
}

// ===== BULK IMPORT =====

function importFromSheet(payload) {
  const adminPassword = getAdminPassword();
  if (!adminPassword || payload.adminPassword !== adminPassword) throw new Error('Admin access required for bulk import.');
  const sourceId = payload.sourceSpreadsheetId || '1wmEH-iDZVBairol-4COpj1a5dUdHPz7wOfqCCZpWtso';
  const sourceGid = payload.sourceSheetGid !== undefined ? Number(payload.sourceSheetGid) : 0;
  const sourceSS = SpreadsheetApp.openById(sourceId);
  const sourceSheet = sourceSS.getSheets().find(s => s.getSheetId() === sourceGid) || sourceSS.getSheets()[0];
  if (sourceSheet.getLastRow() < 2) return { status: 'OK', imported: 0, skipped: 0, message: 'No data rows found.' };
  const lastCol = sourceSheet.getLastColumn();
  const sourceHeaders = sourceSheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const sourceRows = sourceSheet.getRange(2, 1, sourceSheet.getLastRow() - 1, lastCol).getValues();
  const masterSheet = getMasterSheet();
  const masterHeaders = ensureHeaders(masterSheet, MASTER_HEADERS);
  const now = new Date().toISOString();
  let imported = 0, skipped = 0;
  const errors = [];
  for (let r = 0; r < sourceRows.length; r++) {
    const row = sourceRows[r];
    if (row.every(cell => !String(cell).trim())) continue;
    try {
      const incoming = {};
      sourceHeaders.forEach((h, i) => {
        const key = SOURCE_TO_MASTER[String(h).trim()];
        if (key) incoming[key] = String(row[i] || '').trim();
      });
      if (row[0]) incoming.legacyParticipantId = String(row[0]).trim();
      const phone = normalizePhone(incoming.telephone);
      const ghanaCard = normalizeGhanaCard(incoming.ghanaCardId);
      if (findParticipantRow(masterSheet, masterHeaders, { phone, ghanaCard }) > 0) { skipped++; continue; }
      const participantId = generateParticipantId(masterSheet, masterHeaders);
      const record = blankRecord(masterHeaders);
      Object.assign(record, incoming, {
        participantId, consentStatus: 'complete', participantInfoStatus: 'submitted',
        capacityBuildingStatus: 'not_started', jobPlacementStatus: 'not_started',
        currentStage: 'registration_complete', lockedSections: '', cvStatus: 'not_started',
        syncStatus: 'synced', participantPhoneNormalized: phone, ghanaCardNormalized: ghanaCard,
        lastUpdatedAt: now, lastUpdatedBy: payload.actor || 'bulk_import',
        createdAt: now, createdBy: 'bulk_import'
      });
      masterSheet.appendRow(masterHeaders.map(h => toSheetValue(record[h] || '')));
      appendAudit({ participantId, actorType: 'staff', actor: payload.actor || 'admin', action: 'bulkImport', section: 'registration', source: 'import-tool', notes: 'Legacy ID: ' + (incoming.legacyParticipantId || '') });
      imported++;
    } catch (err) { errors.push('Row ' + (r + 2) + ': ' + err.message); }
  }
  return { status: 'OK', imported, skipped, errors, message: 'Imported ' + imported + ' records. Skipped ' + skipped + ' duplicates.' + (errors.length ? ' ' + errors.length + ' errors.' : '') };
}

function runBulkImport() {
  const result = importFromSheet({ adminPassword: getAdminPassword(), sourceSpreadsheetId: '1wmEH-iDZVBairol-4COpj1a5dUdHPz7wOfqCCZpWtso', sourceSheetGid: 0, actor: 'admin' });
  Logger.log(JSON.stringify(result));
  return result;
}

// ===== SHEET HELPERS =====

function getMasterSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(MASTER_SHEET_NAME) || ss.insertSheet(MASTER_SHEET_NAME);
  ensureHeaders(sheet, MASTER_HEADERS);
  return sheet;
}

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  ensureHeaders(sheet, headers);
  return sheet;
}

function ensureHeaders(sheet, desired) {
  const lastCol = Math.max(sheet.getLastColumn(), desired ? desired.length : 1);
  let headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].filter(Boolean);
  if (!headers.length && desired) {
    headers = desired;
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    return headers;
  }
  if (desired) {
    const missing = desired.filter(h => !headers.includes(h));
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
  const idx = {};
  headers.forEach((h, i) => idx[h] = i);
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (criteria.tokenHash && row[idx.continuationTokenHash] === criteria.tokenHash) return i + 2;
    if (criteria.participantId && row[idx.participantId] === criteria.participantId) return i + 2;
    if (criteria.localQueueId && idx.localQueueId >= 0 && row[idx.localQueueId] === criteria.localQueueId) return i + 2;
    if (criteria.submissionId && idx.submissionId >= 0 && row[idx.submissionId] === criteria.submissionId) return i + 2;
    if (criteria.ghanaCard && row[idx.ghanaCardNormalized] === criteria.ghanaCard) return i + 2;
    if (criteria.phone && row[idx.participantPhoneNormalized] === criteria.phone) return i + 2;
    if (criteria.email && row[idx.participantEmailNormalized] === criteria.email) return i + 2;
  }
  return -1;
}

function generateParticipantId(sheet, headers) {
  const idCol = headers.indexOf('participantId');
  let max = 0;
  if (sheet.getLastRow() >= 2 && idCol >= 0) {
    const ids = sheet.getRange(2, idCol + 1, sheet.getLastRow() - 1, 1).getValues().flat();
    ids.forEach(id => { const m = String(id || '').match(/^HAPPY-2026-(\d+)$/); if (m) max = Math.max(max, Number(m[1])); });
  }
  return PARTICIPANT_PREFIX + String(max + 1).padStart(6, '0');
}

function updateRow(sheet, headers, rowIndex, values) {
  const existing = rowToObject(headers, sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0]);
  const merged = Object.assign({}, existing, values);
  sheet.getRange(rowIndex, 1, 1, headers.length).setValues([headers.map(h => toSheetValue(merged[h] || ''))]);
}

function appendAudit(entry) {
  const sheet = getOrCreateSheet(AUDIT_SHEET_NAME, AUDIT_HEADERS);
  const headers = ensureHeaders(sheet, AUDIT_HEADERS);
  const record = blankRecord(headers);
  Object.assign(record, { auditId: Utilities.getUuid(), timestamp: new Date().toISOString(), participantId: entry.participantId || '', actorType: entry.actorType || '', actor: entry.actor || '', action: entry.action || '', section: entry.section || '', field: entry.field || '', oldValue: entry.oldValue || '', newValue: entry.newValue || '', source: entry.source || '', notes: entry.notes || '' });
  sheet.appendRow(headers.map(h => toSheetValue(record[h] || '')));
}

function pickKnownHeaders(payload, headers) {
  const picked = {};
  headers.forEach(h => { if (Object.prototype.hasOwnProperty.call(payload, h)) picked[h] = payload[h]; });
  return picked;
}

function blankRecord(headers) {
  const r = {}; headers.forEach(h => r[h] = ''); return r;
}

function rowToObject(headers, row) {
  const o = {}; headers.forEach((h, i) => o[h] = fromSheetValue(row[i] || '')); return o;
}

function getRecords(sheet, headers) {
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues().map(row => rowToObject(headers, row)).filter(row => Object.values(row).some(Boolean));
}

// ===== SECTION LOGIC =====

function enforceSectionScope(incoming, explicitSection, existing) {
  if (explicitSection === 'capacity') { preserveSectionFields(incoming, CAPACITY_BUILDING_FIELDS, existing); removeFields(incoming, JOB_PLACEMENT_FIELDS); return; }
  if (explicitSection === 'placement') { preserveSectionFields(incoming, JOB_PLACEMENT_FIELDS, existing); removeFields(incoming, CAPACITY_BUILDING_FIELDS); return; }
  removeFields(incoming, CAPACITY_BUILDING_FIELDS);
  removeFields(incoming, JOB_PLACEMENT_FIELDS);
}

function preserveSectionFields(incoming, allowed, existing) {
  const set = new Set(allowed);
  REGISTRATION_HEADERS.forEach(h => { if (!set.has(h)) delete incoming[h]; });
  if (existing && existing.participantInfoStatus) incoming.participantInfoStatus = existing.participantInfoStatus;
}

function normalizeParticipantInfoDefaults(incoming, explicitSection) {
  if (explicitSection) return;
  incoming.disabilityStatus = normalizeYesNo(incoming.disabilityStatus, 'No');
  if (incoming.disabilityStatus !== 'Yes') incoming.disabilitySpecify = '';
}

function normalizeYesNo(value, fallback) {
  const v = String(value || '').trim().toLowerCase();
  if (v === 'yes') return 'Yes';
  if (v === 'no') return 'No';
  return fallback;
}

function enforceParticipantLocks(existing, incoming) {
  const blocked = [];
  if (existing.capacityBuildingStatus === 'submitted') { removeFields(incoming, CAPACITY_BUILDING_FIELDS); blocked.push('capacityBuilding'); }
  if (existing.jobPlacementStatus === 'submitted') { removeFields(incoming, JOB_PLACEMENT_FIELDS); blocked.push('jobPlacement'); }
  return blocked;
}

function removeFields(incoming, fields) {
  fields.forEach(f => { if (Object.prototype.hasOwnProperty.call(incoming, f)) delete incoming[f]; });
}

function resolveCapacityStatus(existing, incoming, section) {
  if (existing.capacityBuildingStatus === 'submitted') return 'submitted';
  if (section === 'capacity') return 'submitted';
  if (incoming.trainedByPartner === 'Yes') return 'submitted';
  return existing.capacityBuildingStatus || 'not_started';
}

function resolvePlacementStatus(existing, incoming, section) {
  if (existing.jobPlacementStatus === 'submitted') return 'submitted';
  if (section === 'placement') return 'submitted';
  if (incoming.placedByPartner === 'Yes') return 'submitted';
  return existing.jobPlacementStatus || 'not_started';
}

function buildLockedSections(capacityStatus, placementStatus) {
  const locked = [];
  if (capacityStatus === 'submitted') locked.push('capacityBuilding');
  if (placementStatus === 'submitted') locked.push('jobPlacement');
  return locked.join(',');
}

function resolveCurrentStage(capacityStatus, placementStatus) {
  if (placementStatus === 'submitted') return 'placement_complete';
  if (capacityStatus === 'submitted') return 'capacity_complete';
  return 'registration_complete';
}

// ===== CV DRIVE =====

function saveCvFileToDrive(payload, participantId) {
  const match = String(payload.cvUploadDataUrl || '').match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error('Invalid CV file payload.');
  const mimeType = payload.cvUploadType || match[1] || 'application/octet-stream';
  const bytes = Utilities.base64Decode(match[2]);
  const safeName = String(payload.cvUploadName || 'participant-cv').replace(/[\\/:*?"<>|#%{}~&]/g, '-').trim().slice(0, 120) || 'participant-cv';
  const datedName = participantId + '_' + new Date().toISOString().replace(/[:.]/g, '-') + '_' + safeName;
  const blob = Utilities.newBlob(bytes, mimeType, datedName);
  const file = DriveApp.getFolderById(CV_UPLOAD_FOLDER_ID).createFile(blob);
  return { id: file.getId(), url: file.getUrl() };
}

// ===== STATS HELPERS =====

function countWhere(records, field, value) { return records.filter(r => r[field] === value).length; }
function countDistinct(records, field) { const v = {}; records.forEach(r => { const s = String(r[field] || '').trim(); if (s) v[s] = true; }); return Object.keys(v).length; }
function countYouth(records) { return records.filter(r => { const a = Number(r.age); return !isNaN(a) && a >= 15 && a <= 35; }).length; }

// ===== UTILITIES =====

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

function normalizeEmail(value) { return String(value || '').trim().toLowerCase(); }
function normalizeGhanaCard(value) { return String(value || '').trim().toUpperCase().replace(/\s+/g, ''); }

function toSheetValue(value) {
  if (typeof value !== 'string') return value;
  if (/^[=+\-@]/.test(value)) return "'" + value;
  return value;
}

function fromSheetValue(value) {
  if (typeof value === 'string' && value.startsWith("'")) return value.slice(1);
  return value;
}

function getAdminPassword() { return PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD'); }

function jsonResponse(payload) { return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(JSON_MIME); }

function javascriptResponse(callback, payload) {
  const safe = String(callback || '').replace(/[^\w.$]/g, '');
  if (!safe) return jsonResponse({ status: 'ERROR', message: 'Invalid callback.' });
  return ContentService.createTextOutput(safe + '(' + JSON.stringify(payload) + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
}
