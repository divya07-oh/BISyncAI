"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "English" | "தமிழ்" | "हिन्दी" | "తెలుగు" | "ಕನ್ನಡ" | "മലയാളം" | "मराठी";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  English: {
    "Dashboard": "Dashboard",
    "Overview": "Overview",
    "AI Assistant": "AI Assistant",
    "Standards": "Standards",
    "Saved": "Saved",
    "Compliance": "Compliance",
    "Tenders": "Tenders",
    "Reports": "Reports",
    "Settings": "Settings",
    "Logout": "Logout",
    "Upload Product Image": "Upload Product Image",
    "Ask BIS AI": "Ask BIS AI",
    "Saved Standards": "Saved Standards",
    "Compliance Checker": "Compliance Checker",
    "Tender Analysis": "Tender Analysis",
    "Recent Activity": "Recent Activity",
    "Chat Placeholder": "Ask about standards, products or compliance...",
    "Suggest_Standard": "Which standard applies to my product?",
    "Suggest_Documents": "What documents should I prepare?",
    "Suggest_Compliance": "Check my compliance requirements",
    "Suggest_Upload": "Which documents should I upload?",
    "Suggest_MostRelevant": "Which standard is most relevant?",
    "Suggest_Requirements": "What requirements should I check?",
    "Suggest_Missing": "Show me missing documents",
    "Suggest_Next": "What should I do next?",
    "Start New Session": "New Research",
    "Analyze Product": "Analyze Product",
    "Product Image": "Product Image",
  },
  "தமிழ்": {
    "Dashboard": "டாஷ்போர்டு",
    "Overview": "கண்ணோட்டம்",
    "AI Assistant": "AI உதவியாளர்",
    "Standards": "தரநிலைகள்",
    "Saved": "சேமிக்கப்பட்டது",
    "Compliance": "இணக்கம்",
    "Tenders": "டெண்டர்கள்",
    "Reports": "அறிக்கைகள்",
    "Settings": "அமைப்புகள்",
    "Logout": "வெளியேறு",
    "Upload Product Image": "தயாரிப்பு படத்தை பதிவேற்றவும்",
    "Ask BIS AI": "BIS AI ஐ கேளுங்கள்",
    "Saved Standards": "சேமிக்கப்பட்ட தரநிலைகள்",
    "Compliance Checker": "இணக்க சரிபார்ப்பு",
    "Tender Analysis": "டெண்டர் பகுப்பாய்வு",
    "Recent Activity": "சமீபத்திய செயல்பாடு",
    "Chat Placeholder": "Standards, products அல்லது compliance பற்றி கேளுங்கள்...",
    "Suggest_Standard": "என் தயாரிப்புக்கு எந்த standard பொருந்தும்?",
    "Suggest_Documents": "என்ன documents தயாராக வைத்திருக்க வேண்டும்?",
    "Suggest_Compliance": "எனது compliance requirements-ஐ check செய்யுங்கள்",
    "Suggest_Upload": "எந்த documents-ஐ upload செய்ய வேண்டும்?",
    "Suggest_MostRelevant": "எந்த standard முக்கியமானது?",
    "Suggest_Requirements": "என்ன requirements check செய்ய வேண்டும்?",
    "Suggest_Missing": "Missing documents-ஐ காட்டு",
    "Suggest_Next": "அடுத்து என்ன செய்ய வேண்டும்?",
    "Start New Session": "புதிய தேடல்",
    "Analyze Product": "பகுப்பாய்வு செய்",
    "Product Image": "தயாரிப்பு படம்",
  },
  "हिन्दी": {
    "Dashboard": "डैशबोर्ड",
    "Overview": "अवलोकन",
    "AI Assistant": "एआई सहायक",
    "Standards": "मानक",
    "Saved": "सहेजा गया",
    "Compliance": "अनुपालन",
    "Tenders": "निविदाएं",
    "Reports": "रिपोर्ट",
    "Settings": "सेटिंग्स",
    "Logout": "लॉग आउट",
    "Upload Product Image": "उत्पाद की तस्वीर अपलोड करें",
    "Ask BIS AI": "BIS AI से पूछें",
    "Saved Standards": "सहेजे गए मानक",
    "Compliance Checker": "अनुपालन चेकर",
    "Tender Analysis": "निविदा विश्लेषण",
    "Recent Activity": "हाल की गतिविधि",
    "Chat Placeholder": "Standards, products या compliance के बारे में पूछें...",
    "Suggest_Standard": "मेरे उत्पाद पर कौन सा standard लागू हो सकता है?",
    "Suggest_Documents": "मुझे कौन से documents तैयार रखने चाहिए?",
    "Suggest_Compliance": "मेरी compliance requirements जांचें",
    "Suggest_Upload": "मुझे कौन से दस्तावेज़ अपलोड करने चाहिए?",
    "Suggest_MostRelevant": "कौन सा मानक सबसे प्रासंगिक है?",
    "Suggest_Requirements": "मुझे किन आवश्यकताओं की जांच करनी चाहिए?",
    "Suggest_Missing": "मुझे गायब दस्तावेज़ दिखाएं",
    "Suggest_Next": "मुझे आगे क्या करना चाहिए?",
    "Start New Session": "नई खोज",
    "Analyze Product": "विश्लेषण करें",
    "Product Image": "उत्पाद छवि",
  },
  "తెలుగు": {
    "Dashboard": "డాష్‌బోర్డ్",
    "Overview": "అవలోకనం",
    "AI Assistant": "AI అసిస్టెంట్",
    "Standards": "ప్రమాణాలు",
    "Saved": "సేవ్ చేయబడింది",
    "Compliance": "కట్టుబడి",
    "Tenders": "టెండర్లు",
    "Reports": "నివేదికలు",
    "Settings": "సెట్టింగులు",
    "Logout": "లాగౌట్",
    "Upload Product Image": "ఉత్పత్తి చిత్రాన్ని అప్‌లోడ్ చేయండి",
    "Ask BIS AI": "BIS AI ని అడగండి",
    "Saved Standards": "సేవ్ చేసిన ప్రమాణాలు",
    "Compliance Checker": "కట్టుబడి తనిఖీ",
    "Tender Analysis": "టెండర్ విశ్లేషణ",
    "Recent Activity": "ఇటీవలి కార్యాచరణ",
    "Chat Placeholder": "ప్రమాణాలు, ఉత్పత్తులు లేదా సమ్మతి గురించి అడగండి...",
    "Suggest_Standard": "నా ఉత్పత్తికి ఏ standard వర్తించవచ్చు?",
    "Suggest_Documents": "నేను ఏ documents సిద్ధంగా ఉంచాలి?",
    "Suggest_Compliance": "నా compliance requirements తనిఖీ చేయండి",
    "Suggest_Upload": "నేను ఏ పత్రాలను అప్‌లోడ్ చేయాలి?",
    "Suggest_MostRelevant": "ఏ ప్రమాణం అత్యంత సంబంధితమైనది?",
    "Suggest_Requirements": "నేను ఏ అవసరాలను తనిఖీ చేయాలి?",
    "Suggest_Missing": "తప్పిపోయిన పత్రాలను నాకు చూపించండి",
    "Suggest_Next": "నేను తదుపరి ఏమి చేయాలి?",
    "Start New Session": "కొత్త శోధన",
    "Analyze Product": "విశ్లేషించండి",
    "Product Image": "ఉత్పత్తి చిత్రం",
  },
  "ಕನ್ನಡ": {
    "Dashboard": "ಡ್ಯಾಶ್ಬೋರ್ಡ್",
    "Overview": "ಅವಲೋಕನ",
    "AI Assistant": "AI ಸಹಾಯಕ",
    "Standards": "ಮಾನದಂಡಗಳು",
    "Saved": "ಉಳಿಸಲಾಗಿದೆ",
    "Compliance": "ಅನುಸರಣೆ",
    "Tenders": "ಟೆಂಡರ್ಗಳು",
    "Reports": "ವರದಿಗಳು",
    "Settings": "ಸೆಟ್ಟಿಂಗ್ಗಳು",
    "Logout": "ಲಾಗ್ ಔಟ್",
    "Upload Product Image": "ಉತ್ಪನ್ನದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "Ask BIS AI": "BIS AI ಕೇಳಿ",
    "Saved Standards": "ಉಳಿಸಿದ ಮಾನದಂಡಗಳು",
    "Compliance Checker": "ಅನುಸರಣೆ ಪರೀಕ್ಷಕ",
    "Tender Analysis": "ಟೆಂಡರ್ ವಿಶ್ಲೇಷಣೆ",
    "Recent Activity": "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ",
    "Chat Placeholder": "ಮಾನದಂಡಗಳು, ಉತ್ಪನ್ನಗಳು ಅಥವಾ ಅನುಸರಣೆಯ ಬಗ್ಗೆ ಕೇಳಿ...",
    "Suggest_Standard": "ನನ್ನ ಉತ್ಪನ್ನಕ್ಕೆ ಯಾವ ಮಾನದಂಡ ಅನ್ವಯಿಸುತ್ತದೆ?",
    "Suggest_Documents": "ನಾನು ಯಾವ ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಬೇಕು?",
    "Suggest_Compliance": "ನನ್ನ ಅನುಸರಣೆ ಅವಶ್ಯಕತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    "Suggest_Upload": "ನಾನು ಯಾವ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಬೇಕು?",
    "Suggest_MostRelevant": "ಯಾವ ಮಾನದಂಡವು ಹೆಚ್ಚು ಪ್ರಸ್ತುತವಾಗಿದೆ?",
    "Suggest_Requirements": "ನಾನು ಯಾವ ಅವಶ್ಯಕತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಬೇಕು?",
    "Suggest_Missing": "ಕಾಣೆಯಾದ ದಾಖಲೆಗಳನ್ನು ನನಗೆ ತೋರಿಸಿ",
    "Suggest_Next": "ನಾನು ಮುಂದೆ ಏನು ಮಾಡಬೇಕು?",
    "Start New Session": "ಹೊಸ ಹುಡುಕಾಟ",
    "Analyze Product": "ವಿಶ್ಲೇಷಿಸಿ",
    "Product Image": "ಉತ್ಪನ್ನ ಚಿತ್ರ",
  },
  "മലയാളം": {
    "Dashboard": "ഡാഷ്‌ബോർഡ്",
    "Overview": "അവലോകനം",
    "AI Assistant": "AI അസിസ്റ്റന്റ്",
    "Standards": "മാനദണ്ഡങ്ങൾ",
    "Saved": "സംരക്ഷിച്ചു",
    "Compliance": "അനുസരണം",
    "Tenders": "ടെൻഡറുകൾ",
    "Reports": "റിപ്പോർട്ടുകൾ",
    "Settings": "ക്രമീകരണങ്ങൾ",
    "Logout": "പുറത്തുകടക്കുക",
    "Upload Product Image": "ഉൽപ്പന്ന ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    "Ask BIS AI": "BIS AI യോട് ചോദിക്കുക",
    "Saved Standards": "സംരക്ഷിച്ച മാനദണ്ഡങ്ങൾ",
    "Compliance Checker": "അനുസരണ പരിശോധന",
    "Tender Analysis": "ടെൻഡർ വിശകലനം",
    "Recent Activity": "സമീപകാല പ്രവർത്തനം",
    "Chat Placeholder": "മാനദണ്ഡങ്ങൾ, ഉൽപ്പന്നങ്ങൾ അല്ലെങ്കിൽ അനുസരണത്തെക്കുറിച്ച് ചോദിക്കുക...",
    "Suggest_Standard": "എന്റെ ഉൽപ്പന്നത്തിന് ഏത് മാനദണ്ഡമാണ് ബാധകമാകുന്നത്?",
    "Suggest_Documents": "ഞാൻ ഏത് രേഖകളാണ് തയ്യാറാക്കേണ്ടത്?",
    "Suggest_Compliance": "എന്റെ അനുസരണ ആവശ്യകതകൾ പരിശോധിക്കുക",
    "Suggest_Upload": "ഞാൻ ഏത് രേഖകളാണ് അപ്‌ലോഡ് ചെയ്യേണ്ടത്?",
    "Suggest_MostRelevant": "ഏത് മാനദണ്ഡമാണ് ഏറ്റവും പ്രസക്തമായത്?",
    "Suggest_Requirements": "ഞാൻ ഏത് ആവശ്യകതകളാണ് പരിശോധിക്കേണ്ടത്?",
    "Suggest_Missing": "നഷ്ടപ്പെട്ട രേഖകൾ എന്നെ കാണിക്കുക",
    "Suggest_Next": "ഞാൻ അടുത്തതായി എന്തുചെയ്യണം?",
    "Start New Session": "പുതിയ തിരയൽ",
    "Analyze Product": "വിശകലനം ചെയ്യുക",
    "Product Image": "ഉൽപ്പന്ന ചിത്രം",
  },
  "मराठी": {
    "Dashboard": "डॅशबोर्ड",
    "Overview": "आढावा",
    "AI Assistant": "AI सहाय्यक",
    "Standards": "मानके",
    "Saved": "जतन केले",
    "Compliance": "अनुपालन",
    "Tenders": "निविदा",
    "Reports": "अहवाल",
    "Settings": "सेटिंग्ज",
    "Logout": "बाहेर पडा",
    "Upload Product Image": "उत्पादन प्रतिमा अपलोड करा",
    "Ask BIS AI": "BIS AI ला विचारा",
    "Saved Standards": "जतन केलेली मानके",
    "Compliance Checker": "अनुपालन तपासक",
    "Tender Analysis": "निविदा विश्लेषण",
    "Recent Activity": "अलीकडील क्रियाकलाप",
    "Chat Placeholder": "मानके, उत्पादने किंवा अनुपालनाबद्दल विचारा...",
    "Suggest_Standard": "माझ्या उत्पादनाला कोणते मानक लागू होते?",
    "Suggest_Documents": "मी कोणते दस्तऐवज तयार करावेत?",
    "Suggest_Compliance": "माझ्या अनुपालन आवश्यकता तपासा",
    "Suggest_Upload": "मी कोणते दस्तऐवज अपलोड करावेत?",
    "Suggest_MostRelevant": "कोणते मानक सर्वात संबंधित आहे?",
    "Suggest_Requirements": "मी कोणत्या आवश्यकता तपासल्या पाहिजेत?",
    "Suggest_Missing": "मला गहाळ दस्तऐवज दाखवा",
    "Suggest_Next": "मी पुढे काय करावे?",
    "Start New Session": "नवीन शोध",
    "Analyze Product": "विश्लेषण करा",
    "Product Image": "उत्पादन प्रतिमा",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("English");

  // Read from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("bis-ai-language");
    if (saved && Object.keys(translations).includes(saved)) {
      setLanguageState(saved as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("bis-ai-language", lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
