'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BookServicePage() {
  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/services/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to book service');
      }
    } catch (error) {
      console.error('Error booking service:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Book a Service</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="serviceType">Service Type</Label>
              <Select name="serviceType" onValueChange={(value) => handleSelectChange('serviceType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="laundry">Laundry</SelectItem>
                  <SelectItem value="carwash">Car Wash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Booking...' : 'Book Service'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}