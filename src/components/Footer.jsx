import React from 'react';
import Logo from './Logo';
import { MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onOpenModal, onNavigateToCatalog }) {
  return (
    <footer className="bg-[#0c0c0c] text-white border-t border-zinc-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-800">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <Logo variant="dark" size="md" showSlogan={true} />
            <p className="text-xs text-zinc-400 leading-relaxed mt-2">
              Locadora de motos premium en Almería y Cabo de Gata. 
              Alquiler 100% digital, transparente y sin complicaciones.
            </p>
            <div className="text-[11px] text-zinc-500">
              RODA MOBILITY S.L. · CIF B-04987213
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-white text-[11px] mb-2">
              Explorar
            </h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li>
                <button onClick={onNavigateToCatalog} className="hover:text-[#C8F000] transition-colors">
                  Catálogo de Motos (3 Modelos)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('routes')} className="hover:text-[#C8F000] transition-colors">
                  Rutas en Moto por Almería
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('about')} className="hover:text-[#C8F000] transition-colors">
                  Sobre Nosotros & Flota
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('insurance')} className="hover:text-[#C8F000] transition-colors">
                  Seguro Básico vs Todo Riesgo
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Safety */}
          <div className="space-y-2 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-white text-[11px] mb-2">
              Legal y Normativa DGT
            </h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li>
                <button onClick={() => onOpenModal('terms')} className="hover:text-[#C8F000] transition-colors">
                  Condiciones y Multas de Tráfico
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('terms')} className="hover:text-[#C8F000] transition-colors">
                  Normas Parque Natural Cabo de Gata
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('terms')} className="hover:text-[#C8F000] transition-colors">
                  Política de Privacidad (RGPD)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal('terms')} className="hover:text-[#C8F000] transition-colors">
                  Política de Depósito Lleno/Lleno
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Location & Contact */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-white text-[11px] mb-2">
              Tienda Central Almería
            </h4>
            <p className="flex items-start gap-2 text-zinc-400 text-[11px]">
              <MapPin className="w-4 h-4 text-[#C8F000] shrink-0 mt-0.5" />
              <span>Paseo Marítimo Carmen de Burgos, 14, 04007 Almería, España</span>
            </p>
            <p className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <Phone className="w-3.5 h-3.5 text-[#C8F000]" />
              <span>+34 950 123 456 / +34 611 987 654</span>
            </p>
            <p className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <Mail className="w-3.5 h-3.5 text-[#C8F000]" />
              <span>reservas@rodamobility.com</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} RODA MOBILITY S.L. Todos los derechos reservados. Almería, España.
          </div>

          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-mono">VISA</span>
            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-mono">MASTERCARD</span>
            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-bold text-[#C8F000]">BIZUM</span>
            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-mono">APPLE PAY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
