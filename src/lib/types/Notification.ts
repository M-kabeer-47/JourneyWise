export interface Notification {
  id: string;
  message: string;
  type: 'booking' | 'message' | 'reminder' | 'alert';
  isRead: boolean;
  createdAt: string;
}

export interface Metric {
  label: string;
  value: string | number;
  change?: number;
  icon: string;
}