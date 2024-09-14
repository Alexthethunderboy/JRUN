

export default function Login() {
  return (
    <div className="bg-secondary dark:bg-darkBg text-black dark:text-darkText min-h-screen">
    
      <main className="p-4">
      <section className="bg-secondary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Login</h1>
      </section>
      <section className="container mx-auto py-12">
        <div className="max-w-lg mx-auto">
          <form className="bg-white p-8 shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full p-2 mt-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input type="password" className="w-full p-2 mt-2 border rounded-lg" />
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg">Login</button>
          </form>
        </div>
      </section>
      </main>
      
    </div>
  )
}
