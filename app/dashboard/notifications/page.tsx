'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const NotificationPage = () => {
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            <div className="space-y-4">
                <motion.div className="p-4 border rounded shadow hover:bg-primary/10 cursor-pointer" initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    viewport={{ once: true }}>
                    <h2 className="text-lg font-semibold">New Message</h2>
                    <Badge className="text-white">{'Read'}</Badge>
                    <p className="text-sm text-gray-600">You have received a new message from John Doe.</p>
                    <button className="mt-2 text-blue-500 hover:underline">View Message</button>
                </motion.div>
                <div className="p-4 border rounded shadow hover:bg-primary/10 cursor-pointer">
                    <h2 className="text-lg font-semibold">System Update</h2>
                    <p className="text-sm text-gray-600">Your system was updated successfully.</p>
                    <button className="mt-2 text-blue-500 hover:underline">View Details</button>
                </div>
                <div className="p-4 border rounded shadow hover:bg-primary/10 cursor-pointer">
                    <h2 className="text-lg font-semibold">Reminder</h2>
                    <p className="text-sm text-gray-600">Don&apos;t forget to complete your profile setup.</p>
                    <button className="mt-2 text-blue-500 hover:underline">Complete Now</button>
                </div>
            </div>
        </main>
    );
}

export default NotificationPage