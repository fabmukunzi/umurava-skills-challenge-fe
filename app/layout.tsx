'use client';

import '@/assets/css/globals.css';
import '@/assets/css/embla.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning >
        <Provider store={store}>
          <SessionProvider>
            <Suspense fallback={null}>{children}</Suspense>
            <Toaster />
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
