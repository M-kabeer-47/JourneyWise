import React from 'react';
import NotificationItem from './NotificationItem';
import { Notification } from '../../types';

interface NotificationsPanelProps {
  notifications: Notification[];
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications }) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-white rounded-lg shadow-sm h-full">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-midnight-blue">Notifications</h2>
          {unreadCount > 0 && (
            <div className="ml-2 px-2 py-0.5 bg-ocean-blue text-white text-xs font-medium rounded-full">
              {unreadCount}
            </div>
          )}
        </div>
        <button className="text-sm text-ocean-blue hover:text-blue-700 font-medium">
          Mark All Read
        </button>
      </div>
      <div className="overflow-y-auto max-h-[400px] divide-y divide-gray-100">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
      <div className="p-4 border-t border-gray-100 text-center">
        <button className="text-sm text-ocean-blue hover:text-blue-700 font-medium">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;