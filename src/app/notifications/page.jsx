'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GridLoader } from 'react-spinners';

export default function NotificationsPage() {
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (status === 'authenticated') {
        try {
          const res = await fetch('/api/notifications');
          if (res.ok) {
            const data = await res.json();
            setNotifications(data);
          }
        } catch (error) {
          console.error('Error fetching notifications:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchNotifications();
  }, [status]);

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true }),
      });

      if (res.ok) {
        setNotifications(notifications.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        ));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (status === 'loading' || isLoading) {
    return <div className="flex justify-center items-center h-screen"><GridLoader color="#597D35" /></div>;
  }

  if (status === 'unauthenticated') {
    return <div className="text-center mt-10">Access Denied. Please <Link href="/login" className="text-primary hover:underline">log in</Link> to view this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`bg-black text-white border-0 ${!notification.read ? 'border-l-4 border-primary' : ''}`}>
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-400">{new Date(notification.createdAt).toLocaleString()}</p>
                </div>
                {!notification.read && (
                  <Button onClick={() => markAsRead(notification.id)}>Mark as Read</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No notifications at this time.</p>
      )}
    </div>
  );
}