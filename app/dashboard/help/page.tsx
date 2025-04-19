'use client'
import React, { useEffect } from 'react'
import { INotification } from '@/lib/types/notification';
import { Button } from '@/components/ui/button';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, LucideLoader2, LucidePhoneCall, LucideSend } from 'lucide-react';

export interface NotificationResponse {
    data: {
        data: INotification[],
        message: string,
        status: string,
    };
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
}

const buttonStyles = {
    delete: 'text-red-500 font-medium bg-red-100 hover:bg-red-200/60 border border-red-500 rounded',
    markAsRead: 'text-white bg-primary font-medium',
}

const HelpPage = () => {
    const [isChatbotLoading, setIsChatbotLoading] = React.useState(true);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://code.tidio.co/nwxqoa3fr3vnquc3odabfxd86kicvevq.js';
        script.async = true;

        // Set up event listener to detect when Tidio is fully loaded
        script.onload = () => {
            // Give Tidio a moment to initialize
            setTimeout(() => {
                setIsChatbotLoading(false);
            }, 1000);
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup if component unmounts before loading completes
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);


    return (
        <main className="h-full relative p-4 flex flex-col items-start space-x-8">
            <div className="w-full p-6">
                <header className='mb-4'>
                    <h1 className="text-2xl font-bold">Help Center</h1>
                    <p className="text-lg text-primary_grey">Welcome to our help center! If you have any questions or need assistance, feel free to reach out.</p>
                </header>
                <Accordion.Root type="single" collapsible className="w-full border rounded-md shadow-md">
                    <HelpItem
                        title="Email us"
                        content={<div className='flex flex-col items-start gap-2 md:gap-4'>
                            <p>Email us at support@umurava.com for any enquiries, feedback, or to report issues. Our support team will respond within 24 hours.</p>
                            <Button
                                className={buttonStyles.markAsRead}
                                onClick={() => window.location.href = 'mailto:support@umurava.com'}
                            >
                                <LucideSend className='mr-2' />
                                Send Email
                            </Button>
                        </div>}
                    />
                    <HelpItem
                        title="Prefer other methods of communication?"
                        content={<div className='flex flex-col items-start gap-2 md:gap-4'>
                            <p>You can reach us via different channels.</p>
                            <ul>
                                <li className='flex items-center gap-2'>
                                    <LucidePhoneCall className='text-primary' />
                                    <a href="tel:+25089263354" className='text-primary'>Call us at + 250 789 263 354</a>
                                </li>
                            </ul>
                        </div>}
                    />
                </Accordion.Root>
            </div>
            {isChatbotLoading && <div className="absolute bottom-0 right-0 mb-4 p-3"><LucideLoader2 className='animate-spin size-5' /></div>}
        </main>
    );
}

export default HelpPage;

const HelpItem = ({ title, content }: { title: string; content: React.ReactNode }) => {
    return (
        <Accordion.Item value={title} className="border-b">
            <Accordion.Trigger className="flex justify-between w-full p-4 text-left font-medium hover:bg-gray-100">
                {title}
                <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
            </Accordion.Trigger>
            <Accordion.Content className="p-4 bg-gray-50 text-black">
                <p>{content}</p>
            </Accordion.Content>
        </Accordion.Item>
    );
};