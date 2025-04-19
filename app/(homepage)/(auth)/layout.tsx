import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 px-6 py-12 lg:px-20">
      <div className="hidden lg:flex flex-col justify-start mt-10 w-1/2 pr-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Build Work Experience and Land Job Opportunities through Project-based Learning Solution!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Work on real-world projects - Connect with a large network of digital professionals - land job opportunities.
        </p>
      </div>

      <div className="flex justify-center h-fit w-full lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
