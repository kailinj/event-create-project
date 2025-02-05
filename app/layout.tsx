import type { Metadata } from 'next';
import { Geist_Mono, Moderustic } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const moderustic = Moderustic({
  variable: '--font-moderustic',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Event create',
  description: 'User management project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${moderustic.variable} ${geistMono.variable} antialiased`}
      >
        <div className='container py-4 mx-auto'>
          <div className='flex-1'>{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
