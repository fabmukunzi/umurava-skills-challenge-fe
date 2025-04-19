'use client';

import { Fragment, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { SkillsLogo } from '@/lib/images';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { dashboardRoutes, homepageRoutes } from '@/lib/routes';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navbarItems = [
    { name: homepageRoutes.home.label, path: homepageRoutes.home.path },
    {
      name: homepageRoutes.challengeHackathons.label,
      path: homepageRoutes.challengeHackathons.path,
    },
    {
      name: homepageRoutes.learningInstitutions.label,
      path: homepageRoutes.learningInstitutions.path,
    },
    { name: homepageRoutes.about.label, path: homepageRoutes.about.path },
    { name: homepageRoutes.contact.label, path: homepageRoutes.contact.path },
  ];

  const session = useSession();
  const user = session.data?.user;

  return (
    <Fragment>
      <header className="w-full fixed top-0 left-0 bg-white z-50">
        <div className="mx-auto flex items-center justify-between md:px-6 lg:px-14 2xl:px-20 py-4">
          <div className="flex items-center">
            <a href="/">
              <Image src={SkillsLogo} alt="Umurava Logo" width={150} />
            </a>
          </div>

          <nav className="hidden lg:flex flex-1 justify-center space-x-6">
            {navbarItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <a
                  key={index}
                  href={item.path}
                  className={`transition-colors ${isActive ? 'text-primary' : 'text-black hover:text-primary'
                    }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          <Button className="bg-[#041738] hover:bg-[#041738]/80 text-white">
            <Link href={dashboardRoutes.dashboard.path}>
              {user ? 'Go to dashboard' : 'Join the Platform'}
            </Link>
          </Button>

          <div className="block lg:hidden">
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black focus:outline-none border p-2 rounded-md mr-4"
            >
              {isMenuOpen ? (
                <X size={24} className="text-primary" />
              ) : (
                <Menu className="text-primary" size={24} />
              )}
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'lg:hidden bg-white pb-5 shadow-lg overflow-hidden transition-all duration-500 ease-in-out',
            {
              'max-h-screen opacity-100': isMenuOpen,
              'max-h-0 opacity-0': !isMenuOpen,
            }
          )}
        >
          <nav className="flex flex-col space-y-4 px-6 py-4">
            {navbarItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <a
                  key={index}
                  href={item.path}
                  className={`font-medium transition-colors ${isActive ? 'text-primary' : 'text-black hover:text-primary'
                    }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>
          <Button className="bg-[#041738] hover:bg-[#041738]/80 text-white">
            <Link href={dashboardRoutes.dashboard.path}>
              {user ? 'Go to dashboard' : 'Join the Platform'}
            </Link>
          </Button>
        </div>
      </header>

      <div className="h-[80px] lg:h-[90px]"></div>
    </Fragment>
  );
};

export default HeaderComponent;
