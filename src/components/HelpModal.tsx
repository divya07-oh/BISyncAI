import React from "react";
import { X, CheckCircle, UploadCloud, Search, ShieldCheck, FileText, ArrowRight, Save, Download, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "compliance" | "tender" | "reports" | "chat" | "standards";
}

export default function HelpModal({ isOpen, onClose, type }: HelpModalProps) {
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  const content = {
    compliance: {
      en: {
        title: "How to Use Compliance Checker",
        subtitle: "Follow these steps to review your product requirements.",
        steps: [
          {
            title: "Add Your Product",
            desc: "Enter your product name (e.g., LED Street Light) and optionally upload an image.",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "Review Recommended Standards",
            desc: "AI identifies potentially relevant standards. Applicability should be verified against the official standard.",
            icon: <ShieldCheck className="h-5 w-5 text-accent" />
          },
          {
            title: "Add Supporting Documents",
            desc: "Upload recommended documents like Product Specifications or Test Reports.",
            icon: <UploadCloud className="h-5 w-5 text-accent" />
          },
          {
            title: "Review Results",
            desc: "View the Compliance Review. This provides a preliminary review of identified requirements.",
            icon: <CheckCircle className="h-5 w-5 text-accent" />
          }
        ]
      },
      ta: {
        title: "Compliance Checker-ஐ எப்படி பயன்படுத்துவது?",
        subtitle: "உங்கள் தயாரிப்பு தேவைகளை மதிப்பாய்வு செய்ய இந்த வழிமுறைகளைப் பின்பற்றவும்.",
        steps: [
          {
            title: "உங்கள் தயாரிப்பைச் சேர்க்கவும்",
            desc: "தயாரிப்பின் பெயரை உள்ளிடவும், விருப்பமானால் படத்தை பதிவேற்றவும்.",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "பரிந்துரைக்கப்படும் தரநிலைகளை சரிபார்க்கவும்",
            desc: "பொருந்தக்கூடிய தரநிலைகளை AI அடையாளம் காணும்.",
            icon: <ShieldCheck className="h-5 w-5 text-accent" />
          },
          {
            title: "தேவையான ஆவணங்களை பதிவேற்றவும்",
            desc: "பரிந்துரைக்கப்பட்ட ஆவணங்களை பதிவேற்றவும்.",
            icon: <UploadCloud className="h-5 w-5 text-accent" />
          },
          {
            title: "முடிவுகளைப் பார்க்கவும்",
            desc: "Compliance review-ஐக் காண்க. இது ஆரம்ப கட்ட மதிப்பாய்வு ஆகும்.",
            icon: <CheckCircle className="h-5 w-5 text-accent" />
          }
        ]
      },
      hi: {
        title: "अनुपालन चेकर का उपयोग कैसे करें?",
        subtitle: "अपने उत्पाद की आवश्यकताओं की समीक्षा करने के लिए इन चरणों का पालन करें।",
        steps: [
          {
            title: "अपना उत्पाद जोड़ें",
            desc: "अपने उत्पाद का नाम दर्ज करें और वैकल्पिक रूप से एक छवि अपलोड करें।",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "अनुशंसित मानकों की समीक्षा करें",
            desc: "AI संभावित रूप से प्रासंगिक मानकों की पहचान करता है।",
            icon: <ShieldCheck className="h-5 w-5 text-accent" />
          },
          {
            title: "सहायक दस्तावेज़ जोड़ें",
            desc: "उत्पाद विनिर्देश या परीक्षण रिपोर्ट जैसे अनुशंसित दस्तावेज़ अपलोड करें।",
            icon: <UploadCloud className="h-5 w-5 text-accent" />
          },
          {
            title: "परिणामों की समीक्षा करें",
            desc: "अनुपालन समीक्षा देखें। यह केवल प्रारंभिक समीक्षा प्रदान करता है।",
            icon: <CheckCircle className="h-5 w-5 text-accent" />
          }
        ]
      }
    },
    tender: {
      en: {
        title: "How to Use Tender Analysis",
        subtitle: "Upload a tender to extract requirements and standards.",
        steps: [
          {
            title: "Upload Tender",
            desc: "Upload the PDF document or scan it with your camera.",
            icon: <UploadCloud className="h-5 w-5 text-accent" />
          },
          {
            title: "AI Reads Tender",
            desc: "The system identifies requirements and relevant standards automatically.",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "Review Extracted Information",
            desc: "View detected standards, technical requirements, and required documents.",
            icon: <FileText className="h-5 w-5 text-accent" />
          },
          {
            title: "Review Potential Gaps",
            desc: "Identify missing items that need review before submission.",
            icon: <ShieldCheck className="h-5 w-5 text-accent" />
          },
          {
            title: "Generate Report",
            desc: "Create a tender analysis report.",
            icon: <Download className="h-5 w-5 text-accent" />
          }
        ]
      },
      ta: {
        title: "Tender Analysis-ஐ எப்படி பயன்படுத்துவது?",
        subtitle: "தேவைகள் மற்றும் தரநிலைகளைப் பிரிக்க டெண்டரை பதிவேற்றவும்.",
        steps: [
          {
            title: "டெண்டரை பதிவேற்றவும்",
            desc: "PDF ஆவணத்தை பதிவேற்றவும் அல்லது கேமரா மூலம் ஸ்கேன் செய்யவும்.",
            icon: <UploadCloud className="h-5 w-5 text-accent" />
          },
          {
            title: "AI பகுப்பாய்வு",
            desc: "தேவைகள் மற்றும் தொடர்புடைய தரநிலைகளை தானாகவே அடையாளம் காணும்.",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "தகவல்களை சரிபார்க்கவும்",
            desc: "கண்டறியப்பட்ட தரநிலைகள் மற்றும் ஆவணங்களை மதிப்பாய்வு செய்யவும்.",
            icon: <FileText className="h-5 w-5 text-accent" />
          },
          {
            title: "குறைபாடுகளைக் கண்டறிக",
            desc: "சமர்ப்பிக்கும் முன் விடுபட்ட ஆவணங்களை சரிபார்க்கவும்.",
            icon: <ShieldCheck className="h-5 w-5 text-accent" />
          },
          {
            title: "அறிக்கையை உருவாக்கவும்",
            desc: "டெண்டர் பகுப்பாய்வு அறிக்கையை உருவாக்கவும்.",
            icon: <Download className="h-5 w-5 text-accent" />
          }
        ]
      },
      hi: {
        title: "निविदा विश्लेषण का उपयोग कैसे करें",
        subtitle: "आवश्यकताओं और मानकों को निकालने के लिए एक निविदा अपलोड करें।",
        steps: [
          {
            title: "निविदा अपलोड करें",
            desc: "पीडीएफ दस्तावेज़ अपलोड करें या अपने कैमरे से स्कैन करें।",
            icon: <UploadCloud className="h-5 w-5 text-accent" />
          },
          {
            title: "एआई विश्लेषण",
            desc: "प्रणाली स्वचालित रूप से आवश्यकताओं और प्रासंगिक मानकों की पहचान करती है।",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "निकाली गई जानकारी की समीक्षा करें",
            desc: "पाए गए मानकों, तकनीकी आवश्यकताओं और आवश्यक दस्तावेजों को देखें।",
            icon: <FileText className="h-5 w-5 text-accent" />
          },
          {
            title: "संभावित कमियों की समीक्षा करें",
            desc: "जमा करने से पहले समीक्षा की आवश्यकता वाली गायब वस्तुओं की पहचान करें।",
            icon: <ShieldCheck className="h-5 w-5 text-accent" />
          },
          {
            title: "रिपोर्ट तैयार करें",
            desc: "निविदा विश्लेषण रिपोर्ट बनाएं।",
            icon: <Download className="h-5 w-5 text-accent" />
          }
        ]
      }
    },
    reports: {
      en: {
        title: "How to Generate a Report",
        subtitle: "Export your analysis results easily.",
        steps: [
          {
            title: "Complete an analysis",
            desc: "Finish a Compliance Check or Tender Analysis.",
            icon: <CheckCircle className="h-5 w-5 text-accent" />
          },
          {
            title: "Review the results",
            desc: "Ensure all requirements and documents are correctly logged.",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "Click Generate Report",
            desc: "Use the Generate Report button at the end of the analysis.",
            icon: <FileText className="h-5 w-5 text-accent" />
          },
          {
            title: "Download or Share",
            desc: "Preview the generated PDF report, print it, or save it.",
            icon: <Download className="h-5 w-5 text-accent" />
          }
        ]
      },
      ta: {
        title: "ஒரு Report-ஐ எப்படி உருவாக்குவது?",
        subtitle: "உங்கள் பகுப்பாய்வு முடிவுகளை எளிதாக Export செய்யுங்கள்.",
        steps: [
          {
            title: "பகுப்பாய்வை முடிக்கவும்",
            desc: "Compliance Check அல்லது Tender Analysis-ஐ முடிக்கவும்.",
            icon: <CheckCircle className="h-5 w-5 text-accent" />
          },
          {
            title: "முடிவுகளை மதிப்பாய்வு செய்யவும்",
            desc: "அனைத்து தேவைகளும் ஆவணங்களும் சரியாக உள்ளதா என்பதை உறுதிப்படுத்தவும்.",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "Generate Report ஐ கிளிக் செய்யவும்",
            desc: "பகுப்பாய்வின் முடிவில் Generate Report பொத்தானைப் பயன்படுத்தவும்.",
            icon: <FileText className="h-5 w-5 text-accent" />
          },
          {
            title: "Download அல்லது Share",
            desc: "உருவாக்கப்பட்ட PDF அறிக்கையை பதிவிறக்கம் செய்து பகிரவும்.",
            icon: <Download className="h-5 w-5 text-accent" />
          }
        ]
      },
      hi: {
        title: "रिपोर्ट कैसे जनरेट करें",
        subtitle: "आसानी से अपने विश्लेषण परिणामों को निर्यात करें।",
        steps: [
          {
            title: "विश्लेषण पूरा करें",
            desc: "अनुपालन जांच या निविदा विश्लेषण समाप्त करें।",
            icon: <CheckCircle className="h-5 w-5 text-accent" />
          },
          {
            title: "परिणामों की समीक्षा करें",
            desc: "सुनिश्चित करें कि सभी आवश्यकताएं और दस्तावेज सही ढंग से लॉग किए गए हैं।",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "रिपोर्ट जनरेट पर क्लिक करें",
            desc: "विश्लेषण के अंत में रिपोर्ट जनरेट बटन का उपयोग करें।",
            icon: <FileText className="h-5 w-5 text-accent" />
          },
          {
            title: "डाउनलोड या साझा करें",
            desc: "तैयार की गई पीडीएफ रिपोर्ट का पूर्वावलोकन करें, इसे डाउनलोड या सेव करें।",
            icon: <Download className="h-5 w-5 text-accent" />
          }
        ]
      }
    },
    chat: {
      en: {
        title: "How to Ask AI",
        subtitle: "Tips for using the natural language assistant.",
        steps: [
          {
            title: "Describe your product",
            desc: "E.g., 'What are the standards for an LED street light?'",
            icon: <MessageSquare className="h-5 w-5 text-accent" />
          },
          {
            title: "Ask for missing requirements",
            desc: "E.g., 'What documents am I missing for this product?'",
            icon: <FileText className="h-5 w-5 text-accent" />
          },
          {
            title: "Upload images",
            desc: "Tap the + icon to upload a product photo for AI analysis.",
            icon: <UploadCloud className="h-5 w-5 text-accent" />
          }
        ]
      },
      ta: {
        title: "AI-யிடம் எப்படி கேட்பது?",
        subtitle: "Natural language assistant-ஐப் பயன்படுத்துவதற்கான குறிப்புகள்.",
        steps: [
          {
            title: "தயாரிப்பை விவரிக்கவும்",
            desc: "எ.கா: 'LED street light-க்கு என்ன standards வேண்டும்?'",
            icon: <MessageSquare className="h-5 w-5 text-accent" />
          },
          {
            title: "தேவையான ஆவணங்களை கேட்கவும்",
            desc: "எ.கா: 'எனக்கு எந்த documents குறைகிறது?'",
            icon: <FileText className="h-5 w-5 text-accent" />
          },
          {
            title: "படங்களை பதிவேற்றவும்",
            desc: "தயாரிப்பு புகைப்படத்தை பதிவேற்ற + குறியீட்டை அழுத்தவும்.",
            icon: <UploadCloud className="h-5 w-5 text-accent" />
          }
        ]
      },
      hi: {
        title: "एआई से कैसे पूछें",
        subtitle: "प्राकृतिक भाषा सहायक का उपयोग करने के लिए सुझाव।",
        steps: [
          {
            title: "अपने उत्पाद का वर्णन करें",
            desc: "उदा., 'एलईडी स्ट्रीट लाइट के लिए कौन से मानक हैं?'",
            icon: <MessageSquare className="h-5 w-5 text-accent" />
          },
          {
            title: "गायब दस्तावेज़ों के लिए पूछें",
            desc: "उदा., 'मेरे पास कौन से दस्तावेज़ गायब हैं?'",
            icon: <FileText className="h-5 w-5 text-accent" />
          },
          {
            title: "चित्र अपलोड करें",
            desc: "एआई विश्लेषण के लिए उत्पाद की तस्वीर अपलोड करने के लिए + आइकन पर टैप करें।",
            icon: <UploadCloud className="h-5 w-5 text-accent" />
          }
        ]
      }
    },
    standards: {
      en: {
        title: "How to Find a Standard",
        subtitle: "Search the official BIS library.",
        steps: [
          {
            title: "Search by number or keyword",
            desc: "Use the search bar to find IS codes or product names.",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "Save for later",
            desc: "Click the bookmark icon to save standards for quick reference.",
            icon: <Save className="h-5 w-5 text-accent" />
          }
        ]
      },
      ta: {
        title: "ஒரு Standard-ஐ எப்படி கண்டுபிடிப்பது?",
        subtitle: "அதிகாரப்பூர்வ BIS நூலகத்தில் தேடவும்.",
        steps: [
          {
            title: "எண் அல்லது வார்த்தை மூலம் தேடவும்",
            desc: "IS codes அல்லது தயாரிப்பு பெயர்களைக் கண்டறிய தேடல் பட்டியைப் பயன்படுத்தவும்.",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "சேமிக்கவும்",
            desc: "தரநிலைகளை சேமிக்க bookmark குறியீட்டைக் கிளிக் செய்யவும்.",
            icon: <Save className="h-5 w-5 text-accent" />
          }
        ]
      },
      hi: {
        title: "मानक कैसे खोजें",
        subtitle: "आधिकारिक बीआईएस लाइब्रेरी में खोजें।",
        steps: [
          {
            title: "संख्या या कीवर्ड द्वारा खोजें",
            desc: "आईएस कोड या उत्पाद नाम खोजने के लिए खोज बार का उपयोग करें।",
            icon: <Search className="h-5 w-5 text-accent" />
          },
          {
            title: "बाद के लिए सहेजें",
            desc: "मानकों को सहेजने के लिए बुकमार्क आइकन पर क्लिक करें।",
            icon: <Save className="h-5 w-5 text-accent" />
          }
        ]
      }
    }
  };

  const safeLang = ["English", "தமிழ்", "हिन्दी"].includes(language) 
    ? (language === "தமிழ்" ? "ta" : language === "हिन्दी" ? "hi" : "en")
    : "en"; // Fallback for other languages to english for now

  const data = content[type][safeLang as keyof typeof content[type]];

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-[100] transition-opacity" 
        onClick={onClose}
      />
      <div className={cn(
        "fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:right-auto md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-card rounded-t-3xl md:rounded-2xl shadow-2xl z-[110] flex flex-col overflow-hidden transition-transform transform duration-300 ease-in-out translate-y-0 max-h-[85vh]"
      )}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-border sticky top-0 bg-card z-10">
          <div>
            <h2 className="text-xl font-bold text-primary">{data.title}</h2>
            <p className="text-xs text-slate-500 mt-1">{data.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 bg-slate-50/30">
          {data.steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 relative">
              {idx !== data.steps.length - 1 && (
                <div className="absolute top-10 left-5 w-0.5 h-full bg-border -ml-px z-0"></div>
              )}
              <div className="bg-white border-2 border-accent w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm">
                <span className="font-bold text-accent">{idx + 1}</span>
              </div>
              <div className="bg-white border border-border p-4 rounded-xl shadow-sm flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-accent/10 p-1.5 rounded text-accent">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-primary text-sm">{step.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-border bg-card sticky bottom-0">
          <button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm">
            Got it
          </button>
        </div>
      </div>
    </>
  );
}
