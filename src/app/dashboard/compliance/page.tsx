"use client";

import { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, ArrowRight, ShieldCheck, FileText, Check, Camera, Image as ImageIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import UploadProductModal from "@/components/UploadProductModal";
import { useLanguage } from "@/lib/LanguageContext";
import HelpModal from "@/components/HelpModal";
import ReportGeneratorModal from "@/components/ReportGeneratorModal";
import { HelpCircle } from "lucide-react";

const STEPS = ["Product", "Standards & Docs", "Requirements", "Results"];

export default function ComplianceCheckerPage() {
  const [step, setStep] = useState(1);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isReportGenerating, setIsReportGenerating] = useState(false);
  const { t } = useLanguage();

  const handleImageAdded = (src: string) => {
    setProductImage(src);
    toast.success("Product image added successfully");
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">{t("Compliance Checker")}</h1>
          <p className="text-sm text-slate-500 mt-1">Verify product specifications against mandatory BIS requirements.</p>
        </div>
        <button 
          onClick={() => setIsHelpOpen(true)}
          className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 font-medium bg-accent/10 px-3 py-1.5 rounded-full transition-colors w-fit"
        >
          <HelpCircle className="h-4 w-4" />
          How to check compliance?
        </button>
      </div>

      {/* Help Card */}
      <div className="bg-gradient-to-r from-accent/5 to-transparent border border-accent/20 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <ShieldCheck className="h-24 w-24 text-accent" />
        </div>
        <div className="relative z-10">
          <h3 className="font-bold text-primary text-sm mb-3">How does Compliance Checker work?</h3>
          <ol className="list-decimal list-inside text-sm text-slate-600 space-y-1 mb-4 font-medium">
            <li>Add your product</li>
            <li>Review standards</li>
            <li>Upload documents</li>
            <li>Review identified gaps</li>
          </ol>
          <button 
            onClick={() => setIsHelpOpen(true)}
            className="text-xs font-bold text-accent hover:underline uppercase tracking-wider"
          >
            [ View Full Guide ]
          </button>
        </div>
      </div>

      {/* Professional Progress Indicator */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between relative min-w-[300px] max-w-3xl mx-auto">
          <div className="absolute left-4 right-4 md:left-8 md:right-8 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-10" />
          <div className="absolute left-4 right-4 md:left-8 md:right-8 top-1/2 -translate-y-1/2 h-0.5 bg-accent -z-10 transition-all duration-500" style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
          
          {STEPS.map((label, i) => {
            const currentStep = i + 1;
            const isCompleted = step > currentStep;
            const isActive = step === currentStep;
            
            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all shadow-sm border-2",
                  isCompleted ? "bg-accent border-accent text-white" : 
                  isActive ? "bg-white border-accent text-accent" : 
                  "bg-white border-border text-slate-400"
                )}>
                  {isCompleted ? <Check className="h-3 w-3 md:h-4 md:w-4" /> : currentStep}
                </div>
                <div className={cn(
                  "text-[9px] md:text-xs font-bold uppercase tracking-wider hidden sm:block text-center",
                  isActive ? "text-accent" : "text-slate-400"
                )}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {step === 1 && (
        <div className="bg-card border border-border rounded-xl p-5 md:p-8 max-w-2xl mx-auto shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-lg font-bold text-primary mb-6">Step 1: Product Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Product Name</label>
              <input type="text" defaultValue="LED Street Light" className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm shadow-sm" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Product Image (Optional)</label>
              {productImage ? (
                <div className="relative rounded-xl overflow-hidden border border-border shadow-sm group">
                  <img src={productImage} alt="Product" className="w-full h-48 object-cover bg-slate-50" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setIsUploadOpen(true)} className="bg-white text-primary font-bold px-4 py-2 rounded-lg text-sm shadow-sm flex items-center gap-2">
                      <Camera className="h-4 w-4" /> Change Image
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setIsUploadOpen(true)}
                  className="w-full border-2 border-dashed border-border rounded-xl p-8 hover:bg-slate-50 hover:border-accent transition-colors flex flex-col items-center justify-center text-slate-500 hover:text-accent gap-2"
                >
                  <ImageIcon className="h-8 w-8" />
                  <span className="font-bold text-sm">+ Add Product Image</span>
                </button>
              )}
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-all mt-6 flex items-center justify-center gap-2 shadow-sm text-sm min-h-[44px]"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-card border border-border rounded-xl p-5 md:p-8 max-w-2xl mx-auto shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-lg font-bold text-primary mb-2">Step 2: Recommendations</h2>
          <p className="text-sm text-slate-500 mb-6">AI has identified the following applicable standards and required documents.</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Recommended Standards</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 border border-accent/20 bg-accent/5 rounded-lg">
                  <div className="bg-accent/10 p-2 rounded shrink-0">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-primary text-sm">IS 10322</h3>
                      <span className="text-[10px] bg-accent text-white px-1.5 py-0.5 rounded font-bold">94% MATCH</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">LED Modules for General Lighting.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-border bg-background rounded-lg">
                  <div className="bg-slate-100 p-2 rounded shrink-0">
                    <ShieldCheck className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-primary text-sm">IS 302</h3>
                      <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold">88% MATCH</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Safety of Household and Similar Electrical Appliances.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Documents to Add for This Product</h3>
              <p className="text-xs text-slate-500 mb-3 italic">Recommended for compliance review. Requirements may vary depending on product, application, and applicable standard.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="text-sm font-bold text-primary block">Product Specification Sheet</span>
                      <span className="text-[10px] text-slate-500 block">Helps identify product characteristics</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-warning bg-warning/10 px-2 py-1 rounded">Missing</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="text-sm font-bold text-primary block">Electrical Safety Test Report</span>
                      <span className="text-[10px] text-slate-500 block">Safety compliance proof</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-warning bg-warning/10 px-2 py-1 rounded">Missing</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-success" />
                    <div>
                      <span className="text-sm font-bold text-primary block">User / Installation Manual</span>
                      <span className="text-[10px] text-slate-500 block">End-user instructions</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-1 rounded">Uploaded</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={() => setStep(1)}
              className="flex-1 bg-background border border-border hover:bg-slate-50 text-slate-600 py-3 rounded-lg font-semibold transition-all text-sm shadow-sm min-h-[44px]"
            >
              Back
            </button>
            <button 
              onClick={() => setStep(3)}
              className="flex-[2] bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-sm text-sm min-h-[44px]"
            >
              Configure Requirements
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-card border border-border rounded-xl p-5 md:p-8 max-w-3xl mx-auto shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-lg font-bold text-primary mb-6">Step 3: Provide Evidence</h2>
          <div className="space-y-4 md:space-y-6 mb-8">
            <div className="border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm text-primary">LM-79 Photometric Report</h3>
                  <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-2 py-1 rounded">Required</span>
                </div>
                <span className="text-xs text-slate-500">No file selected.</span>
              </div>
              <button className="bg-accent/10 text-accent text-xs font-bold px-4 py-2.5 rounded-lg border border-accent/20 flex items-center justify-center gap-2 hover:bg-accent/20 transition-colors w-full sm:w-auto min-h-[44px]">
                <Upload className="h-4 w-4" /> Upload
              </button>
            </div>
            
            <div className="border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm text-primary">IP65 Ingress Protection Certificate</h3>
                  <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-2 py-1 rounded">Required</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-success/5 border border-success/20 rounded-lg w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-success" />
                  <span className="text-xs font-semibold text-primary truncate max-w-[150px]">IP65_Report.pdf</span>
                </div>
                <CheckCircle className="h-4 w-4 text-success ml-3" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 md:gap-4">
            <button 
              onClick={() => setStep(2)}
              className="flex-1 bg-background border border-border hover:bg-slate-50 text-slate-600 py-3 rounded-lg font-semibold transition-all text-sm shadow-sm min-h-[44px]"
            >
              Back
            </button>
            <button 
              onClick={() => setStep(4)}
              className="flex-[2] bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md text-sm min-h-[44px]"
            >
              <ShieldCheck className="h-4 w-4" />
              Generate Matrix
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-2">Compliance Overview</h2>
              <p className="text-sm text-slate-500 mb-6">Generated matrix for <strong className="text-primary font-bold">LED Street Light</strong>.</p>
              
              {/* Responsive Table / Cards */}
              <div className="hidden sm:block bg-background/50 border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="text-[11px] font-bold text-slate-500 uppercase bg-slate-50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3">Requirement</th>
                      <th className="px-4 py-3">Applicable Standard</th>
                      <th className="px-4 py-3">Evidence</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-primary text-xs">Electrical safety</td>
                      <td className="px-4 py-3 text-xs text-slate-500"><span className="bg-primary/5 border border-primary/10 px-1.5 py-0.5 rounded text-primary font-bold">IS 302</span></td>
                      <td className="px-4 py-3 text-xs text-slate-600">Test Report</td>
                      <td className="px-4 py-3 text-center">
                        <CheckCircle className="h-4 w-4 text-success inline-block" />
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-primary text-xs">Photometric perf.</td>
                      <td className="px-4 py-3 text-xs text-slate-500"><span className="bg-primary/5 border border-primary/10 px-1.5 py-0.5 rounded text-primary font-bold">IS 10322</span></td>
                      <td className="px-4 py-3 text-xs text-slate-600">Pending upload</td>
                      <td className="px-4 py-3 text-center">
                        <AlertTriangle className="h-4 w-4 text-warning inline-block" />
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors bg-error/5">
                      <td className="px-4 py-3 font-semibold text-primary text-xs">Documentation</td>
                      <td className="px-4 py-3 text-xs text-slate-500"><span className="bg-primary/5 border border-primary/10 px-1.5 py-0.5 rounded text-primary font-bold">BIS Manual</span></td>
                      <td className="px-4 py-3 text-xs text-slate-600">Missing</td>
                      <td className="px-4 py-3 text-center">
                        <XCircle className="h-4 w-4 text-error inline-block" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards for Table */}
              <div className="sm:hidden space-y-4">
                <div className="border border-border rounded-lg p-4 bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-primary text-sm">Electrical safety</h4>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span><span className="bg-primary/5 border border-primary/10 px-1.5 py-0.5 rounded text-primary font-bold mr-2">IS 302</span></span>
                    <span>Test Report</span>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4 bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-primary text-sm">Photometric perf.</h4>
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span><span className="bg-primary/5 border border-primary/10 px-1.5 py-0.5 rounded text-primary font-bold mr-2">IS 10322</span></span>
                    <span>Pending upload</span>
                  </div>
                </div>

                <div className="border border-error/30 rounded-lg p-4 bg-error/5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-primary text-sm">Documentation</h4>
                    <XCircle className="h-5 w-5 text-error" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span><span className="bg-primary/5 border border-primary/10 px-1.5 py-0.5 rounded text-primary font-bold mr-2">BIS Manual</span></span>
                    <span className="text-error font-medium">Missing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">Compliance Score</h3>
              
              <div className="relative h-32 w-32 mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="100, 100" />
                  <path className="text-highlight animate-[stroke-dasharray_1.5s_ease-out]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="78, 100" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-primary">78%</span>
                </div>
              </div>
              
              <p className="text-xs text-slate-400 mt-2 italic flex items-center gap-1 justify-center bg-slate-50 px-2 py-1 rounded border border-border">
                <AlertTriangle className="h-3 w-3" />
                Demo assessment result
              </p>

              <button onClick={() => setIsReportGenerating(true)} className="w-full mt-6 bg-background border border-border hover:bg-slate-50 text-primary py-3 rounded-lg font-semibold transition-colors text-sm shadow-sm flex items-center justify-center gap-2 min-h-[44px]">
                Generate Report
              </button>
            </div>
          </div>
          
          <div className="flex justify-center mt-6 mb-12 sm:mb-0">
            <button 
              onClick={() => setStep(1)}
              className="text-xs font-bold uppercase tracking-wider text-accent hover:text-accent/80 transition-colors p-3 min-h-[44px]"
            >
              Reset Checker
            </button>
          </div>
        </div>
      )}

      {/* Mobile Action Bar for Report */}
      {step === 4 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border z-40 sm:hidden">
          <button onClick={() => setIsReportGenerating(true)} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 min-h-[48px]">
            Generate Report
          </button>
        </div>
      )}

      <UploadProductModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onUploadSuccess={handleImageAdded} 
      />

      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
        type="compliance" 
      />

      <ReportGeneratorModal
        isOpen={isReportGenerating}
        onClose={() => setIsReportGenerating(false)}
        title="Compliance Review"
        subtitle="LED Street Light"
      />
    </div>
  );
}
