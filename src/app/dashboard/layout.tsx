"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  MessageSquare, 
  Bookmark, 
  CheckSquare, 
  FileSearch, 
  BarChart, 
  Settings,
  Bell,
  Search,
  LogOut,
  Command,
  BookOpen,
  Menu,
  X,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Assistant", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Standards", href: "/dashboard/standards-lib", icon: BookOpen },
  { name: "Saved", href: "/dashboard/standards", icon: Bookmark },
  { name: "Compliance", href: "/dashboard/compliance", icon: CheckSquare },
  { name: "Tenders", href: "/dashboard/tender", icon: FileSearch },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  
  const languages: ("English" | "தமிழ்" | "हिन्दी" | "తెలుగు" | "ಕನ್ನಡ" | "മലയാളം" | "मराठी")[] = [
    "English", "தமிழ்", "हिन्दी", "తెలుగు", "ಕನ್ನಡ", "മലയാളം", "मराठी"
  ];

  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-border justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-primary p-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">BISync AI</span>
        </Link>
        <button 
          className="md:hidden text-slate-500 hover:text-primary"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-accent/10 text-accent" 
                  : "text-slate-600 hover:text-primary hover:bg-slate-50"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-accent" : "text-slate-400")} />
              {t(item.name)}
            </Link>
          );
        })}
        
        <div className="pt-4 mt-4 border-t border-border md:hidden">
          <button 
            onClick={() => setIsLanguageSheetOpen(true)}
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-slate-400" />
              Language
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">{language}</span>
              <span className="text-xs">▼</span>
            </div>
          </button>
        </div>
      </div>
      
      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg text-sm font-medium text-slate-600 hover:text-error hover:bg-error/10 transition-colors">
          <LogOut className="h-5 w-5" />
          {t("Logout")}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex font-sans text-primary">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex-col hidden md:flex shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-card flex-col flex z-50 transform transition-transform duration-300 md:hidden border-r border-border",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Language Bottom Sheet */}
      {isLanguageSheetOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-[60] md:hidden transition-opacity"
            onClick={() => setIsLanguageSheetOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl z-[70] flex flex-col md:hidden transform transition-transform duration-300 translate-y-0">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg font-bold text-primary">Select Language</h2>
              <button onClick={() => setIsLanguageSheetOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLanguage(l as any);
                    setIsLanguageSheetOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all",
                    language === l 
                      ? "bg-accent/10 border-accent/30" 
                      : "bg-background border-border hover:bg-slate-50"
                  )}
                >
                  <span className={cn("text-base", language === l ? "font-bold text-accent" : "font-medium text-slate-600")}>
                    {l}
                  </span>
                  <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", language === l ? "border-accent bg-accent" : "border-slate-300")}>
                    {language === l && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 shrink-0 z-20 gap-2 md:gap-4">
          <div className="flex items-center gap-3 md:gap-4 flex-1">
            <button 
              className="md:hidden text-slate-500 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-base md:text-lg font-bold text-primary hidden sm:block truncate">{t("Compliance")} Command Center</h1>
            <Link href="/" className="md:hidden flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg shadow-sm">
                <ShieldCheck className="h-4 w-4 text-primary-foreground" />
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 md:gap-5">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-sm text-slate-500 bg-background border border-border rounded-lg px-2 md:px-3 py-1.5 hover:border-slate-300 transition-colors">
                <Globe className="h-4 w-4" />
                <span className="hidden md:inline">{language}</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l as any)}
                    className={cn(
                      "block w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors",
                      language === l ? "font-bold text-accent" : "text-slate-600"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <button className="hidden sm:flex items-center gap-2 text-sm text-slate-500 bg-background border border-border rounded-lg px-3 py-1.5 hover:border-slate-300 transition-colors"
               onClick={() => {
                 document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
               }}
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Search...</span>
              <div className="hidden lg:flex items-center gap-1 ml-2 text-[10px] font-semibold bg-card px-1.5 py-0.5 rounded border border-border">
                <Command className="h-3 w-3" /> K
              </div>
            </button>
            
            <button className="relative p-2 text-slate-500 hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-error rounded-full ring-2 ring-card"></span>
            </button>
            <div className="h-8 w-px bg-border mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-primary leading-tight">Dr. Arun Kumar</div>
                <div className="text-[11px] font-medium text-slate-500">Compliance Manager</div>
              </div>
              <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold border border-accent/20 text-sm md:text-base">
                AK
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-grid-pattern relative">
          {children}
        </main>
      </div>
    </div>
  );
}
