'use client'
import React from 'react'
// import myImage from '@assets/myImage.png';

const DevelopersPage = () => {
  const developers = [
    {
      id: 1,
      name: 'Yash Rawalkar',
      role: 'Frontend Developer',
      bio: 'Specialized in React and UI/UX design with 2 years of experience building responsive web applications. Passionate about creating intuitive user experiences and pixel-perfect interfaces.',
    image:"",
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'UI/UX'],
      links: {
        github: 'https://github.com/yrCodem',
        linkedin: 'https://www.linkedin.com/in/therealyash',
        // portfolio: 'https://johndoe.dev',
        email: 'yashrawalkar04@gmail.com',
      },
    },
    {
      id: 2,
      name: 'Umair Malik',
      role: 'Backend Developer',
      bio: 'Expert in Node.js and database architecture with a focus on scalable and secure backend systems. Has extensive experience in API design and cloud infrastructure management.',
    //   image: '/images/developer2.jpg', // Replace with your image path
      skills: ['Node.js', 'Python', 'AWS', 'Database Design'],
      links: {
        github: 'https://github.com/janesmith',
        linkedin: 'https://linkedin.com/in/janesmith',
        portfolio: 'https://janesmith.dev',
        email: 'jane@example.com',
      },
    },
  ]

  return (
    <div className='min-h-screen bg-yellow-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-bold text-yellow-800 mb-3'>
            Meet Our <span className='text-yellow-600'>Development Team</span>
          </h1>
          <p className='text-lg sm:text-xl text-yellow-700 max-w-2xl mx-auto'>
            The talented minds behind your digital experience
          </p>
          <div className='mt-6 flex justify-center'>
            <div className='w-20 h-1 bg-yellow-400 rounded-full'></div>
          </div>
        </div>

        {/* Developers Grid */}
        <div className='grid gap-8 md:grid-cols-2 lg:gap-12'>
          {developers.map(developer => (
            <div
              key={developer.id}
              className='bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300'
            >
              {/* Developer Header with Image */}
              <div className='relative h-48 bg-gradient-to-r from-yellow-400 to-yellow-300'>
                {developer.image ? (
                  <div className='absolute -bottom-12 left-1/2 transform -translate-x-1/2'>
                    <img
                      className='h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-white shadow-lg'
                      src={developer.image}
                      alt={developer.name}
                      onError={e => {
                        e.target.onerror = null
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"
                      }}
                    />
                  </div>
                ) : (
                  <div className='absolute -bottom-12 left-1/2 transform -translate-x-1/2 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-yellow-100 border-4 border-white shadow-lg flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-12 w-12 text-yellow-600'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Developer Content */}
              <div className='pt-16 pb-8 px-6 sm:px-8 text-center'>
                <h2 className='text-2xl font-bold text-gray-800'>
                  {developer.name}
                </h2>
                <p className='text-yellow-600 font-semibold mb-4'>
                  {developer.role}
                </p>

                <p className='text-gray-600 mb-6 leading-relaxed'>
                  {developer.bio}
                </p>

                {/* Skills */}
                <div className='mb-6'>
                  <h4 className='text-sm font-semibold text-yellow-700 uppercase tracking-wider mb-3'>
                    Expertise
                  </h4>
                  <div className='flex flex-wrap justify-center gap-2'>
                    {developer.skills.map((skill, index) => (
                      <span
                        key={index}
                        className='px-3 py-1 bg-yellow-100 text-yellow-800 text-xs sm:text-sm rounded-full'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Links */}
                <div className='flex justify-center space-x-3'>
                  {developer.links.github && (
                    <a
                      href={developer.links.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='h-10 w-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors'
                      aria-label='GitHub'
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                        />
                      </svg>
                    </a>
                  )}

                  {developer.links.linkedin && (
                    <a
                      href={developer.links.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors'
                      aria-label='LinkedIn'
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                      </svg>
                    </a>
                  )}

                  {developer.links.portfolio && (
                    <a
                      href={developer.links.portfolio}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='h-10 w-10 flex items-center justify-center bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors'
                      aria-label='Portfolio'
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2 19h-4v-4h4v4zm-1.5-5.5v-.75c0-.413-.338-.75-.752-.75-.113 0-.22.026-.316.074-.049-.266-.158-.506-.316-.691-.222-.262-.526-.433-.872-.433-.414 0-.752.336-.752.75v.75h-1.5v-.75c0-1.24 1.01-2.25 2.25-2.25.601 0 1.152.238 1.562.625.409-.387.96-.625 1.561-.625 1.24 0 2.25 1.01 2.25 2.25v2.25h-1.5v-.75zm6.5-2.25c0 1.24-1.01 2.25-2.25 2.25-.601 0-1.152-.238-1.562-.625-.409.387-.96.625-1.561.625-1.24 0-2.25-1.01-2.25-2.25v-3.25h7.5v3.25z' />
                      </svg>
                    </a>
                  )}

                  {developer.links.email && (
                    <a
                      href={`mailto:${developer.links.email}`}
                      className='h-10 w-10 flex items-center justify-center bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors'
                      aria-label='Email'
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z' />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Callout */}
        <div className='mt-16 bg-yellow-100 border-l-4 border-yellow-400 p-6 rounded-lg'>
          <div className='flex items-start'>
            <div className='flex-shrink-0'>
              <svg
                className='h-8 w-8 text-yellow-600'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div className='ml-4'>
              <h3 className='text-lg font-medium text-yellow-800'>
                Our Team Philosophy
              </h3>
              <div className='mt-2 text-sm text-yellow-700'>
                <p>
                  We believe in collaboration, innovation, and creating
                  solutions that matter. Our developers combine technical
                  expertise with creative problem-solving to deliver exceptional
                  digital experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DevelopersPage
