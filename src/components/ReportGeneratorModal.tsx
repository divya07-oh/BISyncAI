import React, { useState, useEffect } from "react";
import { X, CheckCircle, Download, Share2, Eye, Loader2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface ReportGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
}

export default function ReportGeneratorModal({ isOpen, onClose, title, subtitle }: ReportGeneratorProps) {
  const [stage, setStage] = useState(0);
  
  const stages = [
    "Preparing report...",
    "Collecting standards...",
    "Collecting document status...",
    "Formatting report..."
  ];

  useEffect(() => {
    if (isOpen) {
      setStage(0);
      let currentStage = 0;
      const interval = setInterval(() => {
        currentStage++;
        if (currentStage < stages.length) {
          setStage(currentStage);
        } else {
          setStage(stages.length); // Done
          clearInterval(interval);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isDone = stage === stages.length;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-[100] transition-opacity" 
        onClick={isDone ? onClose : undefined}
      />
      <div className={cn(
        "fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:right-auto md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-[400px] bg-card rounded-t-3xl md:rounded-2xl shadow-2xl z-[110] flex flex-col overflow-hidden transition-transform transform duration-300 ease-in-out translate-y-0 p-6"
      )}>
        {!isDone ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-10 w-10 text-accent animate-spin mb-6" />
            <div className="space-y-3 w-full max-w-[250px]">
              {stages.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  {stage > i ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : stage === i ? (
                    <Loader2 className="h-4 w-4 text-accent animate-spin" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-slate-300" />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    stage > i ? "text-slate-600" : stage === i ? "text-primary font-bold" : "text-slate-400"
                  )}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2 text-success font-bold text-lg">
                <CheckCircle className="h-6 w-6" /> Report Ready
              </div>
              <button onClick={onClose} className="p-2 -mr-2 -mt-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-slate-50 border border-border rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-sm">{title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button onClick={() => toast.success("Opening report...")} className="w-full bg-background border border-border hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                <Eye className="h-4 w-4" /> View
              </button>
              <button onClick={() => toast.success("PDF Downloaded")} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> Download PDF
              </button>
              <button onClick={() => toast.success("Share link copied!")} className="w-full bg-accent/10 hover:bg-accent/20 text-accent font-bold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
