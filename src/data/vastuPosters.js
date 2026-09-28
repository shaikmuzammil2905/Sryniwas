// Vastu Posters Data
// This is the canonical data source for Vastu Posters.
// Admin can override values via localStorage (key: 'vastuPostersData').

export const FORM_TYPES = {
  NONE: 'none',
  MOBILE_NUMEROLOGY: 'mobile-numerology',
  NAME_CORRECTION: 'name-correction',
  YANTRA_SOFTWARE: 'yantra-software',
  NUMERO_VASTU: 'numero-vastu',
};

export const FORM_LABELS = {
  [FORM_TYPES.NONE]: 'No Form',
  [FORM_TYPES.MOBILE_NUMEROLOGY]: 'Mobile Number Numerology Report',
  [FORM_TYPES.NAME_CORRECTION]: 'Name Correction Report',
  [FORM_TYPES.YANTRA_SOFTWARE]: 'Yantra Software',
  [FORM_TYPES.NUMERO_VASTU]: 'Numero Vastu',
};

export const defaultVastuPostersData = [
  {
    id: 'vp-01',
    slug: 'naradistri-01',
    displayOrder: 1,
    name: 'Naradistri',
    location: 'Entrance Door, Main Gate, Vehicles',
    description: 'Auspicious Vastu name plate for your entrance, main gate, cars and bikes.',
    price: 199,
    image: '/images/vastu-posters/naradistri-01.png',
    formType: FORM_TYPES.NONE,
        nameTe: 'నారదదృష్టి',
    locationTe: 'ప్రవేశ ద్వారం, ప్రధాన గేట్, వాహనాలు',
    descriptionTe: 'మీ ప్రవేశ ద్వారం, ప్రధాన గేట్, కార్లు మరియు బైక్‌ల కోసం వాస్తు నేమ్ ప్లేట్.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-02',
    slug: 'naradistri-02',
    displayOrder: 2,
    name: 'Naradistri',
    location: 'Entrance Door, Main Gate, Vehicles',
    description: 'Auspicious Vastu name plate for your entrance, main gate, cars and bikes.',
    price: 199,
    image: '/images/vastu-posters/naradistri-02.png',
    formType: FORM_TYPES.NONE,
        nameTe: 'నారదదృష్టి',
    locationTe: 'ప్రవేశ ద్వారం, ప్రధాన గేట్, వాహనాలు',
    descriptionTe: 'మీ ప్రవేశ ద్వారం, ప్రధాన గేట్, కార్లు మరియు బైక్‌ల కోసం వాస్తు నేమ్ ప్లేట్.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-03',
    slug: 'angel-numbers',
    displayOrder: 3,
    name: 'Angel Numbers',
    location: 'North Center, Bedroom or Hall',
    description: 'Angel-number and lucky-colour reference chart for everyday guidance.',
    price: 199,
    image: '/images/vastu-posters/angel-numbers.png',
    formType: FORM_TYPES.MOBILE_NUMEROLOGY,
        nameTe: 'ఏంజెల్ నంబర్స్',
    locationTe: 'ఉత్తర కేంద్రం, బెడ్‌రూమ్ లేదా హాల్',
    descriptionTe: 'రోజువారీ మార్గదర్శకత్వం కోసం ఏంజెల్-నంబర్ మరియు లక్కీ-కలర్ చార్ట్.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-04',
    slug: 'women-health',
    displayOrder: 4,
    name: 'Women Health',
    location: 'Kitchen, East-South',
    description: 'Supports women\'s health and overall wellbeing in the home.',
    price: 199,
    image: '/images/vastu-posters/women-health.png',
    formType: FORM_TYPES.YANTRA_SOFTWARE,
        nameTe: 'మహిళల ఆరోగ్యం',
    locationTe: 'వంటగది, తూర్పు-దక్షిణం',
    descriptionTe: 'ఇంట్లో మహిళల ఆరోగ్యం మరియు శ్రేయస్సుకు మద్దతు ఇస్తుంది.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-05',
    slug: 'santhanam',
    displayOrder: 5,
    name: 'Santhanam',
    location: 'West-South Bedroom',
    description: 'Blessings for a healthy pregnancy and healthy, happy children.',
    price: 199,
    image: '/images/vastu-posters/santhanam.png',
    formType: FORM_TYPES.NUMERO_VASTU,
        nameTe: 'సంతానం',
    locationTe: 'పశ్చిమ-దక్షిణ బెడ్‌రూమ్',
    descriptionTe: 'ఆరోగ్యకరమైన గర్భధారణ మరియు సంతోషకరమైన పిల్లల కోసం ఆశీర్వాదాలు.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-06',
    slug: 'court-case',
    displayOrder: 6,
    name: 'Court Case',
    location: 'North-West Bedroom',
    description: 'Support for favourable outcomes in court cases and legal matters.',
    price: 199,
    image: '/images/vastu-posters/court-case.png',
    formType: FORM_TYPES.NAME_CORRECTION,
        nameTe: 'కోర్టు కేసు',
    locationTe: 'వాయువ్య బెడ్‌రూమ్',
    descriptionTe: 'కోర్టు కేసులు మరియు చట్టపరమైన విషయాలలో అనుకూలమైన ఫలితాల కోసం.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-07',
    slug: 'marriage',
    displayOrder: 7,
    name: 'Marriage',
    location: 'East Center, Bedroom',
    description: 'Attracts a timely marriage and the right life partner.',
    price: 199,
    image: '/images/vastu-posters/marriage.png',
    formType: FORM_TYPES.NUMERO_VASTU,
        nameTe: 'వివాహం',
    locationTe: 'తూర్పు కేంద్రం, బెడ్‌రూమ్',
    descriptionTe: 'సరైన జీవిత భాగస్వామిని మరియు సకాలంలో వివాహాన్ని ఆకర్షిస్తుంది.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-08',
    slug: 'job-poster',
    displayOrder: 8,
    name: 'Job Poster',
    location: 'North Center, Bedroom',
    description: 'For getting a new job and keeping it secure.',
    price: 199,
    image: '/images/vastu-posters/job-poster.png',
    formType: FORM_TYPES.MOBILE_NUMEROLOGY,
        nameTe: 'ఉద్యోగం',
    locationTe: 'ఉత్తర కేంద్రం, బెడ్‌రూమ్',
    descriptionTe: 'కొత్త ఉద్యోగం పొందడానికి మరియు దానిని సురక్షితంగా ఉంచడానికి.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-09',
    slug: 'education',
    displayOrder: 9,
    name: 'Education',
    location: 'East Center, Bedroom',
    description: 'Boosts focus, learning and academic success.',
    price: 199,
    image: '/images/vastu-posters/education.png',
    formType: FORM_TYPES.YANTRA_SOFTWARE,
        nameTe: 'విద్య',
    locationTe: 'తూర్పు కేంద్రం, బెడ్‌రూమ్',
    descriptionTe: 'ఏకాగ్రత, అభ్యాసం మరియు విద్యావిషయక విజయాన్ని పెంచుతుంది.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-10',
    slug: 'creativity',
    displayOrder: 10,
    name: 'Creativity',
    location: 'South-East Bedroom',
    description: 'Sparks creativity, fresh ideas and new beginnings.',
    price: 199,
    image: '/images/vastu-posters/creativity.png',
    formType: FORM_TYPES.NUMERO_VASTU,
        nameTe: 'సృజనాత్మకత',
    locationTe: 'ఆగ్నేయ బెడ్‌రూమ్',
    descriptionTe: 'సృజనాత్మకత, కొత్త ఆలోచనలు మరియు కొత్త ప్రారంభాలను ప్రేరేపిస్తుంది.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-11',
    slug: 'bank-loan',
    displayOrder: 11,
    name: 'Bank Loan',
    location: 'North-West Bedroom',
    description: 'Helps in clearing bank loans and reducing financial burdens.',
    price: 199,
    image: '/images/vastu-posters/bank-loan.png',
    formType: FORM_TYPES.NAME_CORRECTION,
        nameTe: 'బ్యాంకు రుణం',
    locationTe: 'వాయువ్య బెడ్‌రూమ్',
    descriptionTe: 'బ్యాంకు రుణాలు తీర్చడానికి మరియు ఆర్థిక భారాన్ని తగ్గించడానికి సహాయపడుతుంది.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-12',
    slug: 'wife-and-husband-love',
    displayOrder: 12,
    name: 'Wife and Husband Love',
    location: 'North-West Bedroom',
    description: 'Strengthens love and harmony between wife and husband.',
    price: 199,
    image: '/images/vastu-posters/wife-and-husband-love.png',
    formType: FORM_TYPES.NUMERO_VASTU,
        nameTe: 'భార్యాభర్తల ప్రేమ',
    locationTe: 'వాయువ్య బెడ్‌రూమ్',
    descriptionTe: 'భార్యాభర్తల మధ్య ప్రేమ మరియు సామరస్యాన్ని బలపరుస్తుంది.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-13',
    slug: 'family-love-and-money',
    displayOrder: 13,
    name: 'Family Love and Money',
    location: 'West-South Bedroom',
    description: 'Nurtures family bonding along with wealth and abundance.',
    price: 199,
    image: '/images/vastu-posters/family-love-and-money.png',
    formType: FORM_TYPES.NUMERO_VASTU,
        nameTe: 'కుటుంబ ప్రేమ మరియు డబ్బు',
    locationTe: 'పశ్చిమ-దక్షిణ బెడ్‌రూమ్',
    descriptionTe: 'సంపద మరియు సమృద్ధితో పాటు కుటుంబ బంధాన్ని పెంపొందిస్తుంది.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-14',
    slug: 'relation-for-relatives-and-society',
    displayOrder: 14,
    name: 'Relation for Relatives and Society',
    location: 'West-South Bedroom',
    description: 'Improves ties with relatives and your standing in society.',
    price: 199,
    image: '/images/vastu-posters/relation-for-relatives.png',
    formType: FORM_TYPES.NUMERO_VASTU,
        nameTe: 'బంధువులు మరియు సమాజం',
    locationTe: 'పశ్చిమ-దక్షిణ బెడ్‌రూమ్',
    descriptionTe: 'బంధువులతో మీ సంబంధాలను మరియు సమాజంలో మీ స్థానాన్ని మెరుగుపరుస్తుంది.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-15',
    slug: 'seven-horses',
    displayOrder: 15,
    name: 'Seven Horses',
    location: 'North-East Hall',
    description: 'Seven running horses for growth, momentum and cash flow.',
    price: 199,
    image: '/images/vastu-posters/seven-horses.png',
    formType: FORM_TYPES.NONE,
        nameTe: 'ఏడు గుర్రాలు',
    locationTe: 'ఈశాన్య హాల్',
    descriptionTe: 'వృద్ధి, వేగం మరియు నగదు ప్రవాహం కోసం ఏడు పరుగెత్తే గుర్రాలు.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-16',
    slug: 'property',
    displayOrder: 16,
    name: 'Property',
    location: 'West-South Bedroom or Hall',
    description: 'Supports property, assets and real-estate gains.',
    price: 199,
    image: '/images/vastu-posters/property.png',
    formType: FORM_TYPES.NAME_CORRECTION,
        nameTe: 'ఆస్తి',
    locationTe: 'పశ్చిమ-దక్షిణ బెడ్‌రూమ్ లేదా హాల్',
    descriptionTe: 'ఆస్తి మరియు రియల్ ఎస్టేట్ లాభాలకు మద్దతు ఇస్తుంది.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-17',
    slug: 'own-house-manifestation',
    displayOrder: 17,
    name: 'Own House Manifestation',
    location: 'North Center, Bedroom',
    description: 'Manifestation support for owning your own house.',
    price: 199,
    image: '/images/vastu-posters/own-house-manifestation.png',
    formType: FORM_TYPES.MOBILE_NUMEROLOGY,
        nameTe: 'సొంత ఇల్లు',
    locationTe: 'ఉత్తర కేంద్రం, బెడ్‌రూమ్',
    descriptionTe: 'సొంత ఇల్లు సొంతం చేసుకోవడానికి మేనిఫెస్టేషన్ మద్దతు.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-18',
    slug: 'car-manifestation',
    displayOrder: 18,
    name: 'Car Manifestation',
    location: 'North Center, Bedroom',
    description: 'Manifestation support for owning a car.',
    price: 199,
    image: '/images/vastu-posters/car-manifestation.png',
    formType: FORM_TYPES.MOBILE_NUMEROLOGY,
        nameTe: 'కారు',
    locationTe: 'ఉత్తర కేంద్రం, బెడ్‌రూమ్',
    descriptionTe: 'కారు సొంతం చేసుకోవడానికి మేనిఫెస్టేషన్ మద్దతు.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
  {
    id: 'vp-19',
    slug: 'business-growth',
    displayOrder: 19,
    name: 'Business Growth',
    location: 'Business, East-North',
    description: 'Supports business growth and expansion.',
    price: 199,
    image: '/images/vastu-posters/business-growth.png',
    formType: FORM_TYPES.NUMERO_VASTU,
        nameTe: 'వ్యాపార వృద్ధి',
    locationTe: 'వ్యాపారం, తూర్పు-ఉత్తరం',
    descriptionTe: 'వ్యాపార వృద్ధి మరియు విస్తరణకు మద్దతు ఇస్తుంది.',
isActive: true,
    productType: 'VASTU_POSTER',
  },
];

// LocalStorage key for admin overrides
const STORAGE_KEY = 'vastuPostersData';

// Get all posters (with admin overrides applied)
export const getVastuPosters = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults so new fields (like nameTe) are available if the cache is old
      return parsed.map(savedItem => {
        const defaultItem = defaultVastuPostersData.find(d => d.id === savedItem.id);
        return { ...defaultItem, ...savedItem };
      });
    }
  } catch {
    // Fall through to defaults
  }
  return defaultVastuPostersData;
};

// Get active posters sorted by displayOrder
export const getActiveVastuPosters = () => {
  return getVastuPosters()
    .filter(p => p.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
};

// Get poster by slug
export const getVastuPosterBySlug = (slug) => {
  return getVastuPosters().find(p => p.slug === slug);
};

// Get poster by id
export const getVastuPosterById = (id) => {
  return getVastuPosters().find(p => p.id === id);
};

// Save all posters (admin)
export const saveVastuPosters = (posters) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posters));
};

// Save single poster (admin)
export const saveVastuPoster = (poster) => {
  const all = getVastuPosters();
  const idx = all.findIndex(p => p.id === poster.id);
  if (idx >= 0) {
    all[idx] = poster;
  } else {
    all.push(poster);
  }
  saveVastuPosters(all);
  return all;
};

// Delete poster (admin)
export const deleteVastuPoster = (id) => {
  const all = getVastuPosters().filter(p => p.id !== id);
  saveVastuPosters(all);
  return all;
};

// Reset to defaults (admin)
export const resetVastuPostersToDefaults = () => {
  localStorage.removeItem(STORAGE_KEY);
  return defaultVastuPostersData;
};

// Form submissions storage
const SUBMISSIONS_KEY = 'vastuPosterSubmissions';

export const saveFormSubmission = (submission) => {
  try {
    const existing = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
    const newSubmission = {
      id: `sub-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...submission,
    };
    existing.unshift(newSubmission);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(existing));
    return newSubmission;
  } catch {
    return null;
  }
};

export const getFormSubmissions = () => {
  try {
    return JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
  } catch {
    return [];
  }
};

// Generate unique ID for new posters
export const generatePosterId = () => {
  return `vp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

