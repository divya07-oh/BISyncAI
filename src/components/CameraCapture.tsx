import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, X } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onCancel: () => void;
}

export default function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Failed to access camera. Please make sure you have granted permission.');
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }, [stream]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/jpeg');
        stopCamera();
        onCapture(imageSrc);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      {error ? (
        <div className="p-4 bg-error/10 text-error rounded-xl border border-error/20 text-center w-full">
          <p>{error}</p>
          <button 
            onClick={onCancel}
            className="mt-4 px-4 py-2 bg-error text-white rounded-lg font-medium"
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <button 
              onClick={() => {
                stopCamera();
                onCancel();
              }}
              className="py-3 px-4 rounded-xl border border-border font-bold text-slate-600 hover:bg-slate-50 min-h-[44px]"
            >
              Cancel
            </button>
            <button 
              onClick={handleCapture}
              className="py-3 px-4 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Camera className="h-5 w-5" /> Capture
            </button>
          </div>
        </>
      )}
    </div>
  );
}
