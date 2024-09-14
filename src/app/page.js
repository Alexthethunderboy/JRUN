'use client'
import HeroSection from '@/components/HeroSection'
import ServiceCard from '../components/ServiceCard'
import { FaSearch, FaStar, FaClock, FaShieldAlt } from 'react-icons/fa'
import TestimonialCard from '@/components/TestimonialCard'
import CleanerCard from '@/components/CleanerCard'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className=' text-white '>
      <HeroSection/>
      <section className=" mx-auto my-12 bg-[#1A1A1A] p-10">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard title="Office Cleaning" description="High-quality office cleaning services." backgroundImage="url('/office.png')" />
          <ServiceCard title="Post-Construction Cleaning" description="Thorough cleaning after construction work."
          backgroundImage="url('/post.png')" />
          <ServiceCard title="Janitorial Service" description="Reliable janitorial services." 
          backgroundImage="url('/janitor.png')"/>
          <ServiceCard title="Laundry" description="Professional laundry services." 
          backgroundImage="url('/laundry.png')"/>
          <ServiceCard title="Car Repair" description="Expert car repair services." 
          backgroundImage="url('/carr.png')"/>
          <ServiceCard title="Car Wash" description="Efficient and thorough car wash services." 
          backgroundImage="url('/carw.png')"/>
        </div>
      </section>
      <section className="py-20 ">
        <div className="container mx-auto p-4   ">
          <h2 className="text-3xl font-bold mb-8 text-center">How JRUN Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center rounded-lg border border-primary p-5">
              <div className="bg-primary  rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-2xl " />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Book</h3>
              <p>Select the date and time you'd like your professional to show up.</p>
            </div>
            <div className="text-center rounded-lg border border-primary p-5">
              <div className="bg-primary  rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Clean</h3>
              <p>A certified cleaner comes over and cleans your place.</p>
            </div>
            <div className="text-center rounded-lg border border-primary p-5">
              <div className="bg-primary  rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Relax</h3>
              <p>Sit back and relax. Enjoy your clean home!</p>
            </div>
          </div>
        </div>
      </section>
       {/* Features Section */}
       <section className=" py-20 px-2  bg-[#1A1A1A]">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose JRUN</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className=" p-6 rounded-lg shadow-xl">
              <FaShieldAlt className="text-4xl text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted Professionals</h3>
              <p>All cleaners are background-checked and rated by customers like you.</p>
            </div>
            <div className=" p-6 rounded-lg shadow-md">
              <FaClock className="text-4xl text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p>Book a cleaning for as early as tomorrow or schedule weeks in advance.</p>
            </div>
            <div className=" p-6 rounded-lg shadow-md">
              <FaStar className="text-4xl text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">100% Satisfaction Guarantee</h3>
              <p>If you're not satisfied with the cleaning, we'll make it right.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="JRUN has the best cleaning service I've ever used!" 
            name="John Doe" 
            image="/path/to/image.jpg" 
          />
          <TestimonialCard 
            quote="Highly professional and very reliable!" 
            name="Jane Smith" 
            image="/path/to/image.jpg" 
          />
          <TestimonialCard 
            quote="They made my post-construction cleaning a breeze!" 
            name="Michael Johnson" 
            image="/path/to/image.jpg" 
          />
        </div>
      </section>
      {/* Top Rated Cleaners */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Top Rated Cleaners</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <CleanerCard name="Alice Brown" rating={4.9} image="/images/cleaner1.jpg" />
            <CleanerCard name="Bob Green" rating={4.8} image="/images/cleaner2.jpg" />
            <CleanerCard name="Charlie White" rating={4.7} image="/images/cleaner3.jpg" />
            <CleanerCard name="Diana Black" rating={4.9} image="/images/cleaner4.jpg" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className=" text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready for a Cleaner Home?</h2>
          <Link href="/book" className="bg-primary  px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition duration-300">
            Book a Cleaner Now
          </Link>
        </div>
      </section>
    </main>
  )
}

