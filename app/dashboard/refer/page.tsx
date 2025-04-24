'use client';
import { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiLinkedin } from "react-icons/fi";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';


const platformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || "https://umurava-skills-challenge-fe.vercel.app";

const ReferPage = () => {
    const [copied, setCopied] = useState(false);
    const [description, setDescription] = useState(
        "I've been using this amazing platform to enhance my skills! Check it out and join me."
    );


    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(`${platformUrl}?ref=${encodeURIComponent(description)}`);
            setCopied(true);
            toast({
                title: "Link copied!",
                description: "The link has been copied to your clipboard."
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err: unknown) {
            console.error("Failed to copy: ", err);
            toast({
                title: "Failed to copy",
                description: "Please try again or copy the link manually.",
                variant: "destructive"
            });
        }
    };

    const shareOnPlatform = (platform: string) => {
        let shareUrl = '';
        const encodedUrl = encodeURIComponent(`${platformUrl}?ref=share`);
        const encodedText = encodeURIComponent(description);

        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=Check out this skills platform&body=${encodedText}%0A%0A${encodedUrl}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    };


    return (
        <div className="container mx-auto py-8 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Refer a Friend</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Share Umurava Skills</CardTitle>
                    <CardDescription>
                        Invite friends and colleagues to join our platform. Customize your message before sharing.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Your Custom Message</label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write a personal message to accompany your referral"
                            rows={3}
                            className="mb-4"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Your Referral Link</label>
                        <div className="flex">
                            <Input
                                readOnly
                                value={`${platformUrl}?ref=share`}
                                className="rounded-r-none"
                            />
                            <Button
                                onClick={handleCopyLink}
                                variant="outline"
                                className="rounded-l-none"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-3">Share On</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="outline"
                                onClick={() => shareOnPlatform('twitter')}
                                className="flex items-center gap-2"
                            >
                                <FaXTwitter className="h-4 w-4" />
                                Twitter
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => shareOnPlatform('whatsapp')}
                                className="flex items-center gap-2 text-green-500 hover:text-green-500/80"
                            >
                                <FaWhatsapp className="h-4 w-4" />
                                Whatsapp
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => shareOnPlatform('linkedin')}
                                className="flex items-center gap-2 text-[#0b65c2] hover:text-[#0b65c2]/80"
                            >
                                <FiLinkedin className="h-4 w-4" />
                                LinkedIn
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => shareOnPlatform('email')}
                                className="flex items-center gap-2 text-[#cc3a2f] hover:text-[#cc3a2f]/80"
                            >
                                <Mail className="h-4 w-4" />
                                Email
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground">
                <p>Thank you for sharing Umurava Skills with your network!</p>
                <p>Every referral helps our community grow stronger.</p>
            </div>
        </div>
    );
};

export default ReferPage;