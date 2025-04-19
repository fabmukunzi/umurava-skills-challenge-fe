'use client';

import { Work_Sans } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const workSans = Work_Sans({
  subsets: ['latin'],
});

export default function RootLayout() {
  const { back } = useRouter();
  return (
    <html lang="en">
      <body className={`${workSans.className} text-primary antialiased`}>
        <div className="relative mt-10 flex flex-col items-center justify-center md:h-[55vh]">
          <div className="flex items-center">
            <h1 className="text-6xl md:text-8xl font-extrabold">404</h1>
          </div>
          <div className="my-5 block text-center text-base md:text-xl text-gray-600">
            Looks like the page you are looking for doesn&apos;t exist.
          </div>
          <Button
            onClick={() => {
              back();
            }}
          >
            Go back
          </Button>
        </div>
      </body>
    </html>
  );
}
