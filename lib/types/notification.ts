export interface INotification {
    _id: string;
    type: string;
    message: string;
    userId: string;
    status: string;
    timestamp: string;
}

export interface INotificationStatus {
    status: 'read' | 'unread';
}