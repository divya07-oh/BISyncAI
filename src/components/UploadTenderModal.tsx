"use client";

import React, { useState, useRef } from "react";
import { Camera, Upload, X, Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadTenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

export default function UploadTenderModal({ isOpen, onClose, onUploadSuccess }: UploadTenderModalProps) {
  const [uploadState, setUploadState] = useState<"selection" | "success">("selection");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadState("success");
      setTimeout(() => {
        onUploadSuccess();
        handleClose();
      }, 1500);
    }
  };

  const handleCameraScan = () => {
    // In a real app, this would open a document scanner
    setUploadState("success");
    setTimeout(() => {
      onUploadSuccess();
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setUploadState("selection");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-50 transition-opacity" 
        onClick={handleClose}
      />
      <div className={cn(
        "fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:right-auto md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-card rounded-t-3xl md:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-transform transform duration-300 ease-in-out translate-y-0"
      )}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-primary">Upload Tender</h2>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {uploadState === "selection" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <label className="relative flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group min-h-[44px]">
                  <input 
                    type="file" 
                    accept=".pdf,.docx" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                  <FileText className="h-8 w-8 text-slate-400 group-hover:text-accent mb-3" />
                  <span className="font-bold text-primary group-hover:text-accent">Choose PDF / DOCX</span>
                  <span className="text-xs text-slate-500 mt-1">Select file from your device</span>
                </label>

                <label className="relative flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-solid border-slate-200 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group min-h-[44px]">
                  <input 
                    type="file" 
                    accept="image/jpeg, image/png, image/webp"
                    capture="environment" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                  <Camera className="h-8 w-8 text-slate-400 group-hover:text-primary mb-3" />
                  <span className="font-bold text-primary group-hover:text-primary">Camera Scan</span>
                  <span className="text-xs text-slate-500 mt-1">Photograph tender pages</span>
                </label>
              </div>
            </div>
          )}

          {uploadState === "success" && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center">
                <Check className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">Tender added successfully</h3>
                <p className="text-sm text-slate-500 font-medium">Preparing to analyze document...</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
