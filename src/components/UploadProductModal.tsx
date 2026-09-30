"use client";

import React, { useState, useRef } from "react";
import { Camera, Upload, X, Check, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (imageSrc: string) => void;
}

type UploadState = "selection" | "camera" | "preview" | "success";

export default function UploadProductModal({ isOpen, onClose, onUploadSuccess }: UploadProductModalProps) {
  const [uploadState, setUploadState] = useState<UploadState>("selection");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setUploadState("preview");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setImageSrc(null);
    setUploadState("selection");
    setErrorMsg(null);
    onClose();
  };

  const handleUseImage = () => {
    setUploadState("success");
    setTimeout(() => {
      if (imageSrc) onUploadSuccess(imageSrc);
      handleClose();
    }, 1500);
  };



  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-50 transition-opacity" 
        onClick={handleClose}
      />
      <div className={cn(
        "fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:right-auto md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-card rounded-t-3xl md:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-transform transform duration-300 ease-in-out",
        "translate-y-0"
      )}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-primary">
            {uploadState === "camera" ? "Take a Photo" : 
             uploadState === "preview" ? "Preview Image" : 
             "Add Product Image"}
          </h2>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-error/10 text-error text-sm rounded-lg border border-error/20 flex gap-2 items-start">
              <Upload className="h-5 w-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {uploadState === "selection" && (
            <div className="space-y-6">
              <p className="text-sm text-slate-500 font-medium text-center">How would you like to add your product?</p>
              
              <div className="grid grid-cols-1 gap-4">
                <label className="relative flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group min-h-[44px]">
                  <input 
                    type="file" 
                    accept="image/jpeg, image/png, image/webp" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                  <Upload className="h-8 w-8 text-slate-400 group-hover:text-accent mb-3" />
                  <span className="font-bold text-primary group-hover:text-accent">Upload Image</span>
                  <span className="text-xs text-slate-500 mt-1">Choose an image from your phone</span>
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
                  <span className="font-bold text-primary group-hover:text-primary">Open Camera</span>
                  <span className="text-xs text-slate-500 mt-1">Take a picture of your product</span>
                </label>
              </div>
            </div>
          )}

          {uploadState === "preview" && (
            <div className="flex flex-col items-center space-y-6">
              {imageSrc && (
                <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm">
                  <img src={imageSrc} alt="Product Preview" className="w-full max-h-[40vh] object-contain bg-slate-100" />
                  <div className="p-3 bg-slate-50 flex items-center gap-3 border-t border-border">
                    <ImageIcon className="h-5 w-5 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700 truncate flex-1">
                      product_image.jpg
                    </span>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3 w-full">
                <button 
                  onClick={() => {
                    setImageSrc(null);
                    setUploadState("selection");
                  }}
                  className="py-3 px-4 rounded-xl border border-border font-bold text-slate-600 hover:bg-slate-50 min-h-[44px]"
                >
                  Retake / Remove
                </button>
                <button 
                  onClick={handleUseImage}
                  className="py-3 px-4 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Check className="h-5 w-5" /> Use Image
                </button>
              </div>
            </div>
          )}

          {uploadState === "success" && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center">
                <Check className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">Product image added</h3>
                <p className="text-sm text-slate-500 font-medium">Preparing to analyze product...</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
