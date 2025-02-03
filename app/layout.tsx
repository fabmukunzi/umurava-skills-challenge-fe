'use client';

// import type { Metadata } from 'next';
import '../assets/css/globals.css';
import '../assets/css/embla.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Suspense } from 'react';

// export const metadata: Metadata = {
//   title: 'Umurava skills challenge',
//   description: 'Build Work Experience through Skills Challenges Program',
// };

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
        </body>
      </html>
    </Provider>
  );
}
