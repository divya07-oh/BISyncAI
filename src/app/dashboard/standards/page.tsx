"use client";

import { useState } from "react";
import { Search, Filter, BookOpen, FileText, Trash2, Download, List, LayoutGrid, MoreVertical, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const filters = ["All", "Electrical", "Construction", "Food", "Mechanical", "Environment", "Consumer"];

const mockStandards = [
  { id: "IS 10322", title: "LED Luminaires", category: "Electrical", viewed: "Today", status: "Saved" },
  { id: "IS 302", title: "Electrical Appliances", category: "Electrical", viewed: "Sep 26", status: "Saved" },
  { id: "IS 16107", title: "Performance Requirements for LED Lighting", category: "Electrical", viewed: "Sep 21", status: "Saved" },
  { id: "IS 16000", title: "Indoor Air Quality", category: "Environment", viewed: "Sep 20", status: "Saved" },
  { id: "IS 9873", title: "Safety of Toys", category: "Consumer", viewed: "Sep 19", status: "Saved" },
  { id: "IS 9001", title: "Quality Management Systems", category: "Quality Management", viewed: "Sep 18", status: "Saved" },
  { id: "IS 15644", title: "Safety of Industrial Trucks", category: "Mechanical", viewed: "Sep 15", status: "Saved" },
  { id: "IS 17025", title: "Testing and Calibration Laboratories", category: "Quality Management", viewed: "Sep 10", status: "Saved" }
];

export default function SavedStandardsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const filtered = activeFilter === "All" 
    ? mockStandards 
    : mockStandards.filter(s => s.category === activeFilter);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in">
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 flex items-start gap-2 mb-2">
        <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
        <p className="text-xs text-slate-600">
          <strong>Demo Data:</strong> The standards, relevance scores, and descriptions shown here are for demonstration purposes only and do not represent official BIS determinations.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Saved Standards</h1>
          <p className="text-sm text-slate-500 mt-1">Your professional knowledge library of compliance documents.</p>
        </div>
        <div className="flex gap-2 bg-card border border-border rounded-lg p-1">
          <button 
            onClick={() => setViewMode("table")}
            className={cn("p-1.5 rounded-md transition-colors", viewMode === "table" ? "bg-accent/10 text-accent" : "text-slate-400 hover:text-primary")}
          >
            <List className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setViewMode("card")}
            className={cn("p-1.5 rounded-md transition-colors", viewMode === "card" ? "bg-accent/10 text-accent" : "text-slate-400 hover:text-primary")}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search saved standards..." 
            className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 text-primary shadow-sm placeholder:text-slate-400"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar items-center">
          <div className="flex items-center gap-1 text-sm font-medium text-slate-500 mr-2 border-r border-border pr-4 shrink-0">
            <Filter className="h-4 w-4" /> Filter
          </div>
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors shadow-sm",
                activeFilter === filter 
                  ? "bg-primary text-white" 
                  : "bg-card border border-border text-slate-600 hover:text-primary hover:border-slate-300"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs font-bold text-slate-500 uppercase bg-slate-50/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 flex items-center gap-1 cursor-pointer hover:text-primary">Standard <ArrowDownUp className="h-3 w-3" /></th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Last Viewed</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((standard) => (
                  <tr key={standard.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="bg-primary/5 text-primary text-xs font-bold px-2 py-1 rounded border border-primary/10 whitespace-nowrap">
                        {standard.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-primary">{standard.title}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-accent"></div>
                        {standard.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs font-medium">{standard.viewed}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-md border border-success/20">
                        {standard.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-slate-400 hover:text-primary p-1.5 rounded-md hover:bg-slate-100 transition-colors" title="View details">
                          <BookOpen className="h-4 w-4" />
                        </button>
                        <button onClick={() => toast.success('Standard PDF downloading...')} className="text-slate-400 hover:text-primary p-1.5 rounded-md hover:bg-slate-100 transition-colors" title="Download PDF">
                          <FileText className="h-4 w-4" />
                        </button>
                        <button className="text-slate-400 hover:text-error p-1.5 rounded-md hover:bg-error/10 transition-colors" title="More options">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(standard => (
            <div key={standard.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all group flex flex-col h-full relative">
              <button className="absolute top-4 right-4 text-slate-400 hover:text-primary p-1 rounded-md hover:bg-slate-100 transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
              
              <span className="bg-primary/5 text-primary text-xs font-bold px-2.5 py-1 rounded border border-primary/10 w-fit mb-4">
                {standard.id}
              </span>
              
              <h3 className="font-bold text-primary text-base mb-1 leading-tight">
                {standard.title}
              </h3>
              
              <div className="flex items-center gap-1.5 mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                <span className="text-xs font-medium text-slate-500">{standard.category}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-border/50">
                <button className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-background border border-border hover:bg-slate-50 text-primary transition-colors text-xs font-semibold shadow-sm">
                  <BookOpen className="h-3.5 w-3.5" /> View
                </button>
                <button onClick={() => toast.success('Standard PDF downloading...')} className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-background border border-border hover:bg-slate-50 text-primary transition-colors text-xs font-semibold shadow-sm">
                  <FileText className="h-3.5 w-3.5" /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {filtered.length === 0 && (
        <div className="text-center py-20 bg-card border border-dashed border-border rounded-xl">
          <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-primary">No standards found</h3>
          <p className="text-sm text-slate-500 mt-1">Adjust your filters to see more results.</p>
        </div>
      )}
    </div>
  );
}
