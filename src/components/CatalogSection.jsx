import React, { useState } from 'react';
import { 
  Check, 
  Fuel, 
  Gauge, 
  Award, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Info,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { EXTRA_OPTIONS } from '../data/bikes';

export default function CatalogSection({ 
  bikes, 
  selectedBike, 
  onSelectBike, 
  bookingDays, 
  setBookingDays, 
  selectedExtras, 
  setSelectedExtras,
  startDate,
  setStartDate,
  onProceedToCheckout,
  currentPlan
}) {
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [filterBrand, setFilterBrand] = useState('Todas');
  const [activeTabSpecId, setActiveTabSpecId] = useState(null);

  const categories = ['Todas', 'Scooter 50cc', 'Scooter 125cc', 'Gran Cilindrada'];
  const brands = ['Todas', 'Honda', 'Yamaha'];

  const filteredBikes = bikes.filter(bike => {
    const matchCat = filterCategory === 'Todas' 
      ? true 
      : filterCategory === 'Scooter 50cc'
      ? bike.category.includes('50cc') || bike.category.includes('125cc')
      : bike.category === filterCategory;
    const matchBrand = filterBrand === 'Todas' ? true : bike.brand === filterBrand;
    return matchCat && matchBrand;
  });

  // Calculation logic
  const dailyRate = selectedBike ? selectedBike.dailyRate : 22;
  const baseRental = dailyRate * bookingDays;
  
  const extrasTotalPerDay = selectedExtras.reduce((sum, extraId) => {
    const option = EXTRA_OPTIONS.find(o => o.id === extraId);
    return sum + (option ? option.pricePerDay : 0);
  }, 0);

  const totalExtras = extrasTotalPerDay * bookingDays;
  const subtotalNeto = baseRental + totalExtras;
  const iva21 = Number((subtotalNeto * 0.21).toFixed(2));
  const totalConIva = Number((subtotalNeto + iva21).toFixed(2));
  const fianza = selectedBike ? selectedBike.deposit : 150;

  const toggleExtra = (extraId) => {
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter(id => id !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
  };

  return (
    <section id="catalogo" className="py-12 sm:py-16 bg-[#F5F4EF] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E5E4DE]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#7C7C78] mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8F000] border border-black inline-block" />
              FLOTA OFICIAL RODA MOBILITY ALMERÍA
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
              Elige tu Moto y Configura tu Alquiler
            </h2>
            <p className="text-sm sm:text-base text-[#7C7C78] mt-1">
              Tarifas transparentes con IVA (21%), seguro a terceros y casco siempre incluidos.
            </p>
          </div>

          {/* Quick Filter Bar */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#7C7C78] flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Cilindrada:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterCategory === cat
                    ? 'bg-[#111111] text-[#C8F000] shadow-sm'
                    : 'bg-white text-[#7C7C78] border border-[#E5E4DE] hover:border-zinc-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Motorbike Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {filteredBikes.map((bike) => {
            const isSelected = selectedBike?.id === bike.id;
            const isAvailable = bike.status === 'Disponible';

            return (
              <div
                key={bike.id}
                onClick={() => isAvailable && onSelectBike(bike)}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white border-[#111111] shadow-xl ring-2 ring-[#C8F000]'
                    : isAvailable
                    ? 'bg-white border-[#E5E4DE] hover:border-zinc-400 hover:shadow-lg cursor-pointer'
                    : 'bg-zinc-100 border-zinc-300 opacity-80 cursor-not-allowed'
                }`}
              >
                {/* Top Image Box */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle dark gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Spanish License Plate Badge (Madrid / Almería format with EU strip) */}
                  <div className="absolute top-3 left-3 flex items-center bg-white rounded border border-zinc-400 shadow-md overflow-hidden text-xs font-mono font-bold tracking-wider">
                    <div className="bg-[#003399] text-white px-1 py-0.5 text-[9px] flex flex-col items-center justify-center font-sans font-bold leading-none">
                      <span>🇪🇸</span>
                      <span className="text-[7px]">E</span>
                    </div>
                    <span className="px-2 py-0.5 text-zinc-900">
                      {bike.plate}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md ${
                      bike.status === 'Disponible'
                        ? 'bg-[#C8F000] text-[#111111]'
                        : bike.status === 'Alquilada'
                        ? 'bg-red-500 text-white'
                        : 'bg-amber-500 text-black'
                    }`}>
                      {bike.status}
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-zinc-300 font-semibold block">
                        Tarifa Estándar
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-[#C8F000]">
                          {bike.dailyRate}€
                        </span>
                        <span className="text-xs text-zinc-300">/día</span>
                      </div>
                    </div>
                    
                    <span className="text-[11px] font-medium bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/20">
                      Fianza: {bike.deposit}€
                    </span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Engine */}
                    <div className="flex items-center justify-between text-xs text-[#7C7C78] font-semibold mb-1">
                      <span>{bike.category}</span>
                      <span>{bike.brand}</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#111111] leading-snug mb-1">
                      {bike.name}
                    </h3>
                    
                    <p className="text-xs text-[#7C7C78] mb-3 font-medium">
                      {bike.model} · <span className="text-zinc-900">{bike.color}</span>
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#F5F4EF] p-2.5 rounded-xl border border-[#E5E4DE] mb-4">
                      <div className="flex items-center gap-1.5 text-zinc-800">
                        <Gauge className="w-3.5 h-3.5 text-[#111111]" />
                        <span>{bike.engine.split('·')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-800">
                        <Fuel className="w-3.5 h-3.5 text-[#111111]" />
                        <span>{bike.consumption.split('(')[0]}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-1.5 text-zinc-700">
                        <Award className="w-3.5 h-3.5 text-[#111111]" />
                        <span className="font-semibold text-zinc-900">{bike.licenseRequired}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-4 text-xs text-zinc-600">
                      {bike.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#111111] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Select Button */}
                  <button
                    disabled={!isAvailable}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isAvailable) onSelectBike(bike);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-[#111111] text-[#C8F000] shadow-md ring-2 ring-[#C8F000]'
                        : isAvailable
                        ? 'bg-[#C8F000] text-[#111111] hover:bg-[#b8dd00] active:scale-98'
                        : 'bg-zinc-300 text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#C8F000]" />
                        Moto Seleccionada
                      </>
                    ) : isAvailable ? (
                      <>
                        Seleccionar Esta Moto
                        <ChevronRight className="w-4 h-4" />
                      </>
                    ) : (
                      'No Disponible (Alquilada)'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Booking & VAT (IVA) Calculator */}
        {selectedBike && (
          <div className="bg-[#111111] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-800 animate-in fade-in slide-in-from-bottom-6 duration-300">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-zinc-700 shrink-0">
                  <img
                    src={selectedBike.image}
                    alt={selectedBike.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#C8F000] font-bold uppercase tracking-wider">
                      MOTO SELECCIONADA
                    </span>
                    <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">
                      {selectedBike.plate}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {selectedBike.name}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {selectedBike.color} · Tarifa base: <span className="text-white font-bold">{selectedBike.dailyRate}€/día</span>
                  </p>
                </div>
              </div>

              {/* Quick Days Selector Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-400 mr-2 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C8F000]" />
                  Duración:
                </span>
                {[1, 2, 3, 5, 7, 14].map((d) => (
                  <button
                    key={d}
                    onClick={() => setBookingDays(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      bookingDays === d
                        ? 'bg-[#C8F000] text-[#111111] shadow-[0_0_12px_rgba(200,240,0,0.4)]'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {d} {d === 1 ? 'Día' : 'Días'}
                  </button>
                ))}
              </div>
            </div>

            {/* Two Columns: Extras & Economic Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
              
              {/* Left Column: Dates & Extras */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Date Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Fecha de Recogida en Almería:
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C8F000]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Días de Alquiler:
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setBookingDays(Math.max(1, bookingDays - 1))}
                        className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-lg flex items-center justify-center border border-zinc-700"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center font-black text-lg bg-zinc-800 py-1.5 rounded-xl border border-zinc-700 text-[#C8F000]">
                        {bookingDays} {bookingDays === 1 ? 'Día' : 'Días'}
                      </div>
                      <button
                        onClick={() => setBookingDays(bookingDays + 1)}
                        className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-lg flex items-center justify-center border border-zinc-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Extra Options Checklist */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C8F000]" />
                    Opcionales y Accesorios RODA:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {EXTRA_OPTIONS.map((opt) => {
                      const isChecked = selectedExtras.includes(opt.id);
                      return (
                        <div
                          key={opt.id}
                          onClick={() => toggleExtra(opt.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                            isChecked
                              ? 'bg-zinc-900 border-[#C8F000] ring-1 ring-[#C8F000]/60'
                              : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                            isChecked
                              ? 'bg-[#C8F000] border-[#C8F000] text-black'
                              : 'border-zinc-600 bg-zinc-800'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between text-xs font-bold text-white">
                              <span className="truncate">{opt.name}</span>
                              <span className="text-[#C8F000] shrink-0 ml-1">+{opt.pricePerDay}€/d</span>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                              {opt.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Spanish Fiscal Breakdown (Desglose de IVA 21%) */}
              <div className="lg:col-span-5 bg-zinc-900/90 rounded-2xl p-5 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-300 border-b border-zinc-800 pb-3 mb-3">
                    <span className="uppercase tracking-wider">Desglose Fiscal (Almería)</span>
                    <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                      Régimen General IVA
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-zinc-300">
                    <div className="flex items-center justify-between">
                      <span>Alquiler base ({selectedBike.dailyRate}€ x {bookingDays} {bookingDays === 1 ? 'día' : 'días'}):</span>
                      <span className="font-semibold text-white">{baseRental.toFixed(2)} €</span>
                    </div>

                    {totalExtras > 0 && (
                      <div className="flex items-center justify-between text-zinc-400">
                        <span>Opcionales seleccionados:</span>
                        <span className="font-semibold text-white">+{totalExtras.toFixed(2)} €</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-zinc-400">
                      <span>Subtotal (Base Imponible):</span>
                      <span className="font-bold text-white">{subtotalNeto.toFixed(2)} €</span>
                    </div>

                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="flex items-center gap-1">
                        IVA España (21%):
                        <Info className="w-3 h-3 text-zinc-500" />
                      </span>
                      <span className="font-bold text-[#C8F000]">+{iva21.toFixed(2)} €</span>
                    </div>
                  </div>

                  {/* Total Final */}
                  <div className="mt-4 pt-3 border-t border-zinc-700 bg-black/40 p-3.5 rounded-xl border border-zinc-800/80">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold block">
                          Total a Pagar (IVA Incluido)
                        </span>
                        <span className="text-3xl font-black text-[#C8F000]">
                          {totalConIva.toFixed(2)} €
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                        Sin costes ocultos
                      </span>
                    </div>
                  </div>

                  {/* Fianza Reembolsable Info */}
                  <div className="mt-3 flex items-start gap-2 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800 text-[11px] text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-[#C8F000] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-200">Fianza reembolsable informativa: {fianza} €</strong>
                      <p className="text-[10px] text-zinc-500">
                        No se cobra en factura. Se retiene temporalmente en tarjeta al retirar la moto y se libera en 24h tras la devolución sin daños.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Continue to Checkout Action */}
                <div className="mt-5">
                  <button
                    onClick={onProceedToCheckout}
                    className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm bg-[#C8F000] text-[#111111] hover:bg-[#b8dd00] shadow-[0_0_20px_rgba(200,240,0,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <span>Continuar al Checkout ({currentPlan.toUpperCase()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
