
import { FaSearch } from 'react-icons/fa'

export default function Categories() {
  return (
    <div className="bg-secondary  text-white min-h-screen">
      
      <main className="p-4">
        <section className="bg-cover bg-center h-64" style={{ backgroundImage: "url('/background.jpg')", opacity: 0.8 }}>
          <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center text-white p-4">
            <div className="flex w-full max-w-md">
              <input type="text" placeholder="Enter your location" className="w-1/2 p-4 rounded-l-md" />
              <input type="text" placeholder="Enter Category" className="w-1/2 p-4" />
              <button className="bg-primary text-white p-4 rounded-r-md flex items-center justify-center">
                <FaSearch size={20} />
              </button>
            </div>
          </div>
        </section>
        <section className="p-4 ">
          <h2 className="text-4xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ServiceCard title="Cleaning" services={["Office cleaning", "Post-construction cleaning", "Janitorial service", "School cleaning", "After party cleaning"]} backgroundImage="url('/office.png')" />
            <ServiceCard title="Laundry" services={[]} backgroundImage="url('/laundry.png')"/>
            <ServiceCard title="Car Repair" services={[]} backgroundImage="url('/carr.png')"/>
            <ServiceCard title="Car Wash" services={[]} backgroundImage="url('/carw.png')"/>
          </div>
        </section>
        <section className=" text-white p-4 text-center">
          <button className="bg-primary text-white font-semibold py-4 px-6 rounded-full">Book Now</button>
        </section>
      </main>
    
    </div>
  )
}



const ServiceCard = ({ title, services, backgroundImage }) => (
  <div
    className="relative bg-cover bg-center text-white p-4 rounded-md shadow-md overflow-hidden"
    style={{ backgroundImage: backgroundImage }}
  >
    {/* Overlay for opacity */}
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

    {/* Content */}
    <div className="relative z-10">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <ul>
        {services.map((service, index) => (
          <li key={index} className="mb-2">
            {service}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

