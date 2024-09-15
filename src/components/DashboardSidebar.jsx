import React from 'react'
import { FaHome, FaCalendar, FaUser, FaCreditCard } from 'react-icons/fa'

export default function DashboardSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaHome },
    { id: 'bookings', label: 'Bookings', icon: FaCalendar },
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'payments', label: 'Payments', icon: FaCreditCard },
  ]

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-lg p-6">
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center p-2 rounded-lg transition duration-300 ${
                activeTab === tab.id ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
            >
              <tab.icon className="mr-2" />
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}