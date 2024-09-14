export default function ServiceCard({ title, description, backgroundImage }) {
  return (
    <div className="relative pb-20 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 items-center justify-center p-10 bg-cover bg-no-repeat hover:bg-center " style={{ backgroundImage: backgroundImage }}>
       {/* Overlay for opacity */}
     <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative mb-10">
        <h3 className="text-xl font-bold">{title}</h3>
      <p>{description}</p>
      </div>
      
    </div>
  );
}
