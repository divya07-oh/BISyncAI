"use client";

import { useEffect, useState } from "react";
import { Search, X, Command, BookOpen, Package, FileText, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

// Mock Data for 8 Standards
const mockStandards = [
  { id: "IS 10322", title: "LED Modules for General Lighting", category: "Electrical / Lighting", score: 94, status: "Applicable" },
  { id: "IS 302", title: "Safety of Household and Similar Electrical Appliances", category: "Electrical Safety", score: 88, status: "Review Required" },
  { id: "IS 16107", title: "Performance Requirements for LED Lighting Equipment", category: "Lighting", score: 86, status: "Applicable" },
  { id: "IS 16000", title: "Air Quality and Environmental Monitoring", category: "Environment", score: 79, status: "Reference" },
  { id: "IS 9873", title: "Safety Requirements for Toys", category: "Consumer Products", score: 72, status: "Reference" },
  { id: "IS 9001", title: "Quality Management Systems", category: "Quality Management", score: 82, status: "Recommended" },
  { id: "IS 15644", title: "Electrical and Electronic Equipment — Safety Requirements", category: "Electrical", score: 81, status: "Review Required" },
  { id: "IS 17025", title: "General Requirements for the Competence of Testing and Calibration Laboratories", category: "Testing & Calibration", score: 76, status: "Reference" }
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  const isTyping = query.trim().length > 0;
  
  // Filter mock standards based on query
  const filteredStandards = mockStandards.filter(s => 
    s.id.toLowerCase().includes(query.toLowerCase()) || 
    s.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div className="bg-card w-full max-w-xl rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[70vh]">
        
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-border shrink-0 bg-background/50">
          <Search className="h-5 w-5 text-accent" />
          <input 
            type="text" 
            placeholder={t("Chat Placeholder")} 
            className="flex-1 bg-transparent border-0 py-4 px-4 text-base focus:outline-none focus:ring-0 text-primary placeholder-slate-400"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => setOpen(false)} className="text-slate-400 hover:bg-slate-100 rounded-lg p-1.5 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content Area */}
        <div className="p-2 overflow-y-auto flex-1">
          {!isTyping ? (
            <div className="space-y-4 py-2">
              <div>
                <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Popular searches</div>
                <div className="flex flex-wrap gap-2 px-3 pt-1">
                  {[
                    t("Suggest_Standard"), 
                    t("Suggest_Documents"), 
                    t("Suggest_Compliance")
                  ].map(term => (
                    <button 
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs bg-slate-50 border border-border hover:border-accent hover:bg-accent/5 text-slate-600 hover:text-accent px-3 py-1.5 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Actions</div>
                <button 
                  onClick={() => { router.push('/dashboard/chat'); setOpen(false); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-primary hover:bg-accent/5 hover:text-accent flex items-center gap-3 transition-colors group"
                >
                  <div className="bg-slate-100 p-1.5 rounded-md group-hover:bg-accent/10"><Command className="h-4 w-4 text-slate-500 group-hover:text-accent" /></div>
                  Ask AI Assistant
                </button>
                <button 
                  onClick={() => { router.push('/dashboard/compliance'); setOpen(false); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-primary hover:bg-accent/5 hover:text-accent flex items-center gap-3 transition-colors group"
                >
                  <div className="bg-slate-100 p-1.5 rounded-md group-hover:bg-accent/10"><Command className="h-4 w-4 text-slate-500 group-hover:text-accent" /></div>
                  Check Product Compliance
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-2">
              
              {/* Intelligent Search Recommendations for Products */}
              {query.toLowerCase().includes("led") && (
                <div className="px-3 mb-4">
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex items-start gap-4">
                    <div className="bg-white p-2 rounded-lg border border-accent/10 shrink-0">
                      <Package className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-0.5">Product Identified</div>
                      <h4 className="font-bold text-primary truncate">LED Street Light</h4>
                      <div className="text-xs text-slate-500 mt-0.5">Category: Lighting Equipment</div>
                    </div>
                    <button 
                      onClick={() => { router.push('/dashboard/compliance'); setOpen(false); }}
                      className="bg-accent text-white p-2 rounded-lg hover:bg-accent/90"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Standards Results */}
              <div>
                <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5" /> Standards
                  <span className="ml-auto text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">Demo Data</span>
                </div>
                {filteredStandards.length > 0 ? filteredStandards.map(standard => (
                  <button key={standard.id} className="w-full text-left px-3 py-2 rounded-xl text-sm text-primary hover:bg-slate-50 flex items-start gap-3 transition-colors group">
                    <div className="bg-primary/5 text-primary px-1.5 py-0.5 rounded text-xs font-bold border border-primary/10 w-20 text-center shrink-0">
                      {standard.id}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-primary truncate group-hover:text-accent">{standard.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-500">{standard.category}</span>
                        <span className="text-[10px] text-accent font-bold">{standard.score}% Match</span>
                      </div>
                    </div>
                  </button>
                )) : (
                  <div className="px-4 py-2 text-sm text-slate-500">No standards found matching "{query}"</div>
                )}
              </div>

              {/* Products */}
              <div>
                <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Package className="h-3.5 w-3.5" /> Products
                </div>
                <button className="w-full text-left px-4 py-2 rounded-xl text-sm text-primary hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <span className="font-medium">LED Street Light</span>
                </button>
                <button className="w-full text-left px-4 py-2 rounded-xl text-sm text-primary hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <span className="font-medium">LED Panel</span>
                </button>
                <button className="w-full text-left px-4 py-2 rounded-xl text-sm text-primary hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <span className="font-medium">LED Luminaire</span>
                </button>
              </div>

              {/* Documents */}
              <div>
                <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5" /> Documents
                </div>
                <button className="w-full text-left px-4 py-2 rounded-xl text-sm text-primary hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <span className="font-medium">Product Specification Sheet</span>
                </button>
                <button className="w-full text-left px-4 py-2 rounded-xl text-sm text-primary hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <span className="font-medium">Test Report</span>
                </button>
                <button className="w-full text-left px-4 py-2 rounded-xl text-sm text-primary hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <span className="font-medium">Technical Datasheet</span>
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
