
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function Dashboard() {
  return (
    <div className="bg-secondary dark:bg-darkBg text-black dark:text-darkText min-h-screen">
      
      <main className="p-4">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

        {/* Booking Requests Section */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Booking Requests</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4">
            <h3 className="text-xl font-bold">Job Title</h3>
            <p>Date: 2024-08-04</p>
            <p>Time: 10:00 AM</p>
            <p>Location: Example Location</p>
            <div className="flex space-x-4 mt-2">
              <button className="bg-green-500 text-white p-2 rounded-md flex items-center">
                <FaCheck className="mr-2" />
                Accept
              </button>
              <button className="bg-red-500 text-white p-2 rounded-md flex items-center">
                <FaTimes className="mr-2" />
                Reject
              </button>
            </div>
          </div>
        </section>

        {/* Payments Section */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Payments</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4">
            <h3 className="text-xl font-bold">Job Title</h3>
            <p>Date: 2024-08-04</p>
            <p>Amount: $100</p>
            <p>Status: Pending</p>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Feedback</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4">
            <h3 className="text-xl font-bold">Job Title</h3>
            <p>Feedback: Great job!</p>
          </div>
        </section>
      </main>
      
    </div>
  )
}
