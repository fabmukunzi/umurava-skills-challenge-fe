'use client'
import React, { useMemo } from 'react'
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useDeleteAllNotificationsMutation, useDeleteNotificationMutation, useGetNotificationsQuery, useMarkAllNotificationsAsReadMutation, useMarkAllNotificationsAsUnreadMutation, useMarkNotificationAsReadMutation, useMarkNotificationAsUnreadMutation } from '@/store/actions/notification';
import { Skeleton } from '@/components/ui/skeleton';
import { INotification } from '@/lib/types/notification';
import { Button } from '@/components/ui/button';
import { LucideCheckCheck, LucideEllipsis, LucideEye, LucideEyeOff, LucideLoader2, LucideTrash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

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
    delete: 'text-red-500 font-medium bg-red-200 hover:bg-red-200/60 border border-red-500 rounded',
    markAsRead: 'text-white bg-primary font-medium',
}

const NotificationPage = () => {
    const session = useSession();
    const user = session?.data?.user;
    const isAdmin = useMemo(() => ['admin', 'super admin'].includes(user?.role?.toLowerCase() || ''), [user?.role]);

    const { data, isLoading, isFetching, isError } = useGetNotificationsQuery<NotificationResponse>({});
    const notificationsData = useMemo(() => {
        if (Array.isArray(data)) return data;
        return (data && 'data' in data) ? (data.data) : [];
    }, [data]);


    const [markNotificationAsRead, { isLoading: markReadLoading }] = useMarkNotificationAsReadMutation();
    const [markNotificationAsUnread, { isLoading: markUnreadLoading }] = useMarkNotificationAsUnreadMutation();
    const [markAllNotificationsAsUnread, { isLoading: markAllUnreadLoading }] = useMarkAllNotificationsAsUnreadMutation();
    const [markAllNotificationsAsRead, { isLoading: markAllReadLoading }] = useMarkAllNotificationsAsReadMutation();
    const [deleteNotification, { isLoading: deleteOneLoading }] = useDeleteNotificationMutation();
    const [deleteAllNotifications, { isLoading: deleteAllLoading }] = useDeleteAllNotificationsMutation();
    const [loadingNotificationId, setLoadingNotificationId] = React.useState<string | null>(null);

    const handleMarkAsRead = (notificationId: string) => {
        setLoadingNotificationId(notificationId)
        try {
            markNotificationAsRead(notificationId)
        } finally {
            setLoadingNotificationId(null)
        }
    }
    const handleMarkAsUnread = (notificationId: string) => {
        setLoadingNotificationId(notificationId)
        try {
            markNotificationAsUnread(notificationId)
        } finally {
            setLoadingNotificationId(null)
        }
    }
    const handleMarkAllAsUnread = () => {
        markAllNotificationsAsUnread()
    }
    const handleMarkAllAsRead = () => {
        markAllNotificationsAsRead()
    }
    const handleDeleteNotification = (notificationId: string) => {
        setLoadingNotificationId(notificationId)
        try {
            deleteNotification(notificationId)
        } finally {
            setLoadingNotificationId(null)
        }
    }
    const handleDeleteAllNotifications = () => {
        deleteAllNotifications()
    }

    if (isLoading || isFetching) {
        return <div className="flex flex-col gap-4 items-center justify-start pt-6">
            <Skeleton className="h-32 w-full bg-gray-300" />
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
                {notificationsData?.length > 0 && isAdmin && (<div className="flex justify-end gap-4 mb-4">
                    {notificationsData.some(item => item.status === 'unread') && (<Button
                        onClick={handleMarkAllAsRead}
                        className={buttonStyles.markAsRead}
                        disabled={markAllReadLoading}
                    >
                        {markAllReadLoading ? <LucideLoader2 className='animate-spin' /> : 'Mark All as Read'}
                    </Button>)}
                    {notificationsData.some(item => item.status === 'read') && (<Button
                        onClick={handleMarkAllAsUnread}
                        className={buttonStyles.markAsRead}
                        disabled={markAllUnreadLoading}
                    >
                        {markAllReadLoading ? <LucideLoader2 className='animate-spin' /> : 'Mark All as Unread'}
                    </Button>)}
                    <Button
                        onClick={handleDeleteAllNotifications}
                        className={buttonStyles.delete}
                        disabled={deleteAllLoading}
                    >
                        {deleteAllLoading ? <LucideLoader2 className='animate-spin' /> : 'Delete All'}
                    </Button>
                </div>)}

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
                            <div className="flex justify-between items-end">
                                <div>
                                    <h2 className="text-lg font-semibold">{item.title}</h2>
                                    <p className="text-sm text-gray-600 mt-2">{item.message}</p>
                                    <Badge className={`${item.status === 'unread' ? 'text-white' : 'text-green-500 bg-green-50 border-green-500'} w-fit capitalize flex items-center gap-2 mt-2`}>
                                        {item.status === 'unread'
                                            ? <LucideEllipsis className="size-3 text-white" />
                                            : <LucideCheckCheck className="size-3 text-green-500" />}
                                        {item.status}
                                    </Badge>
                                </div>
                                {isAdmin && (<div className="flex gap-2">
                                    {item.status === 'unread' && (
                                        <Button
                                            onClick={() => handleMarkAsRead(item._id)}
                                            className={buttonStyles.markAsRead}
                                            disabled={markReadLoading && item._id === loadingNotificationId}
                                        >
                                            {markReadLoading && item._id === loadingNotificationId ? <LucideLoader2 className='animate-spin' /> : <LucideEye className='size-5' />}
                                        </Button>
                                    )}
                                    {item.status === 'read' && (
                                        <Button
                                            onClick={() => handleMarkAsUnread(item._id)}
                                            className={buttonStyles.markAsRead}
                                            disabled={markUnreadLoading && item._id === loadingNotificationId}
                                        >
                                            {markUnreadLoading && item._id === loadingNotificationId ? <LucideLoader2 className='animate-spin' /> : <LucideEyeOff className='size-5' />}
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => handleDeleteNotification(item._id)}
                                        className={buttonStyles.delete}
                                        disabled={deleteOneLoading && item._id === loadingNotificationId}
                                    >
                                        {deleteOneLoading && item._id === loadingNotificationId ? <LucideLoader2 className='animate-spin' /> : <LucideTrash2 className='size-5' />}
                                    </Button>
                                </div>)}
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