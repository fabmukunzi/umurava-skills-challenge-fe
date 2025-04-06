'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useDeleteAllNotificationsMutation, useDeleteNotificationMutation, useGetNotificationsQuery, useMarkAllNotificationsAsReadMutation, useMarkNotificationAsReadMutation } from '@/store/actions/notification';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import { INotification } from '@/lib/types/notification';

const NotificationPage = () => {
    const session = useSession();
    const user = session?.data?.user;
    const { data, isLoading, isError } = useGetNotificationsQuery({});
    const { data: notificationsData } = data || {};

    console.log('first render notifications', notificationsData);


    const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
    const [markAllNotificationsAsRead] = useMarkAllNotificationsAsReadMutation();
    const [deleteNotification] = useDeleteNotificationMutation();
    const [deleteAllNotifications] = useDeleteAllNotificationsMutation();

    const handleMarkAsRead = (notificationId) => {
        markNotificationAsRead(notificationId)
    }
    const handleMarkAllAsRead = () => {
        markAllNotificationsAsRead()
    }
    const handleDeleteNotification = (notificationId) => {
        deleteNotification(notificationId)
    }
    const handleDeleteAllNotifications = () => {
        deleteAllNotifications()
    }

    if (isLoading) {
        return <div className="flex flex-col gap-4 items-center justify-center h-screen">
            {Array.from({ length: 3 }, (_, index) => (
                <Skeleton key={index} className="h-32 w-full bg-gray-300" />
            ))}
        </div>
    }
    if (isError) {
        return <div className="flex items-center justify-center h-screen">
            <div className="text-red-500">Error loading notifications</div>
        </div>
    }

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            <div className="space-y-4">
                <div className="flex justify-end gap-4 mb-4">
                    <button
                        onClick={handleMarkAllAsRead}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Mark All as Read
                    </button>
                    <button
                        onClick={handleDeleteAllNotifications}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete All
                    </button>
                </div>

                {notificationsData?.length ? (
                    notificationsData.map((item: INotification) => (
                        <motion.div
                            key={item._id}
                            className={`p-4 border rounded shadow hover:bg-primary/10 ${item.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''}`}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            viewport={{ once: true }}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg font-semibold">New Message</h2>
                                    <Badge className="text-white capitalize">{item.status}</Badge>
                                    <p className="text-sm text-gray-600 mt-2">{item.message}</p>
                                </div>
                                <div className="flex gap-2">
                                    {item.status === 'unread' && (
                                        <button
                                            onClick={() => handleMarkAsRead(item._id)}
                                            className="text-blue-500 hover:text-blue-700 text-sm"
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteNotification(item._id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No notifications to display
                    </div>
                )}
            </div>
        </main>
    );
}

export default NotificationPage