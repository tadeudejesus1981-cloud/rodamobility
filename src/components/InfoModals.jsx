import React from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  Compass, 
  Phone, 
  Clock, 
  Mail, 
  Fuel, 
  Award,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ALMERIA_ROUTES, CONTRACT_TERMS } from '../data/bikes';
import Logo from './Logo';

export default function InfoModals({ activeModal, onClose }) {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111111] text-white border border-zinc-700 rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5">
          <Logo variant="dark" size="sm" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* SOBRE NOSOTROS                                            */}
        {/* ======================================================== */}
        {activeModal === 'about' && (
          <div className="space-y-4 text-xs leading-relaxed text-zinc-300">
            <h3 className="text-xl font-black text-white">
              Sobre RODA MOBILITY · Almería
            </h3>
            <p className="text-sm text-[#C8F000] font-semibold">
              "Tu movilidad. Sin límites. Explora. Trabaja. Disfruta. Muévete a tu manera."
            </p>
            <p>
              Somos la empresa especialista exclusiva en alquiler de motos y scooters en Almería, el Desierto de Tabernas y el Parque Natural de Cabo de Gata-Níjar. 
              Nuestra flota se centra en los modelos más fiables y confortables del mercado: 
              <strong> Honda PCX 125cc</strong> (Rojo Candy y Negro Mate) y la maxiscooter <strong>Honda Forza 300cc</strong> de gran cilindrada.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <strong className="text-white block mb-0.5">Sede Principal Almería</strong>
                <p className="text-zinc-400 text-[11px]">
                  Paseo Marítimo Carmen de Burgos, 14, 04007 Almería. Frente a la playa del Zapillo.
                </p>
              </div>
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <strong className="text-white block mb-0.5">Horario Continuado</strong>
                <p className="text-zinc-400 text-[11px]">
                  Lunes a Domingo de 08:30 a 20:30 h. Entregas y recogidas coordinadas en tienda o alojamiento.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-zinc-800">
              <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C8F000]" />
                Flota Exclusiva de Dos Ruedas:
              </h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Nos dedicamos en exclusiva al alquiler de motos y scooters, garantizando motos impecables revisadas a diario por mecánicos oficiales Honda. 
                Cada alquiler incluye casco homologado, seguro a terceros con asistencia 24h y depósito de gasolina lleno.
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* RUTAS ALMERÍA                                             */}
        {/* ======================================================== */}
        {activeModal === 'routes' && (
          <div className="space-y-5 text-xs text-zinc-300">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#C8F000]" />
                Rutas Recomendadas en Moto por Almería
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Itinerarios seleccionados para disfrutar de las carreteras costeras, playas vírgenes y el desierto de nuestra provincia.
              </p>
            </div>

            <div className="space-y-4">
              {ALMERIA_ROUTES.map((route, i) => (
                <div key={i} className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
                  <div className="h-36 w-full overflow-hidden relative">
                    <img
                      src={route.image}
                      alt={route.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold">
                      <span className="bg-[#C8F000] text-[#111111] px-2 py-0.5 rounded font-black">
                        {route.difficulty}
                      </span>
                      <span className="bg-black/60 px-2 py-0.5 rounded font-mono">
                        {route.distance}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h4 className="font-extrabold text-sm text-white">{route.title}</h4>
                    <p className="text-zinc-400 text-[11px]">{route.description}</p>
                    <div className="text-[10px] text-[#C8F000] font-semibold pt-1 border-t border-zinc-800">
                      Puntos destacados: {route.highlight}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SEGURO BÁSICO VS TODO RIESGO                             */}
        {/* ======================================================== */}
        {activeModal === 'insurance' && (
          <div className="space-y-4 text-xs text-zinc-300">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C8F000]" />
              Coberturas de Seguro RODA MOBILITY
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2">
                <span className="text-xs font-black uppercase text-zinc-300 block">
                  Seguro Básico (Incluido Siempre)
                </span>
                <p className="text-[11px] text-zinc-400">
                  Incluido de serie en todas las tarifas de alquiler de RODA MOBILITY.
                </p>
                <ul className="space-y-1.5 text-[11px] text-zinc-300">
                  <li className="flex items-center gap-1.5 text-emerald-400">✓ Responsabilidad Civil Obligatoria a Terceros</li>
                  <li className="flex items-center gap-1.5 text-emerald-400">✓ Asistencia en carretera 24/7 en Almería</li>
                  <li className="flex items-center gap-1.5 text-emerald-400">✓ 1 Casco homologado incluido</li>
                  <li className="flex items-center gap-1.5 text-zinc-400">⚠️ Fianza requerida (150€ scooter / 300€ 300cc)</li>
                  <li className="flex items-center gap-1.5 text-zinc-400">⚠️ Daños propios sujetos a franquicia</li>
                </ul>
              </div>

              <div className="p-4 bg-zinc-900 rounded-2xl border-2 border-[#C8F000] space-y-2 shadow-[0_0_20px_rgba(200,240,0,0.2)]">
                <span className="text-xs font-black uppercase text-[#C8F000] block">
                  Seguro Todo Riesgo (+5€/día)
                </span>
                <p className="text-[11px] text-zinc-400">
                  Exención total de responsabilidad para viajar con máxima tranquilidad.
                </p>
                <ul className="space-y-1.5 text-[11px] text-zinc-200">
                  <li className="flex items-center gap-1.5 text-[#C8F000]">✓ Franquicia CERO en daños propios</li>
                  <li className="flex items-center gap-1.5 text-[#C8F000]">✓ Cobertura ante pinchazos en ruta</li>
                  <li className="flex items-center gap-1.5 text-[#C8F000]">✓ Cobertura ante intento de robo</li>
                  <li className="flex items-center gap-1.5 text-[#C8F000]">✓ Sustitución inmediata de vehículo</li>
                  <li className="flex items-center gap-1.5 text-zinc-300">✓ Fianza reducida a trámite mínimo</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CONDICIONES Y MULTAS                                      */}
        {/* ======================================================== */}
        {activeModal === 'terms' && (
          <div className="space-y-4 text-xs text-zinc-300">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Condiciones de Alquiler y Gestión de Multas DGT
            </h3>

            <div className="space-y-3 bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-[11px]">
              <div className="border-b border-zinc-800 pb-2">
                <strong className="text-white block mb-0.5">1. Normativa en el Parque Natural Cabo de Gata-Níjar</strong>
                <p className="text-zinc-400">
                  Está terminantemente prohibido circular por caminos no asfaltados restringidos, pistas de tierra de protección especial 
                  o sobre la arena de las playas (Mónsul, Genoveses, Las Negras). La Junta de Andalucía sanciona con multas desde 600€.
                </p>
              </div>

              <div className="border-b border-zinc-800 pb-2">
                <strong className="text-white block mb-0.5">2. Infracciones de Tráfico y Radares en Almería</strong>
                <p className="text-zinc-400">
                  Las multas por exceso de velocidad, radares fijos o estacionamiento indebido son responsabilidad legal del arrendatario. 
                  Conforme a la Ley de Seguridad Vial, RODA MOBILITY identificará formalmente al conductor ante la DGT con los datos del contrato digital.
                </p>
              </div>

              <div className="border-b border-zinc-800 pb-2">
                <strong className="text-white block mb-0.5">3. Política de Combustible: Lleno a Lleno</strong>
                <p className="text-zinc-400">
                  La moto se entrega con el depósito 100% lleno y debe devolverse igual. Existe una gasolinera Repsol a 400m de nuestra tienda en el Paseo Marítimo.
                </p>
              </div>

              <div>
                <strong className="text-white block mb-0.5">4. Obligatoriedad del Casco</strong>
                <p className="text-zinc-400">
                  El uso del casco homologado abrochado es obligatorio por ley en todo momento tanto para el conductor como para el acompañante.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SOPORTE Y CONTACTO                                        */}
        {/* ======================================================== */}
        {activeModal === 'support' && (
          <div className="space-y-4 text-xs text-zinc-300">
            <h3 className="text-xl font-black text-white">
              Soporte y Atención al Cliente RODA MOBILITY
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:+34950123456"
                className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-[#C8F000] transition-colors flex items-center gap-3"
              >
                <Phone className="w-5 h-5 text-[#C8F000]" />
                <div>
                  <strong className="text-white block">Teléfono Tienda Almería</strong>
                  <span className="text-zinc-400 text-[11px]">+34 950 123 456</span>
                </div>
              </a>

              <a
                href="https://wa.me/34611987654"
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-[#C8F000] transition-colors flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-xs">
                  W
                </div>
                <div>
                  <strong className="text-white block">WhatsApp de Urgencias 24h</strong>
                  <span className="text-zinc-400 text-[11px]">+34 611 987 654</span>
                </div>
              </a>
            </div>

            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1">
              <strong className="text-white block">Dirección de Tienda:</strong>
              <p className="text-zinc-400 text-[11px]">
                Paseo Marítimo Carmen de Burgos, 14, 04007 Almería, España (A 100 metros del Auditorio Maestro Padilla).
              </p>
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
