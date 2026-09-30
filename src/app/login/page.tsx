"use client";

import { useState } from "react";
import { ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-background font-sans">
      
      {/* Left Side: Branding */}
      <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-highlight rounded-full blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors inline-flex w-fit mb-12">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white p-2 rounded-xl shadow-lg">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">BIS AI</span>
          </div>
          
          <h1 className="text-4xl font-extrabold text-white leading-tight max-w-md">
            Standards intelligence for modern compliance teams.
          </h1>
        </div>
        
        <div className="relative z-10 text-slate-300 text-sm">
          &copy; 2026 BIS AI Platform. Secure Access.
        </div>
      </div>

      {/* Right Side: Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background bg-grid-pattern">
        
        {/* Mobile back button */}
        <Link href="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <div className="w-full max-w-md">
          <div className="bg-card border border-border p-8 rounded-2xl shadow-xl">
            <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-primary">BIS AI</span>
            </div>

            <h2 className="text-2xl font-bold text-primary mb-2 text-center lg:text-left">Welcome Back</h2>
            <p className="text-slate-500 text-sm mb-8 text-center lg:text-left">Sign in to access your professional workspace.</p>

            <AnimatePresence mode="wait">
              {step === "phone" ? (
                <motion.form 
                  key="phone-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handlePhoneSubmit} 
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1.5">Sign in with mobile</label>
                    <div className="flex gap-2">
                      <div className="bg-background border border-border px-4 py-3 rounded-lg flex items-center justify-center text-slate-600 font-medium shrink-0">
                        +91
                      </div>
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="flex-1 min-w-0 bg-background border border-border rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-slate-400"
                        autoFocus
                      />
                    </div>
                  </div>
                  
                  <button 
                    disabled={phone.length < 10 || isLoading}
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Continue"}
                  </button>
                  
                  <p className="text-xs text-center text-slate-500 mt-6">
                    By continuing, you agree to the <a href="#" className="text-accent hover:underline">Terms</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a>.
                  </p>
                </motion.form>
              ) : (
                <motion.form 
                  key="otp-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleOtpSubmit} 
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1.5">Enter 6-digit OTP</label>
                    <input 
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • • • •"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-center text-2xl tracking-widest text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-slate-300"
                      autoFocus
                    />
                    <div className="flex justify-between items-center mt-3 px-1 text-sm">
                      <span className="text-slate-500">Sent to +91 {phone}</span>
                      <button type="button" className="text-accent font-medium hover:underline">Resend code</button>
                    </div>
                  </div>
                  
                  <button 
                    disabled={otp.length < 6 || isLoading}
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 mt-4 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Sign In"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
