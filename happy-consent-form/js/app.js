// ===== CONFIGURATION =====
const CONFIG = {
  API_ENDPOINT: 'https://script.google.com/macros/s/AKfycbwAnymRCItipYfY66c96mrSRdJE_r2x84J7caU3LmdxRcUgUgmQTOOAe7jdbxm1UgJB/exec',
  CV_TEMPLATE_FOLDER_URL: 'https://drive.google.com/drive/folders/1Pybxl_uIF0v-gSewDlSntp5QXpvnfUfO',
  MAX_CV_UPLOAD_BYTES: 5 * 1024 * 1024,
  QUEUE_KEY: 'happy_pending_submissions',
  LOCAL_DB_KEY: 'happy_db',
  DEVICE_ID_KEY: 'happyDeviceId',
  PARTNER_PREFIXES: { 'Jobberman':'JOB', 'Agrico':'AGR', 'YouthEmpower':'YOU', 'SkillsGH':'SKI', 'Other':'OTH' },
  // Ghana Regions & Districts (16 regions, 260+ districts)
  REGIONS: {
    "Greater Accra": ["Accra Metropolitan", "Tema", "Adenta", "Ashaiman", "Ga East", "Ga West", "Ga South", "Ga Central", "La Dade-Kotopon", "Ledzokuku", "Krowor", "Ayawaso West", "Ayawaso East", "Ayawaso North", "Okaikwei North", "Ablekuma North", "Ablekuma Central", "Ablekuma West", "Korle Klottey", "Adabraka", "Osu Klottey", "Ningo-Prampram", "Shai-Osudoku", "Ada East", "Ada West", "Weija-Gbawe", "Kpone-Katamanso"],
    "Ashanti": ["Kumasi Metropolitan", "Obuasi Municipal", "Ejisu", "Bekwai", "Mampong", "Agona", "Asokore Mampong", "Suame", "Bantama", "Subin", "Oforikrom", "Old Tafo", "Kwadaso", "Nhyiaeso", "Atwima Kwanwoma", "Atwima Nwabiagya", "Afigya Kwabre North", "Afigya Kwabre South", "Asante Akim Central", "Asante Akim North", "Asante Akim South", "Bosome Freho", "Bosomtwe", "Ejura Sekyedumase", "Juaben", "Kwabre East", "Offinso Municipal", "Offinso North", "Sekyere Central", "Sekyere East", "Sekyere South", "Sekyere Afram Plains", "Adansi North", "Adansi South", "Amansie Central", "Amansie West", "Ahafo Ano North", "Ahafo Ano South"],
    "Eastern": ["Koforidua", "Akropong", "Nkawkaw", "Mpraeso", "Aburi", "Kibi", "Akim Oda", "Asamankese", "Somanya", "Kade", "Begoro", "Donkorkrom", "Akim Swedru", "Asuogyaman", "Atiwa East", "Atiwa West", "Ayensuano", "Birim Central", "Birim North", "Birim South", "Denkyembour", "Fanteakwa North", "Fanteakwa South", "Kwaebibirem", "Kwahu Afram Plains North", "Kwahu Afram Plains South", "Kwahu East", "Kwahu South", "Kwahu West", "Lower Manya Krobo", "New Juaben North", "New Juaben South", "Nsawam Adoagyiri", "Okere", "Suhum", "Upper Manya Krobo", "Upper West Akim", "Yilo Krobo"],
    "Volta": ["Ho", "Keta", "Hohoe", "Kpando", "Aflao", "Sogakope", "Dzodze", "Adaklu", "Afadzato South", "Agotime-Ziope", "Akatsi North", "Akatsi South", "Anloga", "Central Tongu", "Ho West", "Ketu North", "Ketu South", "North Dayi", "North Tongu", "South Dayi", "South Tongu"],
    "Northern": ["Tamale", "Yendi", "Savelugu", "Tolon", "Kumbungu", "Nanton", "Gushegu", "Karaga", "Saboba", "Zabzugu", "Tatale-Sanguli", "Mion", "Nanumba North", "Nanumba South", "Kpandai"],
    "North East": ["Nalerigu", "Walewale", "Gambaga", "Bunkpurugu", "Yunyoo", "Chereponi"],
    "Upper West": ["Wa", "Lawra", "Nadowli", "Jirapa", "Lambussie", "Nandom", "Sissala East", "Sissala West", "Wa East", "Wa West", "Daffiama-Bussie-Issa"],
    "Upper East": ["Bolgatanga", "Bawku", "Navrongo", "Zebilla", "Paga", "Binduri", "Bongo", "Builsa North", "Builsa South", "Garu", "Kassena-Nankana East", "Kassena-Nankana West", "Nabdam", "Pusiga", "Talensi", "Tempane"],
    "Oti": ["Dambai", "Jasikan", "Kadjebi", "Krachi", "Nkwanta", "Biakoye", "Guan", "Krachi East", "Krachi Nchumuru", "Krachi West", "Nkwanta North", "Nkwanta South"],
    "Bono": ["Sunyani", "Berekum", "Dormaa", "Wenchi", "Techiman", "Nkoranza", "Kintampo", "Atebubu", "Sene", "Pru", "Tain", "Banda", "Jaman North", "Jaman South", "Berekum East", "Berekum West", "Dormaa Central", "Dormaa East", "Dormaa West"],
    "Bono East": ["Techiman Municipal", "Techiman North", "Nkoranza North", "Nkoranza South", "Kintampo North", "Kintampo South", "Atebubu-Amantin", "Pru East", "Pru West", "Sene East", "Sene West"],
    "Ahafo": ["Goaso", "Bechem", "Duayaw Nkwanta", "Hwidiem", "Kenyasi", "Mim", "Asunafo North", "Asunafo South", "Asutifi North", "Asutifi South", "Tano North", "Tano South"],
    "Savannah": ["Damongo", "Bole", "Sawla", "Salaga", "Buipe", "Daboya", "Larabanga", "Mole", "Central Gonja", "East Gonja", "North East Gonja", "North Gonja", "West Gonja", "Sawla-Tuna-Kalba"],
    "Western": ["Sekondi-Takoradi", "Tarkwa", "Prestea", "Bogoso", "Axim", "Elubo", "Half Assini", "Ahanta West", "Effia-Kwesimintsim", "Ellembelle", "Jomoro", "Mpohor", "Nzema East", "Prestea-Huni Valley", "Shama", "Tarkwa-Nsuaem", "Wassa Amenfi Central", "Wassa Amenfi East", "Wassa Amenfi West", "Wassa East"],
    "Western North": ["Sefwi Wiawso", "Bibiani", "Juaboso", "Bodi", "Aowin", "Bia East", "Bia West", "Bibiani-Anhwiaso-Bekwai", "Sefwi Akontombra", "Suaman"],
    "Central": ["Cape Coast", "Winneba", "Kasoa", "Swedru", "Dunkwa", "Elmina", "Moree", "Abura-Asebu-Kwamankese", "Agona East", "Agona West", "Ajumako-Enyan-Essiam", "Asikuma-Odoben-Brakwa", "Assin Central", "Assin North", "Assin South", "Awutu Senya", "Awutu Senya East", "Effutu", "Ekumfi", "Gomoa Central", "Gomoa East", "Gomoa West", "Komenda-Edina-Eguafo-Abrem", "Mfantsiman", "Twifo-Atti Morkwa", "Twifo Hemang Lower Denkyira", "Upper Denkyira East", "Upper Denkyira West"]
  },
  // Sector → Industry → Job Role cascade (expanded from your Excel)
  SECTOR_DATA: {
    "Agriculture": {
      "Crop Farming": ["Farm Manager", "Agronomist", "Soil Scientist", "Irrigation Specialist", "Plant Breeder", "Crop Scout", "Seed Technologist", "Precision Ag Specialist", "Agricultural Engineer", "Horticulturalist", "Entomologist", "Farm Laborer", "Tractor Operator", "Combine Operator", "Irrigation Technician", "Storekeeper", "Driver", "Security Guard", "Gardener", "Accountant", "Bookkeeper", "Farm Administrator", "Purchasing Agent", "Sales Rep", "Inventory Clerk", "HR Officer", "Compliance Officer"],
      "Livestock": ["Ranch Manager", "Veterinary Surgeon", "Animal Nutritionist", "AI Technician", "Livestock Geneticist", "Animal Health Inspector", "Herdsman", "Poultry Attendant", "Milker", "Stable Hand", "Feed Mill Operator", "Livestock Hauler", "Security Guard", "Sanitation Crew", "Accountant", "Procurement Officer", "HR Coordinator", "Logistics Coordinator", "Sales Manager"],
      "Aquaculture": ["Fish Farm Manager", "Marine Biologist", "Aquaculturist", "Water Quality Technician", "Fish Pathologist", "RAS Specialist", "Fisheries Ecologist", "Algae Technician", "Pond Attendant", "Cage Technician", "Net Repairer", "Fish Feeder", "Trawler Deckhand", "Aquaculture Plumber", "Security Guard", "Office Cleaner", "Accountant", "Exports Officer", "HR Generalist", "Supply Chain Officer"],
      "Forestry": ["Forest Manager", "Forester", "Forest Ranger", "Silviculturist", "Timber Cruiser", "Log Grader", "Arborist", "Fire Management Officer", "Chainsaw Operator", "Skidder Operator", "Tree Climber", "Choker Setter", "Logging Truck Driver", "Security Guard", "Accountant", "Permitting Specialist", "HR Officer", "Land Rights Coordinator", "HSE Manager"]
    },
    "Non-Agriculture": {
      "Mining & Extractive": ["Mine Manager", "Petroleum Engineer", "Reservoir Engineer", "Drilling Engineer", "Geologist", "Geophysicist", "Metallurgist", "Mine Surveyor", "Ventilation Officer", "Blasting Engineer", "Environmental Coordinator", "Roustabout", "Roughneck", "Derrickhand", "Heavy Equipment Operator", "Drill Rig Operator", "Crusher Operator", "Maintenance Mechanic", "Security Guard", "Accountant", "Procurement Manager", "HR Business Partner", "Logistics Coordinator", "Regulatory Officer"],
      "Manufacturing": ["Factory Manager", "Production Manager", "QA Manager", "Food Technologist", "Product Developer", "Lab Technician", "QC Inspector", "Brewmaster", "Industrial Baker", "Machine Engineer", "Machine Operator", "Packaging Hand", "Warehouse Loader", "Delivery Driver", "Sanitation Worker", "Accountant", "Purchasing Officer", "Supply Chain Coordinator", "HR Officer", "Compliance Officer"],
      "Construction": ["Project Manager", "Site Manager", "Civil Engineer", "Structural Engineer", "Quantity Surveyor", "Architect", "BIM Coordinator", "Land Surveyor", "Safety Officer", "CAD Technician", "Bricklayer", "Carpenter", "Electrician", "Plumber", "Crane Operator", "Scaffolder", "Painter", "Tipper Driver", "Site Security", "Post-Construction Cleaner", "Construction Accountant", "Contract Administrator", "Document Controller", "HR Manager", "Procurement Officer"],
      "ICT & Digital": ["CTO", "IT Project Manager", "Product Manager", "Software Engineer", "Full-stack Developer", "Mobile Developer", "UI/UX Designer", "Data Scientist", "Cybersecurity Specialist", "Cloud Architect", "Systems Admin", "AI/ML Engineer", "Network Engineer", "IT Helpdesk", "Hardware Repairer", "Data Entry", "CCTV Installer", "Office Cleaner", "IT Accountant", "Digital Marketing Manager", "Content Strategist", "IT Recruiter", "Technical Writer"],
      "Financial Services": ["Branch Manager", "Operations Manager", "Credit Manager", "Loan Officer", "Credit Analyst", "Relationship Manager", "Risk Officer", "Mobile Money Coordinator", "Bank Teller", "Cashier", "Bullion Driver", "Armed Security", "Office Cleaner", "Accountant", "Data Entry Clerk", "HR Officer", "Customer Service Executive"],
      "Healthcare": ["Hospital Administrator", "Medical Director", "Nursing Superintendent", "Medical Doctor", "Registered Nurse", "Pharmacist", "Lab Scientist", "Radiographer", "Physiotherapist", "Biomedical Engineer", "Ward Assistant", "Pharmacy Technician", "Ambulance Driver", "Hospital Security", "Sanitation Officer", "Gardener", "Medical Accountant", "Records Officer", "HR Manager", "Insurance Coordinator", "Medical Secretary"],
      "Education": ["Principal", "Registrar", "Dean", "Director of Studies", "Teacher", "Lecturer", "Curriculum Developer", "Educational Psychologist", "Librarian", "Lab Technician", "Teaching Assistant", "School Nurse", "Bus Driver", "Security Guard", "Janitor", "Gardener", "School Accountant", "Admissions Officer", "HR Manager", "Exams Officer", "School Secretary"],
      "Hospitality & Tourism": ["Hotel GM", "Front Office Manager", "Executive Housekeeper", "F&B Manager", "Event Planner", "Revenue Manager", "Maintenance Engineer", "IT Specialist", "Front Desk", "Bellhop", "Room Attendant", "Laundry Worker", "Security", "Gardener", "Shuttle Driver", "Hotel Accountant", "Reservations Agent", "HR Manager", "Night Auditor"],
      "Retail & Trade": ["Store Manager", "Floor Manager", "Merchandise Manager", "Branch Manager", "Regional Director", "Visual Merchandiser", "Buyer", "Pricing Analyst", "Loss Prevention", "E-commerce Specialist", "Sales Associate", "Cashier", "Shelf Stocker", "Warehouse Picker", "Delivery Driver", "Security Guard", "Store Cleaner", "Retail Accountant", "Inventory Manager", "Procurement Officer", "HR Coordinator", "Customer Service Manager"],
      "Logistics & Transport": ["Fleet Manager", "Logistics Director", "Warehouse Manager", "Supply Chain Manager", "Port Manager", "Logistics Analyst", "Route Optimizer", "Transport Safety Officer", "WMS Admin", "Customs Broker", "Freight Forwarder", "HGV Driver", "Forklift Operator", "Courier", "Loader", "Fleet Mechanic", "Warehouse Security", "Facility Cleaner", "Logistics Accountant", "Documentation Specialist", "Dispatcher", "HR Specialist", "Cargo Coordinator"]
    }
  }
};

// ===== STATE =====
let formState = {
  collectorName: '', deviceId: '', regionCounter: {}, globalSequence: 0, isSubmitting: false, isSyncing: false, isAdmin: false, adminPassword: '',
  token: '', participant: null, lockedSections: new Set(), entryMode: '', selectedContinuationStage: '', consentSigned: false, consentDrawing: false, consentContext: null,
  pendingAdminView: 'sheet', pendingAdminContinuationStage: '', masterSheetData: [], currentView: 'form', sheetRefreshTimer: null, isSheetLoading: false
};

const CAPACITY_FIELD_IDS = [
  'trainingStartDate', 'trainingEndDate', 'trainingLocation', 'trainingMode',
  'virtualPlatform', 'trainerType', 'trainingPartner', 'completionStatus',
  'certificateIssued', 'wishTraining', 'previousTrainings', 'previousTrainingDesc'
];

const PLACEMENT_FIELD_IDS = [
  'placementStartDate', 'placementRegion', 'placementDistrict', 'placementCommunity',
  'plSector', 'plIndustry', 'plJobType', 'plJobRole', 'employmentType',
  'employmentCategory', 'placementIncome', 'placementIncomeFreq', 'employerName',
  'contractType', 'workHours', 'currentlyEmployed', 'currentEmployer',
  'currentJobRoleAlt', 'currentIncomeAlt'
];

const ADMIN_SECTION_PAYLOAD_KEYS = [
  'trainedByPartner', 'trainingStartDate', 'trainingEndDate', 'trainingLocation',
  'trainingMode', 'virtualPlatform', 'trainerType', 'trainingPartner',
  'completionStatus', 'certificateIssued', 'modules', 'digitalSkills',
  'wishTraining', 'previousTrainings', 'previousTrainingDesc',
  'placedByPartner', 'placementStartDate', 'placementRegion', 'placementDistrict',
  'placementCommunity', 'plSector', 'plIndustry', 'plJobType', 'plJobRole',
  'employmentType', 'employmentCategory', 'placementIncome', 'placementIncomeFreq',
  'employerName', 'contractType', 'workHours', 'currentlyEmployed',
  'currentEmployer', 'currentJobRoleAlt', 'currentIncomeAlt'
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeForm();
  setupEventListeners();
  updatePartnerDisplays();
  syncPendingSubmissions();
  initializeConsentStep();
});

function initializeForm() {
  document.getElementById('onboardingDate').valueAsDate = new Date();
  formState.deviceId = generateDeviceId();
  document.getElementById('deviceId').value = formState.deviceId;
  populateRegions();
  const saved = localStorage.getItem('happyCollector');
  if (saved) {
    document.getElementById('collectorName').value = saved;
    formState.collectorName = saved;
    updateCollectorDisplays(saved);
  }
  updateSyncPanel();
  updateOnlineStatus();
  updateIds();
  handleIdTypeChange();
  toggleBaselineEmploymentFields();
  toggleCapacityFields(document.querySelector('input[name="tr_check"]:checked')?.value === 'Yes');
  togglePlacementFields(document.querySelector('input[name="pl_check"]:checked')?.value === 'Yes');
  applyWorkflowMode();
  initializeContinuation();
}

function setupEventListeners() {
  const consentForm = document.getElementById('consentForm');
  if (consentForm) consentForm.addEventListener('submit', handleConsentSubmit);
  document.getElementById('collectorName').addEventListener('change', e => {
    formState.collectorName = e.target.value;
    localStorage.setItem('happyCollector', e.target.value);
    updateCollectorDisplays(e.target.value);
  });
  document.getElementById('telephone').addEventListener('blur', e => validatePhone(e.target));
  document.getElementById('ghanaCardId').addEventListener('blur', e => validateGhanaCard(e.target));
  window.addEventListener('online', () => {
    updateOnlineStatus();
    syncPendingSubmissions();
    refreshAdminDataNow();
  });
  window.addEventListener('offline', updateOnlineStatus);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshAdminDataNow();
  });
  // Prevent form submit on Enter in non-textarea fields
  document.getElementById('mainForm').addEventListener('keypress', e => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
  });
  document.getElementById('mainForm').addEventListener('invalid', e => {
    showToast(`Please complete: ${getFieldLabel(e.target)}`, 'error');
  }, true);
}

// ===== VIEW SWITCHING =====
function setView(view) {
  formState.currentView = view;
  document.getElementById('view-form').classList.toggle('hidden', view !== 'form');
  document.getElementById('view-sheet').classList.toggle('hidden', view !== 'sheet');
  document.getElementById('view-report')?.classList.toggle('hidden', view !== 'report');
  document.getElementById('tab-form').classList.toggle('active', view === 'form');
  document.getElementById('tab-sheet').classList.toggle('active', view === 'sheet');
  document.getElementById('tab-report')?.classList.toggle('active', view === 'report');
  updateAdminAutoRefresh();
}

async function initializeContinuation() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token') || '';
  const participantId = params.get('participantId') || '';
  const mode = params.get('mode') || '';
  const entryParticipantInput = document.getElementById('entryParticipantIdInput');
  if (entryParticipantInput && participantId) entryParticipantInput.value = participantId;
  if (!token && !participantId) {
    return;
  }

  if (token) {
    await loadParticipantByToken(token);
  } else {
    await loadParticipantById(participantId);
  }

  if (mode === 'capacity' || mode === 'placement') {
    await continueToStage(mode);
  } else {
    formState.entryMode = 'registration';
    revealParticipantForm();
    showEditNotice();
  }
}

async function loadParticipantByToken(token) {
  const cleanToken = extractContinuationToken(token);
  if (!cleanToken) throw new Error('Missing continuation token.');

  formState.token = cleanToken;
  localStorage.setItem('happyContinuationToken', cleanToken);

  try {
    const result = await apiAction('getParticipantByToken', { token: cleanToken });
    formState.participant = result.participant;
    applyParticipantRecord(result.participant);
    return result.participant;
  } catch (err) {
    console.warn('Continuation load failed:', err);
    throw err;
  }
}

async function loadParticipantById(participantId) {
  const cleanId = String(participantId || '').trim().toUpperCase();
  if (!cleanId) throw new Error('Missing participant ID.');

  const result = await apiAction('getParticipantById', { participantId: cleanId });
  formState.participant = result.participant;
  formState.token = '';
  applyParticipantRecord(result.participant);
  return result.participant;
}

function extractContinuationToken(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  try {
    const url = new URL(raw);
    return url.searchParams.get('token') || raw;
  } catch {
    return raw;
  }
}

function revealParticipantForm() {
  document.getElementById('entryChoiceScreen')?.classList.add('hidden');
  document.getElementById('mainForm')?.classList.remove('hidden');
  applyWorkflowMode();
}

async function startNewParticipant() {
  formState.entryMode = 'registration';
  formState.participant = null;
  formState.token = '';
  showConsentStep();
}

async function continueToStage(stage) {
  if (!formState.isAdmin) {
    formState.pendingAdminContinuationStage = stage;
    showToast('Admin access is required for capacity building and job placement.', 'error');
    showAdminLogin('form');
    return;
  }

  if (formState.selectedContinuationStage !== stage || document.getElementById('entryContinuationBox')?.classList.contains('hidden')) {
    showContinuationInput(stage);
    return;
  }

  await submitSelectedContinuation();
}

function showContinuationInput(stage) {
  formState.selectedContinuationStage = stage;
  const box = document.getElementById('entryContinuationBox');
  const input = document.getElementById('entryParticipantIdInput');
  const button = document.getElementById('entryContinuationBtn');
  box?.classList.remove('hidden');
  if (button) button.textContent = stage === 'capacity' ? 'Continue to Capacity Building' : 'Continue to Job Placement';
  input?.focus();
}

async function submitSelectedContinuation() {
  const stage = formState.selectedContinuationStage || 'capacity';
  const participantInput = document.getElementById('entryParticipantIdInput');
  const participantId = String(participantInput?.value || formState.participant?.participantId || '').trim().toUpperCase();
  if (!participantId) {
    showToast('Enter the participant ID first.', 'error');
    participantInput?.focus();
    return;
  }

  if (!/^HAPPY-\d{4}-\d{6}$/.test(participantId)) {
    showToast('Participant ID must look like HAPPY-2026-000004.', 'error');
    participantInput?.focus();
    return;
  }

  try {
    formState.entryMode = stage;
    if (!formState.participant || formState.participant.participantId !== participantId) {
      await loadParticipantById(participantId);
    }
    revealParticipantForm();
    applyWorkflowMode();
    showEditNotice();
    openStageSection(stage);
  } catch (err) {
    showToast(`Could not load participant: ${err.message}`, 'error');
  }
}

function showConsentStep() {
  document.getElementById('entryChoiceScreen')?.classList.add('hidden');
  document.getElementById('consentStep')?.classList.remove('hidden');
  document.getElementById('mainForm')?.classList.add('hidden');
  setTimeout(setupConsentCanvas, 50);
  document.getElementById('consentVenue')?.focus();
}

function backToEntryChoice() {
  document.getElementById('consentStep')?.classList.add('hidden');
  document.getElementById('mainForm')?.classList.add('hidden');
  document.getElementById('entryChoiceScreen')?.classList.remove('hidden');
  applyWorkflowMode();
}

function applyWorkflowMode() {
  const adminMode = formState.isAdmin;
  const capacityActive = adminMode && formState.entryMode === 'capacity';
  const placementActive = adminMode && formState.entryMode === 'placement';

  document.querySelectorAll('.admin-workflow-card').forEach(card => {
    card.classList.toggle('hidden', !adminMode);
  });

  document.getElementById('submissionSection')?.classList.toggle('hidden', !adminMode);
  document.getElementById('capacitySection')?.classList.toggle('hidden', !capacityActive);
  document.getElementById('placementSection')?.classList.toggle('hidden', !placementActive);

  setSectionControlsDisabled('submissionSection', !adminMode);
  setSectionControlsDisabled('capacitySection', !capacityActive);
  setSectionControlsDisabled('placementSection', !placementActive);
  setAdminSectionFieldsRequired('capacity', capacityActive);
  setAdminSectionFieldsRequired('placement', placementActive);

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.textContent = capacityActive
      ? 'Submit Capacity Building'
      : placementActive
        ? 'Submit Job Placement'
        : 'Submit Participant Information';
  }
}

function setAdminSectionFieldsRequired(section, required) {
  const ids = section === 'capacity' ? CAPACITY_FIELD_IDS : PLACEMENT_FIELD_IDS;
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (required) el.setAttribute('required', 'required');
    else el.removeAttribute('required');
  });
}

function initializeConsentStep() {
  setupConsentCanvas();
  const clearBtn = document.getElementById('clearConsentSig');
  if (clearBtn) clearBtn.addEventListener('click', clearConsentSignature);

  const canvas = document.getElementById('consentSig');
  if (!canvas) return;
  canvas.addEventListener('mousedown', startConsentSignature);
  canvas.addEventListener('mousemove', moveConsentSignature);
  canvas.addEventListener('mouseup', endConsentSignature);
  canvas.addEventListener('mouseleave', endConsentSignature);
  canvas.addEventListener('touchstart', startConsentSignature, { passive: false });
  canvas.addEventListener('touchmove', moveConsentSignature, { passive: false });
  canvas.addEventListener('touchend', endConsentSignature);
  window.addEventListener('resize', setupConsentCanvas);
}

function setupConsentCanvas() {
  const canvas = document.getElementById('consentSig');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width) return;
  const dpr = window.devicePixelRatio || 1;
  const nextWidth = Math.round(rect.width * dpr);
  const nextHeight = Math.round(rect.height * dpr);
  if (canvas.width === nextWidth && canvas.height === nextHeight && formState.consentContext) {
    return;
  }

  const previousSignature = formState.consentSigned && canvas.width && canvas.height
    ? canvas.toDataURL('image/png')
    : '';

  canvas.width = nextWidth;
  canvas.height = nextHeight;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#111827';
  formState.consentContext = ctx;

  if (previousSignature) {
    const image = new Image();
    image.onload = () => ctx.drawImage(image, 0, 0, rect.width, rect.height);
    image.src = previousSignature;
  }
}

function getConsentPoint(event) {
  const canvas = document.getElementById('consentSig');
  const rect = canvas.getBoundingClientRect();
  const source = event.touches?.[0] || event;
  return { x: source.clientX - rect.left, y: source.clientY - rect.top };
}

function startConsentSignature(event) {
  event.preventDefault();
  const ctx = formState.consentContext;
  if (!ctx) return;
  formState.consentDrawing = true;
  formState.consentSigned = true;
  const point = getConsentPoint(event);
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
}

function moveConsentSignature(event) {
  if (!formState.consentDrawing || !formState.consentContext) return;
  event.preventDefault();
  const point = getConsentPoint(event);
  formState.consentContext.lineTo(point.x, point.y);
  formState.consentContext.stroke();
}

function endConsentSignature() {
  if (!formState.consentDrawing) return;
  formState.consentDrawing = false;
  formState.consentContext?.closePath();
}

function clearConsentSignature() {
  const canvas = document.getElementById('consentSig');
  const ctx = formState.consentContext;
  if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  formState.consentSigned = false;
  setConsentStatus('', '');
}

function setConsentStatus(message, type) {
  const status = document.getElementById('consentStatus');
  if (!status) return;
  if (!message) {
    status.className = 'status-bar hidden';
    status.textContent = '';
    return;
  }
  status.className = `status-bar ${type === 'error' ? 'offline' : 'online'}`;
  status.innerHTML = message;
}

async function handleConsentSubmit(event) {
  event.preventDefault();
  if (!navigator.onLine) {
    setConsentStatus('Consent needs internet access. Registration still keeps its offline queue after consent is completed.', 'error');
    return;
  }

  if (!validateConsentFields()) return;

  const button = document.getElementById('consentSubmitBtn');
  const original = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<span class="spinner"></span> Submitting consent...';
  setConsentStatus('Processing consent...', 'success');

  try {
    const canvas = document.getElementById('consentSig');
    const payload = {
      venue: document.getElementById('consentVenue').value.trim(),
      name: document.getElementById('consentName').value.trim(),
      phone: document.getElementById('consentPhone').value.trim(),
      email: document.getElementById('consentEmail').value.trim(),
      consentGiven: true,
      timestamp: new Date().toISOString(),
      signature: canvas.toDataURL('image/png'),
      language: navigator.language || 'en',
      appUrl: window.location.href.split('#')[0].split('?')[0]
    };
    const result = await apiAction('initConsent', payload);
    formState.token = result.token || '';
    if (formState.token) localStorage.setItem('happyContinuationToken', formState.token);
    document.getElementById('participantId').value = result.participantId || '';
    applyConsentToRegistration(payload, result.participantId);
    setConsentStatus(`Consent saved. Participant ID: <strong>${result.participantId}</strong>. Redirecting to Phase 2...`, 'success');
    setTimeout(() => {
      const kollectUrl = result.registrationUrl || `https://murphy-richard.github.io/happy-kollekt/?token=${encodeURIComponent(result.token)}`;
      window.location.href = kollectUrl;
    }, 1500);
  } catch (err) {
    setConsentStatus(`Consent failed: ${err.message}`, 'error');
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
}

function validateConsentFields() {
  const required = ['consentVenue', 'consentName', 'consentPhone'];
  for (const id of required) {
    const field = document.getElementById(id);
    if (!String(field?.value || '').trim()) {
      setConsentStatus(`Please complete: ${getFieldLabel(field)}`, 'error');
      field?.focus();
      return false;
    }
  }
  if (!formState.consentSigned) {
    setConsentStatus('Please sign the consent form.', 'error');
    document.getElementById('consentSig')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  }
  if (!document.getElementById('consentAgree')?.checked) {
    setConsentStatus('Please tick the consent agreement box.', 'error');
    return false;
  }
  return true;
}

function applyConsentToRegistration(payload, participantId) {
  if (participantId) document.getElementById('participantId').value = participantId;
  const parts = String(payload.name || '').trim().split(/\s+/);
  if (parts.length > 1) {
    document.getElementById('firstName').value = parts.slice(0, -1).join(' ');
    document.getElementById('surname').value = parts[parts.length - 1];
  } else {
    document.getElementById('firstName').value = payload.name || '';
  }
  document.getElementById('telephone').value = payload.phone || '';
}

function openStageSection(stage) {
  if (stage === 'capacity') {
    document.querySelectorAll('input[name="tr_check"]').forEach(radio => radio.checked = radio.value === 'Yes');
    toggleCapacityFields(true);
    applySectionLocks();
    scrollToFormSection('capacityFields');
    if (formState.lockedSections.has('capacityBuilding')) showLockedSectionDialog('Capacity building');
    return;
  }

  if (stage === 'placement') {
    document.querySelectorAll('input[name="pl_check"]').forEach(radio => radio.checked = radio.value === 'Yes');
    togglePlacementFields(true);
    applySectionLocks();
    scrollToFormSection('placementFields');
    if (formState.lockedSections.has('jobPlacement')) showLockedSectionDialog('Job placement');
  }
}

function scrollToFormSection(id) {
  const target = document.getElementById(id);
  const section = target?.closest('.form-section') || target;
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function applyParticipantRecord(record) {
  if (!record) return;
  const setValue = (id, value) => {
    const el = document.getElementById(id);
    if (el && value !== undefined && value !== null && String(value) !== '') el.value = value;
  };

  Object.entries(record).forEach(([key, value]) => setValue(key, value));
  hydrateParticipantDependentFields(record);
  hydrateCheckboxGroup('modules', record.modules);
  hydrateCheckboxGroup('digitalSkills', record.digitalSkills);

  if (!record.surname && record.consentName) {
    const parts = String(record.consentName).trim().split(/\s+/);
    setValue('firstName', parts.slice(0, -1).join(' ') || parts[0]);
    setValue('surname', parts.length > 1 ? parts[parts.length - 1] : '');
  }
  if (!record.telephone && record.consentPhone) setValue('telephone', record.consentPhone);
  if (record.participantId) {
    setValue('participantId', record.participantId);
    document.getElementById('participantId').placeholder = record.participantId;
  }

  const locked = String(record.lockedSections || '').split(',').filter(Boolean);
  formState.lockedSections = new Set(locked);
  applySectionLocks();
}

function hydrateParticipantDependentFields(record) {
  if (record.region) {
    setSelectValue('region', record.region);
    populateDistricts('region', 'district');
    setSelectValue('district', record.district);
  }
  if (record.workRegion) {
    setSelectValue('workRegion', record.workRegion);
    populateDistricts('workRegion', 'workDistrict');
    setSelectValue('workDistrict', record.workDistrict);
  }
  if (record.placementRegion) {
    setSelectValue('placementRegion', record.placementRegion);
    populateDistricts('placementRegion', 'placementDistrict');
    setSelectValue('placementDistrict', record.placementDistrict);
  }
  if (record.sector) {
    setSelectValue('sector', record.sector);
    populateIndustries();
    setSelectValue('industry', record.industry);
    populateJobTypes();
    setSelectValue('jobType', record.jobType);
    populateJobRoles();
    setSelectValue('jobRole', record.jobRole);
  }
  if (record.plSector) {
    setSelectValue('plSector', record.plSector);
    populatePlacementIndustries();
    setSelectValue('plIndustry', record.plIndustry);
    populatePlacementJobTypes();
    setSelectValue('plJobType', record.plJobType);
    populatePlacementJobRoles();
    setSelectValue('plJobRole', record.plJobRole);
  }
  toggleRefugeeField();
  toggleDisplacementFields();
  toggleDisabilityField();
  handleIdTypeChange();
  toggleCurrentEmploymentFields();
}

function setSelectValue(id, value) {
  const el = document.getElementById(id);
  if (!el || value === undefined || value === null || String(value) === '') return;
  const stringValue = String(value);
  if (!Array.from(el.options).some(option => option.value === stringValue)) {
    const opt = document.createElement('option');
    opt.value = stringValue;
    opt.textContent = stringValue;
    el.appendChild(opt);
  }
  el.value = stringValue;
}

function hydrateCheckboxGroup(name, value) {
  const selected = String(value || '').split(',').map(item => item.trim()).filter(Boolean);
  if (!selected.length) return;
  document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
    input.checked = selected.includes(input.value);
  });
}

function showEditNotice() {
  const modal = document.getElementById('editNoticeModal');
  if (modal) modal.classList.remove('hidden');
}

function closeEditNotice() {
  const modal = document.getElementById('editNoticeModal');
  if (modal) modal.classList.add('hidden');
}

function showLockedSectionDialog(sectionName) {
  document.getElementById('lockedSectionName').textContent = sectionName;
  document.getElementById('lockedSectionModal').classList.remove('hidden');
}

function closeLockedSectionDialog() {
  document.getElementById('lockedSectionModal').classList.add('hidden');
}

function contactStaffForCorrection() {
  window.location.href = 'mailto:redro@jobberman.com.gh?subject=HAPPY%20Record%20Correction%20Request';
}

function applySectionLocks() {
  const capacityLocked = formState.lockedSections.has('capacityBuilding');
  const placementLocked = formState.lockedSections.has('jobPlacement');
  setSectionControlsDisabled('capacityFields', capacityLocked);
  setSectionControlsDisabled('placementFields', placementLocked);
  markLockedSection('capacityFields', capacityLocked, 'Capacity building');
  markLockedSection('placementFields', placementLocked, 'Job placement');
}

function markLockedSection(sectionId, locked, sectionName) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.classList.toggle('locked-section', locked);
  if (locked && !section.dataset.lockBound) {
    section.addEventListener('click', event => {
      if (event.target.closest('input, select, textarea, button')) {
        event.preventDefault();
        showLockedSectionDialog(sectionName);
      }
    }, true);
    section.dataset.lockBound = 'true';
  }
}

// ===== ADMIN LOGIN =====
function showAdminLogin(targetView = 'sheet') {
  formState.pendingAdminView = targetView === 'report' ? 'report' : 'sheet';
  if (formState.isAdmin) {
    setView(formState.pendingAdminView);
    if (formState.pendingAdminView === 'sheet' || formState.pendingAdminView === 'report') loadSheetData();
    return;
  }
  document.getElementById('adminModal').classList.remove('hidden');
  const password = document.getElementById('adminPassword');
  const toggle = document.getElementById('toggleAdminPassword');
  password.value = '';
  password.type = 'password';
  if (toggle) {
    toggle.setAttribute('aria-label', 'Show password');
    toggle.setAttribute('title', 'Show password');
    toggle.classList.remove('visible');
  }
  password.focus();
}
function closeAdminLogin() {
  document.getElementById('adminModal').classList.add('hidden');
}
function toggleAdminPassword() {
  const password = document.getElementById('adminPassword');
  const toggle = document.getElementById('toggleAdminPassword');
  const isHidden = password.type === 'password';
  password.type = isHidden ? 'text' : 'password';
  if (toggle) {
    toggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    toggle.setAttribute('title', isHidden ? 'Hide password' : 'Show password');
    toggle.classList.toggle('visible', isHidden);
  }
  password.focus();
}
async function verifyAdmin() {
  const pwd = document.getElementById('adminPassword').value;
  if (!pwd) {
    showToast('Enter the Master Sheet password', 'error');
    return;
  }

  try {
    const data = await fetchProtectedSheetData(pwd);
    formState.isAdmin = true;
    formState.adminPassword = pwd;
    formState.masterSheetData = data;
    closeAdminLogin();
    showToast('✅ Admin access granted', 'success');
    renderSheet(data);
    updateKpiDashboard(data);
    applyWorkflowMode();
    if (formState.pendingAdminContinuationStage) {
      const stage = formState.pendingAdminContinuationStage;
      formState.pendingAdminContinuationStage = '';
      formState.pendingAdminView = 'form';
      setView('form');
      continueToStage(stage);
      return;
    }
    setView(formState.pendingAdminView || 'sheet');
  } catch (err) {
    showToast(`❌ ${err.message}`, 'error');
  }
}

// ===== REGION & DISTRICT LOGIC =====
function populateRegions() {
  const selects = ['region', 'workRegion', 'placementRegion'];
  selects.forEach(selId => {
    const sel = document.getElementById(selId);
    if (!sel) return;
    Object.keys(CONFIG.REGIONS).sort().forEach(region => {
      const opt = document.createElement('option');
      opt.value = region; opt.textContent = region;
      sel.appendChild(opt.cloneNode(true));
    });
  });
}
function populateDistricts(regId, distId) {
  const region = document.getElementById(regId).value;
  const dist = document.getElementById(distId);
  dist.innerHTML = '<option value="">Select District</option>';
  if (region && CONFIG.REGIONS[region]) {
    CONFIG.REGIONS[region].sort().forEach(d => {
      const opt = document.createElement('option');
      opt.value = d; opt.textContent = d;
      dist.appendChild(opt);
    });
    dist.disabled = false;
  } else { dist.disabled = true; }
}

// ===== CASCADE: Sector → Industry → Job Type → Job Role =====
function populateJobTypeOptions(select) {
  select.innerHTML = '<option value="">Select</option>';
  ['Management', 'Technical', 'Administrative', 'Support'].forEach(type => {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    select.appendChild(opt);
  });
  select.disabled = false;
}

function populateIndustries() {
  const sector = document.getElementById('sector').value;
  const indSel = document.getElementById('industry');
  const typeSel = document.getElementById('jobType');
  const roleSel = document.getElementById('jobRole');
  [indSel, typeSel, roleSel].forEach(s => { s.innerHTML = '<option value="">Select</option>'; s.disabled = true; });
  if (sector && CONFIG.SECTOR_DATA[sector]) {
    Object.keys(CONFIG.SECTOR_DATA[sector]).sort().forEach(ind => {
      const opt = document.createElement('option');
      opt.value = ind; opt.textContent = ind;
      indSel.appendChild(opt);
    });
    indSel.disabled = false;
  }
}
function populateJobTypes() {
  const industry = document.getElementById('industry').value;
  const typeSel = document.getElementById('jobType');
  const roleSel = document.getElementById('jobRole');
  roleSel.innerHTML = '<option value="">Select</option>';
  roleSel.disabled = true;

  if (industry) {
    populateJobTypeOptions(typeSel);
  }
}
function populateJobRoles() {
  const sector = document.getElementById('sector').value;
  const industry = document.getElementById('industry').value;
  const jobType = document.getElementById('jobType').value;
  const roleSel = document.getElementById('jobRole');
  roleSel.innerHTML = '<option value="">Select</option>';
  if (sector && industry && jobType && CONFIG.SECTOR_DATA[sector]?.[industry]) {
    CONFIG.SECTOR_DATA[sector][industry].filter(role => classifyJobRole(role) === jobType).forEach(role => {
      const opt = document.createElement('option');
      opt.value = role; opt.textContent = role;
      roleSel.appendChild(opt);
    });
    roleSel.disabled = false;
  }
}
// Placement cascade (separate selectors)
function populatePlacementIndustries() {
  const sector = document.getElementById('plSector').value;
  const indSel = document.getElementById('plIndustry');
  const typeSel = document.getElementById('plJobType');
  const roleSel = document.getElementById('plJobRole');
  [indSel, typeSel, roleSel].forEach(s => { s.innerHTML = '<option value="">Select</option>'; s.disabled = true; });
  if (sector && CONFIG.SECTOR_DATA[sector]) {
    Object.keys(CONFIG.SECTOR_DATA[sector]).sort().forEach(ind => {
      const opt = document.createElement('option');
      opt.value = ind; opt.textContent = ind;
      indSel.appendChild(opt);
    });
    indSel.disabled = false;
  }
}
function populatePlacementJobTypes() {
  const industry = document.getElementById('plIndustry').value;
  const typeSel = document.getElementById('plJobType');
  const roleSel = document.getElementById('plJobRole');
  roleSel.innerHTML = '<option value="">Select</option>';
  roleSel.disabled = true;

  if (industry) {
    populateJobTypeOptions(typeSel);
  }
}
function populatePlacementJobRoles() {
  const sector = document.getElementById('plSector').value;
  const industry = document.getElementById('plIndustry').value;
  const jobType = document.getElementById('plJobType').value;
  const roleSel = document.getElementById('plJobRole');
  roleSel.innerHTML = '<option value="">Select</option>';
  if (sector && industry && jobType && CONFIG.SECTOR_DATA[sector]?.[industry]) {
    CONFIG.SECTOR_DATA[sector][industry].filter(role => classifyJobRole(role) === jobType).forEach(role => {
      const opt = document.createElement('option');
      opt.value = role; opt.textContent = role;
      roleSel.appendChild(opt);
    });
    roleSel.disabled = false;
  }
}

function classifyJobRole(role) {
  const text = role.toLowerCase();

  if (/\b(manager|director|principal|dean|registrar|administrator|superintendent|cto|lead|head)\b/.test(text)) {
    return 'Management';
  }

  if (/\b(accountant|bookkeeper|officer|coordinator|specialist|analyst|secretary|clerk|cashier|teller|buyer|recruiter|writer|controller|auditor|agent|rep|representative|relationship|records|admissions|documentation|dispatcher)\b/.test(text)) {
    return 'Administrative';
  }

  if (/\b(cleaner|security|guard|driver|loader|laborer|worker|operator|attendant|hand|janitor|gardener|courier|picker|stocker|sanitation|bellhop|housekeeper|room|laundry|shelf|storekeeper|warehouse|front desk|cashier|helper|assistant)\b/.test(text)) {
    return 'Support';
  }

  return 'Technical';
}

// ===== CONDITIONAL FIELD TOGGLES =====
function toggleRefugeeField() {
  const show = document.getElementById('refugeeStatus').value === 'Yes';
  document.getElementById('nationalityField').classList.toggle('hidden', !show);
}
function toggleDisplacementFields() {
  const show = document.getElementById('displacementStatus').value === 'Yes';
  ['displacementReasonField', 'originalCommunityField', 'hostCommunityField'].forEach(id => {
    document.getElementById(id).classList.toggle('hidden', !show);
  });
}
function toggleDisabilityField() {
  const show = document.getElementById('disabilityStatus').value === 'Yes';
  document.getElementById('disabilitySpecField').classList.toggle('hidden', !show);
  if (!show) document.getElementById('disabilitySpecify').value = '';
}
function toggleBaselineEmploymentFields() {
  const status = document.getElementById('employmentStatus').value;
  const show = status === 'Employed' || status === 'Casual Worker';
  document.getElementById('baselineEmploymentFields').classList.toggle('show', show);

  if (!show) {
    ['currentOccupation', 'monthlyIncome', 'incomeFrequency', 'sector', 'industry', 'jobType', 'jobRole', 'workRegion', 'workDistrict', 'workCommunity'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    ['industry', 'jobType', 'jobRole', 'workDistrict'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = true;
    });
  }
}
function toggleCapacityFields(show) {
  document.getElementById('capacityFields').classList.toggle('show', show);
  setSectionControlsDisabled('capacityFields', !show);
}
function toggleTrainingModeFields() {
  const mode = document.getElementById('trainingMode').value;
  document.getElementById('virtualTrainingFields').classList.toggle('hidden', mode !== 'Virtual');
}
function togglePlacementFields(show) {
  document.getElementById('placementFields').classList.toggle('show', show);
  setSectionControlsDisabled('placementFields', !show);
  document.getElementById('currentEmploymentFields').classList.toggle('show', !show);
}
function togglePreviousTrainingDetails() {
  const show = document.getElementById('previousTrainings').value === 'Yes';
  document.getElementById('previousTrainingDetails').classList.toggle('hidden', !show);
}
function toggleCurrentEmploymentDetails() {
  const show = document.getElementById('currentlyEmployed').value === 'Yes';
  document.getElementById('currentEmploymentDetails').classList.toggle('hidden', !show);
}
function setSectionControlsDisabled(sectionId, disabled) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.querySelectorAll('input, select, textarea').forEach(control => {
    if (control.required) control.dataset.requiredWhenVisible = 'true';
    if (disabled) {
      control.required = false;
    } else if (control.dataset.requiredWhenVisible === 'true') {
      control.required = true;
    }
    control.disabled = disabled;
    if (disabled && control.type !== 'radio' && control.type !== 'checkbox') {
      control.value = '';
    }
  });
}
function getFieldLabel(field) {
  const group = field.closest('.field-group');
  const label = group ? group.querySelector('.field-label') : null;
  return label ? label.textContent.replace(/\s+/g, ' ').trim() : (field.id || 'required field');
}
function handleIdTypeChange() {
  const idType = document.getElementById('idType').value;
  const ghanaCard = document.getElementById('ghanaCardId');
  const voterId = document.getElementById('voterId');

  ghanaCard.disabled = idType === "Voter's ID";
  voterId.disabled = idType === 'Ghana Card';
  ghanaCard.required = idType === 'Ghana Card';
  voterId.required = idType === "Voter's ID";

  if (ghanaCard.disabled) ghanaCard.value = '';
  if (voterId.disabled) voterId.value = '';
}

// ===== CALCULATIONS =====
function calculateAge() {
  const dob = document.getElementById('dob').value;
  if (!dob) { document.getElementById('age').value = ''; document.getElementById('participantTypeAge').value = ''; return; }
  const birth = new Date(dob), today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  document.getElementById('age').value = age;
  document.getElementById('participantTypeAge').value = (age >= 15 && age <= 35) ? 'Youth' : 'Non-Youth';
}

// ===== ID GENERATION =====
function onPartnerChange() {
  updatePartnerDisplays();
  updateIds();
}
function updatePartnerDisplays() {
  const partner = document.getElementById('implementingPartner').value || 'the implementing partner';
  document.getElementById('partnerNameDisplay').textContent = partner;
  document.getElementById('partnerNameDisplay2').textContent = partner;
}
function updateCollectorDisplays(name) {
  const displayName = name || 'Not Set';
  const primary = document.getElementById('collectorDisplay');
  const secondary = document.getElementById('collectorDisplaySub');
  if (primary) primary.textContent = displayName;
  if (secondary) secondary.textContent = displayName;
}
function updateIds() {
  const partner = document.getElementById('implementingPartner').value || 'UNK';
  const region = document.getElementById('region').value || 'XXX';
  const pPrefix = CONFIG.PARTNER_PREFIXES[partner] || partner.substring(0,3).toUpperCase();
  const rPrefix = region.substring(0,3).toUpperCase();
  const ts = new Date().toISOString().replace(/[-:T.]/g, '').substring(0,14);
  const sequence = getNextLocalSequence();
  // Submission ID
  document.getElementById('submissionId').value = `${rPrefix}-${String(sequence).padStart(6,'0')}-${ts}`;
  document.getElementById('subIdDisplay').textContent = `${rPrefix}-${String(sequence).padStart(6,'0')}-${ts}`;
  // HAMIS ID
  document.getElementById('hamisId').value = generateHamisId(rPrefix, sequence);
  // Participant ID placeholder
  document.getElementById('participantId').placeholder = `${pPrefix}--${String(sequence).padStart(7,'0')} (will auto-generate)`;
}
function generateHamisId(regionPrefix, sequence) {
  return `HAMIS-${regionPrefix}-${String(sequence).padStart(6,'0')}`;
}
function generateDeviceId() {
  const saved = localStorage.getItem(CONFIG.DEVICE_ID_KEY);
  if (saved) return saved;
  const ua = navigator.userAgent, platform = navigator.platform, lang = navigator.language;
  const hash = `${ua}${platform}${lang}${Date.now()}`.split('').reduce((a,b) => { a = ((a<<5)-a)+b.charCodeAt(0); return a&a; }, 0);
  const deviceId = `DEV-${Math.abs(hash).toString(36).toUpperCase().substring(0,8)}`;
  localStorage.setItem(CONFIG.DEVICE_ID_KEY, deviceId);
  return deviceId;
}

// ===== VALIDATION (INDEX5 STYLE) =====
function validatePhone(input) {
  const val = input.value.replace(/\D/g, '');
  if (val && !/^0\d{9}$/.test(val)) {
    showToast('Phone must be 10 digits starting with 0 (e.g., 0244111111)', 'error');
    input.focus();
    return false;
  }
  return true;
}
function validateGhanaCard(input) {
  const val = input.value.toUpperCase();
  // Index5 logic: GHA-XXXXXXXXX-X format (15 chars total)
  if (val && !/^GHA-\d{9}-\d$/.test(val)) {
    showToast('Ghana Card must be: GHA-XXXXXXXXX-X (15 chars)', 'error');
    input.focus();
    return false;
  }
  return true;
}
function formatGhanaCard(input) {
  // Auto-format as user types: GHA-123456789-0
  let val = input.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
  if (!val.startsWith('GHA-')) val = 'GHA-' + val.replace('GHA', '');
  if (val.length > 13 && val[13] !== '-') val = val.slice(0,13) + '-' + val.slice(13);
  input.value = val.slice(0,15);
}

// ===== OFFLINE QUEUE =====
function getPendingSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG.QUEUE_KEY)) || [];
  } catch {
    return [];
  }
}

function setPendingSubmissions(queue) {
  localStorage.setItem(CONFIG.QUEUE_KEY, JSON.stringify(queue));
  updateOnlineStatus();
}

function getNextLocalSequence() {
  return db.length + getPendingSubmissions().length + 1;
}

function queueSubmission(formData, reason = '') {
  const queue = getPendingSubmissions();
  if (queue.some(item => item.data.localQueueId === formData.localQueueId)) return;

  queue.push({
    id: formData.localQueueId,
    data: { ...formData, syncStatus: 'queued' },
    queuedAt: new Date().toISOString(),
    attempts: 0,
    lastError: reason
  });
  setPendingSubmissions(queue);
}

async function postSubmission(formData) {
  const action = formState.entryMode === 'capacity'
    ? 'submitCapacityBuilding'
    : formState.entryMode === 'placement'
      ? 'submitJobPlacement'
      : 'saveParticipantInfo';
  return apiAction(action, formData);
}

async function apiAction(action, data = {}) {
  const response = await fetch(CONFIG.API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...data, syncStatus: data.syncStatus || 'synced' })
  });
  const responseText = await response.text();
  let result;

  try {
    result = JSON.parse(responseText);
  } catch {
    const message = responseText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    throw new Error(message || 'Backend returned a non-JSON response');
  }

  if (!response.ok || (result.status !== 'OK' && result.status !== 'success')) {
    throw new Error(result.message || `Submission failed (${response.status})`);
  }

  return result;
}

function saveLocalSubmission(formData, referenceId = '') {
  const record = {
    ...formData,
    referenceId,
    syncStatus: 'synced',
    syncedAt: new Date().toISOString()
  };

  if (!db.some(item => item.localQueueId === record.localQueueId)) {
    db.push(record);
    localStorage.setItem(CONFIG.LOCAL_DB_KEY, JSON.stringify(db));
  }
}

async function syncPendingSubmissions() {
  if (formState.isSyncing || !navigator.onLine) return;

  let queue = getPendingSubmissions();
  if (!queue.length) {
    updateOnlineStatus();
    return;
  }

  formState.isSyncing = true;
  updateSyncPanel('syncing', `Syncing ${queue.length} pending record(s) to Google Sheets...`);
  showToast(`Syncing ${queue.length} queued record(s)...`, 'info');
  showStatus(`🟢 Online - Syncing ${queue.length} pending record(s)...`, 'online');

  for (const item of [...queue]) {
    try {
      const result = await postSubmission(item.data);
      saveLocalSubmission(item.data, result.referenceId || item.data.submissionId);
      queue = queue.filter(pending => pending.id !== item.id);
      localStorage.setItem(CONFIG.QUEUE_KEY, JSON.stringify(queue));
      updateSyncPanel('syncing', queue.length ? `Syncing ${queue.length} pending record(s)...` : 'Finalizing sync...');
      refreshAdminDataNow();
    } catch (err) {
      queue = queue.map(pending => {
        if (pending.id !== item.id) return pending;
        return {
          ...pending,
          attempts: pending.attempts + 1,
          lastError: err.message,
          lastAttemptAt: new Date().toISOString()
        };
      });
      localStorage.setItem(CONFIG.QUEUE_KEY, JSON.stringify(queue));
      updateSyncPanel('pending', `${queue.length} record(s) still waiting. Last error: ${err.message}`);
      console.error('Offline sync failed:', err);
      showToast(`Sync paused: ${err.message}`, 'error');
      break;
    }
  }

  formState.isSyncing = false;
  if (queue.length) {
    showStatus(`🟡 ${queue.length} record(s) still pending sync`, 'offline');
  } else {
    showToast('All queued records synced to Google Sheets.', 'success');
    updateIds();
    updateOnlineStatus();
    refreshAdminDataNow();
  }
  updateSyncPanel();
}

function showSubmissionComplete(referenceId, message, status = 'submitted') {
  const statusConfig = {
    submitted: {
      badge: 'Submitted',
      title: 'Submission Successful!',
      detail: 'This record has been received by Google Sheets.'
    },
    queued: {
      badge: 'Queued Offline',
      title: 'Saved on This Device',
      detail: 'This record is waiting in the offline queue and will sync automatically.'
    },
    pending: {
      badge: 'Pending Sync',
      title: 'Saved Locally',
      detail: 'This record is saved on this device and will retry when the backend is available.'
    }
  };
  const config = statusConfig[status] || statusConfig.submitted;
  const badge = document.getElementById('submissionStatusBadge');

  badge.textContent = config.badge;
  badge.className = `submission-status-badge ${status}`;
  document.getElementById('submissionStatusTitle').textContent = config.title;
  document.getElementById('submissionStatusMessage').textContent = message;
  document.getElementById('submissionSyncDetail').textContent = `${config.detail} Pending records: ${getPendingSubmissions().length}.`;
  document.getElementById('refDisplay').textContent = referenceId || 'N/A';
  document.getElementById('mainForm').classList.add('hidden');
  document.getElementById('successScreen').classList.add('show');
  const cvDecision = document.getElementById('cvDecisionPanel');
  if (cvDecision && status === 'submitted') cvDecision.classList.remove('hidden');
  showStatus(message, navigator.onLine ? 'online' : 'offline');
}

// ===== FORM SUBMISSION =====
async function handleSubmit(e) {
  e.preventDefault();
  if (formState.isSubmitting) return;
  
  // Final validation
  if (!validateVisibleRequiredFields()) return;
  if (!validatePhone(document.getElementById('telephone'))) return;
  const idType = document.getElementById('idType').value;
  if (idType === 'Ghana Card' && !validateGhanaCard(document.getElementById('ghanaCardId'))) return;
  
  formState.isSubmitting = true;
  const btn = document.getElementById('submitBtn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span class="spinner"></span> Submitting...';
  btn.disabled = true;
  
  try {
    const formData = collectFormData();
    updateSyncPanel(navigator.onLine ? 'syncing' : 'offline', navigator.onLine ? 'Submitting to Google Sheets...' : 'Saving this record on this device...');
    showToast(navigator.onLine ? 'Submitting to Google Sheets...' : 'Offline. Queuing this record on this device.', 'info');
    showStatus(navigator.onLine ? '🟢 Online - Syncing...' : '🔴 Offline - Saving locally...', navigator.onLine ? 'online' : 'offline');

    if (!navigator.onLine) {
      queueSubmission(formData, 'Device offline');
      showSubmissionComplete(formData.submissionId, 'Queued locally. It will sync when internet returns.', 'queued');
      showToast('Queued offline. It will sync when internet returns.', 'success');
    } else {
      try {
        const result = await postSubmission(formData);
        if (result.participantId) {
          formData.participantId = result.participantId;
          document.getElementById('participantId').value = result.participantId;
        }
        saveLocalSubmission(formData, result.referenceId || result.participantId || formData.submissionId);
        updateSyncPanel('online', 'Last record submitted to Google Sheets.');
        showSubmissionComplete(result.referenceId || result.participantId || formData.submissionId, 'Saved to Google Sheets.', 'submitted');
        showToast('Submitted to Google Sheets.', 'success');
        refreshAdminDataNow();
      } catch (syncErr) {
        queueSubmission(formData, syncErr.message);
        updateSyncPanel('pending', `${getPendingSubmissions().length} record(s) queued. Last error: ${syncErr.message}`);
        showSubmissionComplete(formData.submissionId, 'Saved locally. It will retry automatically when internet is available.', 'pending');
        showToast('Backend unavailable. Saved locally and queued for sync.', 'success');
      }
    }
  } catch (err) {
    console.error('Submit error:', err);
    showToast(`Error: ${err.message}`, 'error');
  } finally {
    formState.isSubmitting = false;
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

function validateVisibleRequiredFields() {
  const form = document.getElementById('mainForm');
  const requiredFields = Array.from(form.querySelectorAll('[required]'));

  for (const field of requiredFields) {
    if (field.disabled || !isFieldVisible(field)) continue;

    if (field.type === 'radio') {
      const checked = form.querySelector(`input[name="${field.name}"]:checked`);
      if (checked) continue;
    } else if (String(field.value || '').trim()) {
      continue;
    }

    showToast(`Please complete: ${getFieldLabel(field)}`, 'error');
    field.focus();
    return false;
  }

  return true;
}

function isFieldVisible(field) {
  if (field.closest('.hidden')) return false;
  const conditional = field.closest('.conditional-box');
  if (conditional && !conditional.classList.contains('show')) return false;
  return Boolean(field.offsetParent || field.getClientRects().length);
}

function collectFormData() {
  const region = document.getElementById('region').value;
  const modules = Array.from(document.querySelectorAll('input[name="modules"]:checked')).map(cb => cb.value).join(', ');
  const digitalSkills = Array.from(document.querySelectorAll('input[name="digitalSkills"]:checked')).map(cb => cb.value).join(', ');
  const virtualModules = ''; // Placeholder if needed
  const disabilityStatus = document.getElementById('disabilityStatus').value || 'No';
  
  const formData = {
    // Section A: Meta
    submissionId: document.getElementById('submissionId').value,
    participantId: document.getElementById('participantId').value || (formState.token ? '' : generateParticipantId()),
    token: formState.token,
    localQueueId: globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `LOCAL-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    syncStatus: 'pending',
    collectorName: document.getElementById('collectorName').value,
    deviceId: formState.deviceId,
    submissionTimestamp: new Date().toISOString(),
    
    // Section B: General
    hamisId: document.getElementById('hamisId').value,
    onboardingDate: document.getElementById('onboardingDate').value,
    implementingPartner: document.getElementById('implementingPartner').value,
    region: region,
    district: document.getElementById('district').value,
    community: document.getElementById('community').value,
    locationStatus: document.getElementById('locationStatus').value,
    surname: document.getElementById('surname').value,
    firstName: document.getElementById('firstName').value,
    otherNames: document.getElementById('otherNames').value,
    sex: document.getElementById('sex').value,
    dob: document.getElementById('dob').value,
    age: document.getElementById('age').value,
    participantTypeAge: document.getElementById('participantTypeAge').value,
    telephone: document.getElementById('telephone').value,
    idType: document.getElementById('idType').value,
    ghanaCardId: document.getElementById('ghanaCardId').value,
    voterId: document.getElementById('voterId').value,
    refugeeStatus: document.getElementById('refugeeStatus').value,
    nationality: document.getElementById('nationality').value,
    displacementStatus: document.getElementById('displacementStatus').value,
    displacementReason: document.getElementById('displacementReason').value,
    originalCommunity: document.getElementById('originalCommunity').value,
    hostCommunity: document.getElementById('hostCommunity').value,
    disabilityStatus,
    disabilitySpecify: disabilityStatus === 'Yes' ? document.getElementById('disabilitySpecify').value : '',
    educationLevel: document.getElementById('educationLevel').value,
    employmentStatus: document.getElementById('employmentStatus').value,
    currentOccupation: document.getElementById('currentOccupation').value,
    monthlyIncome: document.getElementById('monthlyIncome').value,
    incomeFrequency: document.getElementById('incomeFrequency').value,
    sector: document.getElementById('sector').value,
    industry: document.getElementById('industry').value,
    jobType: document.getElementById('jobType').value,
    jobRole: document.getElementById('jobRole').value,
    workRegion: document.getElementById('workRegion').value,
    workDistrict: document.getElementById('workDistrict').value,
    workCommunity: document.getElementById('workCommunity').value,
    
    // Section C: Capacity Building
    trainedByPartner: document.querySelector('input[name="tr_check"]:checked')?.value || '',
    trainingStartDate: document.getElementById('trainingStartDate').value,
    trainingEndDate: document.getElementById('trainingEndDate').value,
    trainingLocation: document.getElementById('trainingLocation').value,
    trainingMode: document.getElementById('trainingMode').value,
    virtualPlatform: document.getElementById('virtualPlatform').value,
    trainerType: document.getElementById('trainerType').value,
    trainingPartner: document.getElementById('trainingPartner').value,
    completionStatus: document.getElementById('completionStatus').value,
    certificateIssued: document.getElementById('certificateIssued').value,
    modules: modules,
    digitalSkills: digitalSkills,
    wishTraining: document.getElementById('wishTraining').value,
    previousTrainings: document.getElementById('previousTrainings').value,
    previousTrainingDesc: document.getElementById('previousTrainingDesc').value,
    
    // Section D: Placement
    placedByPartner: document.querySelector('input[name="pl_check"]:checked')?.value || '',
    placementStartDate: document.getElementById('placementStartDate').value,
    placementRegion: document.getElementById('placementRegion').value,
    placementDistrict: document.getElementById('placementDistrict').value,
    placementCommunity: document.getElementById('placementCommunity').value,
    plSector: document.getElementById('plSector').value,
    plIndustry: document.getElementById('plIndustry').value,
    plJobType: document.getElementById('plJobType').value,
    plJobRole: document.getElementById('plJobRole').value,
    employmentType: document.getElementById('employmentType').value,
    employmentCategory: document.getElementById('employmentCategory').value,
    placementIncome: document.getElementById('placementIncome').value,
    placementIncomeFreq: document.getElementById('placementIncomeFreq').value,
    employerName: document.getElementById('employerName').value,
    contractType: document.getElementById('contractType').value,
    workHours: document.getElementById('workHours').value,
    currentlyEmployed: document.getElementById('currentlyEmployed').value,
    currentEmployer: document.getElementById('currentEmployer').value,
    currentJobRoleAlt: document.getElementById('currentJobRoleAlt').value,
    currentIncomeAlt: document.getElementById('currentIncomeAlt').value
  };

  if (formState.entryMode === 'capacity' || formState.entryMode === 'placement') {
    formData.adminPassword = formState.adminPassword;
    formData.actorType = 'admin';
    formData.actor = formState.collectorName || 'admin';
  } else {
    ADMIN_SECTION_PAYLOAD_KEYS.forEach(key => delete formData[key]);
  }

  return formData;
}

function generateParticipantId() {
  return `HAPPY-2026-${String(getNextLocalSequence()).padStart(6,'0')}`;
}

function resetForm() {
  document.getElementById('mainForm').reset();
  document.getElementById('mainForm').classList.remove('hidden');
  document.getElementById('successScreen').classList.remove('show');
  const cvDecision = document.getElementById('cvDecisionPanel');
  if (cvDecision) cvDecision.classList.add('hidden');
  // Reset conditionals
  ['baselineEmploymentFields', 'capacityFields', 'placementFields', 'currentEmploymentFields'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('show', 'hidden');
  });
  ['nationalityField', 'disabilitySpecField', 'virtualTrainingFields', 'previousTrainingDetails', 'currentEmploymentDetails', 'displacementReasonField', 'originalCommunityField', 'hostCommunityField'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  // Reset disables
  ['district', 'industry', 'jobType', 'jobRole', 'placementDistrict', 'workDistrict', 'plIndustry', 'plJobType', 'plJobRole'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
  });
  // Reset radios
  document.querySelectorAll('input[name="tr_check"]').forEach(r => r.checked = r.value === 'No');
  document.querySelectorAll('input[name="pl_check"]').forEach(r => r.checked = r.value === 'No');
  toggleCapacityFields(false);
  togglePlacementFields(false);
  applyWorkflowMode();
  // Reset dates
  document.getElementById('onboardingDate').valueAsDate = new Date();
  handleIdTypeChange();
  toggleBaselineEmploymentFields();
  // Reset IDs
  updateIds();
  hideStatus();
  formState.isSubmitting = false;
}

function returnToWorkflowStart() {
  resetForm();
  formState.token = '';
  formState.participant = null;
  formState.lockedSections = new Set();
  formState.entryMode = '';
  formState.selectedContinuationStage = '';
  formState.consentSigned = false;
  localStorage.removeItem('happyContinuationToken');

  document.getElementById('mainForm')?.classList.add('hidden');
  document.getElementById('consentStep')?.classList.add('hidden');
  document.getElementById('successScreen')?.classList.remove('show');
  document.getElementById('entryChoiceScreen')?.classList.remove('hidden');
  document.getElementById('entryContinuationBox')?.classList.add('hidden');
  const participantInput = document.getElementById('entryParticipantIdInput');
  if (participantInput) participantInput.value = '';
  clearConsentSignature();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function submitCvDecision(hasCv) {
  const participantId = document.getElementById('participantId').value || formState.participant?.participantId;
  if (!participantId) {
    showToast('Participant ID is missing. Submit registration first.', 'error');
    return;
  }

  if (!hasCv) {
    try {
      await apiAction('updateCvStatus', {
        participantId,
        token: formState.token,
        hasCv: 'No',
        cvStatus: 'no_cv',
        cvTemplateFolderAccessed: 'yes',
        cvDecisionAt: new Date().toISOString()
      });
      showToast('Opening CV templates folder.', 'success');
      window.open(CONFIG.CV_TEMPLATE_FOLDER_URL, '_blank', 'noopener');
    } catch (err) {
      showToast(`Could not save CV status: ${err.message}`, 'error');
    }
    return;
  }

  document.getElementById('cvUploadPanel').classList.remove('hidden');
}

function readCvFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read CV file.'));
    reader.readAsDataURL(file);
  });
}

async function uploadOptionalCv() {
  const input = document.getElementById('cvFileInput');
  const file = input?.files?.[0];
  const participantId = document.getElementById('participantId').value || formState.participant?.participantId;
  if (!participantId || !file) {
    showToast('Choose a CV file first.', 'error');
    return;
  }

  if (file.size > CONFIG.MAX_CV_UPLOAD_BYTES) {
    showToast('CV file is too large. Upload a file smaller than 5 MB.', 'error');
    return;
  }

  try {
    const dataUrl = await readCvFileAsDataUrl(file);
    await apiAction('updateCvStatus', {
      participantId,
      token: formState.token,
      hasCv: 'Yes',
      cvStatus: 'cv_uploaded',
      cvUploadedAt: new Date().toISOString(),
      cvUploadName: file.name,
      cvUploadType: file.type || 'application/octet-stream',
      cvUploadSize: String(file.size),
      cvUploadDataUrl: dataUrl,
      cvDecisionAt: new Date().toISOString()
    });
    showToast('CV uploaded and logged. Staff can view it from the sheet and parse it in the CV Parser workflow.', 'success');
    document.getElementById('cvUploadPanel').classList.add('hidden');
  } catch (err) {
    showToast(`CV upload failed: ${err.message}`, 'error');
  }
}

// ===== MASTER SHEET FUNCTIONS =====
async function loadSheetData(options = {}) {
  if (!formState.isAdmin) { showAdminLogin(); return; }
  if (formState.isSheetLoading) return;
  formState.isSheetLoading = true;
  const status = document.getElementById('sheetBody').querySelector('td');
  if (status && !options.silent) status.textContent = '🔄 Loading from Google Sheets...';
  try {
    const data = await fetchProtectedSheetData(formState.adminPassword);
    formState.masterSheetData = data;
    renderSheet(data);
    updateKpiDashboard(data);
  } catch (err) {
    console.error('Sheet load error:', err);
    if (!options.silent) showToast(`❌ ${err.message}`, 'error');
  } finally {
    formState.isSheetLoading = false;
  }
}

function updateAdminAutoRefresh() {
  if (formState.sheetRefreshTimer) {
    clearInterval(formState.sheetRefreshTimer);
    formState.sheetRefreshTimer = null;
  }
  if (!formState.isAdmin || !['sheet', 'report'].includes(formState.currentView)) return;
  formState.sheetRefreshTimer = setInterval(() => {
    if (!document.hidden && navigator.onLine) loadSheetData({ silent: true });
  }, 30000);
}

function refreshAdminDataNow() {
  if (!formState.isAdmin || !['sheet', 'report'].includes(formState.currentView) || !navigator.onLine) return;
  loadSheetData({ silent: true });
}
async function fetchProtectedSheetData(adminPassword) {
  let result;

  try {
    const response = await fetch(CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'getSheetData',
        adminPassword
      })
    });
    result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `Failed to unlock Master Sheet (${response.status})`);
    }
  } catch (err) {
    result = await fetchProtectedSheetDataJsonp(adminPassword);
  }

  if (result.status !== 'OK') {
    throw new Error(result.message || 'Failed to unlock Master Sheet');
  }

  return result.data || [];
}

function fetchProtectedSheetDataJsonp(adminPassword) {
  return new Promise((resolve, reject) => {
    const callbackName = `happySheetData_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const url = new URL(CONFIG.API_ENDPOINT);
    url.searchParams.set('action', 'getSheetData');
    url.searchParams.set('adminPassword', adminPassword);
    url.searchParams.set('callback', callbackName);

    const script = document.createElement('script');
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('Timed out loading Master Sheet data'));
    }, 15000);

    function cleanup() {
      clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = result => {
      cleanup();
      resolve(result);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('Could not connect to Google Sheets'));
    };

    script.src = url.toString();
    document.body.appendChild(script);
  });
}
function renderSheet(data) {
  const head = document.getElementById('sheetHead');
  const body = document.getElementById('sheetBody');
  if (!data?.length) {
    head.innerHTML = '';
    body.innerHTML = '<tr><td colspan="25" class="text-center py-6 text-slate-500">No collected participant data found in the Master sheet.</td></tr>';
    return;
  }

  const priorityColumns = [
    'participantId', 'currentStage', 'consentStatus', 'participantInfoStatus',
    'capacityBuildingStatus', 'jobPlacementStatus', 'cvStatus', 'collectorName',
    'submissionTimestamp', 'onboardingDate', 'implementingPartner', 'region',
    'district', 'community', 'surname', 'firstName', 'otherNames', 'sex', 'dob',
    'age', 'participantTypeAge', 'telephone', 'refugeeStatus',
    'disabilityStatus', 'employmentStatus', 'employmentType',
    'employmentCategory', 'hasCv', 'cvUploadName', 'lastUpdatedAt'
  ];
  const allColumns = Array.from(data.reduce((set, row) => {
    Object.keys(row || {}).forEach(key => set.add(key));
    return set;
  }, new Set()));
  const columns = priorityColumns
    .filter(column => allColumns.includes(column))
    .concat(allColumns.filter(column => !priorityColumns.includes(column)));

  head.innerHTML = '';
  const trH = document.createElement('tr');
  columns.forEach(k => { const th = document.createElement('th'); th.textContent = humanizeSheetHeader(k); trH.appendChild(th); });
  head.appendChild(trH);

  body.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    columns.forEach(column => {
      const td = document.createElement('td');
      td.textContent = formatSheetCell(row[column]);
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
}

function humanizeSheetHeader(key) {
  return String(key || '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, char => char.toUpperCase());
}

function formatSheetCell(value) {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toLocaleString();
  }
  return String(value);
}

function updateKpiDashboard(data) {
  if (!Array.isArray(data) || !data.length) return;
  const records = data.filter(row => row && Object.values(row).some(Boolean));
  const total = records.length;
  if (!total) return;

  const count = (field, value) => records.filter(row => String(row[field] || '').toLowerCase() === String(value).toLowerCase()).length;
  const hasAny = fields => records.filter(row => fields.some(field => String(row[field] || '').trim())).length;
  const pct = value => total ? `${((value / total) * 100).toFixed(1)}%` : '0.0%';
  const byField = field => records.reduce((acc, row) => {
    const key = String(row[field] || 'Unspecified').trim() || 'Unspecified';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const consent = count('consentStatus', 'submitted');
  const registered = count('participantInfoStatus', 'submitted') || hasAny(['firstName', 'surname', 'telephone']);
  const capacity = count('capacityBuildingStatus', 'submitted');
  const placement = count('jobPlacementStatus', 'submitted');
  const cvUploaded = records.filter(row => String(row.cvStatus || '').toLowerCase().includes('uploaded') || String(row.hasCv || '').toLowerCase() === 'yes').length;

  setDashText('dashTotalParticipants', total.toLocaleString());
  setDashText('dashConsentComplete', consent.toLocaleString());
  setDashText('dashConsentPct', pct(consent));
  setDashText('dashRegistrationSubmitted', registered.toLocaleString());
  setDashText('dashRegistrationPct', pct(registered));
  setDashText('dashCapacitySubmitted', capacity.toLocaleString());
  setDashText('dashCapacityPct', pct(capacity));
  setDashText('dashPlacementSubmitted', placement.toLocaleString());
  setDashText('dashPlacementPct', pct(placement));
  setDashText('dashCvUploaded', cvUploaded.toLocaleString());
  setDashText('dashCvPct', pct(cvUploaded));
  setDashText('dashUpdatedAt', `Last updated: ${new Date().toLocaleString()}`);

  renderDashboardBars('dashRegionBars', byField('region'), total, '#2563eb', 10);
  renderDashboardBars('dashDistrictBars', byField('district'), total, '#2f9e5b', 10);
  renderDashboardBars('dashEmploymentCategoryBars', byField('employmentCategory'), total, '#1198a0', 5);
  renderDashboardBars('dashEmploymentTypeBars', byField('employmentType'), total, '#2563eb', 5);
}

function setDashText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderDashboardBars(id, counts, total, color, limit) {
  const container = document.getElementById(id);
  if (!container) return;
  const rows = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
  const max = Math.max(...rows.map(([, value]) => value), 1);
  container.innerHTML = rows.map(([label, value]) => {
    const width = Math.max(8, (value / max) * 100);
    const percentage = total ? ((value / total) * 100).toFixed(1) : '0.0';
    return `<p style="--w:${width}%;--bar:${color}"><span>${escapeHtml(label)}</span><b>${value.toLocaleString()} (${percentage}%)</b></p>`;
  }).join('');
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}
function exportSheetData() {
  showToast('📥 Export requires backend support', 'info');
}

// ===== UI UTILITIES =====
function showToast(msg, type='info') {
  const toast = document.getElementById('toast');
  document.getElementById('toastMessage').textContent = msg;
  toast.className = `toast toast-${type}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}
function showStatus(msg, type) {
  const bar = document.getElementById('statusBar');
  document.getElementById('statusText').textContent = msg;
  bar.className = `status-bar ${type}`;
  bar.classList.remove('hidden');
}
function hideStatus() { document.getElementById('statusBar').classList.add('hidden'); }
function updateSyncPanel(statusOverride = '', detailOverride = '') {
  const panel = document.getElementById('syncStatusPanel');
  const title = document.getElementById('syncStatusTitle');
  const detail = document.getElementById('syncStatusDetail');
  if (!panel || !title || !detail) return;

  const pendingCount = getPendingSubmissions().length;
  let status = statusOverride;
  let titleText = 'Ready to submit';
  let detailText = 'Online. New records will save to Google Sheets.';

  if (!status) {
    if (formState.isSyncing) {
      status = 'syncing';
      titleText = 'Syncing queued records';
      detailText = pendingCount ? `Uploading ${pendingCount} pending record(s)...` : 'Finishing sync...';
    } else if (!navigator.onLine) {
      status = 'offline';
      titleText = pendingCount ? 'Queued offline' : 'Offline';
      detailText = pendingCount
        ? `${pendingCount} record(s) saved on this device. They will sync when internet returns.`
        : 'New records will be saved on this device until internet returns.';
    } else if (pendingCount) {
      status = 'pending';
      titleText = 'Pending sync';
      detailText = `${pendingCount} record(s) waiting to sync to Google Sheets.`;
    } else {
      status = 'online';
    }
  } else if (status === 'syncing') {
    titleText = 'Syncing now';
    detailText = detailOverride || detailText;
  } else if (status === 'pending') {
    titleText = 'Pending sync';
    detailText = detailOverride || `${pendingCount} record(s) waiting to sync to Google Sheets.`;
  }

  panel.className = `sync-status-panel ${status}`;
  title.textContent = titleText;
  detail.textContent = detailOverride || detailText;
}
function updateOnlineStatus() {
  const bar = document.getElementById('statusBar');
  const txt = document.getElementById('statusText');
  const pendingCount = getPendingSubmissions().length;
  updateSyncPanel();

  if (navigator.onLine && pendingCount) {
    txt.textContent = `🟡 Online - ${pendingCount} record(s) pending sync`;
    bar.className = 'status-bar offline';
  } else if (navigator.onLine) {
    txt.textContent = '🟢 Online - Data syncs to Google Sheets';
    bar.className = 'status-bar online';
  } else {
    txt.textContent = pendingCount
      ? `🔴 Offline - ${pendingCount} record(s) saved locally`
      : '🔴 Offline - New data will be saved locally';
    bar.className = 'status-bar offline';
  }

  if (!formState.isSubmitting && !formState.isSyncing) setTimeout(() => bar.classList.add('hidden'), 4000);
}

// Local storage fallback for demo (index5 style)
let db = JSON.parse(localStorage.getItem(CONFIG.LOCAL_DB_KEY)) || [];

