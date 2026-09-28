"use client";

import { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, ArrowRight, ShieldCheck, FileText, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const STEPS = ["Product", "Standards", "Requirements", "Results"];

export default function ComplianceCheckerPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-bold text-primary tracking-tight">Compliance Checker</h1>
        <p className="text-sm text-slate-500 mt-1">Verify product specifications against mandatory BIS requirements.</p>
      </div>

      {/* Professional Progress Indicator */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between relative max-w-3xl mx-auto">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-10" />
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-accent -z-10 transition-all duration-500" style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
          
          {STEPS.map((label, i) => {
            const currentStep = i + 1;
            const isCompleted = step > currentStep;
            const isActive = step === currentStep;
            
            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm border-2",
                  isCompleted ? "bg-accent border-accent text-white" : 
                  isActive ? "bg-white border-accent text-accent" : 
                  "bg-white border-border text-slate-400"
                )}>
                  {isCompleted ? <Check className="h-4 w-4" /> : currentStep}
                </div>
                <div className={cn(
                  "text-xs font-bold uppercase tracking-wider hidden sm:block",
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
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-lg font-bold text-primary mb-6">Step 1: Product Information</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Product Name</label>
              <input type="text" defaultValue="LED Street Light" className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Product Category</label>
              <select className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm shadow-sm">
                <option>Lighting Equipment</option>
                <option>Household Appliances</option>
                <option>Electronics</option>
              </select>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-all mt-6 flex items-center justify-center gap-2 shadow-sm text-sm"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-lg font-bold text-primary mb-6">Step 2: Identified Standards</h2>
          <p className="text-sm text-slate-500 mb-6">Based on your product, the following standards are mandatory for compliance.</p>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-4 p-4 border border-accent/20 bg-accent/5 rounded-lg">
              <div className="bg-accent/10 p-2 rounded shrink-0">
                <ShieldCheck className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-sm">IS 10322</h3>
                <p className="text-xs text-slate-600 mt-1">LED Modules for General Lighting. Primary standard covering safety and performance testing.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border border-border bg-background rounded-lg">
              <div className="bg-slate-100 p-2 rounded shrink-0">
                <ShieldCheck className="h-5 w-5 text-slate-500" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-sm">IS 302 (Part 1)</h3>
                <p className="text-xs text-slate-600 mt-1">General electrical safety requirements for mains-connected devices.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setStep(1)}
              className="flex-1 bg-background border border-border hover:bg-slate-50 text-slate-600 py-3 rounded-lg font-semibold transition-all text-sm shadow-sm"
            >
              Back
            </button>
            <button 
              onClick={() => setStep(3)}
              className="flex-[2] bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-sm text-sm"
            >
              Configure Requirements
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 max-w-3xl mx-auto shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-lg font-bold text-primary mb-6">Step 3: Provide Evidence</h2>
          <div className="space-y-6 mb-8">
            <div className="border border-border rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-primary">LM-79 Photometric Report</h3>
                <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-2 py-1 rounded">Required</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-accent/10 text-accent text-xs font-bold px-4 py-2 rounded-lg border border-accent/20 flex items-center gap-2 hover:bg-accent/20 transition-colors">
                  <FileText className="h-4 w-4" /> Upload Report
                </button>
                <span className="text-xs text-slate-500">No file selected.</span>
              </div>
            </div>
            
            <div className="border border-border rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-primary">IP65 Ingress Protection Certificate</h3>
                <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-2 py-1 rounded">Required</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-success" />
                  <span className="text-sm font-semibold text-primary">IP65_Test_Report_NABL.pdf</span>
                </div>
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setStep(2)}
              className="flex-1 bg-background border border-border hover:bg-slate-50 text-slate-600 py-3 rounded-lg font-semibold transition-all text-sm shadow-sm"
            >
              Back
            </button>
            <button 
              onClick={() => setStep(4)}
              className="flex-[2] bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md text-sm"
            >
              <ShieldCheck className="h-4 w-4" />
              Generate Matrix
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-2">Compliance Overview</h2>
              <p className="text-sm text-slate-500 mb-6">Generated matrix for <strong className="text-primary font-bold">LED Street Light</strong>.</p>
              
              <div className="bg-background/50 border border-border rounded-lg overflow-hidden">
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
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-primary text-xs">Marking / Labeling</td>
                      <td className="px-4 py-3 text-xs text-slate-500"><span className="bg-primary/5 border border-primary/10 px-1.5 py-0.5 rounded text-primary font-bold">IS 10322</span></td>
                      <td className="px-4 py-3 text-xs text-slate-600">Draft uploaded</td>
                      <td className="px-4 py-3 text-center">
                        <CheckCircle className="h-4 w-4 text-success inline-block" />
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
                Mock assessment — demonstration data
              </p>

              <button onClick={() => toast.success('Compliance report PDF is downloading...')} className="w-full mt-6 bg-background border border-border hover:bg-slate-50 text-primary py-2 rounded-lg font-semibold transition-colors text-sm shadow-sm flex items-center justify-center gap-2">
                Download PDF Report
              </button>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setStep(1)}
              className="text-xs font-bold uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
            >
              Reset Checker
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
