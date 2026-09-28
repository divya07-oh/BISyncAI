"use client";

import { useEffect, useState } from "react";
import { Search, X, Command } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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

  return (
    <div className="fixed inset-0 z-50 bg-primary/20 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div className="bg-card w-full max-w-xl rounded-xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 border-b border-border">
          <Search className="h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search standards, commands, or press ESC to close..." 
            className="flex-1 bg-transparent border-0 py-4 px-4 text-sm focus:outline-none focus:ring-0 text-primary placeholder-slate-400"
            autoFocus
          />
          <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-primary p-1">
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-2 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Actions</div>
          <button 
            onClick={() => { router.push('/dashboard/chat'); setOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-primary hover:bg-background hover:text-accent flex items-center gap-2 transition-colors"
          >
            <Command className="h-4 w-4 text-slate-400" />
            Ask AI Assistant
          </button>
          <button 
            onClick={() => { router.push('/dashboard/compliance'); setOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-primary hover:bg-background hover:text-accent flex items-center gap-2 transition-colors"
          >
            <Command className="h-4 w-4 text-slate-400" />
            Check Product Compliance
          </button>
          
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-2">Standards</div>
          <button className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-primary hover:bg-background hover:text-accent flex items-center gap-2 transition-colors">
            <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs font-medium">IS 10322</span>
            LED Street Lighting
          </button>
          <button className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-primary hover:bg-background hover:text-accent flex items-center gap-2 transition-colors">
            <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs font-medium">IS 302</span>
            Electrical Appliances Safety
          </button>
        </div>
      </div>
    </div>
  );
}
