

export default function Register() {
  return (
    <div className="bg-secondary dark:bg-darkBg text-black dark:text-darkText min-h-screen">
    
      <main className="p-4">
      <section className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Register</h1>
        <p className="text-lg mt-4">Join us as an Independent Worker or Online User</p>
      </section>
      <section className="container mx-auto py-12">
        <div className="max-w-lg mx-auto">
          <div className="bg-white p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Register as Independent Worker</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" className="w-full p-2 mt-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input type="tel" className="w-full p-2 mt-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" className="w-full p-2 mt-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" className="w-full p-2 mt-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input type="password" className="w-full p-2 mt-2 border rounded-lg" />
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg">Register</button>
            </form>
          </div>
          <div className="bg-white p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Register as Online User</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" className="w-full p-2 mt-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input type="tel" className="w-full p-2 mt-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" className="w-full p-2 mt-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" className="w-full p-2 mt-2 border rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input type="password" className="w-full p-2 mt-2 border rounded-lg" />
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg">Register</button>
            </form>
          </div>
        </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-md">
              <IndependentWorkerForm />
            </div>
      </section>
      </main>
     
    </div>
  )
}

const IndependentWorkerForm = () => (
  <form>
    <div className="mb-4">
      <label className="block text-lg font-bold mb-2">Name</label>
      <input type="text" className="w-full p-4 rounded-md" />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-bold mb-2">Phone number</label>
      <input type="text" className="w-full p-4 rounded-md" />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-bold mb-2">Email</label>
      <input type="email" className="w-full p-4 rounded-md" />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-bold mb-2">Number of Team</label>
      <input type="number" className="w-full p-4 rounded-md" />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-bold mb-2">Valid ID</label>
      <input type="text" className="w-full p-4 rounded-md" />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-bold mb-2">Address</label>
      <input type="text" className="w-full p-4 rounded-md" />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-bold mb-2">Guarantors</label>
      <textarea className="w-full p-4 rounded-md" rows="4"></textarea>
    </div>
    <div className="mb-4">
      <label className="block text-lg font-bold mb-2">Password</label>
      <input type="password" className="w-full p-4 rounded-md" />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-bold mb-2">Confirm Password</label>
      <input type="password" className="w-full p-4 rounded-md" />
    </div>
    <button type="submit" className="bg-primary text-white p-4 rounded-md w-full">Register</button>
  </form>
)
