export default function TestimonialCard({ quote, name, image }) {
    return (
      <div className="p-10 rounded-lg shadow-md text-center  border border-primary">
        <img src={image} alt={name} className="w-16 h-16 rounded-full mx-auto mb-4"/>
        <p className="italic">"{quote}"</p>
        <h4 className="mt-4 font-bold">{name}</h4>
      </div>
    );
  }
  