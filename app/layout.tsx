'use client';

import '@/assets/css/globals.css';
import '@/assets/css/embla.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Suspense>{children}</Suspense>
          <Toaster />
        </body>
      </html>
    </Provider>
  );
}
