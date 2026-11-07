import React, { useRef, useEffect, useState } from 'react';
import { Eraser, CheckCircle2, PenLine } from 'lucide-react';

export default function SignaturePad({ onSignatureChange, disabled = false }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Handle high-dpi displays
    const ratio = Math.ceil(window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.scale(ratio, ratio);

    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      onSignatureChange(dataUrl);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignatureChange(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-zinc-700 flex items-center gap-1.5">
          <PenLine className="w-3.5 h-3.5 text-[#C8F000] bg-black p-0.5 rounded" />
          Firma Digital en Pantalla (Dibuja con el dedo o ratón):
        </span>
        <button
          type="button"
          onClick={clearSignature}
          disabled={disabled || !hasSignature}
          className="text-[11px] text-[#7C7C78] hover:text-red-600 flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Eraser className="w-3 h-3" />
          Limpiar Firma
        </button>
      </div>

      <div className="relative border-2 border-dashed border-zinc-300 rounded-xl bg-white overflow-hidden touch-none h-32 w-full hover:border-zinc-400 transition-colors">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {/* Guidelines and Watermark */}
        {!hasSignature && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-zinc-400 select-none">
            <span className="text-xs font-medium">Firme aquí con el dedo o cursor</span>
            <div className="w-48 h-[1px] bg-zinc-200 mt-4 border-b border-dashed border-zinc-300" />
            <span className="text-[9px] text-zinc-400 mt-1">Línea de firma legal</span>
          </div>
        )}

        {hasSignature && (
          <div className="absolute top-2 right-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Firma Registrada
          </div>
        )}
      </div>
    </div>
  );
}
