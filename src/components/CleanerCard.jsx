import React from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

export default function CleanerCard({ name, rating, image }) {
  return (
    <div className=" rounded-lg shadow-lg p-6 text-center">
      <Image src={image} alt={name} width={150} height={150} className="rounded-full mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="flex items-center justify-center">
        <FaStar className="text-yellow-400 mr-1" />
        <span>{rating.toFixed(1)}</span>
      </div>
    </div>
  )
}