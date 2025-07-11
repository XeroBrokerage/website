import React from 'react'
import LookingFor from '@/components/ui/LookingFor'
import { TextRotate } from '@/components/ui/text-rotate'
import { LayoutGroup, motion } from 'motion/react'

const Hero = () => {
  return (
    <div className=' poppins-bold text-3xl md:text-5xl flex flex-col gap-4 items-center justify-center font-light overflow-hidden p-6 sm:p-10 md:p-12'>
      <LayoutGroup>
        <motion.div
          className='flex whitespace-pre flex-col md:flex-row justify-center items-center lg:gap-0 gap-2'
          layout
        >
          <motion.span
            className='pt-0.5 sm:pt-1 md:pt-2 text-gray-700 '
            layout
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          >
            Find Your Perfect{' '}
          </motion.span>
          <TextRotate
            texts={[
              'Property',
              'Home',
              'Hostel',
              'Site',
              'Office',
              'Apartment',
              'Villa',
            ]}
            mainClassName='text-white px-2 sm:px-2 md:px-3 bg-yellow-400 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center items-center rounded-lg w-fit'
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName='overflow-hidden pb-0.5 sm:pb-1 md:pb-1'
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.div>
        <p className='text-center sm:text-xl text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-sans'>
          Explore verified properties across Chhattisgarh — with zero brokerage.
        </p>
      </LayoutGroup>
    </div>
  )
}

export default Hero
