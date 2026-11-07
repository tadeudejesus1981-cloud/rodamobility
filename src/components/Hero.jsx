import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Wrench, 
  Headphones, 
  Compass,
  Bike
} from 'lucide-react';

export default function Hero({ onExploreClick, onOpenRoutes }) {
  return (
    <section className="relative bg-[#111111] text-white overflow-hidden border-b border-zinc-800">
      {/* Background Hero Image: Desierto de Tabernas & Almería badlands highway with subtle gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1600&auto=format&fit=crop&q=85"
          alt="Desierto de Tabernas y cañones áridos de Almería"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Sleek radial and dark gradient overlays for maximum contrast and luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12 sm:pb-16">
        
        {/* Genuine Fleet Badge (Exclusively Scooters and Motorbikes) */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-[#C8F000]/60 text-xs font-bold text-white mb-6 shadow-[0_0_15px_rgba(200,240,0,0.2)] backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#C8F000] animate-pulse" />
          <span className="text-[#C8F000]">ALQUILER EXCLUSIVO:</span>
          <span className="text-zinc-200">SCOOTERS HONDA 125cc Y GRAN CILINDRADA</span>
        </div>

        {/* Hero Slogans */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900/80 border border-zinc-700/80 text-xs text-zinc-300 mb-4 backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-[#C8F000]" />
            <span>Almería Capital · Desierto de Tabernas · Playas de Cabo de Gata</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-4">
            Tu movilidad. <br className="hidden sm:inline" />
            <span className="text-[#C8F000] underline decoration-[#C8F000]/40 underline-offset-8">
              Sin límites.
            </span>
          </h1>

          <p className="text-lg sm:text-2xl font-semibold text-zinc-200 tracking-wide mb-3">
            Explora. Trabaja. Disfruta. <span className="text-[#C8F000]">Muévete a tu manera.</span>
          </p>

          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed mb-8 max-w-2xl">
            Alquiler especializado de scooters Honda PCX 125cc (Rojas y Negras) y maxiscooters de 300cc en Almería. 
            Contratación 100% digital, sin colas ni papeleos. Casco homologado y seguro siempre incluidos.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
            <button
              onClick={onExploreClick}
              className="group flex items-center justify-center gap-2.5 bg-[#C8F000] text-[#111111] hover:bg-[#b5d900] px-6 py-3.5 rounded-xl font-extrabold text-sm sm:text-base tracking-wide transition-all shadow-[0_0_25px_-4px_rgba(200,240,0,0.5)] active:scale-95"
            >
              <span>Ver las 3 Motos Disponibles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenRoutes}
              className="flex items-center justify-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-[#C8F000]/50 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all backdrop-blur-sm"
            >
              <Compass className="w-4 h-4 text-[#C8F000]" />
              <span>Ver Rutas Playas y Desierto de Tabernas</span>
            </button>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="bg-zinc-900/70 border border-zinc-800 p-3 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[#C8F000] mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold text-white">Reserva Online</span>
              </div>
              <p className="text-[11px] text-zinc-400">Rápido y fácil en 1 minuto</p>
            </div>

            <div className="bg-zinc-900/70 border border-zinc-800 p-3 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[#C8F000] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-white">Seguros Incluidos</span>
              </div>
              <p className="text-[11px] text-zinc-400">Tranquilidad total en ruta</p>
            </div>

            <div className="bg-zinc-900/70 border border-zinc-800 p-3 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[#C8F000] mb-1">
                <Wrench className="w-4 h-4" />
                <span className="text-xs font-bold text-white">Mantenimiento</span>
              </div>
              <p className="text-[11px] text-zinc-400">Flota Honda revisada a diario</p>
            </div>

            <div className="bg-zinc-900/70 border border-zinc-800 p-3 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[#C8F000] mb-1">
                <Headphones className="w-4 h-4" />
                <span className="text-xs font-bold text-white">Asistencia 24/7</span>
              </div>
              <p className="text-[11px] text-zinc-400">En cualquier punto de Almería</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
