import Image from 'next/image';

export default function TestimonialCard({ quote, name, image }) {
  return (
    <div className="p-10 rounded-lg shadow-md text-center border border-primary">
      <div className="relative w-16 h-16 mx-auto mb-4">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <p className="italic">"{quote}"</p>
      <h4 className="mt-4 font-bold">{name}</h4>
    </div>
  );
}