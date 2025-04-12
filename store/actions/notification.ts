import { INotification, INotificationStatus } from '@/lib/types/notification';
import { baseAPI } from '@/store/api';


interface NotificationsQueryParams {
    status: INotificationStatus;
}
const notificationEndpoints = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<INotification[], Partial<NotificationsQueryParams>>({
            query: (params) => ({
                url: '/public/notifications',
                method: 'GET',
                params: Object.keys(params || {}).length > 0 ? params : undefined,
            }),
            providesTags: ['notifications'],
        }),
        markNotificationAsRead: builder.mutation<void, string>({
            query: (notificationId) => ({
                url: `/public/notifications/${notificationId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['notifications'],
        }),
        markNotificationAsUnread: builder.mutation<void, string>({
            query: (notificationId) => ({
                url: `/public/notifications/unread/${notificationId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['notifications'],
        }),
        markAllNotificationsAsRead: builder.mutation<void, void>({
            query: () => ({
                url: '/public/notifications/read/all',
                method: 'PUT',
            }),
            invalidatesTags: ['notifications'],
        }),
        markAllNotificationsAsUnread: builder.mutation<void, void>({
            query: () => ({
                url: '/public/notifications/unread/update/all',
                method: 'PUT',
            }),
            invalidatesTags: ['notifications'],
        }),
        deleteNotification: builder.mutation<void, string>({
            query: (notificationId) => ({
                url: `/public/notifications/${notificationId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['notification'],
        }),
        deleteAllNotifications: builder.mutation<void, void>({
            query: () => ({
                url: '/public/notifications/delete/all',
                method: 'DELETE',
            }),
            invalidatesTags: ['notifications'],
        }),
    }),
});
export const {
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useMarkNotificationAsUnreadMutation,
    useMarkAllNotificationsAsReadMutation,
    useMarkAllNotificationsAsUnreadMutation,
    useDeleteNotificationMutation,
    useDeleteAllNotificationsMutation,
} = notificationEndpoints;