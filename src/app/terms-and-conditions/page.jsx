'use client'
import React from 'react'
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiShield,
  FiFileText,
} from 'react-icons/fi'

export default function TermsAndConditions() {
  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header Section */}
        <header className='text-center mb-12'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center'>
            <FiFileText className='mr-3 text-blue-600' />
            Terms and Conditions
          </h1>
          <p className='text-lg text-gray-600'>
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className='mt-6 bg-blue-50 p-4 rounded-lg'>
            <p className='text-blue-800 flex items-start'>
              <FiInfo className='mr-2 mt-1 flex-shrink-0' />
              By using our platform, you agree to these terms and conditions.
              Please read them carefully.
            </p>
          </div>
        </header>

        {/* General Terms Section */}
        <section className='mb-12 bg-white p-6 rounded-lg shadow-sm'>
          <div className='flex items-center mb-6'>
            <div className='h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4'>
              <FiShield className='text-blue-600' size={20} />
            </div>
            <h2 className='text-2xl font-bold text-gray-800'>
              General Terms for All Users
            </h2>
          </div>

          <div className='space-y-4 pl-14'>
            <div className='flex items-start'>
              <FiAlertCircle className='text-blue-500 mr-3 mt-1 flex-shrink-0' />
              <p>We act solely as a platform connecting buyers and sellers</p>
            </div>
            <div className='flex items-start'>
              <FiAlertCircle className='text-blue-500 mr-3 mt-1 flex-shrink-0' />
              <p>All users must verify property details independently</p>
            </div>
            <div className='flex items-start'>
              <FiAlertCircle className='text-blue-500 mr-3 mt-1 flex-shrink-0' />
              <p>
                Any misuse of the platform will result in account suspension
              </p>
            </div>
            <div className='flex items-start'>
              <FiAlertCircle className='text-blue-500 mr-3 mt-1 flex-shrink-0' />
              <p>Users must be at least 18 years old to use our services</p>
            </div>
            <div className='flex items-start'>
              <FiAlertCircle className='text-blue-500 mr-3 mt-1 flex-shrink-0' />
              <p>We're not responsible for any frauds or misrepresentations</p>
            </div>
          </div>
        </section>

        {/* For Sellers Section */}
        <section className='mb-12 bg-white p-6 rounded-lg shadow-sm'>
          <div className='flex items-center mb-6'>
            <div className='h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-4'>
              <FiCheckCircle className='text-purple-600' size={20} />
            </div>
            <h2 className='text-2xl font-bold text-gray-800'>
              For Property Sellers
            </h2>
          </div>

          <div className='space-y-8 pl-14'>
            <div>
              <h3 className='text-xl font-semibold text-gray-700 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-blue-500 text-white rounded-full font-extrabold flex items-center justify-center mr-3 text-sm'>
                  1
                </span>
                Listing Your Property
              </h3>
              <ul className='space-y-3 list-disc pl-5 text-gray-600'>
                <li>You can list your property for free on our platform</li>
                <li>
                  All property details must be accurate and truthful (location,
                  price, amenities, etc.)
                </li>
                <li>
                  Photos/videos must be authentic and representative of the
                  actual property
                </li>
                <li>
                  You must own or have legal authority to sell/rent the listed
                  property
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-700 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-blue-500 text-white font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  2
                </span>
                Verification Process
              </h3>
              <ul className='space-y-3 list-disc pl-5 text-gray-600'>
                <li>
                  XeroBrokerage may verify your listing through calls, site
                  visits, or document checks.
                </li>
                <li>
                  Fake or misleading listings will be removed without notice.
                </li>
                <li>We may require proof of ownership or authorization.</li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-700 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-blue-500 text-white font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  3
                </span>
                Service Plans
              </h3>
              <ul className='space-y-3 list-disc pl-5 text-gray-600'>
                <li>Basic listings are completely free of charge</li>
                <li>
                  Premium plans offer enhanced visibility and additional
                  services
                </li>
                <li>
                  All payments for premium services are non-refundable unless
                  explicitly stated otherwise
                </li>
                <li>
                  Auto-renewal terms will be clearly stated for subscription
                  services
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-700 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-blue-500 font-extrabold text-white rounded-full flex items-center justify-center mr-3 text-sm'>
                  4
                </span>
                Your Responsibilities
              </h3>
              <ul className='space-y-3 list-disc pl-5 text-gray-600'>
                <li>
                  You are solely responsible for all communications and
                  negotiations with potential buyers
                </li>
                <li>
                  Zero Brokerage does not guarantee the sale of your property
                </li>
                <li>
                  Any spamming or misleading communications through our platform
                  is strictly prohibited
                </li>
                <li>
                  You must promptly update listing status when property is
                  sold/rented
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* For Buyers Section */}
        <section className='mb-12 bg-white p-6 rounded-lg shadow-sm'>
          <div className='flex items-center mb-6'>
            <div className='h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-4'>
              <FiCheckCircle className='text-green-600' size={20} />
            </div>
            <h2 className='text-2xl font-bold text-gray-800'>
              For Property Buyers
            </h2>
          </div>

          <div className='space-y-8 pl-14'>
            <div>
              <h3 className='text-xl font-semibold text-gray-700 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-green-500 text-white font-extrabold rounded-full flex items-center justify-center mr-3 text-sm'>
                  1
                </span>
                Property Search & Contact
              </h3>
              <ul className='space-y-3 list-disc pl-5 text-gray-600'>
                <li>You can search and view properties for free</li>
                <li>
                  Contact information access may require a subscription plan
                </li>
                <li>
                  All communications should be professional and respectful
                </li>
                <li>
                  You agree to be contacted by sellers/agents for properties you
                  express interest in
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-700 mb-3 flex items-center'>
                <span className='w-6 font-extrabold h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-sm'>
                  2
                </span>
                Information Accuracy
              </h3>
              <ul className='space-y-3 list-disc pl-5 text-gray-600'>
                <li>You must provide accurate contact and personal details</li>
                <li>
                  Any misuse or harassment will result in immediate account
                  suspension
                </li>
                <li>
                  You consent to verification of your identity if required
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-700 mb-3 flex items-center'>
                <span className='w-6 font-extrabold h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-sm'>
                  3
                </span>
                Property Verification
              </h3>
              <ul className='space-y-3 list-disc pl-5 text-gray-600'>
                <li>
                  Site visits can be arranged through our platform or
                  independently
                </li>
                <li>
                  You are responsible for verifying all property details before
                  proceeding
                </li>
                <li>
                  We recommend conducting thorough due diligence on any property
                </li>
                <li>
                  Verify all legal documents, encumbrances, and approvals before
                  purchase
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-700 mb-3 flex items-center'>
                <span className='w-6 font-extrabold h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-sm'>
                  4
                </span>
                Transaction Process
              </h3>
              <ul className='space-y-3 list-disc pl-5 text-gray-600'>
                <li>
                  Zero Brokerage is not liable for the property's legal status
                  or condition
                </li>
                <li>All transaction decisions are your sole responsibility</li>
                <li>
                  Most paid services are non-refundable unless a guarantee is
                  explicitly offered
                </li>
                <li>
                  We recommend using registered legal professionals for
                  documentation
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Terms Section */}
        <section className='mb-12 bg-blue-50 p-8 rounded-lg'>
          <div className='flex items-center mb-6'>
            <div className='h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4'>
              <FiAlertCircle className='text-blue-600' size={20} />
            </div>
            <h2 className='text-2xl font-bold text-gray-800'>
              Common Terms for All Parties
            </h2>
          </div>

          <div className='space-y-6 pl-4 pr-4'>
            <div className='bg-white p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-700 mb-2'>
                Prohibited Activities
              </h4>
              <p className='text-gray-600'>
                Fake listings, misleading information, or use of automated
                tools/bots is strictly forbidden. This includes but is not
                limited to:
              </p>
              <ul className='list-disc pl-5 mt-2 space-y-1 text-gray-600'>
                <li>Posting fake or duplicate listings</li>
                <li>Using the platform for any illegal activities</li>
                <li>Scraping or copying content without permission</li>
                <li>Circumventing our fee structure</li>
              </ul>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-700 mb-2'>
                Account Termination
              </h4>
              <p className='text-gray-600'>
                Zero Brokerage reserves the right to suspend accounts for any
                violations of these terms. We may terminate accounts that:
              </p>
              <ul className='list-disc pl-5 mt-2 space-y-1 text-gray-600'>
                <li>Violate our terms of service</li>
                <li>Engage in fraudulent activities</li>
                <li>Create multiple accounts for the same user</li>
                <li>Show suspicious behavior patterns</li>
              </ul>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-700 mb-2'>Liability</h4>
              <p className='text-gray-600'>
                We are not liable for any disputes, losses, or damages resulting
                from transactions conducted through our platform. This includes:
              </p>
              <ul className='list-disc pl-5 mt-2 space-y-1 text-gray-600'>
                <li>Property condition issues</li>
                <li>Financial losses from transactions</li>
                <li>Legal disputes between buyers and sellers</li>
                <li>Misrepresentation by either party</li>
              </ul>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <h4 className='  font-semibold text-gray-700 mb-2'>
                Dispute Resolution
              </h4>
              <p className='text-gray-600'>
                Any disputes will be resolved through arbitration governed by
                Indian law. The process includes:
              </p>
              <ul className='list-disc pl-5 mt-2 space-y-1 text-gray-600'>
                <li>Mandatory mediation before arbitration</li>
                <li>Arbitration in Mumbai under Indian Arbitration Act</li>
                <li>
                  Each party bears their own costs unless determined otherwise
                </li>
              </ul>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-700 mb-2'>
                Changes to Terms
              </h4>
              <p className='text-gray-600'>
                We may update these terms periodically, and continued use of our
                services constitutes acceptance. We will:
              </p>
              <ul className='list-disc pl-5 mt-2 space-y-1 text-gray-600'>
                <li>
                  Notify users of significant changes via email or platform
                  notifications
                </li>
                <li>
                  Provide a 30-day grace period for major changes when possible
                </li>
                <li>Maintain version history of all terms changes</li>
              </ul>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-700 mb-2'>
                Privacy Policy
              </h4>
              <p className='text-gray-600'>
                Your use of our services is also governed by our Privacy Policy,
                which covers:
              </p>
              <ul className='list-disc pl-5 mt-2 space-y-1 text-gray-600'>
                <li>Data collection and usage</li>
                <li>Cookie policy</li>
                <li>Information sharing with third parties</li>
                <li>Your rights regarding personal data</li>
              </ul>
            </div>

            <div className='bg-white p-4 rounded-lg'>
              <h4 className='font-semibold text-gray-700 mb-2'>
                Intellectual Property
              </h4>
              <p className='text-gray-600'>
                All content on our platform is protected by intellectual
                property laws:
              </p>
              <ul className='list-disc pl-5 mt-2 space-y-1 text-gray-600'>
                <li>
                  You grant us license to use your content for platform
                  operations
                </li>
                <li>
                  Our trademarks and logos may not be used without permission
                </li>
                <li>User content remains your responsibility</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Acceptance Section */}
        <section className='bg-white p-6 rounded-lg shadow-sm text-center'>
          <h3 className='text-xl font-bold text-gray-700 mb-4'>
            Acceptance of Terms
          </h3>
          <p className='text-gray-600 mb-4'>
            By using our platform, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions.
          </p>
          <p className='text-gray-600'>
            If you do not agree with any part of these terms, you must not use
            our services.
          </p>
        </section>
      </div>
    </div>
  )
}

{
  /* Confirmation */
}
{
  /* <div className='mt-12 pt-6 border-t border-gray-200 text-center'>
        <p className='text-gray-600 mb-6'>
          By using our platform, you acknowledge that you have read, understood,
          and agreed to these Terms & Conditions.
        </p>
        <Link
          href='#'
          className='inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md'
        >
          I Understand - Return to Home
        </Link>
      </div> */
}
//     </div>
//   )
// }
