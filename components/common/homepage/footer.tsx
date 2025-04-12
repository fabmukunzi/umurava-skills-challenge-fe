/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CareerTicketLogo,
  FacebookIcon,
  GoogleIcon,
  LinkedinIcon,
  YoutubeIcon,
} from '@/lib/images';
import { LucideLoader2, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { homepageRoutes } from '@/lib/routes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSubscribeToNewsletterMutation } from '@/store/actions/users';
import { toast } from '@/hooks/use-toast';
import { handleError } from '@/lib/errorHandler';

interface SubscribeDto {
  email: string;
}

const FooterComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SubscribeDto>({
    resolver: zodResolver(
      z.object({
        email: z.string().email('Invalid email address'),
      })
    ),
    defaultValues: {
      email: '',
    },
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [subscribeToNewsletter] = useSubscribeToNewsletterMutation();

  const Suscribe = async (data: SubscribeDto) => {
    try {
      setIsSubmitting(true);
      await subscribeToNewsletter({ email: data.email }).unwrap();
      toast({
        title: 'You have successfully subscribed to our newsletter.',
      });
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: FacebookIcon,
      href: '#',
      name: 'Facebook',
    },
    {
      icon: GoogleIcon,
      href: '#',
      name: 'Google',
    },
    {
      icon: LinkedinIcon,
      href: '#',
      name: 'LinkedIn',
    },
    {
      icon: YoutubeIcon,
      href: '#',
      name: 'YouTube',
    },
  ];
  return (
    <footer id='contact-us' className="bg-[#041738] px-5 md:px-20 py-4 text-white">
      <div className="flex items-center justify-between py-8">
        <Image src={CareerTicketLogo} alt="Career Ticket Logo" width={70} />
        <div className="flex gap-2">
          {socialLinks.map((socialLink, index) => (
            <Link
              className="bg-white rounded-full p-2"
              href={socialLink.href}
              key={index}
            >
              <Image
                className="object-fit h-4 w-4 mx-auto"
                src={socialLink.icon}
                alt={socialLink.name}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="text-primary_grey py-10 flex gap-10 flex-col md:flex-row justify-between  border-y border-primary_grey">
        <div className="md:w-1/3 flex flex-col gap-5">
          <h1 className="text-white font-bold text-2xl">Our Address</h1>
          <div className="flex items-center gap-4">
            <Mail size={20} className="text-[#bbbbbb]" />
            <a href="mailto:career@tickets.com">career@tickets.com</a>
          </div>
          <div className="flex items-center gap-4">
            <MapPin size={20} className="text-[#bbbbbb]" />{' '}
            <a href="https://maps.app.goo.gl/RzxVRfQ5uNQYRQRDA">
              89 KG 14 Ave, Kigali
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Phone size={20} className="text-[#bbbbbb]" />{' '}
            <a href="tel:+250700000">+250 700 000</a>
          </div>
        </div>
        <div className="md:w-1/3 flex flex-col gap-4">
          <h1 className="text-white font-bold text-2xl">Quick Links</h1>
          <a className="block" href={homepageRoutes.home.path}>
            Home
          </a>
          <a className="block" href={homepageRoutes.challengeHackathons.path}>
            Program
          </a>
          <a href={homepageRoutes.about.path}>About</a>
          <a className="block" href={homepageRoutes.contact.path}>
            Contact Us
          </a>
        </div>
        <div className="md:w-1/3 flex flex-col gap-4">
          <h1 className="text-white font-bold text-2xl">
            Join our newsletter to keep up to date with us!
          </h1>
          <form className="relative" onSubmit={handleSubmit(Suscribe)}>
            <Input className="md:h-auto lg:h-14 h-14" placeholder="Email" {...register('email')} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            <Button
              size="lg"
              className="absolute right-2 lg:top-1.5 top-1.5 md:top-[0.126rem] md:px-2 lg:px-7 px-7 md:h-8 lg:h-11 md:text-sm lg:text-base md:font-normal lg:font-semibold font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LucideLoader2 className='animate-spin' /> : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
      <div className="flex md:flex-row flex-col-reverse gap-4 text-center justify-between pt-8">
        <h1 className="text-sm">
          Copyright &copy; All Rights Reserved SawaPay{' '}
          {new Date().getFullYear()}.
        </h1>
        <div className="text-sm">
          <a href="/privacy">Privacy Policy</a> |
          <a href="/terms"> Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
