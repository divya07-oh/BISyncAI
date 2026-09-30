"use client";

import Link from "next/link";
import { MessageSquare, Bookmark, CheckSquare, FileSearch, ArrowRight, Clock, AlertCircle, FileText, Search, BookOpen, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-primary">Good morning, Arun</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Area */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8 flex flex-col">
          
          {/* AI Assistant Search Bar */}
          <div className="bg-card border border-border rounded-2xl p-5 md:p-8 shadow-sm order-1">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="bg-accent/10 p-2 rounded-lg">
                <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-accent" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-primary">{t("Ask BIS AI")}...</h2>
            </div>
            
            <div className="relative mb-2 md:mb-6">
              <textarea 
                rows={2}
                placeholder="Describe your product, standard, or compliance requirement..."
                className="w-full bg-background border border-border rounded-xl px-4 py-3 md:py-4 pr-12 md:pr-14 text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none shadow-inner text-sm placeholder:text-slate-400"
              />
              <button className="absolute right-2 bottom-2 md:right-3 md:bottom-3 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Top Metrics - Reordered for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 order-2">
            <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold text-slate-500">{t("Standards")}</h3>
                <Bookmark className="h-4 w-4 text-accent" />
              </div>
              <p className="text-3xl font-extrabold text-primary">24</p>
            </div>
            <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold text-slate-500">{t("Compliance")}</h3>
                <ShieldCheck className="h-4 w-4 text-success" />
              </div>
              <p className="text-3xl font-extrabold text-primary">18</p>
            </div>
            <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold text-slate-500">{t("Tenders")}</h3>
                <FileSearch className="h-4 w-4 text-highlight" />
              </div>
              <p className="text-3xl font-extrabold text-primary">7</p>
            </div>
            <div className="bg-card border border-warning/30 p-5 rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10"><AlertCircle className="h-16 w-16 text-warning" /></div>
              <div className="flex justify-between items-start mb-2 relative z-10">
                <h3 className="text-sm font-semibold text-warning-foreground text-warning">Review Items</h3>
                <AlertCircle className="h-4 w-4 text-warning" />
              </div>
              <p className="text-3xl font-extrabold text-warning relative z-10">4</p>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="order-3">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Recommended actions</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/dashboard/chat" className="bg-card border border-border p-4 md:p-5 rounded-xl hover:border-accent/50 hover:shadow-md transition-all group flex gap-4">
                <div className="bg-slate-100 h-10 w-10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                  <Search className="h-5 w-5 text-slate-500 group-hover:text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm mb-1">Find a Standard</h4>
                  <p className="text-xs text-slate-500">Search by product or requirement</p>
                </div>
              </Link>
              <Link href="/dashboard/compliance" className="bg-card border border-border p-4 md:p-5 rounded-xl hover:border-success/50 hover:shadow-md transition-all group flex gap-4">
                <div className="bg-slate-100 h-10 w-10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-success/10 transition-colors">
                  <CheckSquare className="h-5 w-5 text-slate-500 group-hover:text-success" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm mb-1">{t("Compliance Checker")}</h4>
                  <p className="text-xs text-slate-500">Review your product against requirements</p>
                </div>
              </Link>
              <Link href="/dashboard/tender" className="bg-card border border-border p-4 md:p-5 rounded-xl hover:border-highlight/50 hover:shadow-md transition-all group flex gap-4">
                <div className="bg-slate-100 h-10 w-10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-highlight/10 transition-colors">
                  <FileText className="h-5 w-5 text-slate-500 group-hover:text-highlight" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm mb-1">{t("Tender Analysis")}</h4>
                  <p className="text-xs text-slate-500">Extract standards from tender documents</p>
                </div>
              </Link>
              <Link href="/dashboard/standards" className="bg-card border border-border p-4 md:p-5 rounded-xl hover:border-primary/50 hover:shadow-md transition-all group flex gap-4">
                <div className="bg-slate-100 h-10 w-10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <BookOpen className="h-5 w-5 text-slate-500 group-hover:text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm mb-1">{t("Saved Standards")}</h4>
                  <p className="text-xs text-slate-500">Continue your standards research</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Intelligence Timeline */}
        <div className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm self-start order-4 lg:order-none">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-6">{t("Recent Activity")}</h3>
          
          <div className="space-y-6">
            
            <div className="flex gap-4 relative">
              <div className="absolute top-8 left-4 w-px h-10 bg-border"></div>
              <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 z-10">
                <Search className="h-3.5 w-3.5 text-accent" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 mb-1">09:42</div>
                <p className="text-sm text-primary font-medium">AI identified <span className="bg-accent/10 text-accent px-1 rounded">IS 10322</span> for LED Street Lighting</p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="absolute top-8 left-4 w-px h-10 bg-border"></div>
              <div className="w-8 h-8 rounded-full bg-success/10 border border-success/20 flex items-center justify-center shrink-0 z-10">
                <CheckSquare className="h-3.5 w-3.5 text-success" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 mb-1">Yesterday</div>
                <p className="text-sm text-primary font-medium">Compliance check completed for <span className="font-bold">LED Panel Light</span></p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-highlight/10 border border-highlight/20 flex items-center justify-center shrink-0 z-10">
                <FileSearch className="h-3.5 w-3.5 text-highlight" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 mb-1">Sep 24</div>
                <p className="text-sm text-primary font-medium">Tender analysis completed for TN-2026-184</p>
              </div>
            </div>

          </div>
          
          <button className="w-full mt-6 py-2 text-sm font-semibold text-accent bg-accent/5 hover:bg-accent/10 rounded-lg transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
