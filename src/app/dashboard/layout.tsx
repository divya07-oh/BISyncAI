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
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <div className="min-h-screen bg-background flex font-sans text-primary">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg shadow-sm">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">BISync AI</span>
          </Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-accent/10 text-accent" 
                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-accent" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-border">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg text-sm font-medium text-slate-600 hover:text-error hover:bg-error/10 transition-colors">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-lg font-bold text-primary hidden lg:block">Compliance Command Center</h1>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 text-sm text-slate-500 bg-background border border-border rounded-lg px-3 py-1.5 hover:border-slate-300 transition-colors"
               onClick={() => {
                 document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
               }}
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search...</span>
              <div className="hidden sm:flex items-center gap-1 ml-2 text-[10px] font-semibold bg-card px-1.5 py-0.5 rounded border border-border">
                <Command className="h-3 w-3" /> K
              </div>
            </button>
            
            <button className="relative p-2 text-slate-500 hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-error rounded-full ring-2 ring-card"></span>
            </button>
            <div className="h-8 w-px bg-border mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-primary leading-tight">Dr. Arun Kumar</div>
                <div className="text-[11px] font-medium text-slate-500">Procurement Officer</div>
              </div>
              <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold border border-accent/20">
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
