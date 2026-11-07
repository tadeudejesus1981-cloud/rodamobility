import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Scan, 
  Camera, 
  Cpu, 
  ShieldCheck, 
  X,
  FileCheck2
} from 'lucide-react';

export default function AiScannerModal({ isOpen, onClose, onScanComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }

    // Step 0: Scanning laser starts immediately
    const timer1 = setTimeout(() => setStep(1), 700);
    const timer2 = setTimeout(() => setStep(2), 1400);
    const timer3 = setTimeout(() => setStep(3), 2100);
    const timer4 = setTimeout(() => {
      onScanComplete({
        fullName: 'Carlos Martínez Ruiz',
        dni: '78945612-X',
        driverLicense: 'B-78945612',
        licenseDate: '2018-06-14',
        licenseType: 'Permiso B (Coche)',
        seniorityYears: 8,
        isQualified125cc: true,
        phone: '+34 611 234 567',
        email: 'carlos.almeria@gmail.com',
        city: 'Almería Capital',
        postalCode: '04007',
        confidenceScore: '99.4%'
      });
      onClose();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111111] border border-[#C8F000]/60 rounded-3xl max-w-lg w-full overflow-hidden shadow-[0_0_50px_rgba(200,240,0,0.25)] text-white">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#C8F000] text-[#111111]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Escáner IA · Verificación Biométrica & OCR
                <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-700 px-2 py-0.5 rounded-full font-mono">
                  Supabase AI
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Lectura de DNI y Carnet de Conducir oficial de España
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner Viewport / HUD */}
        <div className="p-6">
          <div className="relative h-64 w-full bg-zinc-950 rounded-2xl overflow-hidden border-2 border-zinc-700 flex items-center justify-center">
            
            {/* Visual simulation of Document being scanned */}
            <div className="w-[85%] h-[75%] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl border border-zinc-600 p-4 shadow-inner relative flex flex-col justify-between">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-4 bg-[#003399] rounded text-[8px] text-white flex items-center justify-center font-bold">
                    ES
                  </div>
                  <span className="text-[11px] font-bold text-zinc-200 uppercase tracking-wider">
                    ESPAÑA · DNI / CARNET
                  </span>
                </div>
                <span className="text-[9px] font-mono text-zinc-400">
                  REF: 78945612-X
                </span>
              </div>

              {/* Photo placeholder + Data lines */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-20 bg-zinc-700/80 rounded-lg border border-zinc-500 relative flex items-center justify-center overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-zinc-500" />
                  <div className="absolute inset-0 border border-[#C8F000]/60 rounded-lg pointer-events-none" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 bg-zinc-600 rounded w-3/4" />
                  <div className="h-2 bg-zinc-600 rounded w-1/2" />
                  <div className="h-2 bg-zinc-700 rounded w-5/6" />
                  <div className="h-2 bg-zinc-700 rounded w-2/3" />
                </div>
              </div>

              {/* MRZ Machine Readable Zone */}
              <div className="font-mono text-[8px] text-zinc-400 tracking-widest bg-zinc-900/90 p-1.5 rounded border border-zinc-700">
                IDESP78945612X3&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;9406143M
              </div>

              {/* Corner targeting brackets */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#C8F000]" />
              <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#C8F000]" />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#C8F000]" />
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#C8F000]" />
            </div>

            {/* Glowing Lime Laser Scan Line */}
            <div className="absolute left-0 right-0 h-1 bg-[#C8F000] shadow-[0_0_15px_#C8F000,0_0_30px_#C8F000] animate-scan-beam pointer-events-none" />

            {/* Live Status HUD Overlay */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-zinc-800 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8F000] animate-ping" />
                <span className="font-mono text-[#C8F000]">OCR ENGINE ONLINE</span>
              </div>
              <span className="font-mono text-zinc-400">99.4% MATCH</span>
            </div>
          </div>

          {/* Stepper Progress Log */}
          <div className="mt-4 space-y-2 text-xs">
            <div className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
              step >= 1 
                ? 'bg-zinc-900 border-[#C8F000]/40 text-zinc-200' 
                : 'bg-zinc-950/40 border-zinc-800 text-zinc-500'
            }`}>
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${step >= 1 ? 'text-[#C8F000]' : 'text-zinc-600'}`} />
              <span>DNI Detectado: <strong>Carlos Martínez Ruiz</strong> (78945612-X · Almería)</span>
            </div>

            <div className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
              step >= 2 
                ? 'bg-zinc-900 border-[#C8F000]/40 text-zinc-200' 
                : 'bg-zinc-950/40 border-zinc-800 text-zinc-500'
            }`}>
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${step >= 2 ? 'text-[#C8F000]' : 'text-zinc-600'}`} />
              <span>Carnet B expedido: <strong>14/06/2018</strong> (Antigüedad calculada: <strong>8 años</strong>)</span>
            </div>

            <div className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
              step >= 3 
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200' 
                : 'bg-zinc-950/40 border-zinc-800 text-zinc-500'
            }`}>
              <ShieldCheck className={`w-4 h-4 shrink-0 ${step >= 3 ? 'text-emerald-400' : 'text-zinc-600'}`} />
              <span className="font-bold">
                Validación DGT Superada: Apto para Scooter 125cc (&gt;3 años Carnet B).
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
