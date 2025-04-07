'use client';

import { Work_Sans } from 'next/font/google';
import HeaderComponent from '@/components/common/homepage/header';
import FooterComponent from '@/components/common/homepage/footer';

const workSans = Work_Sans({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${workSans.className} text-primary antialiased`}>
      <HeaderComponent />
      <main className="overflow-x-hidden">{children}</main>
      <FooterComponent />
    </div>
  );
}
