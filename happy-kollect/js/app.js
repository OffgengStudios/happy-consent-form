// ===== CONFIGURATION =====
const CONFIG = {
  API_ENDPOINT: 'https://script.google.com/macros/s/AKfycbwAnymRCItipYfY66c96mrSRdJE_r2x84J7caU3LmdxRcUgUgmQTOOAe7jdbxm1UgJB/exec',
  QUEUE_KEY: 'happy_kollect_pending',
  LOCAL_DB_KEY: 'happy_kollect_db',
  DEVICE_ID_KEY: 'happyKollectDeviceId',
  PARTNER_PREFIXES: { 'Jobberman':'JOB', 'Agrico':'AGR', 'YouthEmpower':'YOU', 'SkillsGH':'SKI', 'Other':'OTH' },
  REGIONS: {
    "Greater Accra": ["Accra Metropolitan","Tema","Adenta","Ashaiman","Ga East","Ga West","Ga South","Ga Central","La Dade-Kotopon","Ledzokuku","Krowor","Ayawaso West","Ayawaso East","Ayawaso North","Okaikwei North","Ablekuma North","Ablekuma Central","Ablekuma West","Korle Klottey","Adabraka","Osu Klottey","Ningo-Prampram","Shai-Osudoku","Ada East","Ada West","Weija-Gbawe","Kpone-Katamanso"],
    "Ashanti": ["Kumasi Metropolitan","Obuasi Municipal","Ejisu","Bekwai","Mampong","Agona","Asokore Mampong","Suame","Bantama","Subin","Oforikrom","Old Tafo","Kwadaso","Nhyiaeso","Atwima Kwanwoma","Atwima Nwabiagya","Afigya Kwabre North","Afigya Kwabre South","Asante Akim Central","Asante Akim North","Asante Akim South","Bosome Freho","Bosomtwe","Ejura Sekyedumase","Juaben","Kwabre East","Offinso Municipal","Offinso North","Sekyere Central","Sekyere East","Sekyere South","Sekyere Afram Plains","Adansi North","Adansi South","Amansie Central","Amansie West","Ahafo Ano North","Ahafo Ano South"],
    "Eastern": ["Koforidua","Akropong","Nkawkaw","Mpraeso","Aburi","Kibi","Akim Oda","Asamankese","Somanya","Kade","Begoro","Donkorkrom","Akim Swedru","Asuogyaman","Atiwa East","Atiwa West","Ayensuano","Birim Central","Birim North","Birim South","Denkyembour","Fanteakwa North","Fanteakwa South","Kwaebibirem","Kwahu Afram Plains North","Kwahu Afram Plains South","Kwahu East","Kwahu South","Kwahu West","Lower Manya Krobo","New Juaben North","New Juaben South","Nsawam Adoagyiri","Okere","Suhum","Upper Manya Krobo","Upper West Akim","Yilo Krobo"],
    "Volta": ["Ho","Keta","Hohoe","Kpando","Aflao","Sogakope","Dzodze","Adaklu","Afadzato South","Agotime-Ziope","Akatsi North","Akatsi South","Anloga","Central Tongu","Ho West","Ketu North","Ketu South","North Dayi","North Tongu","South Dayi","South Tongu"],
    "Northern": ["Tamale","Yendi","Savelugu","Tolon","Kumbungu","Nanton","Gushegu","Karaga","Saboba","Zabzugu","Tatale-Sanguli","Mion","Nanumba North","Nanumba South","Kpandai"],
    "North East": ["Nalerigu","Walewale","Gambaga","Bunkpurugu","Yunyoo","Chereponi"],
    "Upper West": ["Wa","Lawra","Nadowli","Jirapa","Lambussie","Nandom","Sissala East","Sissala West","Wa East","Wa West","Daffiama-Bussie-Issa"],
    "Upper East": ["Bolgatanga","Bawku","Navrongo","Zebilla","Paga","Binduri","Bongo","Builsa North","Builsa South","Garu","Kassena-Nankana East","Kassena-Nankana West","Nabdam","Pusiga","Talensi","Tempane"],
    "Oti": ["Dambai","Jasikan","Kadjebi","Krachi","Nkwanta","Biakoye","Guan","Krachi East","Krachi Nchumuru","Krachi West","Nkwanta North","Nkwanta South"],
    "Bono": ["Sunyani","Berekum","Dormaa","Wenchi","Techiman","Nkoranza","Kintampo","Atebubu","Sene","Pru","Tain","Banda","Jaman North","Jaman South","Berekum East","Berekum West","Dormaa Central","Dormaa East","Dormaa West"],
    "Bono East": ["Techiman Municipal","Techiman North","Nkoranza North","Nkoranza South","Kintampo North","Kintampo South","Atebubu-Amantin","Pru East","Pru West","Sene East","Sene West"],
    "Ahafo": ["Goaso","Bechem","Duayaw Nkwanta","Hwidiem","Kenyasi","Mim","Asunafo North","Asunafo South","Asutifi North","Asutifi South","Tano North","Tano South"],
    "Savannah": ["Damongo","Bole","Sawla","Salaga","Buipe","Daboya","Larabanga","Mole","Central Gonja","East Gonja","North East Gonja","North Gonja","West Gonja","Sawla-Tuna-Kalba"],
    "Western": ["Sekondi-Takoradi","Tarkwa","Prestea","Bogoso","Axim","Elubo","Half Assini","Ahanta West","Effia-Kwesimintsim","Ellembelle","Jomoro","Mpohor","Nzema East","Prestea-Huni Valley","Shama","Tarkwa-Nsuaem","Wassa Amenfi Central","Wassa Amenfi East","Wassa Amenfi West","Wassa East"],
    "Western North": ["Sefwi Wiawso","Bibiani","Juaboso","Bodi","Aowin","Bia East","Bia West","Bibiani-Anhwiaso-Bekwai","Sefwi Akontombra","Suaman"],
    "Central": ["Cape Coast","Winneba","Kasoa","Swedru","Dunkwa","Elmina","Moree","Abura-Asebu-Kwamankese","Agona East","Agona West","Ajumako-Enyan-Essiam","Asikuma-Odoben-Brakwa","Assin Central","Assin North","Assin South","Awutu Senya","Awutu Senya East","Effutu","Ekumfi","Gomoa Central","Gomoa East","Gomoa West","Komenda-Edina-Eguafo-Abrem","Mfantsiman","Twifo-Atti Morkwa","Twifo Hemang Lower Denkyira","Upper Denkyira East","Upper Denkyira West"]
  },
  SECTOR_DATA: {
    "Agriculture": {
      "Crop Farming": ["Farm Manager","Agronomist","Soil Scientist","Irrigation Specialist","Plant Breeder","Crop Scout","Seed Technologist","Precision Ag Specialist","Agricultural Engineer","Horticulturalist","Entomologist","Farm Laborer","Tractor Operator","Combine Operator","Irrigation Technician","Storekeeper","Driver","Security Guard","Gardener","Accountant","Bookkeeper","Farm Administrator","Purchasing Agent","Sales Rep","Inventory Clerk","HR Officer","Compliance Officer"],
      "Livestock": ["Ranch Manager","Veterinary Surgeon","Animal Nutritionist","AI Technician","Livestock Geneticist","Animal Health Inspector","Herdsman","Poultry Attendant","Milker","Stable Hand","Feed Mill Operator","Livestock Hauler","Security Guard","Sanitation Crew","Accountant","Procurement Officer","HR Coordinator","Logistics Coordinator","Sales Manager"],
      "Aquaculture": ["Fish Farm Manager","Marine Biologist","Aquaculturist","Water Quality Technician","Fish Pathologist","RAS Specialist","Fisheries Ecologist","Algae Technician","Pond Attendant","Cage Technician","Net Repairer","Fish Feeder","Trawler Deckhand","Aquaculture Plumber","Security Guard","Office Cleaner","Accountant","Exports Officer","HR Generalist","Supply Chain Officer"],
      "Forestry": ["Forest Manager","Forester","Forest Ranger","Silviculturist","Timber Cruiser","Log Grader","Arborist","Fire Management Officer","Chainsaw Operator","Skidder Operator","Tree Climber","Choker Setter","Logging Truck Driver","Security Guard","Accountant","Permitting Specialist","HR Officer","Land Rights Coordinator","HSE Manager"]
    },
    "Non-Agriculture": {
      "Mining & Extractive": ["Mine Manager","Petroleum Engineer","Reservoir Engineer","Drilling Engineer","Geologist","Geophysicist","Metallurgist","Mine Surveyor","Ventilation Officer","Blasting Engineer","Environmental Coordinator","Roustabout","Roughneck","Derrickhand","Heavy Equipment Operator","Drill Rig Operator","Crusher Operator","Maintenance Mechanic","Security Guard","Accountant","Procurement Manager","HR Business Partner","Logistics Coordinator","Regulatory Officer"],
      "Manufacturing": ["Factory Manager","Production Manager","QA Manager","Food Technologist","Product Developer","Lab Technician","QC Inspector","Brewmaster","Industrial Baker","Machine Engineer","Machine Operator","Packaging Hand","Warehouse Loader","Delivery Driver","Sanitation Worker","Accountant","Purchasing Officer","Supply Chain Coordinator","HR Officer","Compliance Officer"],
      "Construction": ["Project Manager","Site Manager","Civil Engineer","Structural Engineer","Quantity Surveyor","Architect","BIM Coordinator","Land Surveyor","Safety Officer","CAD Technician","Bricklayer","Carpenter","Electrician","Plumber","Crane Operator","Scaffolder","Painter","Tipper Driver","Site Security","Post-Construction Cleaner","Construction Accountant","Contract Administrator","Document Controller","HR Manager","Procurement Officer"],
      "ICT & Digital": ["CTO","IT Project Manager","Product Manager","Software Engineer","Full-stack Developer","Mobile Developer","UI/UX Designer","Data Scientist","Cybersecurity Specialist","Cloud Architect","Systems Admin","AI/ML Engineer","Network Engineer","IT Helpdesk","Hardware Repairer","Data Entry","CCTV Installer","Office Cleaner","IT Accountant","Digital Marketing Manager","Content Strategist","IT Recruiter","Technical Writer"],
      "Financial Services": ["Branch Manager","Operations Manager","Credit Manager","Loan Officer","Credit Analyst","Relationship Manager","Risk Officer","Mobile Money Coordinator","Bank Teller","Cashier","Bullion Driver","Armed Security","Office Cleaner","Accountant","Data Entry Clerk","HR Officer","Customer Service Executive"],
      "Healthcare": ["Hospital Administrator","Medical Director","Nursing Superintendent","Medical Doctor","Registered Nurse","Pharmacist","Lab Scientist","Radiographer","Physiotherapist","Biomedical Engineer","Ward Assistant","Pharmacy Technician","Ambulance Driver","Hospital Security","Sanitation Officer","Gardener","Medical Accountant","Records Officer","HR Manager","Insurance Coordinator","Medical Secretary"],
      "Education": ["Principal","Registrar","Dean","Director of Studies","Teacher","Lecturer","Curriculum Developer","Educational Psychologist","Librarian","Lab Technician","Teaching Assistant","School Nurse","Bus Driver","Security Guard","Janitor","Gardener","School Accountant","Admissions Officer","HR Manager","Exams Officer","School Secretary"],
      "Hospitality & Tourism": ["Hotel GM","Front Office Manager","Executive Housekeeper","F&B Manager","Event Planner","Revenue Manager","Maintenance Engineer","IT Specialist","Front Desk","Bellhop","Room Attendant","Laundry Worker","Security","Gardener","Shuttle Driver","Hotel Accountant","Reservations Agent","HR Manager","Night Auditor"],
      "Retail & Trade": ["Store Manager","Floor Manager","Merchandise Manager","Branch Manager","Regional Director","Visual Merchandiser","Buyer","Pricing Analyst","Loss Prevention","E-commerce Specialist","Sales Associate","Cashier","Shelf Stocker","Warehouse Picker","Delivery Driver","Security Guard","Store Cleaner","Retail Accountant","Inventory Manager","Procurement Officer","HR Coordinator","Customer Service Manager"],
      "Logistics & Transport": ["Fleet Manager","Logistics Director","Warehouse Manager","Supply Chain Manager","Port Manager","Logistics Analyst","Route Optimizer","Transport Safety Officer","WMS Admin","Customs Broker","Freight Forwarder","HGV Driver","Forklift Operator","Courier","Loader","Fleet Mechanic","Warehouse Security","Facility Cleaner","Logistics Accountant","Documentation Specialist","Dispatcher","HR Specialist","Cargo Coordinator"]
    }
  }
};

// ===== STATE =====
let formState = {
  collectorName: '',
  deviceId: '',
  isSubmitting: false,
  isSyncing: false,
  isAdmin: false,
  adminPassword: '',
  masterSheetData: [],
  currentView: 'form',
  isSheetLoading: false,
  accessMode: null // 'token' | 'capacity-existing' | 'capacity-new' | 'admin'
};

let db = JSON.parse(localStorage.getItem(CONFIG.LOCAL_DB_KEY)) || [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updatePartnerDisplays();
  syncPendingSubmissions();
  initializeFromUrlParams();
});

function initializeForm() {
  document.getElementById('onboardingDate').valueAsDate = new Date();
  formState.deviceId = generateDeviceId();
  document.getElementById('deviceId').value = formState.deviceId;
  populateRegions();
  const saved = localStorage.getItem('happyKollectCollector');
  if (saved) {
    document.getElementById('collectorName').value = saved;
    formState.collectorName = saved;
  }
  updateIds();
  handleIdTypeChange();
  toggleBaselineEmploymentFields();
  toggleCapacityFields(false);
  togglePlacementFields(false);
  updateOnlineStatus();
}

// ===== LOCK / UNLOCK =====
function initializeFromUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const mode = params.get('mode');

  if (token) {
    unlockWithToken(token);
  } else if (mode === 'capacity') {
    showCapacityEntryScreen();
  } else {
    showLockedScreen();
  }
}

function showLockedScreen() {
  document.getElementById('lockedScreen').classList.remove('hidden');
  document.getElementById('view-form').classList.add('hidden');
  document.getElementById('capacityEntryScreen').classList.add('hidden');
}

function showCapacityEntryScreen() {
  document.getElementById('capacityEntryScreen').classList.remove('hidden');
  document.getElementById('lockedScreen').classList.add('hidden');
  document.getElementById('view-form').classList.add('hidden');
}

function selectCapacityMode(mode) {
  document.getElementById('btnHasId').style.borderColor = mode === 'existing' ? '#5B45E8' : '#e2e8f0';
  document.getElementById('btnNoId').style.borderColor = mode === 'new' ? '#5B45E8' : '#e2e8f0';
  if (mode === 'existing') {
    document.getElementById('participantIdLookup').classList.remove('hidden');
  } else {
    document.getElementById('capacityEntryScreen').classList.add('hidden');
    formState.accessMode = 'capacity-new';
    initializeForm();
    showSections({ A: true, B: true, C: true, D: false });
    document.getElementById('view-form').classList.remove('hidden');
  }
}

async function lookupAndContinue() {
  const pid = document.getElementById('lookupParticipantId').value.trim();
  const errEl = document.getElementById('lookupError');
  errEl.classList.add('hidden');
  if (!pid) { errEl.textContent = 'Please enter your Participant ID.'; errEl.classList.remove('hidden'); return; }

  try {
    const result = await apiAction('getParticipantById', { participantId: pid });
    if (!result || !result.participant?.participantId) throw new Error('Participant not found.');
    document.getElementById('capacityEntryScreen').classList.add('hidden');
    formState.accessMode = 'capacity-existing';
    initializeForm();
    prefillParticipantInfo(result.participant);
    lockSectionB();
    showSections({ A: true, B: true, C: true, D: false });
    document.getElementById('view-form').classList.remove('hidden');
  } catch (err) {
    errEl.textContent = err.message || 'Could not find that Participant ID. Please check and try again.';
    errEl.classList.remove('hidden');
  }
}

async function unlockWithToken(token) {
  try {
    const result = await apiAction('getParticipantByToken', { token });
    if (!result || !result.participant?.participantId) throw new Error('Invalid or expired link.');
    formState.accessMode = 'token';
    formState.token = token;
    initializeForm();
    prefillParticipantInfo(result.participant);
    showSections({ A: true, B: true, C: false, D: false });
    document.getElementById('view-form').classList.remove('hidden');
  } catch (err) {
    document.getElementById('lockedScreen').classList.remove('hidden');
    document.getElementById('lockedScreen').querySelector('p').textContent =
      'Your link is invalid or has expired. Please contact your HAPPY Program field officer.';
  }
}

function showSections({ A, B, C, D }) {
  document.getElementById('sectionA').classList.toggle('hidden', !A);
  document.getElementById('sectionB').classList.toggle('hidden', !B);
  document.getElementById('sectionC').classList.toggle('hidden', !C);
  document.getElementById('sectionD').classList.toggle('hidden', !D);
}

function lockSectionB() {
  const section = document.getElementById('sectionB');
  section.querySelectorAll('input, select, textarea').forEach(el => {
    el.disabled = true;
  });
  const notice = document.createElement('p');
  notice.textContent = 'Participant information loaded from existing record.';
  notice.style.cssText = 'font-size:0.75rem;color:#7c3aed;margin-bottom:0.5rem;font-weight:600;';
  section.querySelector('h2').insertAdjacentElement('afterend', notice);
}

function prefillParticipantInfo(data) {
  const fields = [
    'participantId','hamisId','onboardingDate','implementingPartner','region','district',
    'community','locationStatus','surname','firstName','otherNames','sex','dob',
    'telephone','idType','ghanaCardId','voterId','refugeeStatus','nationality',
    'displacementStatus','displacementReason','originalCommunity','hostCommunity',
    'disabilityStatus','disabilitySpecify','educationLevel','employmentStatus',
    'currentOccupation','monthlyIncome','incomeFrequency','sector','industry',
    'jobType','jobRole','workRegion','workDistrict'
  ];
  fields.forEach(f => {
    const el = document.getElementById(f);
    if (el && data[f] !== undefined) el.value = data[f];
  });
  if (data.age) document.getElementById('age').value = data.age;
  if (data.participantTypeAge) document.getElementById('participantTypeAge').value = data.participantTypeAge;
}

function setupEventListeners() {
  document.getElementById('collectorName').addEventListener('change', e => {
    formState.collectorName = e.target.value;
    localStorage.setItem('happyKollectCollector', e.target.value);
  });
  document.getElementById('telephone').addEventListener('blur', e => validatePhone(e.target));
  document.getElementById('ghanaCardId').addEventListener('blur', e => validateGhanaCard(e.target));
  window.addEventListener('online', () => { updateOnlineStatus(); syncPendingSubmissions(); });
  window.addEventListener('offline', updateOnlineStatus);
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
  document.getElementById('tab-form').classList.toggle('active', view === 'form');
  document.getElementById('tab-sheet').classList.toggle('active', view === 'sheet');
}

// ===== ADMIN LOGIN =====
function showAdminLogin() {
  if (formState.isAdmin) {
    setView('sheet');
    loadSheetData();
    return;
  }
  document.getElementById('adminModal').classList.remove('hidden');
  document.getElementById('adminPassword').value = '';
  document.getElementById('adminPassword').focus();
}
function closeAdminLogin() {
  document.getElementById('adminModal').classList.add('hidden');
}
async function verifyAdmin() {
  const pwd = document.getElementById('adminPassword').value;
  if (!pwd) { showToast('Enter the admin password', 'error'); return; }
  try {
    const data = await fetchProtectedSheetData(pwd);
    formState.isAdmin = true;
    formState.accessMode = 'admin';
    formState.adminPassword = pwd;
    formState.masterSheetData = data;
    closeAdminLogin();
    showToast('Admin access granted', 'success');
    if (document.getElementById('view-form').classList.contains('hidden')) {
      initializeForm();
      showSections({ A: true, B: true, C: true, D: true });
      document.getElementById('lockedScreen').classList.add('hidden');
      document.getElementById('view-form').classList.remove('hidden');
    }
    renderSheet(data);
    setView('sheet');
  } catch (err) {
    showToast(`Access denied: ${err.message}`, 'error');
  }
}

// ===== REGION & DISTRICT LOGIC =====
function populateRegions() {
  ['region', 'workRegion', 'placementRegion'].forEach(selId => {
    const sel = document.getElementById(selId);
    if (!sel) return;
    Object.keys(CONFIG.REGIONS).sort().forEach(region => {
      const opt = document.createElement('option');
      opt.value = region; opt.textContent = region;
      sel.appendChild(opt);
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
  } else {
    dist.disabled = true;
  }
}

// ===== CASCADE: Sector → Industry → Job Type → Job Role =====
function populateJobTypeOptions(select) {
  select.innerHTML = '<option value="">Select</option>';
  ['Management','Technical','Administrative','Support'].forEach(type => {
    const opt = document.createElement('option');
    opt.value = type; opt.textContent = type;
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
  document.getElementById('jobRole').innerHTML = '<option value="">Select</option>';
  document.getElementById('jobRole').disabled = true;
  if (industry) populateJobTypeOptions(typeSel);
}
function populateJobRoles() {
  const sector = document.getElementById('sector').value;
  const industry = document.getElementById('industry').value;
  const jobType = document.getElementById('jobType').value;
  const roleSel = document.getElementById('jobRole');
  roleSel.innerHTML = '<option value="">Select</option>';
  if (sector && industry && jobType && CONFIG.SECTOR_DATA[sector]?.[industry]) {
    CONFIG.SECTOR_DATA[sector][industry]
      .filter(role => classifyJobRole(role) === jobType)
      .forEach(role => {
        const opt = document.createElement('option');
        opt.value = role; opt.textContent = role;
        roleSel.appendChild(opt);
      });
    roleSel.disabled = false;
  }
}
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
  document.getElementById('plJobRole').innerHTML = '<option value="">Select</option>';
  document.getElementById('plJobRole').disabled = true;
  if (industry) populateJobTypeOptions(typeSel);
}
function populatePlacementJobRoles() {
  const sector = document.getElementById('plSector').value;
  const industry = document.getElementById('plIndustry').value;
  const jobType = document.getElementById('plJobType').value;
  const roleSel = document.getElementById('plJobRole');
  roleSel.innerHTML = '<option value="">Select</option>';
  if (sector && industry && jobType && CONFIG.SECTOR_DATA[sector]?.[industry]) {
    CONFIG.SECTOR_DATA[sector][industry]
      .filter(role => classifyJobRole(role) === jobType)
      .forEach(role => {
        const opt = document.createElement('option');
        opt.value = role; opt.textContent = role;
        roleSel.appendChild(opt);
      });
    roleSel.disabled = false;
  }
}
function classifyJobRole(role) {
  const text = role.toLowerCase();
  if (/\b(manager|director|principal|dean|registrar|administrator|superintendent|cto|lead|head)\b/.test(text)) return 'Management';
  if (/\b(accountant|bookkeeper|officer|coordinator|specialist|analyst|secretary|clerk|cashier|teller|buyer|recruiter|writer|controller|auditor|agent|rep|representative|relationship|records|admissions|documentation|dispatcher)\b/.test(text)) return 'Administrative';
  if (/\b(cleaner|security|guard|driver|loader|laborer|worker|operator|attendant|hand|janitor|gardener|courier|picker|stocker|sanitation|bellhop|housekeeper|room|laundry|shelf|storekeeper|warehouse|front desk|cashier|helper|assistant)\b/.test(text)) return 'Support';
  return 'Technical';
}

// ===== CONDITIONAL FIELD TOGGLES =====
function toggleRefugeeField() {
  const show = document.getElementById('refugeeStatus').value === 'Yes';
  document.getElementById('nationalityField').classList.toggle('hidden', !show);
}
function toggleDisplacementFields() {
  const show = document.getElementById('displacementStatus').value === 'Yes';
  ['displacementReasonField','originalCommunityField','hostCommunityField'].forEach(id => {
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
    ['currentOccupation','monthlyIncome','incomeFrequency','sector','industry','jobType','jobRole','workRegion','workDistrict','workCommunity'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    ['industry','jobType','jobRole','workDistrict'].forEach(id => {
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
    if (disabled && control.type !== 'radio' && control.type !== 'checkbox') control.value = '';
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
function onPartnerChange() { updatePartnerDisplays(); updateIds(); }
function updatePartnerDisplays() {
  const partner = document.getElementById('implementingPartner').value || 'the implementing partner';
  document.getElementById('partnerNameDisplay').textContent = partner;
  document.getElementById('partnerNameDisplay2').textContent = partner;
}
function updateIds() {
  const partner = document.getElementById('implementingPartner').value || 'UNK';
  const region = document.getElementById('region').value || 'XXX';
  const pPrefix = CONFIG.PARTNER_PREFIXES[partner] || partner.substring(0,3).toUpperCase();
  const rPrefix = region.substring(0,3).toUpperCase();
  const ts = new Date().toISOString().replace(/[-:T.]/g,'').substring(0,14);
  const seq = getNextLocalSequence();
  document.getElementById('submissionId').value = `${rPrefix}-${String(seq).padStart(6,'0')}-${ts}`;
  document.getElementById('subIdDisplay').textContent = `${rPrefix}-${String(seq).padStart(6,'0')}-${ts}`;
  document.getElementById('hamisId').value = `HAMIS-${rPrefix}-${String(seq).padStart(6,'0')}`;
  document.getElementById('participantId').placeholder = `${pPrefix}--${String(seq).padStart(7,'0')} (will auto-generate)`;
}
function generateDeviceId() {
  const saved = localStorage.getItem(CONFIG.DEVICE_ID_KEY);
  if (saved) return saved;
  const hash = `${navigator.userAgent}${navigator.platform}${navigator.language}${Date.now()}`
    .split('').reduce((a,b) => { a = ((a<<5)-a)+b.charCodeAt(0); return a&a; }, 0);
  const id = `DEV-${Math.abs(hash).toString(36).toUpperCase().substring(0,8)}`;
  localStorage.setItem(CONFIG.DEVICE_ID_KEY, id);
  return id;
}
function generateParticipantId() {
  return `HAPPY-${new Date().getFullYear()}-${String(getNextLocalSequence()).padStart(6,'0')}`;
}

// ===== VALIDATION =====
function validatePhone(input) {
  const val = input.value.replace(/\D/g,'');
  if (val && !/^0\d{9}$/.test(val)) {
    showToast('Phone must be 10 digits starting with 0 (e.g., 0244111111)', 'error');
    input.focus();
    return false;
  }
  return true;
}
function validateGhanaCard(input) {
  const val = input.value.toUpperCase();
  if (val && !/^GHA-\d{9}-\d$/.test(val)) {
    showToast('Ghana Card must be: GHA-XXXXXXXXX-X', 'error');
    input.focus();
    return false;
  }
  return true;
}
function formatGhanaCard(input) {
  let val = input.value.toUpperCase().replace(/[^A-Z0-9-]/g,'');
  if (!val.startsWith('GHA-')) val = 'GHA-' + val.replace('GHA','');
  if (val.length > 13 && val[13] !== '-') val = val.slice(0,13) + '-' + val.slice(13);
  input.value = val.slice(0,15);
}

// ===== OFFLINE QUEUE =====
function getPendingSubmissions() {
  try { return JSON.parse(localStorage.getItem(CONFIG.QUEUE_KEY)) || []; } catch { return []; }
}
function setPendingSubmissions(queue) {
  localStorage.setItem(CONFIG.QUEUE_KEY, JSON.stringify(queue));
}
function getNextLocalSequence() {
  return db.length + getPendingSubmissions().length + 1;
}
function queueSubmission(formData, reason = '') {
  const queue = getPendingSubmissions();
  if (queue.some(item => item.data.localQueueId === formData.localQueueId)) return;
  queue.push({ id: formData.localQueueId, data: { ...formData, syncStatus: 'queued' }, queuedAt: new Date().toISOString(), attempts: 0, lastError: reason });
  setPendingSubmissions(queue);
}
async function postSubmission(formData) {
  return apiAction('saveParticipantInfo', formData);
}
async function apiAction(action, data = {}) {
  const response = await fetch(CONFIG.API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...data, syncStatus: data.syncStatus || 'synced' })
  });
  const text = await response.text();
  let result;
  try { result = JSON.parse(text); } catch {
    throw new Error(text.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim() || 'Non-JSON response from backend');
  }
  if (!response.ok || (result.status !== 'OK' && result.status !== 'success')) {
    throw new Error(result.message || `Request failed (${response.status})`);
  }
  return result;
}
function saveLocalSubmission(formData, referenceId = '') {
  const record = { ...formData, referenceId, syncStatus: 'synced', syncedAt: new Date().toISOString() };
  if (!db.some(item => item.localQueueId === record.localQueueId)) {
    db.push(record);
    localStorage.setItem(CONFIG.LOCAL_DB_KEY, JSON.stringify(db));
  }
}
async function syncPendingSubmissions() {
  if (formState.isSyncing || !navigator.onLine) return;
  let queue = getPendingSubmissions();
  if (!queue.length) { updateOnlineStatus(); return; }
  formState.isSyncing = true;
  showToast(`Syncing ${queue.length} queued record(s)...`, 'info');
  for (const item of [...queue]) {
    try {
      const result = await postSubmission(item.data);
      saveLocalSubmission(item.data, result.referenceId || item.data.submissionId);
      queue = queue.filter(p => p.id !== item.id);
      localStorage.setItem(CONFIG.QUEUE_KEY, JSON.stringify(queue));
    } catch (err) {
      queue = queue.map(p => p.id !== item.id ? p : { ...p, attempts: p.attempts + 1, lastError: err.message, lastAttemptAt: new Date().toISOString() });
      localStorage.setItem(CONFIG.QUEUE_KEY, JSON.stringify(queue));
      showToast(`Sync paused: ${err.message}`, 'error');
      break;
    }
  }
  formState.isSyncing = false;
  if (!queue.length) showToast('All queued records synced.', 'success');
  updateOnlineStatus();
}

// ===== FORM SUBMISSION =====
async function handleSubmit(e) {
  e.preventDefault();
  if (formState.isSubmitting) return;
  if (!validateVisibleRequiredFields()) return;
  if (!validatePhone(document.getElementById('telephone'))) return;
  if (document.getElementById('idType').value === 'Ghana Card' && !validateGhanaCard(document.getElementById('ghanaCardId'))) return;

  formState.isSubmitting = true;
  const btn = document.getElementById('submitBtn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span class="spinner"></span> Submitting...';
  btn.disabled = true;

  try {
    const formData = collectFormData();
    showToast(navigator.onLine ? 'Submitting to Google Sheets...' : 'Offline — saving locally.', 'info');
    if (!navigator.onLine) {
      queueSubmission(formData, 'Device offline');
      showSubmissionComplete(formData.submissionId, 'Saved locally. Will sync when internet returns.', 'queued');
    } else {
      try {
        const result = await postSubmission(formData);
        if (result.participantId) {
          formData.participantId = result.participantId;
          document.getElementById('participantId').value = result.participantId;
        }
        saveLocalSubmission(formData, result.referenceId || result.participantId || formData.submissionId);
        showSubmissionComplete(result.referenceId || result.participantId || formData.submissionId, 'Saved to Google Sheets.', 'submitted');
        showToast('Submitted to Google Sheets.', 'success');
      } catch (syncErr) {
        queueSubmission(formData, syncErr.message);
        showSubmissionComplete(formData.submissionId, 'Saved locally. Will retry automatically.', 'pending');
        showToast('Backend unavailable. Saved locally.', 'success');
      }
    }
  } catch (err) {
    showToast(`Error: ${err.message}`, 'error');
  } finally {
    formState.isSubmitting = false;
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

function showSubmissionComplete(referenceId, message, status) {
  document.getElementById('refDisplay').textContent = referenceId || 'N/A';
  document.getElementById('mainForm').classList.add('hidden');
  document.getElementById('successScreen').classList.add('show');
  showStatus(message, status === 'submitted' ? 'online' : 'offline');
}

function validateVisibleRequiredFields() {
  const requiredFields = Array.from(document.getElementById('mainForm').querySelectorAll('[required]'));
  for (const field of requiredFields) {
    if (field.disabled || !isFieldVisible(field)) continue;
    if (field.type === 'radio') {
      if (document.querySelector(`input[name="${field.name}"]:checked`)) continue;
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
  const modules = Array.from(document.querySelectorAll('input[name="modules"]:checked')).map(cb => cb.value).join(', ');
  const digitalSkills = Array.from(document.querySelectorAll('input[name="digitalSkills"]:checked')).map(cb => cb.value).join(', ');
  const disabilityStatus = document.getElementById('disabilityStatus').value || 'No';
  return {
    action: 'saveParticipantInfo',
    submissionId: document.getElementById('submissionId').value,
    participantId: document.getElementById('participantId').value || generateParticipantId(),
    localQueueId: globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `LOCAL-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    syncStatus: 'pending',
    collectorName: document.getElementById('collectorName').value,
    deviceId: formState.deviceId,
    submissionTimestamp: new Date().toISOString(),
    hamisId: document.getElementById('hamisId').value,
    onboardingDate: document.getElementById('onboardingDate').value,
    implementingPartner: document.getElementById('implementingPartner').value,
    region: document.getElementById('region').value,
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
    modules,
    digitalSkills,
    wishTraining: document.getElementById('wishTraining').value,
    previousTrainings: document.getElementById('previousTrainings').value,
    previousTrainingDesc: document.getElementById('previousTrainingDesc').value,
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
    currentIncomeAlt: document.getElementById('currentIncomeAlt').value,
    source: 'kollect',
    accessMode: formState.accessMode || '',
    token: formState.token || ''
  };
}

function resetForm() {
  document.getElementById('mainForm').reset();
  document.getElementById('mainForm').classList.remove('hidden');
  document.getElementById('successScreen').classList.remove('show');
  ['baselineEmploymentFields','capacityFields','placementFields','currentEmploymentFields'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('show');
  });
  ['nationalityField','disabilitySpecField','virtualTrainingFields','previousTrainingDetails',
   'currentEmploymentDetails','displacementReasonField','originalCommunityField','hostCommunityField'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  ['district','industry','jobType','jobRole','placementDistrict','workDistrict','plIndustry','plJobType','plJobRole'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
  });
  document.querySelectorAll('input[name="tr_check"]').forEach(r => r.checked = r.value === 'No');
  document.querySelectorAll('input[name="pl_check"]').forEach(r => r.checked = r.value === 'No');
  toggleCapacityFields(false);
  togglePlacementFields(false);
  document.getElementById('onboardingDate').valueAsDate = new Date();
  handleIdTypeChange();
  toggleBaselineEmploymentFields();
  updateIds();
  hideStatus();
  formState.isSubmitting = false;
}

// ===== MASTER SHEET FUNCTIONS =====
async function loadSheetData() {
  if (!formState.isAdmin) { showAdminLogin(); return; }
  if (formState.isSheetLoading) return;
  formState.isSheetLoading = true;
  const tbody = document.getElementById('sheetBody');
  if (tbody) tbody.innerHTML = '<tr><td colspan="25" style="text-align:center;padding:1.5rem;color:#64748b">Loading from Google Sheets...</td></tr>';
  try {
    const data = await fetchProtectedSheetData(formState.adminPassword);
    formState.masterSheetData = data;
    renderSheet(data);
  } catch (err) {
    showToast(`Failed to load: ${err.message}`, 'error');
  } finally {
    formState.isSheetLoading = false;
  }
}

async function fetchProtectedSheetData(adminPassword) {
  let result;
  try {
    const response = await fetch(CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'getSheetData', adminPassword })
    });
    result = await response.json();
    if (!response.ok) throw new Error(result.message || `Failed (${response.status})`);
  } catch {
    result = await fetchProtectedSheetDataJsonp(adminPassword);
  }
  if (result.status !== 'OK') throw new Error(result.message || 'Failed to unlock Master Sheet');
  return result.data || [];
}

function fetchProtectedSheetDataJsonp(adminPassword) {
  return new Promise((resolve, reject) => {
    const cbName = `happyKollectData_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const url = new URL(CONFIG.API_ENDPOINT);
    url.searchParams.set('action', 'getSheetData');
    url.searchParams.set('adminPassword', adminPassword);
    url.searchParams.set('callback', cbName);
    const script = document.createElement('script');
    const timeout = setTimeout(() => { cleanup(); reject(new Error('Timed out loading sheet data')); }, 15000);
    function cleanup() { clearTimeout(timeout); delete window[cbName]; script.remove(); }
    window[cbName] = result => { cleanup(); resolve(result); };
    script.onerror = () => { cleanup(); reject(new Error('Could not connect to Google Sheets')); };
    script.src = url.toString();
    document.body.appendChild(script);
  });
}

function renderSheet(data) {
  const head = document.getElementById('sheetHead');
  const body = document.getElementById('sheetBody');
  if (!data?.length) {
    head.innerHTML = '';
    body.innerHTML = '<tr><td colspan="25" style="text-align:center;padding:1.5rem;color:#64748b">No data found in the sheet.</td></tr>';
    return;
  }
  const priorityCols = ['participantId','participantInfoStatus','collectorName','submissionTimestamp','onboardingDate','implementingPartner','region','district','community','surname','firstName','otherNames','sex','dob','age','participantTypeAge','telephone','refugeeStatus','disabilityStatus','employmentStatus','lastUpdatedAt'];
  const allCols = Array.from(data.reduce((set, row) => { Object.keys(row||{}).forEach(k => set.add(k)); return set; }, new Set()));
  const columns = priorityCols.filter(c => allCols.includes(c)).concat(allCols.filter(c => !priorityCols.includes(c)));
  head.innerHTML = '';
  const trH = document.createElement('tr');
  columns.forEach(k => { const th = document.createElement('th'); th.textContent = humanizeHeader(k); trH.appendChild(th); });
  head.appendChild(trH);
  body.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    columns.forEach(col => { const td = document.createElement('td'); td.textContent = formatCell(row[col]); tr.appendChild(td); });
    body.appendChild(tr);
  });
}

function humanizeHeader(key) {
  return String(key||'').replace(/([a-z0-9])([A-Z])/g,'$1 $2').replace(/^./,c=>c.toUpperCase());
}
function formatCell(value) {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const d = new Date(value);
    if (!isNaN(d)) return d.toLocaleString();
  }
  return String(value);
}
function escapeHtml(v) {
  return String(v||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function exportSheetData() {
  const data = formState.masterSheetData;
  if (!data || !data.length) { showToast('No data to export — refresh first.', 'error'); return; }
  const keys = Array.from(data.reduce((set, row) => { Object.keys(row||{}).forEach(k => set.add(k)); return set; }, new Set()));
  const csv = [
    keys.join(','),
    ...data.map(row => keys.map(k => {
      const val = String(row[k] ?? '').replace(/"/g, '""');
      return (val.includes(',') || val.includes('"') || val.includes('\n')) ? `"${val}"` : val;
    }).join(','))
  ].join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `happy-kollect-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('CSV downloaded.', 'success');
}

// ===== UI UTILITIES =====
function showToast(msg, type = 'info') {
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
function updateOnlineStatus() {
  const pending = getPendingSubmissions().length;
  if (navigator.onLine && pending) {
    showStatus(`Online — ${pending} record(s) pending sync`, 'offline');
  } else if (navigator.onLine) {
    showStatus('Online — data syncs to Google Sheets', 'online');
    setTimeout(() => hideStatus(), 3000);
  } else {
    showStatus(pending ? `Offline — ${pending} record(s) saved locally` : 'Offline — new data will be saved locally', 'offline');
  }
}
