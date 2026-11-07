import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  Camera, 
  Send, 
  Lock, 
  ShieldCheck, 
  QrCode, 
  Download, 
  Mail, 
  Clock, 
  ArrowRight,
  ExternalLink,
  Cpu,
  UserCheck
} from 'lucide-react';
import SignaturePad from './SignaturePad';
import ContractDocument from './ContractDocument';
import AiScannerModal from './AiScannerModal';

export default function CheckoutSection({
  currentPlan,
  selectedBike,
  bookingDays,
  startDate,
  selectedExtras,
  onBookingSuccess
}) {
  // Common customer state
  const [customerData, setCustomerData] = useState({
    fullName: '',
    dni: '',
    driverLicense: '',
    licenseDate: '',
    phone: '',
    email: '',
    rgpdConsent: false
  });

  const [signatureUrl, setSignatureUrl] = useState(null);
  const [dniFileFront, setDniFileFront] = useState(null);
  const [driverLicenseFile, setDriverLicenseFile] = useState(null);
  
  // Enterprise AI state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiVerifiedData, setAiVerifiedData] = useState(null);
  
  // Feedback modals
  const [standardWhatsappModalOpen, setStandardWhatsappModalOpen] = useState(false);
  const [successModalData, setSuccessModalData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Economic calculations
  const dailyRate = selectedBike ? selectedBike.dailyRate : 22;
  const baseRental = dailyRate * bookingDays;
  const totalExtras = selectedExtras.length * 3 * bookingDays; // simplified estimate
  const subtotalNeto = baseRental + totalExtras;
  const iva21 = Number((subtotalNeto * 0.21).toFixed(2));
  const totalConIva = Number((subtotalNeto + iva21).toFixed(2));
  const fianza = selectedBike ? selectedBike.deposit : 150;

  // Handler for Standard WhatsApp
  const handleStandardSubmit = (e) => {
    e.preventDefault();
    if (!customerData.fullName || !customerData.phone) {
      alert('Por favor introduzca su Nombre y Teléfono WhatsApp');
      return;
    }

    const message = encodeURIComponent(
      `¡Hola RODA MOBILITY Almería! Quiero solicitar reserva:\n` +
      `🛵 Moto: ${selectedBike.name} (Matrícula: ${selectedBike.plate})\n` +
      `📅 Fecha: ${startDate} (${bookingDays} días)\n` +
      `💰 Total estimado: ${totalConIva}€ (IVA 21% inc.)\n` +
      `👤 Cliente: ${customerData.fullName}\n` +
      `📱 Tel: ${customerData.phone}\n` +
      `Por favor confírmenme disponibilidad para pasar a firmar el contrato físico por tienda.`
    );

    // Open WhatsApp link in new tab
    window.open(`https://wa.me/34611987654?text=${message}`, '_blank');
    setStandardWhatsappModalOpen(true);
  };

  // Handler for Advance Submit
  const handleAdvanceSubmit = (e) => {
    e.preventDefault();
    if (!customerData.fullName || !customerData.dni || !customerData.driverLicense) {
      alert('Por favor complete todos los datos requeridos (Nombre, DNI y Carnet).');
      return;
    }
    if (!signatureUrl) {
      alert('Por favor firme en el recuadro digital con el dedo o ratón antes de continuar.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerConfetti();

      const bookingRecord = {
        id: `RODA-ADV-${Date.now().toString().slice(-4)}`,
        plan: 'advance',
        bikeId: selectedBike.id,
        bikeName: selectedBike.name,
        bikePlate: selectedBike.plate,
        customerName: customerData.fullName,
        dni: customerData.dni,
        driverLicense: customerData.driverLicense,
        phone: customerData.phone,
        email: customerData.email,
        startDate,
        bookingDays,
        totalAmount: totalConIva,
        signatureUrl,
        timestamp: new Date().toISOString(),
        status: 'Firmado Digitalmente (Stock Bloqueado)'
      };

      onBookingSuccess(bookingRecord);
      setSuccessModalData(bookingRecord);
    }, 1200);
  };

  // Handler for Enterprise Submit
  const handleEnterpriseSubmit = (e) => {
    e.preventDefault();
    if (!customerData.fullName || !customerData.dni) {
      alert('Por favor ejecute primero el escáner OCR con IA para autocompletar y verificar los documentos.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerConfetti();

      const bookingRecord = {
        id: `RODA-ENT-${Date.now().toString().slice(-4)}`,
        plan: 'enterprise',
        bikeId: selectedBike.id,
        bikeName: selectedBike.name,
        bikePlate: selectedBike.plate,
        customerName: customerData.fullName,
        dni: customerData.dni,
        driverLicense: customerData.driverLicense,
        phone: customerData.phone,
        email: customerData.email,
        startDate,
        bookingDays,
        totalAmount: totalConIva,
        signatureUrl: signatureUrl || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><text x="10" y="40" font-family="cursive" font-size="28" fill="%23111111">Carlos M. Ruiz</text></svg>',
        aiScore: '99.4% Verificado DGT',
        timestamp: new Date().toISOString(),
        supabaseWebhookStatus: 'Webhook Edge Function 200 OK',
        status: 'Autenticado IA (Stock Bloqueado)'
      };

      onBookingSuccess(bookingRecord);
      setSuccessModalData(bookingRecord);
    }, 1200);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C8F000', '#111111', '#FFFFFF']
    });
  };

  const loadDemoDataAdvance = () => {
    setCustomerData({
      fullName: 'Alejandro Navarro Gómez',
      dni: '45678123-K',
      driverLicense: 'B-45678123',
      licenseDate: '2019-04-12',
      phone: '+34 622 890 123',
      email: 'alejandro.navarro@hotmail.com',
      rgpdConsent: true
    });
    setDniFileFront('dni-sample.jpg');
    setDriverLicenseFile('carnet-sample.jpg');
  };

  return (
    <section id="checkout" className="py-12 sm:py-16 bg-[#F5F4EF] border-t border-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* MODO 1: PLAN STANDARD (MANUAL / WHATSAPP)                 */}
        {/* ========================================================= */}
        {currentPlan === 'standard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header / Sales Warning Banner */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base">
                    MODO 1: Plan STANDARD (Operación Manual Tradicional)
                  </h3>
                  <p className="text-xs text-amber-900 mt-0.5 leading-relaxed">
                    <strong>Punto de dolor para la reunión:</strong> El cliente pide cita por WhatsApp, espera respuesta de la tienda, 
                    el stock no se bloquea en tiempo real y al llegar a tienda pierde 15-20 minutos rellenando papel físico y haciendo fotocopias de DNI.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-amber-200 text-amber-900 px-3 py-1 rounded-full uppercase tracking-wider shrink-0">
                Lento · 15-20 min por cliente
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Minimal Standard Form */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-zinc-300 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[#111111]">
                    <FileText className="w-5 h-5 text-zinc-700" />
                    <h4 className="font-extrabold text-base">Solicitud de Reserva por WhatsApp</h4>
                  </div>

                  <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
                    Introduzca su nombre y teléfono para enviar la solicitud al WhatsApp del encargado de tienda. 
                    El contrato formal se firmará físicamente en papel al retirar la moto.
                  </p>

                  <form onSubmit={handleStandardSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Nombre y Apellidos *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Juan Pérez López"
                        value={customerData.fullName}
                        onChange={(e) => setCustomerData({ ...customerData, fullName: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+34 600 000 000"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-800"
                      />
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 text-xs text-zinc-600 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={customerData.rgpdConsent}
                          onChange={(e) => setCustomerData({ ...customerData, rgpdConsent: e.target.checked })}
                          className="mt-0.5 rounded text-[#111111] focus:ring-0"
                        />
                        <span>
                          Acepto el tratamiento de datos para la gestión manual del alquiler y política de privacidad (RGPD Almería).
                        </span>
                      </label>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                      >
                        <Send className="w-4 h-4" />
                        <span>Enviar Solicitud por WhatsApp</span>
                      </button>
                      <p className="text-[11px] text-center text-zinc-500 mt-2">
                        (Confirmación y Contrato Manual en Tienda)
                      </p>
                    </div>
                  </form>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200 bg-zinc-50 p-3 rounded-xl text-[11px] text-zinc-500">
                  <span className="font-semibold text-zinc-700 block mb-0.5">Nota de Operación Manual:</span>
                  El encargado revisará el mensaje, comprobará la libreta física de reservas y responderá cuando esté libre.
                </div>
              </div>

              {/* Right: Static Legal Contract Preview */}
              <div className="lg:col-span-7">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
                    Vista Previa de la Minuta de Contrato Físico:
                  </span>
                  <span className="text-[11px] text-zinc-500 italic">
                    (Lectura informativa para el cliente)
                  </span>
                </div>
                <ContractDocument
                  customerData={{}}
                  bike={selectedBike}
                  startDate={startDate}
                  bookingDays={bookingDays}
                  totalConIva={totalConIva}
                  subtotalNeto={subtotalNeto}
                  iva21={iva21}
                  fianza={fianza}
                  isStaticPreview={true}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODO 2: PLAN ADVANCE (DIGITAL AUTO - FOCO DE VENTA ⭐)     */}
        {/* ========================================================= */}
        {currentPlan === 'advance' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header / Sales Highlight Banner */}
            <div className="bg-[#111111] text-white border-2 border-[#C8F000] rounded-2xl p-5 shadow-[0_0_30px_rgba(200,240,0,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#C8F000] text-[#111111] shrink-0 font-bold">
                  ⭐
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm sm:text-base text-white">
                      MODO 2: Plan ADVANCE (Digital Autónomo · FOCO DE VENTA)
                    </h3>
                    <span className="bg-[#C8F000] text-[#111111] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      Recomendado
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    <strong>Argumento de Venta en Vivo:</strong> El cliente rellena sus datos, sube fotos de sus documentos desde su móvil 
                    y <strong>firma digitalmente en pantalla con su dedo</strong>. El contrato se genera en tiempo real, bloquea el calendario y envía el PDF por email. 
                    <strong className="text-[#C8F000]"> ¡Tiempo en mostrador: menos de 30 segundos!</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={loadDemoDataAdvance}
                className="shrink-0 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                title="Rellenar formulario automáticamente para la demostración rápida"
              >
                <span>⚡ Cargar Datos Demo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left: Complete Digital Form + Document Upload + Signature */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-zinc-300 shadow-lg space-y-5">
                <div>
                  <h4 className="font-black text-base text-[#111111] mb-1">
                    Datos del Conductor y Documentación
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Los datos se plasman al instante en el contrato oficial interactivo de la derecha.
                  </p>
                </div>

                <form onSubmit={handleAdvanceSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Nombre Completo del Conductor *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Alejandro Navarro Gómez"
                      value={customerData.fullName}
                      onChange={(e) => setCustomerData({ ...customerData, fullName: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        DNI / NIE / Pasaporte *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. 45678123-K"
                        value={customerData.dni}
                        onChange={(e) => setCustomerData({ ...customerData, dni: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#111111]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Nº Carnet Conducir *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. B-45678123"
                        value={customerData.driverLicense}
                        onChange={(e) => setCustomerData({ ...customerData, driverLicense: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#111111]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Teléfono Móvil *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+34 622 890 123"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#111111]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Correo Electrónico (PDF) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="cliente@email.com"
                        value={customerData.email}
                        onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-[#111111]"
                      />
                    </div>
                  </div>

                  {/* Document Upload Simulation */}
                  <div className="pt-1">
                    <label className="block text-xs font-semibold text-zinc-700 mb-1.5 flex items-center justify-between">
                      <span>Subida de Documentos (Fotos DNI y Carnet):</span>
                      <span className="text-[10px] text-zinc-500">Archivado seguro</span>
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      <div 
                        onClick={() => setDniFileFront(dniFileFront ? null : 'dni-anverso.jpg')}
                        className={`p-2.5 rounded-xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center text-center transition-all ${
                          dniFileFront 
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900' 
                            : 'bg-zinc-50 border-zinc-300 hover:border-zinc-500 text-zinc-600'
                        }`}
                      >
                        <Upload className="w-4 h-4 mb-1" />
                        <span className="text-[11px] font-bold">
                          {dniFileFront ? '✓ DNI Adjunto' : 'Subir Foto DNI'}
                        </span>
                        <span className="text-[9px] text-zinc-400">JPG, PNG o PDF</span>
                      </div>

                      <div 
                        onClick={() => setDriverLicenseFile(driverLicenseFile ? null : 'carnet-b.jpg')}
                        className={`p-2.5 rounded-xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center text-center transition-all ${
                          driverLicenseFile 
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900' 
                            : 'bg-zinc-50 border-zinc-300 hover:border-zinc-500 text-zinc-600'
                        }`}
                      >
                        <Upload className="w-4 h-4 mb-1" />
                        <span className="text-[11px] font-bold">
                          {driverLicenseFile ? '✓ Carnet Adjunto' : 'Subir Foto Carnet'}
                        </span>
                        <span className="text-[9px] text-zinc-400">Anverso / Reverso</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Signature Canvas */}
                  <div className="pt-2">
                    <SignaturePad onSignatureChange={setSignatureUrl} />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-[#C8F000] text-[#111111] hover:bg-[#b8dd00] shadow-[0_0_20px_rgba(200,240,0,0.45)] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Generando Contrato Digital y Bloqueando Stock...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Firmar Contrato, Bloquear Calendario y Enviar PDF por Email</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-zinc-500 mt-2 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Firma con validez legal e-IDAS y bloqueo instantáneo de stock.
                    </p>
                  </div>
                </form>
              </div>

              {/* Right: Live Dynamic Contract with Embedded Signature */}
              <div className="lg:col-span-7">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Contrato Digital Dinámico en Vivo (Se actualiza al escribir):
                  </span>
                  <span className="text-[10px] bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded font-mono">
                    MODO DIGITAL ADVANCE
                  </span>
                </div>

                <ContractDocument
                  customerData={customerData}
                  bike={selectedBike}
                  startDate={startDate}
                  bookingDays={bookingDays}
                  totalConIva={totalConIva}
                  subtotalNeto={subtotalNeto}
                  iva21={iva21}
                  fianza={fianza}
                  signatureUrl={signatureUrl}
                  isStaticPreview={false}
                />
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODO 3: PLAN ENTERPRISE (FULL IA + SUPABASE)              */}
        {/* ========================================================= */}
        {currentPlan === 'enterprise' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header / Enterprise IA Banner */}
            <div className="bg-gradient-to-r from-[#111111] via-zinc-900 to-[#111111] text-white border-2 border-cyan-400 rounded-2xl p-5 shadow-[0_0_35px_rgba(34,211,238,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-400 text-black shrink-0 font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm sm:text-base text-white">
                      MODO 3: Plan ENTERPRISE (Full IA + Supabase Edge Functions)
                    </h3>
                    <span className="bg-cyan-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      Zero Digitación
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    <strong>Nivel Tecnológico Máximo:</strong> El cliente no escribe nada. Un escáner OCR por visión computacional extrae 
                    todos los datos del DNI y Carnet, <strong className="text-cyan-300">valida automáticamente si el conductor tiene más de 3 años de carnet B para 125cc</strong>, 
                    rellena el contrato y ejecuta un Webhook de Supabase al instante.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAiModalOpen(true)}
                className="shrink-0 text-xs font-black bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all active:scale-95"
              >
                <Cpu className="w-4 h-4" />
                <span>Simular Lectura OCR via IA</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left: AI Zero Digitation Panel */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-zinc-300 shadow-xl space-y-5">
                
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-base text-[#111111]">
                      Captura Biométrica & OCR Automático
                    </h4>
                    <span className="text-[10px] font-mono bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded">
                      IA Activa
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Pulse los botones para abrir la cámara o lance la simulación OCR completa.
                  </p>
                </div>

                {/* 2 Camera Trigger Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAiModalOpen(true)}
                    className="p-3.5 rounded-xl border-2 border-zinc-800 bg-zinc-900 text-white hover:bg-black flex flex-col items-center justify-center text-center transition-all group"
                  >
                    <Camera className="w-5 h-5 text-[#C8F000] mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">Escanear DNI/NIE</span>
                    <span className="text-[10px] text-zinc-400">con Visión IA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAiModalOpen(true)}
                    className="p-3.5 rounded-xl border-2 border-zinc-800 bg-zinc-900 text-white hover:bg-black flex flex-col items-center justify-center text-center transition-all group"
                  >
                    <Camera className="w-5 h-5 text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">Escanear Carnet</span>
                    <span className="text-[10px] text-zinc-400">Verificar DGT</span>
                  </button>
                </div>

                {/* Central High Impact Demo Button */}
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl font-extrabold text-xs bg-gradient-to-r from-zinc-900 to-black text-[#C8F000] border border-[#C8F000] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#C8F000]" />
                  <span>▶ Lanzar Simulación OCR con Visor Láser IA</span>
                </button>

                {/* AI Validation Result Box */}
                {aiVerifiedData ? (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 space-y-2 text-xs text-emerald-950 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold flex items-center gap-1.5 text-emerald-800">
                        <UserCheck className="w-4 h-4 text-emerald-600" />
                        Validación DGT Superada por IA
                      </span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                        99.4% Match
                      </span>
                    </div>

                    <div className="text-[11px] space-y-1 text-emerald-900">
                      <p><strong>Conductor:</strong> {aiVerifiedData.fullName} (DNI {aiVerifiedData.dni})</p>
                      <p><strong>Permiso:</strong> {aiVerifiedData.driverLicense} ({aiVerifiedData.licenseType})</p>
                      <p>
                        <strong>Antigüedad Carnet B:</strong> {aiVerifiedData.seniorityYears} años 
                        <span className="font-bold text-emerald-700"> (&gt; 3 años requeridos para 125cc).</span>
                      </p>
                    </div>

                    <div className="pt-1 border-t border-emerald-200 text-[10px] text-emerald-700 font-semibold">
                      ✓ Apto legalmente para circular con la moto {selectedBike?.plate} por Almería y Cabo de Gata.
                    </div>
                  </div>
                ) : (
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-500 text-center">
                    Documentos aún no escaneados. Pulse el botón superior para realizar la lectura automática por IA.
                  </div>
                )}

                {/* Interactive Signature */}
                <div className="pt-1">
                  <SignaturePad onSignatureChange={setSignatureUrl} />
                </div>

                {/* Submit Enterprise */}
                <form onSubmit={handleEnterpriseSubmit} className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !aiVerifiedData}
                    className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Ejecutando Supabase Edge Function & Webhook...</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-4 h-4" />
                        <span>Confirmar Reserva IA y Disparar Webhook Supabase</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-zinc-500 mt-2">
                    Generación de contrato encriptado con Hash SHA-256 e integración de base de datos en tiempo real.
                  </p>
                </form>

              </div>

              {/* Right: Contract automatically filled by AI */}
              <div className="lg:col-span-7">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                    Contrato Digital Autocumplimentado por IA:
                  </span>
                  <span className="text-[10px] bg-cyan-900 text-cyan-200 px-2 py-0.5 rounded font-mono">
                    MODO ENTERPRISE FULL IA
                  </span>
                </div>

                <ContractDocument
                  customerData={customerData}
                  bike={selectedBike}
                  startDate={startDate}
                  bookingDays={bookingDays}
                  totalConIva={totalConIva}
                  subtotalNeto={subtotalNeto}
                  iva21={iva21}
                  fianza={fianza}
                  signatureUrl={signatureUrl}
                  isStaticPreview={false}
                  contractId="RODA-2024-IA-SUPABASE-99"
                />
              </div>

            </div>
          </div>
        )}

      </div>

      {/* AI Scanner HUD Modal */}
      <AiScannerModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onScanComplete={(extracted) => {
          setAiVerifiedData(extracted);
          setCustomerData({
            fullName: extracted.fullName,
            dni: extracted.dni,
            driverLicense: extracted.driverLicense,
            licenseDate: extracted.licenseDate,
            phone: extracted.phone,
            email: extracted.email,
            rgpdConsent: true
          });
        }}
      />

      {/* Modal Standard WhatsApp Sales Contrast */}
      {standardWhatsappModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-zinc-900 shadow-2xl border border-zinc-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-center text-zinc-900 mb-2">
              Solicitud WhatsApp Enviada (Modo Manual)
            </h3>

            <p className="text-xs text-zinc-600 text-center mb-5 leading-relaxed">
              El cliente ha enviado el WhatsApp. Ahora la locadora se enfrenta a:
            </p>

            <div className="space-y-2 text-xs bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-950 mb-5">
              <div className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span>El stock <strong>no se bloquea automáticamente</strong> (riesgo de duplicar alquileres).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span>Depende de que el encargado conteste a tiempo antes de que el cliente busque otra locadora.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span>En mostrador, tardará 15-20 minutos en hacer fotocopias y rellenar contratos a mano.</span>
              </div>
            </div>

            <button
              onClick={() => setStandardWhatsappModalOpen(false)}
              className="w-full py-3 rounded-xl bg-[#111111] text-white font-bold text-xs hover:bg-zinc-800 transition-colors"
            >
              Entendido · Pasar al Plan ADVANCE para ver la solución
            </button>
          </div>
        </div>
      )}

      {/* Modal Success (Advance & Enterprise) */}
      {successModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#111111] border-2 border-[#C8F000] rounded-3xl max-w-lg w-full p-6 sm:p-7 text-white shadow-[0_0_50px_rgba(200,240,0,0.3)]">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#C8F000] text-[#111111]">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    ¡Contrato Firmado y Stock Bloqueado!
                  </h3>
                  <p className="text-xs text-[#C8F000] font-mono font-bold">
                    ID: {successModalData.id} · {successModalData.status}
                  </p>
                </div>
              </div>

              <span className="text-xs bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-full font-mono">
                {successModalData.plan.toUpperCase()}
              </span>
            </div>

            {/* Content summary */}
            <div className="py-5 space-y-4">
              
              <div className="grid grid-cols-2 gap-3 text-xs bg-zinc-900 p-3.5 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-zinc-400 block text-[10px]">VEHÍCULO BLOQUEADO:</span>
                  <span className="font-bold text-white">{successModalData.bikeName}</span>
                  <span className="text-[#C8F000] font-mono block">[{successModalData.bikePlate}]</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">ARRENDATARIO:</span>
                  <span className="font-bold text-white">{successModalData.customerName}</span>
                  <span className="text-zinc-400 font-mono block">DNI: {successModalData.dni}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">FECHA Y DURACIÓN:</span>
                  <span className="font-bold text-white">{successModalData.startDate}</span>
                  <span className="text-zinc-400 block">{successModalData.bookingDays} Días</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">TOTAL CON IVA (21%):</span>
                  <span className="font-black text-base text-[#C8F000]">{successModalData.totalAmount} €</span>
                </div>
              </div>

              {/* Express QR Check-In (30 seconds in store) */}
              <div className="flex items-center gap-4 bg-black/60 p-3.5 rounded-xl border border-zinc-800">
                <div className="w-16 h-16 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-black" />
                </div>
                <div className="text-xs">
                  <strong className="text-white block font-bold">Check-In Express en Tienda (30 Segundos):</strong>
                  <p className="text-zinc-400 text-[11px] leading-snug mt-0.5">
                    Al llegar al Paseo Marítimo de Almería, el cliente solo enseña este QR o su DNI. La moto y llaves ya están asignadas. ¡Sin papel!
                  </p>
                </div>
              </div>

              {/* Automated Actions Log */}
              <div className="space-y-1.5 text-[11px] text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PDF de Contrato firmado generado y enviado a {successModalData.email || 'cliente@email.com'}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Calendario de la moto {successModalData.bikePlate} bloqueado en tiempo real en la base de datos.</span>
                </div>
                {successModalData.supabaseWebhookStatus && (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{successModalData.supabaseWebhookStatus}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setSuccessModalData(null)}
                className="flex-1 py-3 px-4 rounded-xl font-black text-xs bg-[#C8F000] text-[#111111] hover:bg-[#b8dd00] flex items-center justify-center gap-2"
              >
                <span>Cerrar y Ver el Panel del Dueño (Stock)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
