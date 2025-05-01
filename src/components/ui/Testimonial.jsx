import React, { useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Umair Malik',
    role: 'Owner',
    image: '/Umair.svg',
    quote:
      "XeroBrokerage has made renting my house so easy, It's like the best thing that ever happened to me. I highly recommend this website to all people out there who want to rent out there house. We couldn't be happier with the outcome !!",
    rating: 5,
  },
  {
    id: 2,
    name: 'Dr. Nitin Kumar Mishra',
    role: 'Tenant',
    image: '/nitin.svg',
    quote:
      'Brilliant concept of connecting Owners & Tenants directly. I greatly appreciate the entire XeroBroker team for the innovative idea. I would like to see this company grow into various ventures & make the entire system a broker free community.',
    rating: 5,
  },
  {
    id: 3,
    name: 'James Wilson',
    role: 'Owner',
    image: '/james.svg',
    quote:
      'I was really impressed with the response I got from XeroBroker. I was concerned it would take a long time, and I really needed to get my property rented out faster. Quick, informative & Reliable is what I feel after using XeroBrokerage.in. The process was seamless and the customer support was excellent throughout my experience.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Neha Verma',
    role: 'Tenant',
    image: '/neha.svg',
    quote:
      "Unique concept excellent service. XeroBroker helped me get a tenant in less than 24hours. If that's not fast I don't know what is. The platform is incredibly user-friendly and saved me so much time compared to traditional methods.",
    rating: 5,
  },
  {
    id: 5,
    name: 'Ishi Pathak',
    role: 'Owner',
    image: '/LongHairGirl.svg',
    quote:
      'One of the best website I have come across in the recent times to rent out a property online. I must say I am very pleased with the response I got from XeroBroker in getting the right tenant as per my preferences mentioned on the website. I am very satisfied & I have already recommended XeroBrokerage.in to all my friends. Good job Team.',
    rating: 4,
  },
  {
    id: 6,
    name: 'Arjun Rao',
    role: 'Owner',
    image: '/arjun.svg',
    quote:
      "I'm happy as the XeroBroker team took the initiative to post my property on their website. All I had to do was provide the information over the phone & send the photos through WhatsApp. I'm extremely happy as my property was rented out faster than I expected without me having to pay any brokerage whatsoever. Thanks to XeroBroker team",
    rating: 4,
  },
]

const TestimonialCard = ({ testimonial, isExpanded, toggleExpand }) => {
  const maxChars = 120
  const needsTruncation = testimonial.quote.length > maxChars
  const displayText = isExpanded
    ? testimonial.quote
    : needsTruncation
    ? testimonial.quote.substring(0, maxChars) + '...'
    : testimonial.quote

  return (
    <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col h-full'>
      {/* Quote Text */}
      <div className='flex-grow'>
        <p className='text-gray-700 text-base mb-4'>"{displayText}"</p>
      </div>

      {/* User Info and See More */}
      <div className='mt-auto'>
        {needsTruncation && (
          <button
            onClick={toggleExpand}
            className='text-blue-600 font-semibold hover:cursor-pointer text-sm hover:underline focus:outline-none mb-4 block'
          >
            {isExpanded ? 'Read Less' : 'See More...'}
          </button>
        )}

        <div className='flex items-center pt-4 border-t border-gray-100'>
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className='w-12 h-12 rounded-full object-cover mr-4'
            onError={e => {
              e.target.onerror = null
              e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(
                /\s+/g,
                '+',
              )}&background=random`
            }}
          />
          <div>
            <h3 className='font-bold text-gray-800 text-lg'>
              {testimonial.name}
            </h3>
            <p className='text-gray-500 text-sm'>{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Testimonials = () => {
  const [expandedCards, setExpandedCards] = useState({})

  const toggleExpand = id => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <section className='py-16 '>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>
            XeroBroker Reviews
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            See What Our Customers Say About Us
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className='hidden md:grid grid-cols-1 md:grid-cols-3 gap-6'>
          {testimonials.map(testimonial => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className='h-full'
            >
              <TestimonialCard
                testimonial={testimonial}
                isExpanded={!!expandedCards[testimonial.id]}
                toggleExpand={() => toggleExpand(testimonial.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll View */}
        <div className='md:hidden overflow-x-auto pb-4'>
          <div className='flex space-x-4 w-max px-4'>
            {testimonials.map(testimonial => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className='w-80 flex-shrink-0 h-full'
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isExpanded={!!expandedCards[testimonial.id]}
                  toggleExpand={() => toggleExpand(testimonial.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
