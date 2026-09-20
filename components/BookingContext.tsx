'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface BookingContextType {
  isBookingOpen: boolean;
  bookingServiceSlug: string | undefined;
  openBooking: (slug?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType>({
  isBookingOpen: false,
  bookingServiceSlug: undefined,
  openBooking: () => {},
  closeBooking: () => {},
});

export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceSlug, setBookingServiceSlug] = useState<string | undefined>(undefined);

  const openBooking = (slug?: string) => {
    setBookingServiceSlug(slug);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setBookingServiceSlug(undefined);
  };

  useEffect(() => {
    const handleCustomBooking = (event: any) => {
      const slug = event.detail?.slug;
      openBooking(slug);
    };

    window.addEventListener('hk-open-booking', handleCustomBooking);
    return () => {
      window.removeEventListener('hk-open-booking', handleCustomBooking);
    };
  }, []);

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        bookingServiceSlug,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function triggerBookingModal(slug?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('hk-open-booking', { detail: { slug } }));
  }
}
