'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AvailableJobsPage() {
  const [availableJobs, setAvailableJobs] = useState([]);

  useEffect(() => {
    const fetchAvailableJobs = async () => {
      try {
        const res = await fetch('/api/services/available');
        if (res.ok) {
          const data = await res.json();
          setAvailableJobs(data);
        } else {
          throw new Error('Failed to fetch available jobs');
        }
      } catch (error) {
        console.error('Error fetching available jobs:', error);
      }
    };

    fetchAvailableJobs();
  }, []);

  const handleAcceptJob = async (jobId) => {
    try {
      const res = await fetch(`/api/services/${jobId}/accept`, {
        method: 'POST',
      });

      if (res.ok) {
        // Remove the accepted job from the list
        setAvailableJobs(availableJobs.filter(job => job.id !== jobId));
      } else {
        throw new Error('Failed to accept job');
      }
    } catch (error) {
      console.error('Error accepting job:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.serviceType}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {job.date}</p>
              <p>Time: {job.time}</p>
              <p>Location: {job.location}</p>
              <p>Description: {job.description}</p>
              <Button onClick={() => handleAcceptJob(job.id)} className="mt-4">Accept Job</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}