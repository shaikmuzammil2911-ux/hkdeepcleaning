import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hari Krishna Deep Cleaning Services Hyderabad | #1 Deep Cleaning Experts',
  description: 'Hyderabad\'s premier professional cleaning service provider specializing in home, villa, office, kitchen, bathroom, sofa, and post-construction deep cleaning.',
  metadataBase: new URL('https://hkdeepcleaning.vercel.app'),
  openGraph: {
    title: 'Hari Krishna Deep Cleaning Services Hyderabad',
    description: 'Hyderabad\'s premier professional deep cleaning experts. Spotless, hygienic & 100% satisfaction guaranteed.',
    url: 'https://hkdeepcleaning.vercel.app',
    siteName: 'Hari Krishna Deep Cleaning',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-[#FBFDFD] text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
