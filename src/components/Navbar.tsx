import Link from "next/link";
import { ShieldCheck, LogIn, Command, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">BISync AI</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="#standards" className="hover:text-primary transition-colors">Standards</Link>
          <Link href="#compliance" className="hover:text-primary transition-colors">Compliance</Link>
          <Link href="#tenders" className="hover:text-primary transition-colors">Tenders</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="hidden lg:flex items-center gap-2 text-sm text-slate-500 bg-background border border-border hover:border-slate-300 transition-colors px-3 py-1.5 rounded-lg mr-2"
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-card border border-border px-1.5 py-0.5 rounded ml-2">
              <Command className="h-3 w-3" /> K
            </div>
          </button>
          <Link href="/login" className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            <LogIn className="h-4 w-4" />
            Login
          </Link>
          <Link href="/login" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
