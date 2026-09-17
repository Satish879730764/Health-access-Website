import type { Lang } from "@/lib/i18n";

type L = Record<Lang, string>;

export const user = { name: { en: "Meena", hi: "मीना" } as L };

export const transcript: L = {
  hi: "मेरी माँ को तेज़ बुखार है, पास का अस्पताल कहाँ है?",
  en: "My mother has a high fever, where is the nearest hospital?",
};

export const agentSteps: { label: L; detail: L; ms: number }[] = [
  {
    label: { en: "Query understood", hi: "प्रश्न समझा गया" },
    detail: { en: "Hindi speech → text", hi: "हिंदी वाणी → पाठ" },
    ms: 900,
  },
  {
    label: { en: "Classified: General care", hi: "वर्गीकृत: सामान्य देखभाल" },
    detail: { en: "Non-emergency, fever", hi: "गैर-आपात, बुखार" },
    ms: 1700,
  },
  {
    label: { en: "Retrieving nearby facilities", hi: "आस-पास की सुविधाएँ खोजी जा रही हैं" },
    detail: { en: "12 records matched", hi: "12 रिकॉर्ड मिले" },
    ms: 2600,
  },
  {
    label: { en: "Preparing route guidance", hi: "रास्ता तैयार किया जा रहा है" },
    detail: { en: "Shortest road route", hi: "सबसे छोटा सड़क मार्ग" },
    ms: 3500,
  },
];

export type Facility = {
  id: string;
  name: L;
  type: L;
  kind: "hospital" | "phc" | "pharmacy";
  distanceKm: number;
  minutes: number;
  open: boolean;
  reason: L;
  address: L;
  hours: L;
  phone: string;
  services: L[];
};

export const facilities: Facility[] = [
  {
    id: "chc-rampur",
    name: { en: "Rampur Community Health Centre", hi: "रामपुर सामुदायिक स्वास्थ्य केंद्र" },
    type: { en: "Community Health Centre", hi: "सामुदायिक स्वास्थ्य केंद्र" },
    kind: "hospital",
    distanceKm: 3.2,
    minutes: 11,
    open: true,
    reason: { en: "Has fever OPD and a doctor on duty now", hi: "बुखार ओपीडी और अभी डॉक्टर उपलब्ध" },
    address: { en: "Main Road, Rampur, Sitapur", hi: "मुख्य मार्ग, रामपुर, सीतापुर" },
    hours: { en: "Open 24 hours", hi: "24 घंटे खुला" },
    phone: "+91 98200 11223",
    services: [
      { en: "Fever OPD", hi: "बुखार ओपीडी" },
      { en: "Lab tests", hi: "जाँच" },
      { en: "Free medicines", hi: "मुफ़्त दवाइयाँ" },
      { en: "Ayushman Bharat", hi: "आयुष्मान भारत" },
    ],
  },
  {
    id: "phc-bela",
    name: { en: "Bela Primary Health Centre", hi: "बेला प्राथमिक स्वास्थ्य केंद्र" },
    type: { en: "Primary Health Centre", hi: "प्राथमिक स्वास्थ्य केंद्र" },
    kind: "phc",
    distanceKm: 1.4,
    minutes: 6,
    open: true,
    reason: { en: "Closest centre, short waiting time", hi: "सबसे पास, कम प्रतीक्षा" },
    address: { en: "Bela Village, Block 4", hi: "बेला गाँव, ब्लॉक 4" },
    hours: { en: "8 AM – 6 PM", hi: "सुबह 8 – शाम 6" },
    phone: "+91 98200 44556",
    services: [
      { en: "General OPD", hi: "सामान्य ओपीडी" },
      { en: "Vaccination", hi: "टीकाकरण" },
      { en: "Maternal care", hi: "मातृ देखभाल" },
    ],
  },
  {
    id: "dh-sitapur",
    name: { en: "Sitapur District Hospital", hi: "सीतापुर जिला अस्पताल" },
    type: { en: "District Hospital", hi: "जिला अस्पताल" },
    kind: "hospital",
    distanceKm: 8.7,
    minutes: 24,
    open: true,
    reason: { en: "Emergency ward and ICU beds available", hi: "आपातकालीन वार्ड और आईसीयू उपलब्ध" },
    address: { en: "Civil Lines, Sitapur", hi: "सिविल लाइंस, सीतापुर" },
    hours: { en: "Open 24 hours", hi: "24 घंटे खुला" },
    phone: "+91 98200 77889",
    services: [
      { en: "Emergency", hi: "आपातकाल" },
      { en: "ICU", hi: "आईसीयू" },
      { en: "Surgery", hi: "शल्य चिकित्सा" },
      { en: "X-Ray", hi: "एक्स-रे" },
    ],
  },
  {
    id: "jan-aushadhi",
    name: { en: "Jan Aushadhi Kendra", hi: "जन औषधि केंद्र" },
    type: { en: "Pharmacy", hi: "दवा की दुकान" },
    kind: "pharmacy",
    distanceKm: 1.1,
    minutes: 5,
    open: false,
    reason: { en: "Low-cost generic fever medicines", hi: "सस्ती जेनेरिक बुखार दवाइयाँ" },
    address: { en: "Bus Stand Road, Bela", hi: "बस अड्डा रोड, बेला" },
    hours: { en: "9 AM – 8 PM", hi: "सुबह 9 – रात 8" },
    phone: "+91 98200 33445",
    services: [
      { en: "Generic medicines", hi: "जेनेरिक दवाइयाँ" },
      { en: "BP check", hi: "बीपी जाँच" },
    ],
  },
];

export const emergencyContacts: { label: L; number: string }[] = [
  { label: { en: "Ambulance", hi: "एम्बुलेंस" }, number: "108" },
  { label: { en: "Health Helpline", hi: "स्वास्थ्य हेल्पलाइन" }, number: "104" },
  { label: { en: "Police", hi: "पुलिस" }, number: "112" },
  { label: { en: "ASHA worker — Sunita", hi: "आशा कार्यकर्ता — सुनीता" }, number: "+91 98200 12345" },
];

export const awarenessCards: { title: L; body: L; tag: L }[] = [
  {
    tag: { en: "Fever care", hi: "बुखार देखभाल" },
    title: { en: "When fever needs a doctor", hi: "बुखार में डॉक्टर कब ज़रूरी" },
    body: {
      en: "If fever stays above 3 days, or comes with rash, fits or breathing trouble, visit a health centre.",
      hi: "यदि बुखार 3 दिन से अधिक रहे, या दाने, दौरे या साँस की तकलीफ़ हो, तो स्वास्थ्य केंद्र जाएँ।",
    },
  },
  {
    tag: { en: "Scheme", hi: "योजना" },
    title: { en: "Ayushman Bharat PM-JAY", hi: "आयुष्मान भारत पीएम-जय" },
    body: {
      en: "Free treatment up to ₹5 lakh per family per year at listed hospitals. Carry your Aadhaar and card.",
      hi: "सूचीबद्ध अस्पतालों में प्रति परिवार प्रति वर्ष ₹5 लाख तक मुफ़्त इलाज। आधार और कार्ड साथ रखें।",
    },
  },
  {
    tag: { en: "Mother & child", hi: "माँ और शिशु" },
    title: { en: "Janani Suraksha Yojana", hi: "जननी सुरक्षा योजना" },
    body: {
      en: "Cash help for safe delivery at a government facility, plus free transport in many districts.",
      hi: "सरकारी केंद्र में सुरक्षित प्रसव पर नकद सहायता, कई जिलों में मुफ़्त परिवहन भी।",
    },
  },
  {
    tag: { en: "Clean water", hi: "स्वच्छ पानी" },
    title: { en: "Preventing diarrhoea at home", hi: "घर पर दस्त से बचाव" },
    body: {
      en: "Boil drinking water, wash hands with soap, and give ORS early to children who are loose-motion.",
      hi: "पीने का पानी उबालें, साबुन से हाथ धोएँ, और दस्त होने पर बच्चों को जल्दी ओआरएस दें।",
    },
  },
];
