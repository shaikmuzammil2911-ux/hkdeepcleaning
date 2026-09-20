'use client';

import React, { useState } from 'react';
import { TopBar } from '@/src/components/TopBar';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import { FloatingWhatsApp } from '@/src/components/FloatingWhatsApp';
import { MobileBottomBar } from '@/src/components/MobileBottomBar';
import { BookingModal } from '@/src/components/BookingModal';

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceSlug, setBookingServiceSlug] = useState<string | undefined>(undefined);

  const handleOpenBooking = (slug?: string) => {
    setBookingServiceSlug(slug);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingServiceSlug(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFDFD] text-slate-900 font-sans relative">
      <TopBar />
      <Navbar onOpenBooking={handleOpenBooking} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar onOpenBooking={() => handleOpenBooking()} />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        serviceSlug={bookingServiceSlug}
      />
    </div>
  );
}
