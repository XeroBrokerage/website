import React, { useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Umair Malik',
    role: 'Owner',
    image: '/Umair.svg',
    type: 'image/svg+xml',
    // alt: 'https://ui-avatars.com/api/?name=Umair+Malik',
    quote:
      "XeroBrokerage has made renting my house so easy, It's like the best thing that ever happened to me. I highly recommend this website to all people out there who want to rent out there house. We couldn't be happier with the outcome !!",
    rating: 5,
  },
  {
    name: 'Dr. Nitin Kumar Mishra',
    role: 'Tenant',
    image: '/nitin.svg',
    // alt: 'https://ui-avatars.com/api/?name=Nitin+Kumar+Mishra',
    quote:
      'Brilliant concept of connecting Owners & Tenants directly. I greatly appreciate the entire Nobroker team for the innovative idea. I would like to see this company grow into various ventures & make the entire system a broker free community.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Owner',
    image: '/james.svg',
    // alt: 'https://ui-avatars.com/api/?name=James+Wilson',
    quote:
      'I was really impressed with the response I got from XeroBroker. I was concerned it would take a long time, and I really needed to get my property rented out faster. Quick, informative & Reliable is what I feel after using XeroBrokerage.in',
    rating: 5,
  },
  {
    name: 'Neha Verma',
    role: 'Tenant',
    image: '/neha.svg',
    // alt: 'https://ui-avatars.com/api/?name=Neha+Verma',
    quote:
      "Unique concept excellent service. Nobroker helped me get a tenant in less than 24hours. If that's not fast I don't know what is.",
    rating: 5,
  },
  {
    name: 'Ishi Pathak',
    role: 'Owner',
    image: '/LongHairGirl.svg',
    // alt: 'https://ui-avatars.com/api/?name=Ishi+Pathak',
    quote:
      'One of the best website I have come across in the recent times to rent out a property online. I must say I am very pleased with the response I got from XeroBroker in getting the right tenant as per my preferences mentioned on the website. I am very satisfied & I have already recommended XeroBrokerage.in to all my friends. Good job Team.',
    rating: 4,
  },
  {
    name: 'Arjun Rao',
    role: 'Owner',
    image: '/arjun.svg',
    // alt: 'https://ui-avatars.com/api/?name=Arjun+Rao',
    quote:
      "I'm happy as the XeroBroker team took the initiative to post my property on there website. All I had to do was provide the information over the phone & send the photos through WhatsApp. I'm extremely happy as my property was rented out faster than I expected without me having to pay any brokerage whatsoever. Thanks to XeroBroker team",
    rating: 4,
  },
]

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className='py-20 bg-primary'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold text-textColor mb-6'>
            XeroBroker Reviews - Our Wall of Love
          </h2>
          <p className='text-lg text-gray-400 max-w-2xl mx-auto'>
            See What Our Valuable Customers Say
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='bg-secondary p-8 rounded-lg'
            >
              <img
                src={testimonial.image}
                alt={testimonial.alt ?? testimonial.name}
                className='w-20 h-20 rounded-full mx-auto mb-4'
                onError={e => {
                  e.target.onError = null
                  // e.target.src = testimonial.alt
                }}
              />
              <div className='text-yellow-400 flex justify-center mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className='text-textColor italic mb-4'>
                "{testimonial.quote}"
              </p>
              <h3 className='font-bold text-gray-600'>{testimonial.name}</h3>
              <p className='text-gray-500'>{testimonial.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
