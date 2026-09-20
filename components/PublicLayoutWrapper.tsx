'use client';

import React from 'react';
import { TopBar } from '@/src/components/TopBar';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import { FloatingWhatsApp } from '@/src/components/FloatingWhatsApp';
import { MobileBottomBar } from '@/src/components/MobileBottomBar';
import { BookingModal } from '@/src/components/BookingModal';
import { BookingProvider, useBooking } from './BookingContext';

function PublicLayoutInner({ children }: { children: React.ReactNode }) {
  const { isBookingOpen, bookingServiceSlug, openBooking, closeBooking } = useBooking();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFDFD] text-slate-900 font-sans relative">
      <TopBar />
      <Navbar onOpenBooking={openBooking} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar onOpenBooking={() => openBooking()} />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        serviceSlug={bookingServiceSlug}
      />
    </div>
  );
}

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <PublicLayoutInner>{children}</PublicLayoutInner>
    </BookingProvider>
  );
}

