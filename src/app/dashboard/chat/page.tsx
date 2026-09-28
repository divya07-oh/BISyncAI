"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Paperclip, Send, Mic, ExternalLink, Bookmark, Copy, Info, CheckCircle, Image as ImageIcon, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

type Source = {
  id: string;
  title: string;
  relevance: number;
  clause: string;
  reason: string;
};

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  image?: string;
  sources?: Source[];
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I am BIS AI. You can ask me about compliance, standards, or upload a photo of your product for analysis.",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

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
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      toast("Listening...", { icon: '🎙️' });
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };
    
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);
    
    // Mock AI Response
    setTimeout(() => {
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Based on your query, here are the relevant standards you need to comply with. Make sure to verify the specific clauses according to your product's technical specifications.",
        sources: [
          {
            id: "IS 10322",
            title: "LED Modules / Luminaires",
            relevance: 94,
            clause: "Part 5, Section 1, Clauses 6.2 - 6.4",
            reason: "Dictates the photometric performance, ingress protection, and structural integrity of the luminaire."
          },
          {
            id: "IS 302",
            title: "Electrical safety",
            relevance: 88,
            clause: "Part 1, Clause 13 & 16",
            reason: "Covers leakage current, dielectric strength, and earth continuity necessary for any mains-connected device."
          }
        ]
      };
      setMessages((prev) => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      
      const newUserMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: "Please analyze this product photo and tell me the applicable BIS standards.",
        image: base64,
      };
      
      setMessages((prev) => [...prev, newUserMsg]);
      setIsTyping(true);
      
      // Mock AI Vision Response
      setTimeout(() => {
        const newAiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "I've analyzed the image. It appears to be an electrical household appliance (similar to an electric iron/kettle). For this category of products, compliance is mandatory under the Compulsory Registration Scheme (CRS).",
          sources: [
            {
              id: "IS 302 (Part 1)",
              title: "Household and similar electrical appliances - Safety",
              relevance: 98,
              clause: "General Requirements",
              reason: "Mandatory for all domestic heating/motor-operated electrical appliances."
            }
          ]
        };
        setMessages((prev) => [...prev, newAiMsg]);
        setIsTyping(false);
      }, 3000);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex h-full overflow-hidden bg-background">
      {/* Left: Chat History */}
      <div className="w-64 border-r border-border bg-card hidden lg:flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <button 
            onClick={() => {
              setMessages([{ id: "1", role: "ai", content: "Hello! I am BIS AI. You can ask me about compliance, standards, or upload a photo of your product for analysis." }]);
              toast("Started new research session");
            }}
            className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90"
          >
            <MessageSquare className="h-4 w-4" />
            New Research
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
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-grid-pattern pb-32">
          
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-4 max-w-4xl mx-auto w-full">
              <div className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1 ${msg.role === 'ai' ? 'bg-primary text-white shadow-md' : 'bg-slate-200 text-slate-600 border border-border'}`}>
                {msg.role === 'ai' ? 'AI' : 'AK'}
              </div>
              <div className="flex-1 space-y-2">
                <div className="font-bold text-primary text-sm flex items-center gap-2">
                  {msg.role === 'ai' ? 'BIS AI' : 'You'}
                  {msg.role === 'ai' && (
                    <span className="bg-success/10 text-success text-[10px] px-1.5 py-0.5 rounded border border-success/20 flex items-center gap-1 uppercase tracking-wider">
                      <CheckCircle className="h-3 w-3" /> Verified
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
                  <div className="space-y-4">
                    <div className="text-primary text-sm leading-relaxed max-w-3xl space-y-3">
                      <p>{msg.content}</p>
                    </div>
                    
                    {/* Sources / Result Cards */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        {msg.sources.map((source, idx) => (
                          <div key={idx} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-accent/50 transition-colors flex flex-col h-full">
                            <div className="flex justify-between items-start mb-3">
                              <div className="bg-primary/5 text-primary text-xs font-bold px-2 py-1 rounded border border-primary/10 flex items-center gap-1">
                                <span className="text-accent">[{idx + 1}]</span> {source.id}
                              </div>
                              <div className="text-xs font-bold text-success flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> {source.relevance}% Relevance
                              </div>
                            </div>
                            
                            <h4 className="font-bold text-primary text-base mb-1">{source.title}</h4>
                            <div className="text-xs font-medium text-slate-500 mb-4 pb-4 border-b border-border/50">Clause: {source.clause}</div>
                            
                            <div className="space-y-3 flex-1">
                              <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Why it matters</div>
                                <p className="text-xs text-slate-600">{source.reason}</p>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-5 pt-4 border-t border-border/50">
                              <button onClick={() => toast.success('Opening standard PDF...')} className="flex-1 bg-background border border-border hover:bg-slate-50 text-primary py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                                <ExternalLink className="h-3.5 w-3.5" /> Source
                              </button>
                              <button onClick={() => toast.success('Saved to your library!')} className="flex-1 bg-accent/10 hover:bg-accent/20 text-accent py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                                <Bookmark className="h-3.5 w-3.5" /> Save
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => toast.success('Response copied!')} className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-md transition-colors" title="Copy response">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
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
                  <Loader2 className="h-4 w-4 animate-spin" /> Analyzing requirements...
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
                placeholder={isRecording ? "Listening..." : "Ask about compliance or upload a product photo..."}
                className="w-full bg-transparent border-0 focus:ring-0 text-primary placeholder-slate-400 resize-none py-4 pl-4 pr-40 min-h-[56px] text-sm"
              />
              
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors group relative" 
                  title="Upload Photo for Vision Analysis"
                >
                  <ImageIcon className="h-5 w-5 group-hover:text-highlight transition-colors" />
                </button>
                <button 
                  onClick={toggleRecording}
                  className={`p-2 rounded-lg transition-colors ${isRecording ? 'bg-red-50 text-error' : 'text-slate-400 hover:text-primary hover:bg-slate-100'}`}
                  title="Voice Typing"
                >
                  <Mic className={`h-5 w-5 ${isRecording ? 'animate-pulse text-error' : ''}`} />
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm ml-1 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center gap-1 mt-3">
              <Info className="h-3 w-3 text-slate-400" />
              <span className="text-[11px] font-medium text-slate-500">AI responses should be verified against cited standard documents.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
