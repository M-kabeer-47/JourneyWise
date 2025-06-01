import React from 'react';
import { Bell, Calendar, Mail, AlertTriangle } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'booking':
        return <Calendar className="h-5 w-5 text-ocean-blue" />;
      case 'message':
        return <Mail className="h-5 w-5 text-green-500" />;
      case 'reminder':
        return <Bell className="h-5 w-5 text-amber-500" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`p-4 flex items-start ${notification.isRead ? 'opacity-75' : ''}`}>
      <div className={`p-2 rounded-full mr-3 ${notification.isRead ? 'bg-gray-100' : 'bg-blue-50'}`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
          {notification.message}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {formatTime(notification.createdAt)}
        </p>
      </div>
      {!notification.isRead && (
        <div className="w-2 h-2 bg-ocean-blue rounded-full"></div>
      )}
    </div>
  );
};

export default NotificationItem;