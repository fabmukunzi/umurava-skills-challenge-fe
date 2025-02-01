"use client"

// import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { usePathname } from 'next/navigation'; 
import '../assets/css/globals.css';
import '../assets/css/embla.css';

const workSans = Work_Sans({
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'Umurava skills challenge',
//   description: 'Build Work Experience through Skills Challenges Program',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <html lang="en">
      <body className={`${workSans.className} text-primary antialiased ${isDashboard ? 'overflow-hidden' : ''}`}>
        {children}
      </body>
    </html>
  );
}
