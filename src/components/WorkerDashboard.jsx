import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRunning, FaClipboardList, FaComments, FaBell } from 'react-icons/fa';

export default function WorkerDashboard({ userProfile }) {
  const availableJobs = []; // Fetch this data from an API
  const recentActivities = []; // Fetch this data from an API

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaRunning className="mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/services/available">
              <Button className="w-full mb-2">View Available Jobs</Button>
            </Link>
            <Link href="/services/manage">
              <Button variant="outline" className="w-full text-black">Manage Services</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaClipboardList className="mr-2" />
              Available Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {availableJobs.map((job, index) => (
                <li key={index}>{job.name} - {job.date}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaComments className="mr-2" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentActivities.map((activity, index) => (
                <li key={index}>{activity.description}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaBell className="mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>New job request</li>
              <li>Upcoming job reminder</li>
              <li>Payment received</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Jobs Completed: 25</p>
            <p>Total Earned: $1500</p>
            <p>Average Rating: 4.9/5</p>
          </CardContent>
        </Card>

        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li><Link href="/profile" className="text-primary hover:underline">View Profile</Link></li>
              <li><Link href="/services" className="text-primary hover:underline">Manage Services</Link></li>
              <li><Link href="/messages" className="text-primary hover:underline">Check Messages</Link></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}