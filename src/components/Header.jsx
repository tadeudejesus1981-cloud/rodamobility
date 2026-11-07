import React, { useState } from 'react';
import Logo from './Logo';
import { 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  AlertCircle, 
  MapPin, 
  HelpCircle, 
  Sparkles,
  Compass,
  FileText
} from 'lucide-react';

export default function Header({ 
  onOpenModal, 
  onNavigateToCatalog 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Catálogo', onClick: () => { onNavigateToCatalog(); setMobileMenuOpen(false); } },
    { label: 'Sobre Nosotros', onClick: () => { onOpenModal('about'); setMobileMenuOpen(false); } },
    { label: 'Rutas Almería', onClick: () => { onOpenModal('routes'); setMobileMenuOpen(false); } },
    { label: 'Seguro Básico', onClick: () => { onOpenModal('insurance'); setMobileMenuOpen(false); } },
    { label: 'Condiciones y Multas', onClick: () => { onOpenModal('terms'); setMobileMenuOpen(false); } },
    { label: 'Soporte', onClick: () => { onOpenModal('support'); setMobileMenuOpen(false); } },
  ];

  return (
    <nav className="bg-[#111111] text-white border-b border-zinc-800/80 sticky top-[73px] sm:top-[77px] z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateToCatalog}>
            <Logo variant="dark" size="md" showSlogan={true} />
            <div className="hidden xl:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-300">
              <MapPin className="w-3 h-3 text-[#C8F000]" />
              <span>Almería & Cabo de Gata</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={link.onClick}
                className="text-zinc-300 hover:text-[#C8F000] transition-colors tracking-wide py-1 border-b-2 border-transparent hover:border-[#C8F000]"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+34950123456"
              className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8F000]" />
              <span>+34 950 123 456</span>
            </a>

            <button
              onClick={onNavigateToCatalog}
              className="bg-[#C8F000] text-[#111111] hover:bg-[#b5d900] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-[0_0_15px_-3px_rgba(200,240,0,0.4)] active:scale-95"
            >
              Reservar Moto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onNavigateToCatalog}
              className="bg-[#C8F000] text-[#111111] px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide"
            >
              Reservar
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#161616] border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1 text-sm font-medium">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={link.onClick}
                className="flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-zinc-200 hover:bg-zinc-900 hover:text-[#C8F000]"
              >
                <span>{link.label}</span>
                <span className="text-zinc-500 text-xs">→</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-zinc-400 px-3">
              <MapPin className="w-4 h-4 text-[#C8F000]" />
              <span>Paseo Marítimo Carmen de Burgos, 14, Almería</span>
            </div>
            <a
              href="tel:+34950123456"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-medium"
            >
              <Phone className="w-4 h-4 text-[#C8F000]" />
              Llamar a Tienda: +34 950 123 456
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
