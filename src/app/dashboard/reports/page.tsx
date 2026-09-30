"use client";

import { useState } from "react";
import { FileText, Download, Trash2, Eye, HelpCircle, FileCheck, Search } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import HelpModal from "@/components/HelpModal";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const MOCK_REPORTS = [
  { id: 1, title: "LED Street Light Compliance Review", type: "Compliance", date: "September 30, 2026", status: "Ready" },
  { id: 2, title: "TN-2026-184 Tender Analysis", type: "Tender", date: "September 28, 2026", status: "Ready" },
  { id: 3, title: "Industrial Control Unit Review", type: "Compliance", date: "September 25, 2026", status: "Ready" },
];

export default function ReportsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"All" | "Compliance" | "Tender">("All");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [reports, setReports] = useState(MOCK_REPORTS);

  const filteredReports = reports.filter(r => activeTab === "All" || r.type === activeTab);

  const handleDelete = (id: number) => {
    setReports(reports.filter(r => r.id !== id));
    toast.success("Report deleted successfully");
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">{t("Reports")}</h1>
          <p className="text-sm text-slate-500 mt-1">Review and manage your generated compliance and tender reports.</p>
        </div>
        <button 
          onClick={() => setIsHelpOpen(true)}
          className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 font-medium bg-accent/10 px-3 py-1.5 rounded-full transition-colors w-fit"
        >
          <HelpCircle className="h-4 w-4" />
          How to generate a report?
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-border p-2 gap-2 overflow-x-auto">
          {["All", "Compliance", "Tender"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap",
                activeTab === tab 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-primary"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-slate-500 font-medium">No reports found</h3>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-accent/30 transition-colors bg-background group">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-xl shrink-0",
                      report.type === "Compliance" ? "bg-accent/10 text-accent" : "bg-warning/10 text-warning"
                    )}>
                      {report.type === "Compliance" ? <FileCheck className="h-6 w-6" /> : <Search className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-sm mb-1 line-clamp-1">{report.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="font-medium">{report.date}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className={cn(
                          "px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]",
                          report.type === "Compliance" ? "bg-accent/10 text-accent" : "bg-warning/10 text-warning"
                        )}>
                          {report.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity w-full sm:w-auto">
                    <button 
                      onClick={() => toast.success("Opening report preview...")}
                      className="flex-1 sm:flex-none bg-background border border-border hover:bg-slate-50 text-slate-600 p-2.5 rounded-lg transition-colors flex items-center justify-center"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => toast.success("Downloading PDF...")}
                      className="flex-1 sm:flex-none bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary p-2.5 rounded-lg transition-colors flex items-center justify-center"
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(report.id)}
                      className="flex-1 sm:flex-none bg-error/5 hover:bg-error/10 border border-error/20 text-error p-2.5 rounded-lg transition-colors flex items-center justify-center"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
        type="reports" 
      />
    </div>
  );
}
