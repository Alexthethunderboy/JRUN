

export default function Contact() {
  return (
    <div className="bg-black  text-black min-h-screen w-screen">
    
    <section className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="text-lg mt-4">We'd love to hear from you</p>
      </section>
      <section className="container mx-auto py-12">
        <div className="max-w-lg mx-auto">
          <form className="bg-white p-8 shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input type="text" className="w-full p-2 mt-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full p-2 mt-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Subject</label>
              <input type="text" className="w-full p-2 mt-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea className="w-full p-2 mt-2 border rounded-lg"></textarea>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg">Send</button>
          </form>
        </div>
      </section>
          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508654!2d144.9559283153192!3d-37.817209979751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d5f209c60!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1601652950172!5m2!1sen!2sau"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              className="rounded-md shadow-md"
            ></iframe>
          </div>
    
    </div>
  )
}
