import React from 'react'
import Image from 'next/image'
import about from '../../assets/about.png'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 text-white bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">JRUN</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image src={about} alt="JRUN Team" width={600} height={400} className="rounded-lg shadow-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              At JRUN, we're revolutionizing the cleaning industry by connecting skilled, independent cleaners with customers who need their services. Our platform makes it easy to find, book, and manage cleaning services, providing a seamless experience for both customers and cleaners.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc list-inside mb-4">
              <li>Quality Service</li>
              <li>Reliability</li>
              <li>Customer Satisfaction</li>
              <li>Fair Pricing</li>
              <li>Cleaner Empowerment</li>
            </ul>
            <p>
              Founded in 2023, JRUN has quickly become a leading platform for on-demand cleaning services. We're dedicated to continually improving our platform and expanding our offerings to meet the evolving needs of our community.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Jane Doe', role: 'CEO', image: '/lady1.png' },
              { name: 'John Smith', role: 'CTO', image: '/man.png' },
              { name: 'Alice Johnson', role: 'COO', image: '/lady2.png' },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <Image src={member.image} alt={member.name} width={200} height={200} className="rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}