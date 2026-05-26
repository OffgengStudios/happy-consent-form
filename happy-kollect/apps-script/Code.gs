// ─── SPREADSHEET IDs ────────────────────────────────────────────────────────
const KOLLECT_SPREADSHEET_ID = '15wqqAiJIbw6lfzwZFG_fGiklG-jFMCCpQhkaWVtPSzA';

// ─── SHEET NAMES ─────────────────────────────────────────────────────────────
const MASTER_SHEET_NAME              = 'Master';
const AUDIT_SHEET_NAME               = 'Audit_Log';
const SUBMISSION_METADATA_SHEET_NAME = 'Submission Metadata';
const PARTICIPANT_INFO_SHEET_NAME    = 'Participant Information';
const CAPACITY_BUILDING_SHEET_NAME   = 'Capacity Building / Training';
const JOB_PLACEMENT_SHEET_NAME       = 'Job Placement';

// ─── OTHER CONSTANTS ─────────────────────────────────────────────────────────
const PARTICIPANT_PREFIX = 'HAPPY-2026-';
const CV_UPLOAD_FOLDER   = '1WEqqBy9AvnzMAkd6dJBXeaO_IqnO1bSc';
const BACKEND_VERSION    = '2026-05-25-kollect-only';
const JSON_MIME          = ContentService.MimeType.JSON;

// ─── HEADERS ─────────────────────────────────────────────────────────────────
const MASTER_HEADERS = [
  'participantId', 'continuationTokenHash', 'continuationTokenCreatedAt',
  'consentStatus', 'consentSubmittedAt', 'consentSubmissionId',
  'consentName', 'consentPhone', 'consentEmail',
  'consentEmailSent', 'consentEmailSentAt', 'consentEmailSendError',
  'consentVenue', 'consentSignatureFileUrl', 'consentSignatureFileId', 'consentSignatureFileName',
  'participantInfoStatus', 'capacityBuildingStatus', 'jobPlacementStatus',
  'currentStage', 'lockedSections', 'cvStatus',
  'cvUploadedAt', 'cvFileUrl', 'cvFileId', 'cvDecisionAt', 'cvTemplateFolderAccessed',
  'lastUpdatedAt', 'lastUpdatedBy', 'createdAt', 'createdBy',
  'submissionId', 'localQueueId', 'syncStatus', 'collectorName', 'deviceId', 'submissionTimestamp',
  'hamisId', 'onboardingDate', 'implementingPartner',
  'region', 'district', 'community', 'locationStatus',
  'surname', 'firstName', 'otherNames', 'sex', 'dob', 'age', 'participantTypeAge',
  'telephone', 'idType', 'ghanaCardId', 'voterId',
  'refugeeStatus', 'nationality', 'displacementStatus', 'displacementReason',
  'originalCommunity', 'hostCommunity', 'disabilityStatus', 'disabilitySpecify',
  'educationLevel', 'employmentStatus', 'currentOccupation',
  'monthlyIncome', 'incomeFrequency', 'sector', 'industry', 'jobType', 'jobRole',
  'workRegion', 'workDistrict', 'workCommunity',
  'trainedByPartner', 'trainingStartDate', 'trainingEndDate', 'trainingLocation',
  'trainingMode', 'virtualPlatform', 'trainerType', 'trainingPartner',
  'completionStatus', 'certificateIssued', 'modules', 'digitalSkills',
  'wishTraining', 'previousTrainings', 'previousTrainingDesc',
  'placedByPartner', 'placementStartDate', 'placementRegion', 'placementDistrict',
  'placementCommunity', 'plSector', 'plIndustry', 'plJobType', 'plJobRole',
  'employmentType', 'employmentCategory', 'placementIncome', 'placementIncomeFreq',
  'employerName', 'contractType', 'workHours',
  'currentlyEmployed', 'currentEmployer', 'currentJobRoleAlt', 'currentIncomeAlt',
  'hasCv', 'cvUploadName', 'cvUploadType', 'cvUploadSize',
  'participantPhoneNormalized', 'participantEmailNormalized', 'ghanaCardNormalized', 'adminNotes',
  'legacyParticipantId'
];

const AUDIT_HEADERS = [
  'auditId', 'timestamp', 'participantId', 'actorType', 'actor',
  'action', 'section', 'notes'
];

const SUBMISSION_METADATA_HEADERS = [
  'SUBMISSION ID', 'COLLECTOR NAME', 'DEVICE ID', 'SUBMISSION TIMESTAMP'
];

const PARTICIPANT_INFO_HEADERS = [
  'PARTICIPANT ID', 'HAMIS ID', 'ONBOARDING DATE', 'IMPLEMENTING PARTNER',
  'REGION', 'DISTRICT', 'COMMUNITY', 'LOCATION STATUS',
  'SURNAME', 'FIRST NAME', 'OTHER NAMES', 'SEX', 'DOB', 'AGE', 'PARTICIPANT TYPE AGE',
  'TELEPHONE', 'ID TYPE', 'GHANA CARD ID', 'VOTER ID',
  'REFUGEE STATUS', 'NATIONALITY', 'DISPLACEMENT STATUS', 'DISPLACEMENT REASON',
  'ORIGINAL COMMUNITY', 'HOST COMMUNITY', 'DISABILITY STATUS', 'DISABILITY SPECIFY',
  'EDUCATION LEVEL', 'EMPLOYMENT STATUS', 'CURRENT OCCUPATION',
  'MONTHLY INCOME', 'INCOME FREQUENCY', 'SECTOR', 'INDUSTRY', 'JOB TYPE', 'JOB ROLE',
  'WORK REGION', 'WORK DISTRICT'
];

const CAPACITY_BUILDING_HEADERS = [
  'PARTICIPANT ID', 'SUBMISSION ID',
  'TRAINING START DATE', 'TRAINING END DATE', 'TRAINING LOCATION', 'TRAINING MODE',
  'VIRTUAL PLATFORM', 'TRAINER TYPE', 'TRAINING PARTNER', 'COMPLETION STATUS',
  'CERTIFICATE ISSUED', 'MODULES', 'DIGITAL SKILLS', 'WISH TRAINING',
  'PREVIOUS TRAININGS', 'PREVIOUS TRAINING DESC'
];

const JOB_PLACEMENT_HEADERS = [
  'PARTICIPANT ID', 'SUBMISSION ID',
  'PLACED BY PARTNER', 'PLACEMENT START DATE', 'PLACEMENT REGION', 'PLACEMENT DISTRICT',
  'PLACEMENT COMMUNITY', 'SECTOR', 'INDUSTRY', 'JOB TYPE', 'JOB ROLE',
  'EMPLOYMENT TYPE', 'EMPLOYMENT CATEGORY', 'PLACEMENT INCOME', 'PLACEMENT INCOME FREQ',
  'EMPLOYER NAME', 'CONTRACT TYPE', 'WORK HOURS', 'CURRENTLY EMPLOYED',
  'CURRENT EMPLOYER', 'CURRENT JOB ROLE', 'CURRENT INCOME'
];

const CAPACITY_FIELDS = [
  'trainedByPartner', 'trainingStartDate', 'trainingEndDate', 'trainingLocation',
  'trainingMode', 'virtualPlatform', 'trainerType', 'trainingPartner',
  'completionStatus', 'certificateIssued', 'modules', 'digitalSkills',
  'wishTraining', 'previousTrainings', 'previousTrainingDesc'
];

const PLACEMENT_FIELDS = [
  'placedByPartner', 'placementStartDate', 'placementRegion', 'placementDistrict',
  'placementCommunity', 'plSector', 'plIndustry', 'plJobType', 'plJobRole',
  'employmentType', 'employmentCategory', 'placementIncome', 'placementIncomeFreq',
  'employerName', 'contractType', 'workHours',
  'currentlyEmployed', 'currentEmployer', 'currentJobRoleAlt', 'currentIncomeAlt'
];

// ─── ROUTING ─────────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action  = payload.action || 'saveParticipantInfo';

    if (action === 'getParticipantByToken')  return jsonResponse(getParticipantByToken(payload.token));
    if (action === 'getParticipantById')     return jsonResponse(getParticipantById(payload.participantId));
    if (action === 'saveParticipantInfo')    return jsonResponse(saveParticipantInfo(payload));
    if (action === 'submitCapacityBuilding') return jsonResponse(saveParticipantInfo(payload, 'capacity'));
    if (action === 'submitJobPlacement')     return jsonResponse(saveParticipantInfo(payload, 'placement'));
    if (action === 'updateCvStatus')         return jsonResponse(updateCvStatus(payload));
    if (action === 'adminUpdateParticipant') return jsonResponse(adminUpdateParticipant(payload));
    if (action === 'getSheetData')           return jsonResponse(getProtectedSheetData(payload.adminPassword, payload.sheetName));
    if (action === 'getReportStats')         return jsonResponse(getReportStats());
    if (action === 'refreshDashboard')       return jsonResponse(refreshDashboard(payload.adminPassword));
    if (action === 'importFromSheet')        return jsonResponse(importFromSheet(payload));

    throw new Error('Unsupported action: ' + action);
  } catch (err) {
    return jsonResponse({ status: 'ERROR', message: err.message });
  }
}

function doGet(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    const cb = p.callback || '';
    let result;

    if (p.action === 'getParticipantByToken') result = getParticipantByToken(p.token);
    else if (p.action === 'getParticipantById') result = getParticipantById(p.participantId);
    else if (p.action === 'getReportStats')   result = getReportStats();
    else if (p.action === 'getSheetData')     result = getProtectedSheetData(p.adminPassword, p.sheetName);
    else result = { status: 'OK', version: BACKEND_VERSION };

    return cb ? jsonpResponse(cb, result) : jsonResponse(result);
  } catch (err) {
    return jsonResponse({ status: 'ERROR', message: err.message });
  }
}

// ─── PARTICIPANT LOOKUP ───────────────────────────────────────────────────────
function getParticipantByToken(token) {
  if (!token) throw new Error('Missing token.');
  const master  = getMasterSheet();
  const headers = ensureHeaders(master, MASTER_HEADERS);
  const row     = findParticipantRow(master, headers, { tokenHash: hashValue(token) });
  if (row < 1) throw new Error('Participant not found for this link.');
  const participant = rowToObject(headers, master.getRange(row, 1, 1, headers.length).getValues()[0]);
  participant.continuationTokenHash = '';
  // Map consent fields → registration fields for participants not yet registered
  if (!participant.telephone) participant.telephone = participant.consentPhone || '';
  if (!participant.surname && !participant.firstName && participant.consentName) {
    const parts = participant.consentName.trim().split(/\s+/);
    participant.surname   = parts[0] || '';
    participant.firstName = parts.slice(1).join(' ') || '';
  }
  return { status: 'OK', participant };
}

function getParticipantById(participantId) {
  if (!participantId) throw new Error('Missing participant ID.');
  const master  = getMasterSheet();
  const headers = ensureHeaders(master, MASTER_HEADERS);
  const row     = findParticipantRow(master, headers, { participantId });
  if (row < 1) throw new Error('Participant not found.');
  const participant = rowToObject(headers, master.getRange(row, 1, 1, headers.length).getValues()[0]);
  participant.continuationTokenHash = '';
  return { status: 'OK', participant };
}

// ─── SAVE PARTICIPANT INFO ────────────────────────────────────────────────────
function saveParticipantInfo(payload, explicitSection) {
  const accessMode = payload.accessMode || '';

  // Capacity building via ?mode=capacity does NOT require admin password
  const isCapacityMode = (accessMode === 'capacity-new' || accessMode === 'capacity-existing');

  // Job placement and explicit capacity (admin-only) require password
  if (!isCapacityMode && (explicitSection === 'capacity' || explicitSection === 'placement')) {
    const pwd = getAdminPassword();
    if (!pwd || payload.adminPassword !== pwd) {
      throw new Error('Admin password required for this action.');
    }
  }

  const master  = getMasterSheet();
  const headers = ensureHeaders(master, MASTER_HEADERS);
  const now     = new Date().toISOString();
  const phone   = normalizePhone(payload.telephone || payload.consentPhone || payload.phone);
  const email   = normalizeEmail(payload.email || payload.consentEmail);
  const ghanaCard = normalizeGhanaCard(payload.ghanaCardId);
  const tokenHash = payload.token ? hashValue(payload.token) : '';

  let rowIndex = findParticipantRow(master, headers, {
    participantId: payload.participantId,
    tokenHash,
    phone,
    email,
    ghanaCard
  });

  const isNew     = rowIndex < 1;
  const existing  = isNew ? {} : rowToObject(headers, master.getRange(rowIndex, 1, 1, headers.length).getValues()[0]);
  const participantId = existing.participantId || payload.participantId || generateParticipantId(master, headers);

  // Build the fields to write — scoped to the section being submitted
  const incoming = pickKnownFields(payload, headers);
  scopeToSection(incoming, explicitSection, accessMode, existing);

  const capacityStatus  = resolveCapacityStatus(existing, incoming, explicitSection, accessMode);
  const placementStatus = resolvePlacementStatus(existing, incoming, explicitSection);
  const lockedSections  = buildLockedSections(capacityStatus, placementStatus);

  const record = Object.assign(blankRecord(headers), existing, incoming, {
    participantId,
    continuationTokenHash:     existing.continuationTokenHash || tokenHash,
    participantInfoStatus:     'submitted',
    capacityBuildingStatus:    capacityStatus,
    jobPlacementStatus:        placementStatus,
    currentStage:              resolveStage(capacityStatus, placementStatus),
    lockedSections,
    lastUpdatedAt:             now,
    lastUpdatedBy:             payload.collectorName || payload.actor || 'participant',
    createdAt:                 existing.createdAt || now,
    createdBy:                 existing.createdBy || 'kollect',
    syncStatus:                payload.syncStatus || 'synced',
    participantPhoneNormalized: explicitSection ? (existing.participantPhoneNormalized || '') : phone,
    participantEmailNormalized: explicitSection ? (existing.participantEmailNormalized || '') : email,
    ghanaCardNormalized:        explicitSection ? (existing.ghanaCardNormalized || '') : ghanaCard
  });

  if (isNew) {
    master.appendRow(headers.map(h => toSheetValue(record[h] || '')));
    rowIndex = master.getLastRow();
  } else {
    updateRow(master, headers, rowIndex, record);
  }

  // Write to the data collection tabs
  appendRegistrationData(record, explicitSection, accessMode);

  appendAudit({
    participantId,
    actorType: payload.actorType || 'participant',
    actor:     payload.collectorName || payload.actor || 'participant',
    action:    isNew ? 'createParticipant' : 'updateParticipant',
    section:   explicitSection || accessMode || 'participantInfo',
    notes:     lockedSections ? 'Locked: ' + lockedSections : ''
  });

  return {
    status:                'OK',
    participantId,
    duplicate:             !isNew,
    capacityBuildingStatus: capacityStatus,
    jobPlacementStatus:    placementStatus,
    lockedSections
  };
}

// ─── SECTION SCOPING ─────────────────────────────────────────────────────────
function scopeToSection(incoming, explicitSection, accessMode, existing) {
  if (accessMode === 'capacity-new') {
    // New participant via capacity mode: Participant Info + Capacity Building, no Job Placement
    PLACEMENT_FIELDS.forEach(f => delete incoming[f]);
    return;
  }
  if (accessMode === 'capacity-existing' || explicitSection === 'capacity') {
    // Existing participant adding Capacity Building only
    PLACEMENT_FIELDS.forEach(f => delete incoming[f]);
    const capacitySet = new Set(CAPACITY_FIELDS);
    Object.keys(incoming).forEach(k => {
      if (!capacitySet.has(k) && !['submissionId','collectorName','deviceId','submissionTimestamp'].includes(k)) {
        if (existing[k] !== undefined) incoming[k] = existing[k];
      }
    });
    return;
  }
  if (explicitSection === 'placement') {
    CAPACITY_FIELDS.forEach(f => delete incoming[f]);
    const placementSet = new Set(PLACEMENT_FIELDS);
    Object.keys(incoming).forEach(k => {
      if (!placementSet.has(k) && !['submissionId','collectorName','deviceId','submissionTimestamp'].includes(k)) {
        if (existing[k] !== undefined) incoming[k] = existing[k];
      }
    });
    return;
  }
  // Default: Participant Info only — strip capacity and placement fields
  CAPACITY_FIELDS.forEach(f => delete incoming[f]);
  PLACEMENT_FIELDS.forEach(f => delete incoming[f]);
}

// ─── APPEND TO DATA TABS ──────────────────────────────────────────────────────
function appendRegistrationData(record, explicitSection, accessMode) {
  try {
    appendSubmissionMetadata(record);
    if (accessMode === 'capacity-new') {
      appendParticipantInfo(record);
      appendCapacityBuilding(record);
    } else if (accessMode === 'capacity-existing' || explicitSection === 'capacity') {
      appendCapacityBuilding(record);
    } else if (explicitSection === 'placement') {
      appendJobPlacement(record);
    } else {
      appendParticipantInfo(record);
    }
  } catch (err) {
    appendAudit({ action: 'appendRegistrationDataFailed', section: 'data', notes: err.message });
  }
}

function appendSubmissionMetadata(record) {
  const sheet = getOrCreateSheet(SUBMISSION_METADATA_SHEET_NAME, SUBMISSION_METADATA_HEADERS);
  sheet.appendRow([
    record.submissionId        || '',
    record.collectorName       || '',
    record.deviceId            || '',
    record.submissionTimestamp || ''
  ]);
}

function appendParticipantInfo(record) {
  const sheet = getOrCreateSheet(PARTICIPANT_INFO_SHEET_NAME, PARTICIPANT_INFO_HEADERS);
  sheet.appendRow([
    record.participantId      || '',
    record.hamisId            || '',
    record.onboardingDate     || '',
    record.implementingPartner || '',
    record.region             || '',
    record.district           || '',
    record.community          || '',
    record.locationStatus     || '',
    record.surname            || '',
    record.firstName          || '',
    record.otherNames         || '',
    record.sex                || '',
    record.dob                || '',
    record.age                || '',
    record.participantTypeAge || '',
    record.telephone          || '',
    record.idType             || '',
    record.ghanaCardId        || '',
    record.voterId            || '',
    record.refugeeStatus      || '',
    record.nationality        || '',
    record.displacementStatus || '',
    record.displacementReason || '',
    record.originalCommunity  || '',
    record.hostCommunity      || '',
    record.disabilityStatus   || '',
    record.disabilitySpecify  || '',
    record.educationLevel     || '',
    record.employmentStatus   || '',
    record.currentOccupation  || '',
    record.monthlyIncome      || '',
    record.incomeFrequency    || '',
    record.sector             || '',
    record.industry           || '',
    record.jobType            || '',
    record.jobRole            || '',
    record.workRegion         || '',
    record.workDistrict       || ''
  ]);
}

function appendCapacityBuilding(record) {
  const sheet = getOrCreateSheet(CAPACITY_BUILDING_SHEET_NAME, CAPACITY_BUILDING_HEADERS);
  sheet.appendRow([
    record.participantId       || '',
    record.submissionId        || '',
    record.trainingStartDate   || '',
    record.trainingEndDate     || '',
    record.trainingLocation    || '',
    record.trainingMode        || '',
    record.virtualPlatform     || '',
    record.trainerType         || '',
    record.trainingPartner     || '',
    record.completionStatus    || '',
    record.certificateIssued   || '',
    record.modules             || '',
    record.digitalSkills       || '',
    record.wishTraining        || '',
    record.previousTrainings   || '',
    record.previousTrainingDesc || ''
  ]);
}

function appendJobPlacement(record) {
  const sheet = getOrCreateSheet(JOB_PLACEMENT_SHEET_NAME, JOB_PLACEMENT_HEADERS);
  sheet.appendRow([
    record.participantId      || '',
    record.submissionId       || '',
    record.placedByPartner    || '',
    record.placementStartDate || '',
    record.placementRegion    || '',
    record.placementDistrict  || '',
    record.placementCommunity || '',
    record.plSector           || '',
    record.plIndustry         || '',
    record.plJobType          || '',
    record.plJobRole          || '',
    record.employmentType     || '',
    record.employmentCategory || '',
    record.placementIncome    || '',
    record.placementIncomeFreq || '',
    record.employerName       || '',
    record.contractType       || '',
    record.workHours          || '',
    record.currentlyEmployed  || '',
    record.currentEmployer    || '',
    record.currentJobRoleAlt  || '',
    record.currentIncomeAlt   || ''
  ]);
}

// ─── CV STATUS ───────────────────────────────────────────────────────────────
function updateCvStatus(payload) {
  const master  = getMasterSheet();
  const headers = ensureHeaders(master, MASTER_HEADERS);
  const row     = findParticipantRow(master, headers, {
    participantId: payload.participantId,
    tokenHash: payload.token ? hashValue(payload.token) : ''
  });
  if (row < 1) throw new Error('Participant not found for CV update.');

  const now      = new Date().toISOString();
  const existing = rowToObject(headers, master.getRange(row, 1, 1, headers.length).getValues()[0]);
  let storedFile = null;
  if (payload.cvUploadDataUrl) storedFile = saveCvFileToDrive(payload, payload.participantId);
  const clearFile = payload.hasCv === 'No' || payload.cvStatus === 'no_cv';

  const update = {
    cvStatus:               payload.cvStatus || (payload.hasCv === 'Yes' ? 'cv_uploaded' : 'no_cv'),
    hasCv:                  payload.hasCv || '',
    cvUploadedAt:           payload.hasCv === 'Yes' ? now : '',
    cvUploadName:           payload.cvUploadName || '',
    cvUploadType:           payload.cvUploadType || '',
    cvUploadSize:           payload.cvUploadSize || '',
    cvFileUrl:              storedFile ? storedFile.url : (clearFile ? '' : existing.cvFileUrl),
    cvFileId:               storedFile ? storedFile.id  : (clearFile ? '' : existing.cvFileId),
    cvDecisionAt:           now,
    cvTemplateFolderAccessed: payload.cvTemplateFolderAccessed || '',
    lastUpdatedAt:          now,
    lastUpdatedBy:          payload.actor || 'participant'
  };
  updateRow(master, headers, row, update);

  appendAudit({
    participantId: payload.participantId,
    actorType: 'participant',
    actor:     payload.actor || 'participant',
    action:    'updateCvStatus',
    section:   'cv',
    notes:     update.cvStatus
  });

  return { status: 'OK', participantId: payload.participantId, cvStatus: update.cvStatus };
}

function saveCvFileToDrive(payload, participantId) {
  const match = String(payload.cvUploadDataUrl || '').match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error('Invalid CV file payload.');
  const mimeType = payload.cvUploadType || match[1];
  const bytes    = Utilities.base64Decode(match[2]);
  const safeName = sanitizeFileName(payload.cvUploadName || 'participant-cv');
  const fileName = `${participantId}_${new Date().toISOString().replace(/[:.]/g, '-')}_${safeName}`;
  const blob     = Utilities.newBlob(bytes, mimeType, fileName);
  const folder   = DriveApp.getFolderById(CV_UPLOAD_FOLDER);
  const file     = folder.createFile(blob);
  return { id: file.getId(), url: file.getUrl() };
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function adminUpdateParticipant(payload) {
  const pwd = getAdminPassword();
  if (!pwd || payload.adminPassword !== pwd) throw new Error('Incorrect admin password.');
  const master  = getMasterSheet();
  const headers = ensureHeaders(master, MASTER_HEADERS);
  const row     = findParticipantRow(master, headers, { participantId: payload.participantId });
  if (row < 1) throw new Error('Participant not found.');
  const updates = pickKnownFields(payload.updates || {}, headers);
  updates.lastUpdatedAt = new Date().toISOString();
  updates.lastUpdatedBy = payload.actor || 'admin';
  updateRow(master, headers, row, updates);
  appendAudit({
    participantId: payload.participantId,
    actorType: 'staff',
    actor:     payload.actor || 'admin',
    action:    'adminUpdateParticipant',
    section:   payload.section || 'admin',
    notes:     Object.keys(updates).join(', ')
  });
  return { status: 'OK', participantId: payload.participantId };
}

function getProtectedSheetData(password, sheetName) {
  const pwd = getAdminPassword();
  if (!pwd) return { status: 'ERROR', message: 'Admin password not configured.' };
  if (password !== pwd) return { status: 'ERROR', message: 'Incorrect password.' };
  const master  = getMasterSheet();
  const headers = ensureHeaders(master, MASTER_HEADERS);
  return { status: 'OK', data: getRecords(master, headers) };
}

function getReportStats() {
  const master  = getMasterSheet();
  const headers = ensureHeaders(master, MASTER_HEADERS);
  const records = getRecords(master, headers);
  return {
    status: 'OK',
    stats: {
      total:                   records.length,
      consentComplete:         countWhere(records, 'consentStatus', 'complete'),
      registrationSubmitted:   countWhere(records, 'participantInfoStatus', 'submitted'),
      capacitySubmitted:       countWhere(records, 'capacityBuildingStatus', 'submitted'),
      placementSubmitted:      countWhere(records, 'jobPlacementStatus', 'submitted'),
      noCv:                    countWhere(records, 'cvStatus', 'no_cv'),
      cvUploaded:              countWhere(records, 'cvStatus', 'cv_uploaded')
    }
  };
}

function refreshDashboard(password) {
  const pwd = getAdminPassword();
  if (!pwd || password !== pwd) throw new Error('Incorrect admin password.');
  const ss      = SpreadsheetApp.openById(KOLLECT_SPREADSHEET_ID);
  const sheet   = ss.getSheetByName('Dashboard') || ss.insertSheet('Dashboard');
  const stats   = getReportStats().stats;
  const master  = getMasterSheet();
  const headers = ensureHeaders(master, MASTER_HEADERS);
  const records = getRecords(master, headers);

  sheet.clear();
  const rows = [
    ['HAPPY Lifecycle Dashboard', ''],
    ['Last refreshed', new Date()],
    ['', ''],
    ['Total participants',          stats.total],
    ['Consent complete',            stats.consentComplete],
    ['Registration submitted',      stats.registrationSubmitted],
    ['Capacity building submitted', stats.capacitySubmitted],
    ['Job placement submitted',     stats.placementSubmitted],
    ['No CV',                       stats.noCv],
    ['CV uploaded',                 stats.cvUploaded],
    ['', ''],
    ['Female',                      countWhere(records, 'sex', 'Female')],
    ['Male',                        countWhere(records, 'sex', 'Male')],
    ['Youth (15-35)',                countYouth(records)],
    ['PWD',                         countWhere(records, 'disabilityStatus', 'Yes')],
    ['Refugee',                     countWhere(records, 'refugeeStatus', 'Yes')]
  ];
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.autoResizeColumns(1, 2);
  return { status: 'OK', stats };
}

// ─── BULK IMPORT ──────────────────────────────────────────────────────────────
const SOURCE_TO_MASTER = {
  'HAMIS ID': 'hamisId', 'Onboarding Date': 'onboardingDate',
  'Implementing Partner (or Sub-Partner)': 'implementingPartner',
  'Region': 'region', 'District': 'district', 'Community': 'community',
  'Location Status': 'locationStatus', 'Surname': 'surname', 'First Name': 'firstName',
  'Other Name(s)': 'otherNames', 'Sex': 'sex', 'Date of Birth': 'dob',
  'Age': 'age', 'Participant Type - Age': 'participantTypeAge',
  'Telephone': 'telephone', 'Ghana Card ID Number': 'ghanaCardId',
  "Voter's ID Number": 'voterId', 'Refugee Status': 'refugeeStatus',
  'Nationality (If "Yes" to Refugee)': 'nationality',
  'Disability Status': 'disabilityStatus', 'Specify Disability': 'disabilitySpecify',
  'Education Level': 'educationLevel', 'Employment Status': 'employmentStatus',
  'Occupation': 'currentOccupation', 'Monthly Income': 'monthlyIncome',
  'Organization': 'employerName', 'Sector': 'sector', 'Job Role': 'jobRole'
};

function importFromSheet(payload) {
  const pwd = getAdminPassword();
  if (!pwd || payload.adminPassword !== pwd) throw new Error('Admin access required.');
  const sourceId  = payload.sourceSpreadsheetId;
  const sourceGid = payload.sourceSheetGid !== undefined ? Number(payload.sourceSheetGid) : 0;
  if (!sourceId) throw new Error('sourceSpreadsheetId is required.');

  const sourceSS    = SpreadsheetApp.openById(sourceId);
  const sourceSheet = sourceSS.getSheets().find(s => s.getSheetId() === sourceGid) || sourceSS.getSheets()[0];
  if (sourceSheet.getLastRow() < 2) return { status: 'OK', imported: 0, skipped: 0, message: 'No data rows.' };

  const lastCol      = sourceSheet.getLastColumn();
  const srcHeaders   = sourceSheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const srcRows      = sourceSheet.getRange(2, 1, sourceSheet.getLastRow() - 1, lastCol).getValues();
  const master       = getMasterSheet();
  const masterHeaders = ensureHeaders(master, MASTER_HEADERS);
  const now          = new Date().toISOString();
  let imported = 0, skipped = 0;
  const errors = [];

  for (let r = 0; r < srcRows.length; r++) {
    const row = srcRows[r];
    if (row.every(c => !String(c).trim())) continue;
    try {
      const incoming = {};
      srcHeaders.forEach((h, i) => {
        const key = SOURCE_TO_MASTER[String(h).trim()];
        if (key) incoming[key] = String(row[i] || '').trim();
      });
      if (row[0]) incoming.legacyParticipantId = String(row[0]).trim();
      const phone     = normalizePhone(incoming.telephone);
      const ghanaCard = normalizeGhanaCard(incoming.ghanaCardId);
      if (findParticipantRow(master, masterHeaders, { phone, ghanaCard }) > 0) { skipped++; continue; }
      const participantId = generateParticipantId(master, masterHeaders);
      const record        = blankRecord(masterHeaders);
      Object.assign(record, incoming, {
        participantId,
        consentStatus:          'complete',
        participantInfoStatus:  'submitted',
        capacityBuildingStatus: 'not_started',
        jobPlacementStatus:     'not_started',
        currentStage:           'registration_complete',
        cvStatus:               'not_started',
        syncStatus:             'synced',
        participantPhoneNormalized: phone,
        ghanaCardNormalized:    ghanaCard,
        lastUpdatedAt:          now,
        lastUpdatedBy:          payload.actor || 'bulk_import',
        createdAt:              now,
        createdBy:              'bulk_import'
      });
      master.appendRow(masterHeaders.map(h => toSheetValue(record[h] || '')));
      imported++;
    } catch (err) {
      errors.push('Row ' + (r + 2) + ': ' + err.message);
    }
  }
  return { status: 'OK', imported, skipped, errors, message: `Imported ${imported}, skipped ${skipped}.` };
}

// ─── MASTER & SHEET HELPERS ───────────────────────────────────────────────────
function getMasterSheet() {
  const ss    = SpreadsheetApp.openById(KOLLECT_SPREADSHEET_ID);
  const sheet = ss.getSheetByName(MASTER_SHEET_NAME) || ss.insertSheet(MASTER_SHEET_NAME);
  ensureHeaders(sheet, MASTER_HEADERS);
  return sheet;
}

function getOrCreateSheet(name, headers) {
  const ss    = SpreadsheetApp.openById(KOLLECT_SPREADSHEET_ID);
  let sheet   = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  ensureHeaders(sheet, headers);
  return sheet;
}

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
    if (criteria.tokenHash     && r[idx.continuationTokenHash]      === criteria.tokenHash)     return i + 2;
    if (criteria.participantId && r[idx.participantId]              === criteria.participantId) return i + 2;
    if (criteria.ghanaCard     && r[idx.ghanaCardNormalized]        === criteria.ghanaCard)     return i + 2;
    if (criteria.phone         && r[idx.participantPhoneNormalized] === criteria.phone)         return i + 2;
    if (criteria.email         && criteria.email && r[idx.participantEmailNormalized] === criteria.email) return i + 2;
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

function getRecords(sheet, headers) {
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length)
    .getValues()
    .map(row => rowToObject(headers, row))
    .filter(row => Object.values(row).some(Boolean));
}

function pickKnownFields(payload, headers) {
  const picked = {};
  headers.forEach(h => { if (Object.prototype.hasOwnProperty.call(payload, h)) picked[h] = payload[h]; });
  return picked;
}

function toSheetValue(v) {
  if (typeof v !== 'string') return v;
  return /^[=+\-@]/.test(v) ? `'${v}` : v;
}

function fromSheetValue(v) {
  return typeof v === 'string' && v.startsWith("'") ? v.slice(1) : v;
}

// ─── STATUS HELPERS ───────────────────────────────────────────────────────────
function resolveCapacityStatus(existing, incoming, explicitSection, accessMode) {
  if (existing.capacityBuildingStatus === 'submitted') return 'submitted';
  if (explicitSection === 'capacity' || accessMode === 'capacity-existing' || accessMode === 'capacity-new') return 'submitted';
  return existing.capacityBuildingStatus || 'not_started';
}

function resolvePlacementStatus(existing, incoming, explicitSection) {
  if (existing.jobPlacementStatus === 'submitted') return 'submitted';
  if (explicitSection === 'placement') return 'submitted';
  return existing.jobPlacementStatus || 'not_started';
}

function buildLockedSections(capacityStatus, placementStatus) {
  const locked = [];
  if (capacityStatus === 'submitted')  locked.push('capacityBuilding');
  if (placementStatus === 'submitted') locked.push('jobPlacement');
  return locked.join(',');
}

function resolveStage(capacityStatus, placementStatus) {
  if (placementStatus === 'submitted')  return 'placement_complete';
  if (capacityStatus === 'submitted')   return 'capacity_complete';
  return 'registration_complete';
}

function countWhere(records, field, value) {
  return records.filter(r => r[field] === value).length;
}

function countYouth(records) {
  return records.filter(r => { const a = Number(r.age); return !isNaN(a) && a >= 15 && a <= 35; }).length;
}

// ─── STRING UTILITIES ────────────────────────────────────────────────────────
function hashValue(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(value || ''))
    .map(b => ('0' + (b < 0 ? b + 256 : b).toString(16)).slice(-2))
    .join('');
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

function normalizeGhanaCard(value) {
  return String(value || '').trim().toUpperCase().replace(/\s+/g, '');
}

function sanitizeFileName(value) {
  return String(value || 'file')
    .replace(/[\\/:*?"<>|#%{}~&]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120) || 'file';
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function getAdminPassword() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
}

// ─── RESPONSE ────────────────────────────────────────────────────────────────
function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(JSON_MIME);
}

function jsonpResponse(callback, payload) {
  const safe = String(callback || '').replace(/[^\w.$]/g, '');
  if (!safe) return jsonResponse({ status: 'ERROR', message: 'Invalid callback.' });
  return ContentService.createTextOutput(safe + '(' + JSON.stringify(payload) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// ─── DRIVE AUTH HELPER ────────────────────────────────────────────────────────
function authorizeDriveAccess() {
  const folder = DriveApp.getFolderById(CV_UPLOAD_FOLDER);
  const test   = folder.createFile(Utilities.newBlob('auth-test', 'text/plain', 'auth-test.txt'));
  test.setTrashed(true);
  return 'Drive access OK: ' + folder.getName();
}
