import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    vastuPosters: 'Vastu Posters',
    filter: 'Filter',
    viewDetails: 'View Details',
    addToCart: 'Add to Cart',
    added: 'Added',
    add: 'Add',
    price: 'Price',
    perPoster: 'per poster',
    location: 'Location',
    quantity: 'Quantity',
    total: 'Total',
    remove: 'Remove',
    checkout: 'Checkout',
    orderViaWhatsapp: 'Order via WhatsApp',
    call: 'Call',
    whatsapp: 'WhatsApp',
    bookNow: 'Book Now',
    loading: 'Loading',
    noPosters: 'No posters available',
    filterAll: 'All',
    filterVastu: 'Vastu Posters',
    filterNumerology: 'Numerology',
    filterRelationships: 'Relationships',
    filterCareer: 'Career / Job',
    filterEducation: 'Education',
    filterFinance: 'Finance',
    filterHealth: 'Health',
    filterProperty: 'Property',
    filterBusiness: 'Business',
  },
  te: {
    vastuPosters: 'వాస్తు పోస్టర్లు',
    filter: 'ఫిల్టర్',
    viewDetails: 'వివరాలు చూడండి',
    addToCart: 'కార్ట్కు జోడించండి',
    added: 'జోడించబడింది',
    add: 'జోడించు',
    price: 'ధర',
    perPoster: 'ఒక్క పోస్టర్కు',
    location: 'స్థానం',
    quantity: 'పరిమాణం',
    total: 'మొత్తం',
    remove: 'తొలగించండి',
    checkout: 'చెక్అవుట్',
    orderViaWhatsapp: 'వాట్సాప్ ద్వారా ఆర్డర్ చేయండి',
    call: 'కాల్',
    whatsapp: 'వాట్సాప్',
    bookNow: 'ఇప్పుడే బుక్ చేయండి',
    loading: 'లోడ్ అవుతోంది',
    noPosters: 'పోస్టర్లు అందుబాటులో లేవు',
    filterAll: 'అన్ని',
    filterVastu: 'వాస్తు పోస్టర్లు',
    filterNumerology: 'సంఖ్యాశాస్త్రం',
    filterRelationships: 'సంబంధాలు',
    filterCareer: 'కెరీర్ / ఉద్యోగం',
    filterEducation: 'విద్య',
    filterFinance: 'ఆర్థికం',
    filterHealth: 'ఆరోగ్యం',
    filterProperty: 'ఆస్తి',
    filterBusiness: 'వ్యాపారం',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('vastu-language') || 'en';
  });

  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('vastu-language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
