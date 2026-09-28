import Link from "next/link";
import { ShieldCheck, LogIn, Command } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">BIS AI</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="#standards" className="hover:text-primary transition-colors">Standards</Link>
          <Link href="#compliance" className="hover:text-primary transition-colors">Compliance</Link>
          <Link href="#tenders" className="hover:text-primary transition-colors">Tenders</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-background border border-border px-2 py-1 rounded-md mr-2">
            <Command className="h-3 w-3" /> K
          </div>
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
