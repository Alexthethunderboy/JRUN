'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      } else {
        throw new Error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const res = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      });
      if (res.ok) {
        setNotifications(notifications.map(notification => 
          notification.id === notificationId ? { ...notification, isRead: true } : notification
        ));
      } else {
        throw new Error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications at the moment.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={notification.isRead ? 'opacity-50' : ''}>
              <CardHeader>
                <CardTitle>{notification.service.serviceType} Service Update</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{notification.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
                {!notification.isRead && (
                  <Button onClick={() => markAsRead(notification.id)} className="mt-4">
                    Mark as Read
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}