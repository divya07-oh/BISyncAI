"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Mic, ExternalLink, Bookmark, Copy, Info, CheckCircle, Image as ImageIcon, Loader2, Plus, FileText, Upload, HelpCircle, Package, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import UploadProductModal from "@/components/UploadProductModal";
import { useLanguage } from "@/lib/LanguageContext";
import HelpModal from "@/components/HelpModal";

// --- Mock Database for NLU ---
const MOCK_DB = {
  "LED Street Light": {
    standards: [
      { id: "IS 10322", title: "LED Lighting", relevance: "High" },
      { id: "IS 302", title: "Electrical Safety", relevance: "Medium" },
      { id: "IS 16107", title: "Lighting Performance", relevance: "Medium" }
    ],
    documents: [
      { name: "Product Specification", reason: "Provides technical characteristics", status: "Missing" },
      { name: "Technical Datasheet", reason: "Helps identify electrical specs", status: "Uploaded" },
      { name: "Test Report", reason: "Evidence from testing", status: "Missing" },
      { name: "Electrical Safety Report", reason: "For safety requirements review", status: "Missing" },
      { name: "Product Drawing", reason: "Documents physical construction", status: "Missing" }
    ]
  },
  "LED Panel Light": {
    standards: [
      { id: "IS 10322", title: "LED Lighting", relevance: "High" },
      { id: "IS 16107", title: "Lighting Performance", relevance: "High" }
    ],
    documents: [
      { name: "Product Specification", reason: "Provides technical characteristics", status: "Missing" },
      { name: "Technical Datasheet", reason: "Helps identify electrical specs", status: "Missing" },
      { name: "Test Report", reason: "Evidence from testing", status: "Missing" },
      { name: "Installation Manual", reason: "Installation and operating information", status: "Uploaded" }
    ]
  },
  "Industrial Electrical Control Unit": {
    standards: [
      { id: "IS 302", title: "Electrical Safety", relevance: "High" },
      { id: "IS 9001", title: "Quality Management", relevance: "Medium" },
      { id: "IS 15644", title: "Electrical Safety Requirements", relevance: "High" }
    ],
    documents: [
      { name: "Technical Datasheet", reason: "Electrical ratings", status: "Missing" },
      { name: "Circuit Diagram", reason: "Electrical schematic", status: "Missing" },
      { name: "Electrical Test Report", reason: "Proof of safety", status: "Missing" },
      { name: "Safety Documentation", reason: "Risk assessments", status: "Uploaded" }
    ]
  }
};

type AIResponseData = {
  text: string;
  identifiedProduct?: string;
  standards?: { id: string; title: string; relevance: string }[];
  documents?: { name: string; reason: string; status: string }[];
  suggestions?: string[];
};

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  image?: string;
  data?: AIResponseData;
};

export default function ChatPage() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  // Conversational Context
  const [currentProductContext, setCurrentProductContext] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize welcome message dynamically on load or language change if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: "1",
        role: "ai",
        content: t("Chat Placeholder"),
        data: {
          text: language === "English" 
            ? "Hello! I am your professional BIS standards assistant. You can ask me questions about products, compliance, or upload a product photo."
            : t("Dashboard") === "டாஷ்போர்டு" 
              ? "வணக்கம்! நான் உங்கள் BIS standards உதவியாளர். நீங்கள் products, compliance பற்றி கேட்கலாம் அல்லது ஒரு product photo-ஐ upload செய்யலாம்."
              : t("Dashboard") === "डैशबोर्ड"
                ? "नमस्ते! मैं आपका BIS standards सहायक हूँ। आप उत्पादों, अनुपालन के बारे में पूछ सकते हैं, या उत्पाद की तस्वीर अपलोड कर सकते हैं।"
                : "Hello! I am your BIS standards assistant. (Multilingual support active)"
        }
      }]);
    }
  }, [language, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join("");
          setInputValue(transcript);
        };
        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsRecording(false);
          toast.error("Microphone error. Please check permissions.");
        };
        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };
      }
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return toast.error("Speech recognition is not supported in this browser.");
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      toast("Listening...", { icon: '🎙️' });
    }
  };

  const processAIResponse = (input: string, isImageAnalysis = false) => {
    const query = input.toLowerCase();
    let detectedProduct = currentProductContext;
    
    // NLU Product Detection
    if (query.includes("street light") || query.includes("street lighting") || isImageAnalysis) {
      detectedProduct = "LED Street Light";
    } else if (query.includes("panel")) {
      detectedProduct = "LED Panel Light";
    } else if (query.includes("industrial") || query.includes("control")) {
      detectedProduct = "Industrial Electrical Control Unit";
    } else if (query.includes("led") || query.includes("light")) {
      detectedProduct = "LED Street Light"; // fallback broad match
    }

    if (detectedProduct) setCurrentProductContext(detectedProduct);

    // Intent Detection
    const isAskingDocs = query.includes("document") || query.includes("ஆவண") || query.includes("दस्तावेज़") || query.includes("పత్రాలు") || query.includes("ದಾಖಲೆ") || query.includes("രേഖ");
    const isAskingMissing = query.includes("missing") || query.includes("எந்த") || query.includes("गायब");
    const isAskingStandards = query.includes("standard") || query.includes("தரநிலை") || query.includes("मानक");

    // Formulate localized response text
    let responseText = "";
    if (language === "English") {
      if (isImageAnalysis) responseText = "Based on the image analysis, here are the recommendations for this product category.";
      else if (detectedProduct && isAskingDocs) responseText = `Here are the recommended documents for ${detectedProduct}.`;
      else if (detectedProduct && isAskingStandards) responseText = `I found potentially relevant standards for ${detectedProduct}.`;
      else if (detectedProduct) responseText = `Understood. Your product is ${detectedProduct}. Here are the applicable standards and documents.`;
      else responseText = "Could you please specify which product you are inquiring about?";
    } else if (language === "தமிழ்") {
      if (isImageAnalysis) responseText = "AI பகுப்பாய்வு அடிப்படையில், இந்த தயாரிப்புக்கான பரிந்துரைகள் இதோ.";
      else if (detectedProduct && isAskingDocs) responseText = `${detectedProduct}-க்கு தேவையான ஆவணங்கள் தயாரிப்பின் வகை மற்றும் பொருந்தக்கூடிய தரநிலைகளைப் பொறுத்து மாறலாம்.`;
      else if (detectedProduct && isAskingStandards) responseText = `${detectedProduct}-க்கு பொருந்தக்கூடிய தரநிலைகளை முதலில் சரிபார்க்க வேண்டும். Demo data அடிப்படையில் இவை தொடர்புடையதாக இருக்கலாம்.`;
      else if (detectedProduct) responseText = `புரிந்தது. உங்கள் தயாரிப்பு ${detectedProduct}. தொடர்புடைய தரநிலைகள் மற்றும் ஆவணங்கள் இதோ.`;
      else responseText = "நீங்கள் எந்த தயாரிப்பு பற்றி கேட்கிறீர்கள் என்பதை தயவுசெய்து குறிப்பிட முடியுமா?";
    } else {
      // Fallback translation for Hindi/Telugu/Kannada/Malayalam/Marathi
      if (isImageAnalysis) responseText = "AI Analysis: Here are the recommendations for this product.";
      else if (detectedProduct) responseText = `Product identified: ${detectedProduct}. Here are the recommendations. (Translated response based on language)`;
      else responseText = "Please specify the product you are asking about.";
    }

    const data: AIResponseData = {
      text: responseText,
      suggestions: [
        t("Suggest_Upload"),
        t("Suggest_Requirements"),
        t("Suggest_Next")
      ]
    };

    if (detectedProduct) {
      data.identifiedProduct = detectedProduct;
      const productData = MOCK_DB[detectedProduct as keyof typeof MOCK_DB];
      
      // Determine what to show based on intent
      if (isAskingDocs) {
        data.documents = productData.documents;
      } else if (isAskingStandards) {
        data.standards = productData.standards;
      } else {
        // Show both if intent is broad or it's an image
        data.standards = productData.standards;
        data.documents = productData.documents;
      }

      if (isAskingMissing) {
        data.documents = productData.documents.filter(d => d.status === "Missing");
        data.text = language === "English" ? `Here are the missing documents for ${detectedProduct}:` : `${detectedProduct}-க்கான விடுபட்ட ஆவணங்கள்:`;
      }
    }

    return data;
  };

  const handleSend = (textInput?: string) => {
    const text = textInput || inputValue;
    if (!text.trim()) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);
    
    setTimeout(() => {
      const aiData = processAIResponse(text);
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiData.text,
        data: aiData
      };
      setMessages((prev) => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleImageUpload = (base64: string) => {
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: t("Analyze Product"),
      image: base64,
    };
    
    setMessages((prev) => [...prev, newUserMsg]);
    setIsTyping(true);
    
    setTimeout(() => {
      const aiData = processAIResponse("image analysis", true);
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiData.text,
        data: aiData
      };
      setMessages((prev) => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 2500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <div className="flex h-full overflow-hidden bg-background">
      {/* Left: Chat History */}
      <div className="w-64 border-r border-border bg-card hidden lg:flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <button 
            onClick={() => {
              setMessages([]);
              setCurrentProductContext(null);
              toast("Started new research session");
            }}
            className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90"
          >
            <MessageSquare className="h-4 w-4" />
            {t("Start New Session")}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="text-xs font-bold text-slate-400 mb-2 px-2 uppercase tracking-wider mt-2">Today</div>
          <button className="w-full text-left px-3 py-2 rounded-lg bg-accent/5 text-accent text-sm font-medium truncate border border-accent/10">Current Session</button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 text-sm font-medium truncate">Food packaging compliance</button>
          
          <div className="text-xs font-bold text-slate-400 mt-6 mb-2 px-2 uppercase tracking-wider">Yesterday</div>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 text-sm font-medium truncate">Electrical safety requirements</button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Header */}
        <div className="bg-card border-b border-border p-3 flex items-center justify-between z-10 shrink-0">
          <h2 className="font-bold text-primary md:hidden">{t("AI Assistant")}</h2>
          <div className="hidden md:block" />
          <button 
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 font-medium bg-accent/10 px-2.5 py-1 rounded-full transition-colors w-fit"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            How to ask AI?
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 bg-grid-pattern pb-32 md:pb-40">
          
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-4 max-w-4xl mx-auto w-full">
               {/* Avatar */}
               <div className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1 ${msg.role === 'ai' ? 'bg-primary text-white shadow-md' : 'bg-slate-200 text-slate-600 border border-border'}`}>
                {msg.role === 'ai' ? 'AI' : 'AK'}
              </div>
              
              <div className="flex-1 space-y-3 min-w-0">
                <div className="font-bold text-primary text-sm flex items-center gap-2">
                  {msg.role === 'ai' ? 'BIS AI' : 'You'}
                  {msg.role === 'ai' && (
                    <span className="bg-success/10 text-success text-[10px] px-1.5 py-0.5 rounded border border-success/20 flex items-center gap-1 uppercase tracking-wider">
                      <CheckCircle className="h-3 w-3" /> AI Engine
                    </span>
                  )}
                </div>
                
                {msg.role === 'user' ? (
                  <div className="bg-white border border-border rounded-2xl rounded-tl-none p-4 shadow-sm inline-block max-w-2xl">
                    {msg.image && (
                      <img src={msg.image} alt="Uploaded product" className="max-w-xs rounded-lg mb-3 border border-border shadow-sm object-cover max-h-64" />
                    )}
                    <p className="text-primary text-sm leading-relaxed">{msg.content}</p>
                  </div>
                ) : (
                  <div className="space-y-6 max-w-3xl">
                    {/* Main Text */}
                    <div className="bg-background border border-border rounded-2xl rounded-tl-none p-4 shadow-sm text-primary text-sm leading-relaxed">
                      {msg.data?.text || msg.content}
                    </div>

                    {/* Identified Product Context */}
                    {msg.data?.identifiedProduct && (
                      <div className="flex items-center gap-3 bg-accent/5 border border-accent/20 p-3 rounded-xl inline-flex">
                        <Package className="h-5 w-5 text-accent" />
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Context</div>
                          <div className="text-sm font-bold text-primary">{msg.data.identifiedProduct}</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Standards Recommendation */}
                    {msg.data?.standards && msg.data.standards.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Standard Recommendation</h4>
                          <span className="text-[9px] bg-warning/10 text-warning px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-warning/20">Demo Data</span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {msg.data.standards.map((std, idx) => (
                            <div key={idx} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-accent/30 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                <span className="bg-primary/5 text-primary text-xs font-bold px-2 py-1 rounded border border-primary/10">{std.id}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${std.relevance === 'High' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                  Relevance: {std.relevance}
                                </span>
                              </div>
                              <h5 className="font-bold text-primary text-sm mb-4">{std.title}</h5>
                              <div className="flex gap-2 mt-auto">
                                <button className="flex-1 bg-background border border-border hover:bg-slate-50 text-slate-600 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5">
                                  <ExternalLink className="h-3.5 w-3.5" /> View
                                </button>
                                <button className="flex-1 bg-accent/10 hover:bg-accent/20 text-accent py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5">
                                  <Bookmark className="h-3.5 w-3.5" /> Save
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Documents Recommendation */}
                    {msg.data?.documents && msg.data.documents.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          Recommended Documents
                        </h4>
                        <div className="space-y-2">
                          {msg.data.documents.map((doc, idx) => (
                            <div key={idx} className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                              <div>
                                <h5 className="font-bold text-primary text-sm flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-slate-400" />
                                  {doc.name}
                                  {doc.status === "Missing" 
                                    ? <span className="text-[9px] uppercase font-bold bg-warning/10 text-warning px-1.5 py-0.5 rounded">Missing</span>
                                    : <span className="text-[9px] uppercase font-bold bg-success/10 text-success px-1.5 py-0.5 rounded">Uploaded</span>
                                  }
                                </h5>
                                <p className="text-xs text-slate-500 mt-1 sm:ml-6"><strong className="text-slate-600 font-semibold">Why:</strong> {doc.reason}</p>
                              </div>
                              {doc.status === "Missing" ? (
                                <button className="bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto">
                                  <Upload className="h-3.5 w-3.5" /> Upload
                                </button>
                              ) : (
                                <button className="bg-background border border-border px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 flex items-center justify-center gap-1.5 w-full sm:w-auto" disabled>
                                  <CheckCircle className="h-3.5 w-3.5" /> Ready
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {msg.data?.suggestions && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {msg.data.suggestions.map((suggestion, idx) => (
                          <button 
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="bg-accent/5 hover:bg-accent/10 text-accent border border-accent/20 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5"
                          >
                            <HelpCircle className="h-3.5 w-3.5" /> {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 max-w-4xl mx-auto w-full">
              <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-1 shadow-md">
                AI
              </div>
              <div className="flex-1 space-y-2">
                <div className="font-bold text-primary text-sm">BIS AI</div>
                <div className="bg-white border border-border rounded-2xl rounded-tl-none p-4 shadow-sm inline-block max-w-2xl flex items-center gap-2 text-slate-400 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" /> Analyzing intent & context...
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area (Sticky Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-background via-background to-transparent pt-12">
          <div className="max-w-4xl mx-auto relative">
            <div className={`relative bg-card border shadow-lg rounded-2xl overflow-hidden transition-all ${isRecording ? 'border-accent ring-1 ring-accent' : 'border-border focus-within:border-accent focus-within:ring-1 focus-within:ring-accent'}`}>
              <textarea 
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={isRecording ? "Listening..." : t("Chat Placeholder")}
                className="w-full bg-transparent border-0 focus:ring-0 text-primary placeholder-slate-400 resize-none py-4 pl-4 pr-40 min-h-[56px] text-sm"
              />
              
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <button 
                  onClick={() => setIsUploadOpen(true)}
                  className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors group relative" 
                  title={t("Product Image")}
                >
                  <Plus className="h-5 w-5 group-hover:text-highlight transition-colors" />
                </button>
                <button 
                  onClick={toggleRecording}
                  className={`p-2 rounded-lg transition-colors ${isRecording ? 'bg-red-50 text-error' : 'text-slate-400 hover:text-primary hover:bg-slate-100'}`}
                  title="Voice Typing"
                >
                  <Mic className={`h-5 w-5 ${isRecording ? 'animate-pulse text-error' : ''}`} />
                </button>
                <button 
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm ml-1 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center gap-1 mt-3 pb-2 md:pb-0">
              <Info className="h-3 w-3 text-slate-400" />
              <span className="text-[11px] font-medium text-slate-500">AI context is maintained during the session.</span>
            </div>
          </div>
        </div>
      </div>
      
      <UploadProductModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleImageUpload}
      />

      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
        type="chat" 
      />
    </div>
  );
}
