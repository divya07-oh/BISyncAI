"use client";

import { useState } from "react";
import { UploadCloud, FileText, Download, Save, Target, BookOpen, AlertTriangle, MessageSquare, ShieldAlert, CheckCircle, Search, Calendar, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import UploadTenderModal from "@/components/UploadTenderModal";
import { useLanguage } from "@/lib/LanguageContext";

export default function TenderAnalysisPage() {
  const [analyzed, setAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    standards: true,
    technical: true,
    documents: true,
    insights: true
  });
  const { t } = useLanguage();

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleUploadSuccess = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 font-sans">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">{t("Tender Analysis")}</h1>
        <p className="text-sm text-slate-500 mt-1">Extract standards, requirements, and compliance gaps using document intelligence.</p>
      </div>

      {!analyzed ? (
        <div className="max-w-2xl mx-auto mt-8 md:mt-12 animate-in fade-in zoom-in-95">
          <div 
            onClick={() => !isAnalyzing && setIsUploadOpen(true)}
            className={cn(
              "border-2 border-dashed rounded-2xl p-10 md:p-16 text-center transition-all cursor-pointer relative overflow-hidden min-h-[44px]",
              isAnalyzing ? "border-accent bg-accent/5" : "border-border bg-card hover:border-accent/50 hover:bg-slate-50"
            )}
          >
            {isAnalyzing ? (
              <div className="space-y-5 relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 border-4 border-accent/20 rounded-full animate-ping"></div>
                  <Search className="h-10 w-10 md:h-12 md:w-12 text-accent mx-auto relative z-10 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-primary">Scanning Document Intelligence...</h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">Extracting clauses and standards via BIS AI engine.</p>
                </div>
                <div className="w-full max-w-xs h-1.5 bg-background rounded-full overflow-hidden mt-4 border border-border">
                  <div className="h-full bg-accent w-full animate-[progress_2s_ease-in-out_infinite] origin-left"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-14 w-14 md:h-16 md:w-16 bg-background border border-border rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <UploadCloud className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-primary">Upload Tender PDF</h3>
                <p className="text-slate-500 text-xs md:text-sm">Click to choose PDF or scan with camera</p>
                <div className="pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-background px-2 py-1 rounded border border-border">PDF, DOCX up to 50MB</span>
                </div>
              </div>
            )}
            
            {/* Background scanner effect */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-40 w-full animate-[scan_2s_ease-in-out_infinite]" />
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-success/10 p-2 md:p-2.5 rounded-lg border border-success/20 shrink-0">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-primary text-sm truncate">TN-2026-184_LED_Streetlight.pdf</h2>
                <div className="text-xs text-slate-500 mt-0.5">Analysis complete • 18 pages extracted</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toast.success('Analysis saved to projects')} className="flex-1 sm:flex-none justify-center items-center gap-2 bg-background border border-border hover:bg-slate-50 text-slate-600 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[44px] sm:min-h-0">
                <Save className="h-3.5 w-3.5" /> Save
              </button>
              <button onClick={() => toast.success('Report download started')} className="flex-1 sm:flex-none justify-center items-center gap-2 bg-primary hover:bg-primary/90 text-white px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm min-h-[44px] sm:min-h-0">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </div>
          </div>

          {/* Quick Metrics (Stacked on mobile) */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            <div className="col-span-2 lg:col-span-1 bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tender ID</span>
              <span className="text-lg font-extrabold text-primary">TN-2026-184</span>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Requirements</span>
              <span className="text-lg font-extrabold text-primary">18</span>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Standards Detected</span>
              <span className="text-lg font-extrabold text-accent">6</span>
            </div>
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-warning uppercase tracking-wider">Potential Gaps</span>
              <span className="text-lg font-extrabold text-warning">3</span>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Deadlines</span>
              <span className="text-lg font-extrabold text-primary flex items-center gap-1"><Calendar className="h-4 w-4" /> 2</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              
              {/* Detected Standards */}
              <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <button 
                  onClick={() => toggleSection('standards')}
                  className="w-full p-4 border-b border-border bg-slate-50/50 flex items-center justify-between min-h-[44px]"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-accent" />
                    <h3 className="font-bold text-primary text-sm uppercase tracking-wider">Detected Standards</h3>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", expandedSections.standards ? "rotate-180" : "")} />
                </button>
                {expandedSections.standards && (
                  <div className="divide-y divide-border">
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="bg-error/10 text-error px-2 py-1 rounded text-[10px] font-bold border border-error/20 w-16 md:w-20 text-center">Mandatory</span>
                        <div>
                          <div className="font-bold text-primary text-sm">IS 10322</div>
                          <div className="text-xs text-slate-500">LED Modules / Luminaires</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 hidden md:block" />
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="bg-error/10 text-error px-2 py-1 rounded text-[10px] font-bold border border-error/20 w-16 md:w-20 text-center">Mandatory</span>
                        <div>
                          <div className="font-bold text-primary text-sm">IS 302</div>
                          <div className="text-xs text-slate-500">Electrical Appliances Safety</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 hidden md:block" />
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="bg-highlight/10 text-highlight px-2 py-1 rounded text-[10px] font-bold border border-highlight/20 w-16 md:w-20 text-center">Referenced</span>
                        <div>
                          <div className="font-bold text-primary text-sm">IS 16107</div>
                          <div className="text-xs text-slate-500">Luminaires Performance</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 hidden md:block" />
                    </div>
                  </div>
                )}
              </div>

              {/* Grid of other sections */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <button 
                    onClick={() => toggleSection('technical')}
                    className="w-full p-4 border-b border-border bg-slate-50/50 flex items-center justify-between md:cursor-default min-h-[44px]"
                  >
                    <h3 className="font-bold text-primary text-sm uppercase tracking-wider flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" /> Technical Requirements
                    </h3>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform md:hidden", expandedSections.technical ? "rotate-180" : "")} />
                  </button>
                  <div className={cn("p-4", expandedSections.technical || "hidden md:block")}>
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" /><span className="text-slate-600">Minimum 120lm/W efficacy</span></li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" /><span className="text-slate-600">IP66 rated housing</span></li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" /><span className="text-slate-600">10kV Surge protection</span></li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" /><span className="text-slate-600">THD &lt; 10% at full load</span></li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <button 
                    onClick={() => toggleSection('documents')}
                    className="w-full p-4 border-b border-border bg-slate-50/50 flex items-center justify-between md:cursor-default min-h-[44px]"
                  >
                    <h3 className="font-bold text-primary text-sm uppercase tracking-wider flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" /> Documents Required
                    </h3>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform md:hidden", expandedSections.documents ? "rotate-180" : "")} />
                  </button>
                  <div className={cn("p-4", expandedSections.documents || "hidden md:block")}>
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" /><span className="text-slate-600">NABL LM-79 Test Report</span></li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" /><span className="text-slate-600">BIS Registration Certificate</span></li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" /><span className="text-slate-600">OEM Authorization Letter</span></li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" /><span className="text-slate-600">5-Year Warranty Declaration</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: AI Insights & Gaps */}
            <div className="space-y-6">
              
              {/* AI Insights */}
              <div className="bg-gradient-to-b from-card to-background border border-border rounded-xl shadow-sm overflow-hidden">
                <button 
                  onClick={() => toggleSection('insights')}
                  className="w-full p-4 border-b border-border flex items-center justify-between md:cursor-default min-h-[44px]"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-accent/10 p-1.5 rounded-md">
                      <MessageSquare className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="font-bold text-primary text-sm uppercase tracking-wider">AI Insights & Gaps</h3>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform md:hidden", expandedSections.insights ? "rotate-180" : "")} />
                </button>
                
                <div className={cn("p-5", expandedSections.insights || "hidden md:block")}>
                  <p className="text-sm text-primary font-medium mb-4 leading-relaxed">
                    The tender mandates <strong className="font-bold text-error">3 requirements</strong> that usually require additional documentation outside standard BIS compliance.
                  </p>

                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="font-bold text-warning text-xs mb-1">Surge Protection</div>
                      <p className="text-slate-600 text-xs">Tender demands 10kV SPD, while standard IS baseline only requires 4kV. External SPD cert required.</p>
                    </div>
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="font-bold text-warning text-xs mb-1">Warranty Terms</div>
                      <p className="text-slate-600 text-xs">Requires 5-year replacement guarantee on driver components specifically.</p>
                    </div>
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="font-bold text-warning text-xs mb-1">Local Manufacturing</div>
                      <p className="text-slate-600 text-xs">Class-I local supplier certificate (Make in India) is mandatory per Clause 4.1.2.</p>
                    </div>
                  </div>

                  <button className="w-full mt-5 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-colors text-xs shadow-sm flex items-center justify-center gap-2 min-h-[44px]">
                    <MessageSquare className="h-3.5 w-3.5" /> Ask AI About Tender
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <UploadTenderModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
