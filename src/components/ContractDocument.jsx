import React from 'react';
import Logo from './Logo';
import { CONTRACT_TERMS } from '../data/bikes';
import { ShieldCheck, FileCheck, MapPin, Calendar, Clock, Euro } from 'lucide-react';

export default function ContractDocument({
  customerData,
  bike,
  startDate,
  bookingDays,
  totalConIva,
  subtotalNeto,
  iva21,
  fianza,
  signatureUrl,
  isStaticPreview = false,
  contractId = 'RODA-2024-ALM-0892'
}) {
  const todayStr = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white text-zinc-900 border border-zinc-300 rounded-2xl p-6 sm:p-8 shadow-sm font-sans text-xs leading-relaxed max-w-3xl mx-auto">
      
      {/* Contract Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-zinc-900">
        <div>
          <Logo variant="light" size="sm" showSlogan={false} />
          <div className="text-[11px] text-zinc-600 mt-1">
            <strong>{CONTRACT_TERMS.company}</strong> · CIF: {CONTRACT_TERMS.cif} <br />
            {CONTRACT_TERMS.address} <br />
            Tel: {CONTRACT_TERMS.phone} · {CONTRACT_TERMS.email}
          </div>
        </div>

        <div className="text-left sm:text-right bg-zinc-50 border border-zinc-200 p-2.5 rounded-lg shrink-0">
          <span className="text-[10px] uppercase font-bold text-zinc-500 block">
            CONTRATO DE ARRENDAMIENTO DE VEHÍCULO
          </span>
          <span className="font-mono font-black text-xs text-zinc-900 block">
            Nº {contractId}
          </span>
          <span className="text-[10px] text-zinc-500">
            Almería, a {todayStr}
          </span>
        </div>
      </div>

      {/* Static Minuta Alert if Standard */}
      {isStaticPreview && (
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] rounded-lg flex items-center gap-2">
          <span className="font-bold">⚠️ Minuta Estándar (Lectura previa):</span>
          <span>Este borrador se imprimirá y firmará en soporte físico de papel en nuestra oficina de Almería.</span>
        </div>
      )}

      {/* Partes del Contrato */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
        <div>
          <h4 className="font-bold text-[11px] uppercase tracking-wider text-zinc-700 mb-1 border-b pb-0.5">
            1. ARRENDADOR:
          </h4>
          <p className="text-zinc-600">
            <strong>RODA MOBILITY S.L.</strong> <br />
            CIF: B-04987213 <br />
            Paseo Marítimo Carmen de Burgos, 14, Almería <br />
            Póliza Seguro Flota: {CONTRACT_TERMS.insurancePolicy}
          </p>
        </div>

        <div>
          <h4 className="font-bold text-[11px] uppercase tracking-wider text-zinc-700 mb-1 border-b pb-0.5">
            2. ARRENDATARIO (CONDUCTOR):
          </h4>
          {isStaticPreview ? (
            <p className="text-zinc-500 italic">
              [Pendiente de cumplimentar a mano en mostrador al presentar DNI/NIE original y permiso de conducir físico]
            </p>
          ) : (
            <p className="text-zinc-800">
              <strong>Nombre:</strong> {customerData.fullName || '---'} <br />
              <strong>DNI / NIE:</strong> {customerData.dni || '---'} <br />
              <strong>Carnet Conducir:</strong> {customerData.driverLicense || '---'} <br />
              <strong>Contacto:</strong> {customerData.phone || '---'} · {customerData.email || '---'}
            </p>
          )}
        </div>
      </div>

      {/* Vehículo y Fechas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
        <div>
          <h4 className="font-bold text-[11px] uppercase tracking-wider text-zinc-700 mb-1 border-b pb-0.5">
            3. VEHÍCULO ARRENDADO:
          </h4>
          <p className="text-zinc-800">
            <strong>Modelo:</strong> {bike?.name || 'Scooter 125cc PCX Honda'} <br />
            <strong>Matrícula:</strong> <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-zinc-300">{bike?.plate || '1024-KLM'}</span> <br />
            <strong>Cilindrada:</strong> {bike?.category || '125cc'} · {bike?.brand || 'Honda'} <br />
            <strong>Combustible entrega:</strong> 100% Depósito Lleno
          </p>
        </div>

        <div>
          <h4 className="font-bold text-[11px] uppercase tracking-wider text-zinc-700 mb-1 border-b pb-0.5">
            4. CONDICIONES ECONÓMICAS:
          </h4>
          <p className="text-zinc-800">
            <strong>Periodo:</strong> {bookingDays} día(s) desde {startDate} <br />
            <strong>Base Imponible:</strong> {subtotalNeto.toFixed(2)} € <br />
            <strong>IVA General (21%):</strong> {iva21.toFixed(2)} € <br />
            <strong>Total Factura (IVA inc.):</strong> <span className="font-bold text-zinc-950">{totalConIva.toFixed(2)} €</span> <br />
            <strong>Fianza Reembolsable:</strong> {fianza} € (Retención tarjeta)
          </p>
        </div>
      </div>

      {/* Cláusulas Legales Oficiales */}
      <div className="mb-4 space-y-1.5 text-[10px] text-zinc-600 bg-white p-3 rounded-lg border border-zinc-200">
        <h5 className="font-bold text-zinc-800 uppercase tracking-wider">
          5. CLÁUSULAS Y CONDICIONES ESPECÍFICAS (ALMERÍA):
        </h5>
        <ol className="list-decimal pl-4 space-y-1">
          {CONTRACT_TERMS.rulesSummary.map((rule, idx) => (
            <li key={idx}>{rule}</li>
          ))}
        </ol>
      </div>

      {/* Firmas */}
      <div className="pt-3 border-t-2 border-zinc-200 grid grid-cols-2 gap-4">
        <div className="text-center p-3 border border-zinc-200 rounded-xl bg-zinc-50">
          <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
            POR EL ARRENDADOR
          </span>
          <div className="h-16 flex items-center justify-center font-serif italic text-zinc-700 text-sm">
            Roda Mobility S.L. (Firma Autorizada)
          </div>
          <span className="text-[9px] text-zinc-400 block border-t pt-1">
            Sello Digital Oficial de Almería
          </span>
        </div>

        <div className="text-center p-3 border border-zinc-200 rounded-xl bg-zinc-50">
          <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
            POR EL ARRENDATARIO (CLIENTE)
          </span>
          
          <div className="h-16 flex items-center justify-center">
            {signatureUrl ? (
              <img
                src={signatureUrl}
                alt="Firma del cliente"
                className="max-h-14 object-contain"
              />
            ) : isStaticPreview ? (
              <span className="text-[11px] text-zinc-400 italic">
                (Firma física en mostrador de tienda)
              </span>
            ) : (
              <span className="text-[11px] text-zinc-400 italic">
                (Pendiente de firma en pantalla)
              </span>
            )}
          </div>

          <span className="text-[9px] text-zinc-400 block border-t pt-1">
            Firma Electrónica / Táctil Aceptada
          </span>
        </div>
      </div>

    </div>
  );
}
