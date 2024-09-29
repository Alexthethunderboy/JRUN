'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ServicesPage() {
  const { data: session } = useSession();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async (status) => {
        const res = await fetch(`/api/services?status=${status}`);
        if (res.ok) {
          const data = await res.json();
          setServices(data.services); // Access services from the response object
        }
      };

    fetchServices();
  }, []);

  const handleCancelService = async (serviceId) => {
    const res = await fetch(`/api/services?id=${serviceId}`, { method: 'DELETE' });
    if (res.ok) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">My Services</h1>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter(service => new Date(service.date) > new Date()).map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Date: {new Date(service.date).toLocaleDateString()}</p>
                  <p>Time: {service.time}</p>
                  <p>Provider: {service.provider}</p>
                  <Button 
                    variant="destructive" 
                    className="mt-4"
                    onClick={() => handleCancelService(service.id)}
                  >
                    Cancel Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter(service => new Date(service.date) <= new Date()).map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Date: {new Date(service.date).toLocaleDateString()}</p>
                  <p>Time: {service.time}</p>
                  <p>Provider: {service.provider}</p>
                  <p>Status: Completed</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}