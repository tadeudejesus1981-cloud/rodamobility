import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Wrench, 
  Download, 
  Calendar, 
  ShieldCheck, 
  RotateCcw, 
  FileText, 
  Eye, 
  Printer, 
  UserCheck, 
  Sparkles, 
  X,
  CreditCard,
  QrCode
} from 'lucide-react';
import Logo from './Logo';
import { CONTRACT_TERMS } from '../data/bikes';

export default function OwnerStockPanel({
  bikes,
  onUpdateBikeStatus,
  currentPlan,
  bookings,
  onResetBikeBooking
}) {
  const [selectedBookingForPdf, setSelectedBookingForPdf] = useState(null);

  // Compute metrics
  const totalBikes = bikes.length;
  const rentedCount = bikes.filter(b => b.status === 'Alquilada').length;
  const maintenanceCount = bikes.filter(b => b.status === 'En Taller').length;
  const availableCount = bikes.filter(b => b.status === 'Disponible').length;
  const occupationRate = Math.round((rentedCount / totalBikes) * 100);

  const isManualMode = currentPlan === 'standard';

  return (
    <section id="stock-panel" className="py-12 sm:py-16 bg-[#161616] text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Panel Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-zinc-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#C8F000] mb-1">
              <Layers className="w-4 h-4" />
              PANEL DE CONTROL DEL PROPIETARIO · RODA MOBILITY
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Gestión de Stock y Calendario de las 3 Motos
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {isManualMode ? (
                <span className="text-amber-400 font-semibold">
                  ⚠️ Modo Manual (Standard): Debe hacer clic a mano en cada estado. No hay sincronización automática.
                </span>
              ) : (
                <span className="text-emerald-400 font-semibold">
                  ✓ Modo Autónomo ({currentPlan.toUpperCase()}): Las motos se bloquean solas al firmar digitalmente y se generan PDFs con DNI.
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-xl font-mono text-zinc-300">
              Sede: Almería Puerto & Paseo Marítimo
            </span>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
            <span className="text-xs text-zinc-400 block mb-1">Flota Total</span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              3 <span className="text-xs text-zinc-500 font-normal">Motos Oficiales</span>
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 block">2x PCX 125cc · 1x 300cc</span>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
            <span className="text-xs text-zinc-400 block mb-1">Tasa de Ocupación</span>
            <div className="text-2xl sm:text-3xl font-black text-[#C8F000]">
              {occupationRate}%
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 block">
              {rentedCount} de 3 motos en alquiler
            </span>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
            <span className="text-xs text-zinc-400 block mb-1">Motos Disponibles</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {availableCount}
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 block">Listas para circular</span>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
            <span className="text-xs text-zinc-400 block mb-1">Contratos Digitales</span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              {bookings.length}
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 block">Archivados con DNI y firma</span>
          </div>
        </div>

        {/* 3 Motorbikes Fleet List */}
        <div className="space-y-4">
          {bikes.map((bike) => {
            const bikeBooking = bookings.find(b => b.bikeId === bike.id || b.bikePlate === bike.plate);
            const isRented = bike.status === 'Alquilada';
            const isTaller = bike.status === 'En Taller';

            return (
              <div
                key={bike.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 hover:border-zinc-700 transition-all"
              >
                {/* Left: Bike Info & Photo */}
                <div className="flex items-center gap-4 min-w-[280px]">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-zinc-700 shrink-0 bg-black">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {/* License plate */}
                      <span className="font-mono font-bold text-xs bg-white text-zinc-900 px-2 py-0.5 rounded border border-zinc-400">
                        {bike.plate}
                      </span>
                      <span className="text-[11px] text-[#C8F000] font-semibold">
                        {bike.dailyRate}€/día
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white">
                      {bike.name}
                    </h3>
                    
                    <p className="text-xs text-zinc-400">
                      {bike.category} · {bike.color}
                    </p>
                  </div>
                </div>

                {/* Center: Live Calendar & Booking Status */}
                <div className="flex-1 w-full lg:w-auto bg-black/40 p-3 rounded-xl border border-zinc-800 text-xs">
                  {bikeBooking ? (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[#C8F000] font-bold">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          Bloqueado: {bikeBooking.startDate} ({bikeBooking.bookingDays} días)
                        </span>
                        <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">
                          {bikeBooking.plan.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-zinc-300 text-[11px]">
                        Arrendatario: <strong>{bikeBooking.customerName}</strong> (DNI: {bikeBooking.dni})
                      </p>
                      <p className="text-zinc-400 text-[10px]">
                        Total Facturado: <strong>{bikeBooking.totalAmount} €</strong> (IVA 21% inc.) · Contrato firmado digitalmente
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Calendario abierto para reservas inmediatas en Almería.
                      </span>
                      <span className="text-[11px] text-zinc-500 font-mono">Sin reservas</span>
                    </div>
                  )}
                </div>

                {/* Right: Actions based on Plan (Manual vs Automatic) */}
                <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                  
                  {/* If in Standard Manual Mode: show manual buttons */}
                  {isManualMode ? (
                    <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                      <button
                        onClick={() => onUpdateBikeStatus(bike.id, 'Disponible')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          bike.status === 'Disponible'
                            ? 'bg-[#C8F000] text-[#111111]'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Disponible
                      </button>

                      <button
                        onClick={() => onUpdateBikeStatus(bike.id, 'Alquilada')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          bike.status === 'Alquilada'
                            ? 'bg-red-500 text-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Alquilada
                      </button>

                      <button
                        onClick={() => onUpdateBikeStatus(bike.id, 'En Taller')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          bike.status === 'En Taller'
                            ? 'bg-amber-500 text-black'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        En Taller
                      </button>
                    </div>
                  ) : (
                    /* In Advance or Enterprise mode: Automated controls & PDF Download */
                    <div className="flex flex-wrap items-center gap-2">
                      {bikeBooking ? (
                        <>
                          <button
                            onClick={() => setSelectedBookingForPdf(bikeBooking)}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#C8F000] text-[#111111] hover:bg-[#b8dd00] shadow-[0_0_15px_rgba(200,240,0,0.3)] transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Descargar Contrato PDF + Fotos DNI</span>
                          </button>

                          <button
                            onClick={() => onResetBikeBooking(bike.id)}
                            className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                            title="Liberar moto para volver a hacer la demo"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Disponible (Auto)
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* Sales Pitch Footnote */}
        <div className="mt-8 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-1 rounded bg-[#C8F000] text-black">
              💡
            </span>
            <span>
              <strong>Conclusión para el cliente en la reunión:</strong> En el Plan ADVANCE, ningún empleado pierde tiempo en cambiar estados a mano. 
              El contrato digital firmado bloquea el calendario de inmediato y los documentos quedan archivados para siempre en la nube.
            </span>
          </div>
        </div>

      </div>

      {/* PDF & DNI Document Inspector Modal */}
      {selectedBookingForPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white text-zinc-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-zinc-300">
            
            {/* Modal Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-900 text-[#C8F000]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-zinc-900">
                    Expediente Digital de Alquiler · PDF Oficial
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Contrato Nº {selectedBookingForPdf.id} · Generado automáticamente por RODA MOBILITY
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir / PDF
                </button>
                <button
                  onClick={() => setSelectedBookingForPdf(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Content */}
            <div className="space-y-6">
              
              {/* Official Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                <Logo variant="light" size="sm" />
                <div className="text-right text-xs text-zinc-600">
                  <strong>RODA MOBILITY S.L.</strong> · CIF B-04987213 <br />
                  Paseo Marítimo Carmen de Burgos, 14, 04007 Almería
                </div>
              </div>

              {/* Data Table */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="font-bold text-zinc-500 block mb-1 uppercase text-[10px]">
                    ARRENDATARIO (CLIENTE)
                  </span>
                  <p className="font-bold text-zinc-900 text-sm">{selectedBookingForPdf.customerName}</p>
                  <p className="text-zinc-600">DNI: {selectedBookingForPdf.dni}</p>
                  <p className="text-zinc-600">Carnet: {selectedBookingForPdf.driverLicense}</p>
                  <p className="text-zinc-600">Tel: {selectedBookingForPdf.phone}</p>
                </div>

                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="font-bold text-zinc-500 block mb-1 uppercase text-[10px]">
                    VEHÍCULO Y TARIFAS
                  </span>
                  <p className="font-bold text-zinc-900 text-sm">{selectedBookingForPdf.bikeName}</p>
                  <p className="text-zinc-600">Matrícula: <strong className="font-mono">{selectedBookingForPdf.bikePlate}</strong></p>
                  <p className="text-zinc-600">Periodo: {selectedBookingForPdf.startDate} ({selectedBookingForPdf.bookingDays} días)</p>
                  <p className="text-[#111111] font-bold">Total Factura: {selectedBookingForPdf.totalAmount} € (IVA 21% inc.)</p>
                </div>
              </div>

              {/* Archived Documents Simulation (DNI & Carnet) */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-700 mb-2">
                  Documentos Anexos Archivados Digitalmente:
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-zinc-100 rounded-xl border border-zinc-300 text-center">
                    <span className="text-[11px] font-bold text-zinc-700 block mb-2">
                      Foto DNI / NIE (Anverso)
                    </span>
                    <div className="h-28 bg-zinc-200 rounded-lg border border-zinc-300 flex flex-col items-center justify-center text-xs text-zinc-500 p-2">
                      <div className="w-8 h-8 rounded-full bg-zinc-400 mb-1" />
                      <span className="font-mono text-[10px]">{selectedBookingForPdf.dni}</span>
                      <span className="text-[9px] text-emerald-700 font-bold">✓ Verificado e-IDAS</span>
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-100 rounded-xl border border-zinc-300 text-center">
                    <span className="text-[11px] font-bold text-zinc-700 block mb-2">
                      Foto Carnet de Conducir DGT
                    </span>
                    <div className="h-28 bg-zinc-200 rounded-lg border border-zinc-300 flex flex-col items-center justify-center text-xs text-zinc-500 p-2">
                      <div className="w-8 h-8 rounded-full bg-zinc-400 mb-1" />
                      <span className="font-mono text-[10px]">{selectedBookingForPdf.driverLicense}</span>
                      <span className="text-[9px] text-emerald-700 font-bold">✓ Antigüedad &gt; 3 años OK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Signature in Contract */}
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                <span className="font-bold text-xs uppercase text-zinc-600 block mb-2">
                  Firma Digital del Arrendatario Registrada:
                </span>
                <div className="h-20 bg-white rounded-lg border border-dashed border-zinc-300 flex items-center justify-center p-2">
                  {selectedBookingForPdf.signatureUrl ? (
                    <img
                      src={selectedBookingForPdf.signatureUrl}
                      alt="Firma Digital"
                      className="max-h-16 object-contain"
                    />
                  ) : (
                    <span className="font-serif italic text-zinc-700 text-lg">
                      {selectedBookingForPdf.customerName}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-2">
                  <span>Timestamp: {selectedBookingForPdf.timestamp}</span>
                  <span className="text-emerald-700 font-bold">✓ Firma Biométrica Electrónica Válida</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedBookingForPdf(null)}
                className="w-full py-3 rounded-xl bg-[#111111] text-white font-bold text-xs hover:bg-zinc-800"
              >
                Cerrar Visor
              </button>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
