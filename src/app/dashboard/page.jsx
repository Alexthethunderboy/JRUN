'use client'

import React, { useState } from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />
      case 'bookings':
        return <BookingsContent />
      case 'profile':
        return <ProfileContent />
      case 'payments':
        return <PaymentsContent />
      default:
        return <OverviewContent />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-grow bg-white rounded-lg shadow-lg p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

function OverviewContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary text-white p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="bg-secondary text-white p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Completed Jobs</h3>
          <p className="text-3xl font-bold">18</p>
        </div>
      </div>
    </div>
  )
}

function BookingsContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
      <ul className="space-y-4">
        <li className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold">House Cleaning</h3>
          <p>Date: May 15, 2023</p>
          <p>Time: 2:00 PM</p>
        </li>
        <li className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold">Car Wash</h3>
          <p>Date: May 18, 2023</p>
          <p>Time: 10:00 AM</p>
        </li>
      </ul>
    </div>
  )
}

function ProfileContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input type="text" id="name" className="w-full p-2 border rounded" defaultValue="John Doe" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input type="email" id="email" className="w-full p-2 border rounded" defaultValue="john@example.com" />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition duration-300">
          Update Profile
        </button>
      </form>
    </div>
  )
}

function PaymentsContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <ul className="space-y-4">
        <li className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold">House Cleaning</h3>
          <p>Date: May 10, 2023</p>
          <p>Amount: $80</p>
        </li>
        <li className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold">Car Wash</h3>
          <p>Date: May 5, 2023</p>
          <p>Amount: $40</p>
        </li>
      </ul>
    </div>
  )
}