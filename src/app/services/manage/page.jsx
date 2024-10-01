'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GridLoader } from 'react-spinners';

export default function ManageServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch services that workers need to manage (services booked by clients)
    const fetchServices = async () => {
      const res = await fetch('/api/services/manage');
      if (res.ok) {
        const data = await res.json();
        setServices(data.services);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  const handleServiceAction = async (serviceId, action) => {
    const res = await fetch(`/api/services/${serviceId}/${action}`, {
      method: 'PATCH',
    });

    if (res.ok) {
      setServices(services.map(service => 
        service.id === serviceId ? { ...service, status: action } : service
      ));
    } else {
      alert('Failed to update service');
    }
  };

  if (loading) {
    return <div className='flex justify-center items-center min-h-screen'><GridLoader color='#597D35'/></div>
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Manage Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <p>No services to manage</p>
        ) : (
          services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle>{service.type} Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Client:</strong> {service.user.name}</p>
                <p><strong>Date:</strong> {new Date(service.scheduledDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {service.time}</p>
                <p><strong>Location:</strong> {service.location}</p>
                <p><strong>Description:</strong> {service.description}</p>
                <p><strong>Status:</strong> {service.status}</p>

                {service.status === 'pending' && (
                  <div className="mt-4 space-x-2">
                    <Button
                      variant="success"
                      onClick={() => handleServiceAction(service.id, 'accepted')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleServiceAction(service.id, 'declined')}
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
