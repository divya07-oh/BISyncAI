"use client";

import Navbar from "@/components/Navbar";
import { Search, ShieldCheck, CheckCircle, FileText, Zap, BookOpen, AlertTriangle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-highlight/30 font-sans bg-grid-pattern relative">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full pt-20 pb-24 overflow-hidden relative border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div className="space-y-8 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  BIS AI 2.0
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-[1.15]">
                  Your Intelligent Gateway to <span className="text-highlight">Indian Standards</span>
                </h1>
                
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Search, understand, verify and analyze BIS standards using an AI-powered professional workspace.
                </p>
                
                <div className="bg-card border border-border rounded-xl shadow-lg p-2 max-w-lg relative z-10 focus-within:ring-2 focus-within:ring-highlight/50 transition-all">
                  <div className="flex items-center px-4 py-2">
                    <Search className="h-5 w-5 text-slate-400 mr-3" />
                    <input 
                      type="text" 
                      placeholder="Ask about a standard, product, or compliance requirement..."
                      className="flex-1 bg-transparent border-0 focus:ring-0 text-primary placeholder-slate-400"
                    />
                    <Link href="/login" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-2 shadow-sm whitespace-nowrap">
                      Ask AI
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-medium text-slate-500 py-1.5 mr-2">Examples:</span>
                  {["LED lighting standards", "Food packaging requirements", "Electrical safety", "Construction materials"].map((chip) => (
                    <button key={chip} className="bg-background border border-border hover:border-highlight text-slate-600 hover:text-highlight px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* AI Research Result Mock Panel */}
              <div className="relative hidden lg:block perspective-1000">
                <motion.div 
                  initial={{ opacity: 0, y: 20, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-card border border-border rounded-xl shadow-2xl p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-highlight"></div>
                  
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1.5 rounded text-primary">
                        <Zap className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-primary text-sm">AI Research Result</span>
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-background px-2 py-1 rounded border border-border">Just now</span>
                  </div>

                  <h3 className="font-medium text-slate-700 text-sm mb-4">Relevant Standards Found</h3>
                  
                  <div className="space-y-3">
                    {/* Mock Card 1 */}
                    <div className="bg-background border border-border rounded-lg p-3 flex justify-between items-center group hover:border-highlight transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-accent/10 flex items-center justify-center text-accent">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-primary text-sm">IS 10322</div>
                          <div className="text-xs text-slate-500">LED Modules / Luminaires</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-success flex items-center gap-1 justify-end">
                          <CheckCircle className="h-3 w-3" /> 94%
                        </div>
                        <div className="text-[10px] text-slate-400">Relevance</div>
                      </div>
                    </div>

                    {/* Mock Card 2 */}
                    <div className="bg-background border border-border rounded-lg p-3 flex justify-between items-center group hover:border-highlight transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-accent/10 flex items-center justify-center text-accent">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-primary text-sm">IS 302</div>
                          <div className="text-xs text-slate-500">Electrical Safety</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-success flex items-center gap-1 justify-end">
                          <CheckCircle className="h-3 w-3" /> 87%
                        </div>
                        <div className="text-[10px] text-slate-400">Relevance</div>
                      </div>
                    </div>

                    {/* Mock Card 3 */}
                    <div className="bg-background border border-border rounded-lg p-3 flex justify-between items-center group hover:border-highlight transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-accent/10 flex items-center justify-center text-accent">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-primary text-sm">IS 16107</div>
                          <div className="text-xs text-slate-500">Luminaires Performance</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-highlight flex items-center gap-1 justify-end">
                          <AlertTriangle className="h-3 w-3" /> 82%
                        </div>
                        <div className="text-[10px] text-slate-400">Relevance</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 p-3 bg-accent/5 rounded-lg border border-accent/10">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-primary font-semibold">Insight:</strong> IS 10322 provides the primary testing methodology for this product category. Ensure compliance with Part 5 Sec 1 for street lighting applications.
                    </p>
                  </div>
                </motion.div>
                
                {/* Decorative elements */}
                <div className="absolute -right-4 top-10 h-64 w-64 bg-highlight/5 rounded-full blur-[60px] -z-10"></div>
                <div className="absolute -left-10 bottom-10 h-40 w-40 bg-accent/5 rounded-full blur-[40px] -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 bg-background">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4">Why professionals use BIS AI</h2>
              <p className="text-slate-600">A comprehensive suite designed for compliance teams and procurement officers.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Search className="h-24 w-24" />
                </div>
                <div className="h-10 w-10 bg-background border border-border rounded-lg flex items-center justify-center mb-5 group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors">
                  <MessageSquare className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-base font-bold text-primary mb-2">Natural Language Search</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Describe your product in plain english to instantly discover applicable IS codes without knowing the exact numbers.</p>
              </div>

              <div className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <FileText className="h-24 w-24" />
                </div>
                <div className="h-10 w-10 bg-background border border-border rounded-lg flex items-center justify-center mb-5 group-hover:bg-highlight/10 group-hover:border-highlight/20 transition-colors">
                  <BookOpen className="h-5 w-5 text-highlight" />
                </div>
                <h3 className="text-base font-bold text-primary mb-2">Cited Answers</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Every AI response includes exact clause citations and source document links for verifiable research and trust.</p>
              </div>

              <div className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ShieldCheck className="h-24 w-24" />
                </div>
                <div className="h-10 w-10 bg-background border border-border rounded-lg flex items-center justify-center mb-5 group-hover:bg-success/10 group-hover:border-success/20 transition-colors">
                  <ShieldCheck className="h-5 w-5 text-success" />
                </div>
                <h3 className="text-base font-bold text-primary mb-2">Compliance Intelligence</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Run automated checks on product specifications against standards to generate accurate compliance matrices.</p>
              </div>

              <div className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Search className="h-24 w-24" />
                </div>
                <div className="h-10 w-10 bg-background border border-border rounded-lg flex items-center justify-center mb-5 group-hover:bg-warning/10 group-hover:border-warning/20 transition-colors">
                  <FileText className="h-5 w-5 text-warning" />
                </div>
                <h3 className="text-base font-bold text-primary mb-2">Tender Analysis</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Upload bulky tender PDFs to extract mandatory standards, document requirements, and identify compliance gaps.</p>
              </div>

            </div>
          </div>
        </section>
        {/* How to use Section */}
        <section className="w-full py-24 bg-card border-t border-border">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4">How it works</h2>
              <p className="text-slate-600">Simple steps to streamline your compliance and tender workflows.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Compliance Checker Instructions */}
              <div className="bg-background border border-border p-8 rounded-2xl shadow-sm hover:border-success/30 transition-colors">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                  <div className="h-12 w-12 bg-success/10 rounded-xl flex items-center justify-center text-success">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">Compliance Checker</h3>
                    <p className="text-sm text-slate-500">Verify product requirements</p>
                  </div>
                </div>
                
                <ul className="space-y-6 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-border">
                  <li className="relative pl-10">
                    <div className="absolute left-[0.55rem] top-1 w-3 h-3 rounded-full bg-success z-10 ring-4 ring-background"></div>
                    <h4 className="font-bold text-primary text-sm mb-1">1. Add Your Product</h4>
                    <p className="text-xs text-slate-600">Enter product name or capture a photo.</p>
                  </li>
                  <li className="relative pl-10">
                    <div className="absolute left-[0.55rem] top-1 w-3 h-3 rounded-full bg-success z-10 ring-4 ring-background"></div>
                    <h4 className="font-bold text-primary text-sm mb-1">2. Review Standards</h4>
                    <p className="text-xs text-slate-600">AI automatically finds relevant IS codes.</p>
                  </li>
                  <li className="relative pl-10">
                    <div className="absolute left-[0.55rem] top-1 w-3 h-3 rounded-full bg-success z-10 ring-4 ring-background"></div>
                    <h4 className="font-bold text-primary text-sm mb-1">3. Generate Matrix</h4>
                    <p className="text-xs text-slate-600">Instantly view and download compliance gaps.</p>
                  </li>
                </ul>
              </div>

              {/* Tender Analysis Instructions */}
              <div className="bg-background border border-border p-8 rounded-2xl shadow-sm hover:border-warning/30 transition-colors">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                  <div className="h-12 w-12 bg-warning/10 rounded-xl flex items-center justify-center text-warning">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">Tender Analysis</h3>
                    <p className="text-sm text-slate-500">Extract standards from documents</p>
                  </div>
                </div>
                
                <ul className="space-y-6 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-border">
                  <li className="relative pl-10">
                    <div className="absolute left-[0.55rem] top-1 w-3 h-3 rounded-full bg-warning z-10 ring-4 ring-background"></div>
                    <h4 className="font-bold text-primary text-sm mb-1">1. Upload Tender</h4>
                    <p className="text-xs text-slate-600">Upload PDF or scan document with the camera.</p>
                  </li>
                  <li className="relative pl-10">
                    <div className="absolute left-[0.55rem] top-1 w-3 h-3 rounded-full bg-warning z-10 ring-4 ring-background"></div>
                    <h4 className="font-bold text-primary text-sm mb-1">2. Let AI Read</h4>
                    <p className="text-xs text-slate-600">System identifies hidden standard references.</p>
                  </li>
                  <li className="relative pl-10">
                    <div className="absolute left-[0.55rem] top-1 w-3 h-3 rounded-full bg-warning z-10 ring-4 ring-background"></div>
                    <h4 className="font-bold text-primary text-sm mb-1">3. Review Gaps</h4>
                    <p className="text-xs text-slate-600">Check required documents before submission.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card py-8 text-center text-slate-500 text-xs font-medium">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0 text-primary font-bold">
            <ShieldCheck className="h-4 w-4 text-primary" />
            BIS AI
          </div>
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div>&copy; 2026 BIS AI Platform. Mockup created for demonstration.</div>
        </div>
      </footer>
    </div>
  );
}
