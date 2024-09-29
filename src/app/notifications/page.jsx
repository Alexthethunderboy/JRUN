'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        setNotifications(await res.json());
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    const res = await fetch(`/api/notifications/${notificationId}`, { method: 'PATCH' });
    if (res.ok) {
      setNotifications(notifications.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      ));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={notification.read ? 'opacity-60' : ''}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{notification.title}</span>
                {!notification.read && (
                  <Button size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                    Mark as Read
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{notification.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}