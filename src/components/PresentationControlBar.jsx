import React from 'react';
import { 
  FileText, 
  Smartphone, 
  Sparkles, 
  Layers, 
  RotateCcw, 
  Monitor, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  ShieldCheck,
  Eye
} from 'lucide-react';

export default function PresentationControlBar({ 
  currentPlan, 
  onChangePlan, 
  isMobileFrame, 
  onToggleMobileFrame,
  onResetDemo,
  hasActiveBooking
}) {
  const plans = [
    {
      id: 'standard',
      number: '1',
      title: 'Plan STANDARD',
      subtitle: 'Manual / WhatsApp',
      icon: FileText,
      badge: 'Básico',
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700',
      pitchText: '🔴 MODO STANDARD (Manual): El cliente envía mensaje por WhatsApp, espera respuesta humana, firma papel físico en tienda y el dueño anota el stock a mano. (Muestra la fricción operativa actual).'
    },
    {
      id: 'advance',
      number: '2',
      title: 'Plan ADVANCE',
      subtitle: 'Digital Automático',
      icon: Smartphone,
      badge: '⭐ FOCO DE VENTA',
      badgeColor: 'bg-[#C8F000] text-[#111111] font-bold border-[#C8F000]',
      pitchText: '⭐ MODO ADVANCE (Digital Autónomo - Foco de Venta): El cliente escribe sus datos, sube foto de DNI, firma en pantalla táctil con el dedo, recibe su PDF al instante y el stock se bloquea en tiempo real.'
    },
    {
      id: 'enterprise',
      number: '3',
      title: 'Plan ENTERPRISE',
      subtitle: 'Full IA + Supabase',
      icon: Sparkles,
      badge: '⚡ FULL IA',
      badgeColor: 'bg-cyan-400 text-black font-bold border-cyan-300',
      pitchText: '⚡ MODO ENTERPRISE (Full IA): Cero digitação. Escáner OCR animado con láser IA, validación automática de carnet DGT (>3 años Carnet B para 125cc), firma digital y webhook Supabase.'
    },
    {
      id: 'stock',
      number: '4',
      title: 'Panel del Dueño',
      subtitle: 'Stock en Vivo',
      icon: Layers,
      badge: '📊 GESTIÓN',
      badgeColor: 'bg-amber-400 text-black font-bold border-amber-300',
      pitchText: '📊 PANEL DEL DUEÑO (Stock de las 3 Motos): Visualiza el inventario en tiempo real. En Standard se cambia a mano; en Advance e Enterprise el calendario se bloquea solo y genera PDFs.'
    }
  ];

  const activePlanObj = plans.find(p => p.id === currentPlan) || plans[1];

  return (
    <header className="sticky top-0 z-50 bg-[#111111] border-b border-zinc-800 text-white shadow-2xl transition-all">
      {/* Top Demo Utility Bar */}
      <div className="max-w-7xl mx-auto px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 text-[11px]">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8F000] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8F000]"></span>
          </span>
          <span className="font-semibold text-zinc-200 uppercase tracking-wider">
            DEMO EN VIVO PARA REUNIÓN DE VENTAS
          </span>
          <span className="hidden sm:inline text-zinc-500">|</span>
          <span className="hidden md:inline text-zinc-400">
            Locadora de Motos <strong className="text-white">RODA MOBILITY</strong> (Almería, España)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile frame simulator toggle for desktop meetings */}
          <button
            onClick={onToggleMobileFrame}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
              isMobileFrame 
                ? 'bg-[#C8F000] text-[#111111] border-[#C8F000] font-bold shadow-[0_0_12px_rgba(200,240,0,0.3)]' 
                : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
            }`}
            title="Alternar entre simulación de pantalla de Móvil o Responsive Completo"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ver en</span> Pantalla Completa
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simular</span> Marco Móvil (390px)
              </>
            )}
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={onResetDemo}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-700 hover:bg-zinc-800 hover:text-white transition-colors"
            title="Reiniciar simulador (libera las motos para volver a probar)"
          >
            <RotateCcw className="w-3 h-3 text-[#C8F000]" />
            <span className="hidden sm:inline">Reiniciar</span> Demo
          </button>
        </div>
      </div>

      {/* 4 Interactive Presentation Buttons */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2.5">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isActive = currentPlan === plan.id;
            const isAdvanceFocus = plan.id === 'advance';

            return (
              <button
                key={plan.id}
                onClick={() => onChangePlan(plan.id)}
                className={`relative group flex items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all text-left overflow-hidden ${
                  isActive
                    ? 'bg-zinc-900 border-[#C8F000] shadow-[0_0_15px_-3px_rgba(200,240,0,0.35)] ring-1 ring-[#C8F000]'
                    : isAdvanceFocus
                    ? 'bg-zinc-900/80 border-lime-500/40 hover:border-[#C8F000] text-zinc-300 hover:bg-zinc-800'
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:bg-zinc-900'
                }`}
              >
                {/* Active Indicator Top Stripe */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#C8F000]" />
                )}

                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className={`p-1.5 sm:p-2 rounded-lg shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-[#C8F000] text-[#111111]' 
                      : 'bg-zinc-800 text-zinc-300 group-hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11px] sm:text-xs font-bold truncate ${
                        isActive ? 'text-white' : 'text-zinc-200'
                      }`}>
                        {plan.number}. {plan.title}
                      </span>
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-zinc-400 truncate">
                      {plan.subtitle}
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="hidden sm:block ml-2 shrink-0">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase tracking-wider ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Sales Pitch Banner */}
      <div className={`px-3 py-1.5 text-xs transition-colors border-t border-zinc-800 ${
        currentPlan === 'advance' 
          ? 'bg-lime-950/40 text-lime-200 border-lime-800/40' 
          : currentPlan === 'enterprise'
          ? 'bg-cyan-950/40 text-cyan-200 border-cyan-800/40'
          : currentPlan === 'stock'
          ? 'bg-amber-950/40 text-amber-200 border-amber-800/40'
          : 'bg-zinc-900 text-zinc-300'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[11px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/40 border border-current">
              PITCH EN VIVO:
            </span>
            <p className="text-[11px] sm:text-xs font-medium leading-tight">
              {activePlanObj.pitchText}
            </p>
          </div>

          {hasActiveBooking && currentPlan !== 'stock' && (
            <button
              onClick={() => onChangePlan('stock')}
              className="hidden lg:flex items-center gap-1 shrink-0 text-[11px] font-bold bg-[#C8F000] text-[#111111] px-2.5 py-1 rounded hover:opacity-90 transition-opacity"
            >
              <Eye className="w-3.5 h-3.5" />
              Ver en Stock
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
