import React, { useState, useEffect } from 'react';
import PresentationControlBar from './components/PresentationControlBar';
import Header from './components/Header';
import Hero from './components/Hero';
import CatalogSection from './components/CatalogSection';
import CheckoutSection from './components/CheckoutSection';
import OwnerStockPanel from './components/OwnerStockPanel';
import InfoModals from './components/InfoModals';
import Footer from './components/Footer';
import { INITIAL_BIKES } from './data/bikes';
import { Smartphone, Check, Sparkles } from 'lucide-react';

export default function App() {
  // Demo Presentation Plan: 'standard' | 'advance' | 'enterprise' | 'stock'
  // Default to 'advance' as requested (FOCO DE VENDA!)
  const [currentPlan, setCurrentPlan] = useState('advance');
  
  // Fleet of 3 Bikes state
  const [bikes, setBikes] = useState(INITIAL_BIKES);
  const [selectedBike, setSelectedBike] = useState(INITIAL_BIKES[0]);
  
  // Booking parameters
  const [bookingDays, setBookingDays] = useState(2);
  const [selectedExtras, setSelectedExtras] = useState(['helmet2']);
  
  // Format initial start date as YYYY-MM-DD (today)
  const getTodayDate = () => {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  };
  const [startDate, setStartDate] = useState(getTodayDate());

  // Booked records for automated plans (Advance & Enterprise)
  const [bookings, setBookings] = useState([]);

  // Device simulation frame toggle (Mobile-First 390px frame vs Responsive Fullscreen)
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Informational modals state
  const [activeModal, setActiveModal] = useState(null);

  // When a digital booking succeeds in Advance or Enterprise:
  const handleBookingSuccess = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);

    // Automatically block the bike in the fleet
    setBikes((prevBikes) =>
      prevBikes.map((bike) =>
        bike.id === newBooking.bikeId
          ? { ...bike, status: 'Alquilada' }
          : bike
      )
    );
  };

  // Manual status change by owner in Standard mode
  const handleUpdateBikeStatus = (bikeId, newStatus) => {
    setBikes((prevBikes) =>
      prevBikes.map((bike) =>
        bike.id === bikeId ? { ...bike, status: newStatus } : bike
      )
    );
  };

  // Reset a single bike booking
  const handleResetBikeBooking = (bikeId) => {
    setBookings((prev) => prev.filter((b) => b.bikeId !== bikeId));
    setBikes((prevBikes) =>
      prevBikes.map((bike) =>
        bike.id === bikeId ? { ...bike, status: 'Disponible' } : bike
      )
    );
  };

  // Full demo reset
  const handleResetDemo = () => {
    setBikes(INITIAL_BIKES);
    setSelectedBike(INITIAL_BIKES[0]);
    setBookings([]);
    setBookingDays(2);
    setSelectedExtras(['helmet2']);
  };

  // Scroll helpers
  const navigateToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const proceedToCheckout = () => {
    const el = document.getElementById('checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F4EF] text-[#111111] flex flex-col font-['Montserrat']">
      
      {/* 1. Presentation Control Top Bar (Always fixed at top) */}
      <PresentationControlBar
        currentPlan={currentPlan}
        onChangePlan={setCurrentPlan}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
        onResetDemo={handleResetDemo}
        hasActiveBooking={bookings.length > 0}
      />

      {/* Main Body Container: Either Fullscreen or Phone Frame */}
      <div className={isMobileFrame ? 'flex-1 py-8 px-4 flex justify-center bg-zinc-950' : 'flex-1 flex flex-col'}>
        
        <div
          className={
            isMobileFrame
              ? 'w-full max-w-[420px] bg-[#F5F4EF] rounded-[44px] shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-[8px] border-zinc-800 overflow-hidden relative flex flex-col max-h-[880px]'
              : 'w-full flex-1 flex flex-col'
          }
        >
          {/* Virtual Mobile Notch if Mobile Frame is active */}
          {isMobileFrame && (
            <div className="bg-[#111111] text-zinc-400 px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-semibold border-b border-zinc-800 select-none shrink-0 z-50">
              <span>9:41</span>
              {/* Dynamic Island / Notch */}
              <div className="w-24 h-4 bg-black rounded-full border border-zinc-700/60 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#C8F000]/60 mr-1" />
                <span className="text-[8px] text-zinc-400 font-mono">RODA ALMERÍA</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Scrollable Content inside Frame or Page */}
          <div className={isMobileFrame ? 'overflow-y-auto flex-1 flex flex-col' : 'flex-1 flex flex-col'}>
            
            {/* Header / Navbar */}
            <Header
              onOpenModal={setActiveModal}
              onNavigateToCatalog={navigateToCatalog}
            />

            {/* If user clicked Tab 4: "Panel del Dueño (Stock)", show Stock panel as primary view */}
            {currentPlan === 'stock' ? (
              <main className="flex-1">
                <OwnerStockPanel
                  bikes={bikes}
                  onUpdateBikeStatus={handleUpdateBikeStatus}
                  currentPlan={currentPlan}
                  bookings={bookings}
                  onResetBikeBooking={handleResetBikeBooking}
                />
              </main>
            ) : (
              /* Normal Customer Rental Flow (Hero -> Catalog -> Dynamic Checkout -> Stock Preview) */
              <main className="flex-1">
                {/* Hero Section */}
                <Hero
                  onExploreClick={navigateToCatalog}
                  onOpenRoutes={() => setActiveModal('routes')}
                />

                {/* 3 Bikes Catalog & Economic VAT Calculator */}
                <CatalogSection
                  bikes={bikes}
                  selectedBike={selectedBike}
                  onSelectBike={setSelectedBike}
                  bookingDays={bookingDays}
                  setBookingDays={setBookingDays}
                  selectedExtras={selectedExtras}
                  setSelectedExtras={setSelectedExtras}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  onProceedToCheckout={proceedToCheckout}
                  currentPlan={currentPlan}
                />

                {/* Dynamic Checkout that changes per plan */}
                <CheckoutSection
                  currentPlan={currentPlan}
                  selectedBike={selectedBike}
                  bookingDays={bookingDays}
                  startDate={startDate}
                  selectedExtras={selectedExtras}
                  onBookingSuccess={handleBookingSuccess}
                />

                {/* Live Stock Panel at Bottom for Instant Verification during Sales Pitch */}
                <div className="pt-4">
                  <OwnerStockPanel
                    bikes={bikes}
                    onUpdateBikeStatus={handleUpdateBikeStatus}
                    currentPlan={currentPlan}
                    bookings={bookings}
                    onResetBikeBooking={handleResetBikeBooking}
                  />
                </div>
              </main>
            )}

            {/* Footer */}
            <Footer
              onOpenModal={setActiveModal}
              onNavigateToCatalog={navigateToCatalog}
            />

          </div>

          {/* Mobile Home Bar Indicator */}
          {isMobileFrame && (
            <div className="h-4 bg-[#111111] flex items-center justify-center shrink-0">
              <div className="w-32 h-1 bg-zinc-600 rounded-full" />
            </div>
          )}

        </div>

      </div>

      {/* Information & Regulatory Modals */}
      <InfoModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />

    </div>
  );
}
