'use client'
import React from 'react'
import {
  FiShield,
  FiUser,
  FiLock,
  FiInfo,
  FiCheckCircle,
  FiMail,
  FiDatabase,
  FiGlobe,
  FiBellOff,
} from 'react-icons/fi'

export default function PrivacyPolicy() {
  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header Section */}
        <header className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center'>
            <FiShield className='mr-3 text-blue-600' size={38} />
            Privacy Policy
          </h1>
          <p className='text-lg text-gray-900'>
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className='mt-6 bg-blue-500/10 p-4 rounded-lg'>
            <p className='text-gray-800 flex items-start'>
              <FiInfo className='mr-2 mt-1 flex-shrink-0' />
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
          </div>
        </header>

        {/* Introduction Section */}
        <section className='mb-12 bg-white p-6 rounded-lg shadow-sm'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Introduction
          </h2>
          <p className='text-gray-900 mb-4'>
            Zero Brokerage ("we", "us", or "our") operates the website and
            mobile application (the "Service"). This page informs you of our
            policies regarding the collection, use, and disclosure of personal
            data when you use our Service.
          </p>
          <p className='text-gray-900'>
            We use your data to provide and improve the Service. By using the
            Service, you agree to the collection and use of information in
            accordance with this policy.
          </p>
        </section>

        {/* Information Collection Section */}
        <section className='mb-12 bg-white p-6 rounded-lg shadow-sm'>
          <div className='flex items-center mb-6'>
            <div className='h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4'>
              <FiDatabase className='text-blue-600' size={20} />
            </div>
            <h2 className='text-2xl font-bold text-gray-900'>
              Information We Collect
            </h2>
          </div>

          <div className='space-y-6 pl-14'>
            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  1
                </span>
                Personal Identification Information
              </h3>
              <ul className='space-y-2 list-disc pl-5 text-gray-900'>
                <li>Name, email address, phone number</li>
                <li>Government-issued ID (for verification purposes)</li>
                <li>Profile picture (optional)</li>
                <li>Payment information (for premium services)</li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  2
                </span>
                Property Information
              </h3>
              <ul className='space-y-2 list-disc pl-5 text-gray-900'>
                <li>Property details (location, size, price, amenities)</li>
                <li>Property photos and videos</li>
                <li>Ownership documents (for verification)</li>
                <li>Property transaction history</li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  3
                </span>
                Data Usage
              </h3>
              <ul className='space-y-2 list-disc pl-5 text-gray-900'>
                <li>IP address, browser type and version</li>
                <li>Pages visited, time spent on pages</li>
                <li>Search queries and preferences</li>
                <li>Device information and operating system</li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  4
                </span>
                Cookies and Tracking Technologies
              </h3>
              <p className='text-gray-900 mb-2'>
                We use cookies and similar tracking technologies to track
                activity on our Service and hold certain information.
              </p>
              <ul className='space-y-2 list-disc pl-5 text-gray-900'>
                <li>Session cookies (for website functionality)</li>
                <li>Preference cookies (to remember your settings)</li>
                <li>Security cookies (for authentication)</li>
                <li>Analytics cookies (to improve our services)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Use of Data Section */}
        <section className='mb-12 bg-white p-6 rounded-lg shadow-sm'>
          <div className='flex items-center mb-6'>
            <div className='h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-4'>
              <FiUser className='text-purple-600' size={20} />
            </div>
            <h2 className='text-2xl font-bold text-gray-900'>
              How We Use Your Information
            </h2>
          </div>

          <div className='grid md:grid-cols-2 gap-6 pl-0'>
            <div className='bg-[#FCE277] p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-900 mb-2'>
                Service Provision
              </h4>
              <ul className='space-y-1 list-disc pl-5 text-gray-900'>
                <li>To create and manage your account</li>
                <li>To facilitate property listings and transactions</li>
                <li>To connect buyers and sellers</li>
                <li>To process payments for premium services</li>
              </ul>
            </div>

            <div className='bg-[#FCE277] p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-900 mb-2'>
                Communication
              </h4>
              <ul className='space-y-1 list-disc pl-5 text-gray-900'>
                <li>To respond to your inquiries</li>
                <li>To send service-related notices</li>
                <li>To provide customer support</li>
                <li>To send promotional offers (with consent)</li>
              </ul>
            </div>

            <div className='bg-[#FCE277] p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-900 mb-2'>
                Improvement & Analytics
              </h4>
              <ul className='space-y-1 list-disc pl-5 text-gray-900'>
                <li>To monitor service usage</li>
                <li>To detect and prevent fraud</li>
                <li>To improve our services</li>
                <li>To develop new features</li>
              </ul>
            </div>

            <div className='bg-[#FCE277] p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-900 mb-2'>
                Legal Compliance
              </h4>
              <ul className='space-y-1 list-disc pl-5 text-gray-900'>
                <li>To comply with legal obligations</li>
                <li>To enforce our terms and conditions</li>
                <li>To protect rights and property</li>
                <li>To prevent or investigate wrongdoing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Sharing Section */}
        <section className='mb-12 bg-white p-6 rounded-lg shadow-sm'>
          <div className='flex items-center mb-6'>
            <div className='h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-4'>
              <FiGlobe className='text-green-600' size={20} />
            </div>
            <h2 className='text-2xl font-bold text-gray-900'>
              Data Sharing and Disclosure
            </h2>
          </div>

          <div className='space-y-6 pl-14'>
            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  1
                </span>
                With Other Users
              </h3>
              <ul className='space-y-2 list-disc pl-5 text-gray-900'>
                <li>
                  Property sellers: Buyers will see your contact information
                  when they express interest in your property
                </li>
                <li>
                  Property buyers: Sellers will see your contact information
                  when you inquire about a property
                </li>
                <li>We never share financial information between users</li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  2
                </span>
                With Service Providers
              </h3>
              <ul className='space-y-2 list-disc pl-5 text-gray-900'>
                <li>Payment processors for transaction handling</li>
                <li>Cloud hosting providers for data storage</li>
                <li>Analytics providers for service improvement</li>
                <li>Marketing platforms (only with your consent)</li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  3
                </span>
                For Legal Reasons
              </h3>
              <ul className='space-y-2 list-disc pl-5 text-gray-900'>
                <li>To comply with legal obligations or court orders</li>
                <li>To protect against legal liability</li>
                <li>To investigate potential violations of our policies</li>
                <li>To protect the safety of our users or the public</li>
              </ul>
            </div>

            <div className='bg-blue-500/10 p-4  rounded-lg border-l-4 border-blue-400'>
              <h4 className='font-semibold text-gray-900 mb-2'>
                Important Note
              </h4>
              <p className='text-gray-900'>
                We do not sell your personal information to third parties for
                marketing purposes. Any sharing of data is strictly for
                providing and improving our services.
              </p>
            </div>
          </div>
        </section>

        {/* Data Protection Section */}
        <section className='mb-12 bg-white p-6 rounded-lg shadow-sm'>
          <div className='flex items-center mb-6'>
            <div className='h-10 w-10 bg-red-100 rounded-full flex items-center justify-center mr-4'>
              <FiLock className='text-red-600' size={20} />
            </div>
            <h2 className='text-2xl font-semibold text-gray-900'>
              Data Security
            </h2>
          </div>

          <div className='space-y-4 pl-14'>
            <div className='flex items-start'>
              <FiCheckCircle className='text-green-500 mr-3 mt-1 flex-shrink-0' />
              <p>
                We implement industry-standard security measures including
                encryption, firewalls, and secure servers
              </p>
            </div>
            <div className='flex items-start'>
              <FiCheckCircle className='text-green-500 mr-3 mt-1 flex-shrink-0' />
              <p>Regular security audits and vulnerability testing</p>
            </div>
            <div className='flex items-start'>
              <FiCheckCircle className='text-green-500 mr-3 mt-1 flex-shrink-0' />
              <p>Limited access to personal data on a need-to-know basis</p>
            </div>
            <div className='flex items-start'>
              <FiCheckCircle className='text-green-500 mr-3 mt-1 flex-shrink-0' />
              <p>Secure transmission of data using SSL/TLS technology</p>
            </div>
            <div className='flex items-start'>
              <FiCheckCircle className='text-green-500 mr-3 mt-1 flex-shrink-0' />
              <p>Regular employee training on data protection</p>
            </div>

            <div className='bg-blue-500/10 p-4 rounded-lg mt-4'>
              <p className='text-black'>
                While we strive to use commercially acceptable means to protect
                your personal data, we cannot guarantee its absolute security.
                Users should also take steps to protect their account
                information.
              </p>
            </div>
          </div>
        </section>

        {/* User Rights Section */}
        <section className='mb-12 bg-white p-6  rounded-lg shadow-sm'>
          <div className='flex items-center mb-6'>
            <div className='h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4'>
              <FiUser className='text-indigo-600' size={20} />
            </div>
            <h2 className='text-2xl font-bold text-gray-900'>
              Your Data Rights
            </h2>
          </div>

          <div className='grid md:grid-cols-2 gap-6 pl-2'>
            <div className='bg-[#FCE277] p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-900 mb-2'>
                Access & Correction
              </h4>
              <ul className='space-y-1 list-disc pl-5 text-gray-900'>
                <li>Right to access your personal information</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to update incomplete information</li>
              </ul>
            </div>

            <div className='bg-[#FCE277] p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-900 mb-2'>
                Deletion & Restriction
              </h4>
              <ul className='space-y-1 list-disc pl-5 text-gray-900'>
                <li>Right to request deletion of your data</li>
                <li>Right to restrict processing of your data</li>
                <li>Right to withdraw consent (where applicable)</li>
              </ul>
            </div>

            <div className='bg-[#FCE277] p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-900 mb-2'>
                Data Portability
              </h4>
              <ul className='space-y-1 list-disc pl-5 text-gray-900'>
                <li>Right to receive your data in a structured format</li>
                <li>Right to transfer data to another service</li>
              </ul>
            </div>

            <div className='bg-[#FCE277] p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-900 mb-2'>
                Objections & Complaints
              </h4>
              <ul className='space-y-1 list-disc pl-5 text-gray-900'>
                <li>Right to object to certain processing</li>
                <li>Right to lodge complaints with authorities</li>
              </ul>
            </div>
          </div>

          <div className='mt-6 pl-2'>
            <p className='text-gray-900'>
              To exercise any of these rights, please contact us at
              <b> xerobrokerage@gmail.com</b>. We may need to verify your
              identity before processing certain requests.
            </p>
          </div>
        </section>

        {/* Additional Policy Sections */}
        <section className='mb-12 bg-white p-6 rounded-lg shadow-sm'>
          <div className='flex items-center mb-6'>
            <div className='h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-4'>
              <FiInfo className='text-gray-900' size={20} />
            </div>
            <h2 className='text-2xl font-bold text-gray-900'>
              Additional Policy Information
            </h2>
          </div>

          <div className='space-y-6 pl-14'>
            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  1
                </span>
                Children's Policy
              </h3>
              <p className='text-gray-900'>
                Our Service does not address anyone under the age of 18
                ("Children"). We do not knowingly collect personally
                identifiable information from children. If you are a parent or
                guardian and you are aware that your child has provided us with
                personal data, please contact us.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  2
                </span>
                Third Party Links
              </h3>
              <p className='text-gray-900'>
                Our Service may contain links to other sites that are not
                operated by us. If you click on a third-party link, you will be
                directed to that third party's site. We strongly advise you to
                review the privacy policy of every site you visit.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  3
                </span>
                International Transfers
              </h3>
              <p className='text-gray-900'>
                Your information, including personal data, may be transferred to
                — and maintained on — computers located outside of your state,
                province, country or other governmental jurisdiction where the
                data protection laws may differ from those of your jurisdiction.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  4
                </span>
                Policy Changes
              </h3>
              <p className='text-gray-900'>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "last updated" date. You are advised
                to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-yellow-200 text-black font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  5
                </span>
                Do not track signals
              </h3>
              <p className='text-gray-900'>
                We do not currently respond to Do Not Track (DNT) signals as
                there is no industry standard for how to respond to these
                signals. We will revisit this policy if a standard is
                established.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        {/* <section className='bg-white p-8 rounded-lg text-center'>
          <h3 className='text-xl font-medium text-gray-900 mb-4'>Contact Us</h3>
          <p className='text-gray-900 mb-4'>
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <div className='space-y-2'>
            <p className='text-gray-900'>By email: privacy@zerobrokerage.com</p>
            <p className='text-gray-900'>By phone: +1 (800) 123-4567</p>
            <p className='text-gray-900'>
              By mail: 123 Real Estate Plaza, Mumbai, India 400001
            </p>
          </div>
        </section> */}
      </div>
    </div>
  )
}
