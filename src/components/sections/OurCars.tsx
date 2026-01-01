import React, { useEffect, useState } from 'react'

type Car = {
  id: string
  images?: string[]
}

export function OurCars() {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    fetch('/data/company_cars.json')
      .then((r) => r.ok ? r.json() : Promise.reject(r.statusText))
      .then((data) => {
        if (Array.isArray(data)) setCars(data)
        else setCars([])
      })
      .catch((err) => {
        console.error('Failed to load company cars JSON:', err)
        setCars([])
      })
  }, [])

  return (
    <section id="our-cars" className="py-8 container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Our Cars</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cars.length === 0 && (
          <div className="text-gray-500">No cars available.</div>
        )}

        {cars.map((car) =>
          (car.images || []).map((img, i) => {
            const src = img.startsWith('/') ? img : `/lovable-uploads/${encodeURIComponent(img)}`
            return (
              <img
                key={`${car.id}-${i}`}
                src={src}
                alt={`Car ${car.id}`}
                loading="lazy"
                className="w-full h-40 object-cover rounded-md shadow-sm"
              />
            )
          })
        )}
      </div>
    </section>
  )
}

export default OurCars
