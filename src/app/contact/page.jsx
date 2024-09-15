
import ContactForm from '@/components/ContactForm'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 text-white bg-secondary">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-8">
              We'd love to hear from you! Whether you have a question about our services, need support, or want to partner with us, our team is ready to answer all your questions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhone className="text-primary mr-4 text-xl" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-primary mr-4 text-xl" />
                <span>contact@jrun.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-primary mr-4 text-xl" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}