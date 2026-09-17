export type Lang = "en" | "hi";

export const strings = {
  appTitle: { en: "HealthAccess — Prototype Walkthrough", hi: "हेल्थएक्सेस — प्रोटोटाइप वॉकथ्रू" },
  appSubtitle: {
    en: "AI health navigation for rural India. Demo only — no medical advice.",
    hi: "ग्रामीण भारत के लिए एआई स्वास्थ्य मार्गदर्शन। केवल डेमो — चिकित्सकीय सलाह नहीं।",
  },
  greeting: { en: "Hello", hi: "नमस्ते" },
  tapSpeak: { en: "Tap and speak", hi: "दबाएँ और बोलें" },
  tapSpeakHint: { en: "Ask in Hindi or English", hi: "हिंदी या अंग्रेज़ी में पूछें" },
  findFacility: { en: "Find a Facility", hi: "अस्पताल खोजें" },
  emergencyHelp: { en: "Emergency Help", hi: "आपातकालीन मदद" },
  healthInfo: { en: "Health Info", hi: "स्वास्थ्य जानकारी" },
  schemes: { en: "Govt. Schemes", hi: "सरकारी योजनाएँ" },
  listening: { en: "Listening…", hi: "सुन रहे हैं…" },
  youSaid: { en: "You said", hi: "आपने कहा" },
  agentsAtWork: { en: "Agents at work", hi: "एजेंट काम पर" },
  nearbyFacilities: { en: "Nearby facilities", hi: "आस-पास की सुविधाएँ" },
  matched: { en: "Matched to your query", hi: "आपकी बात से मेल" },
  open: { en: "Open now", hi: "अभी खुला" },
  closed: { en: "Closed", hi: "बंद" },
  getDirections: { en: "Get Directions", hi: "रास्ता देखें" },
  services: { en: "Services", hi: "सेवाएँ" },
  hours: { en: "Hours", hi: "समय" },
  contact: { en: "Contact", hi: "संपर्क" },
  callAmbulance: { en: "Call Ambulance 108", hi: "एम्बुलेंस 108 बुलाएँ" },
  emergencyTitle: { en: "Emergency", hi: "आपातकाल" },
  emergencyNote: {
    en: "Stay calm. Help is one tap away.",
    hi: "शांत रहें। मदद एक टैप दूर है।",
  },
  nearestEmergency: { en: "Nearest emergency facility", hi: "निकटतम आपातकालीन सुविधा" },
  emergencyContacts: { en: "Emergency contacts", hi: "आपातकालीन नंबर" },
  awareness: { en: "Awareness", hi: "जागरूकता" },
  infoOnly: { en: "Information only — not medical advice", hi: "केवल जानकारी — चिकित्सकीय सलाह नहीं" },
  routeTitle: { en: "Route & Detail", hi: "रास्ता और विवरण" },
  away: { en: "away", hi: "दूर" },
  minsWalk: { en: "min by road", hi: "मिनट सड़क से" },
} as const;

export type StringKey = keyof typeof strings;

export const t = (key: StringKey, lang: Lang) => strings[key][lang];
