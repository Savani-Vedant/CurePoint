import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='px-5 md:px-10 lg:px-20'>

      {/* Heading */}
      <div className='text-center text-3xl font-semibold pt-10 text-gray-800'>
        <p>CONTACT <span className='text-green-700'>US</span></p>
      </div>

      {/* Contact Section */}
      <div className='my-12 flex flex-col md:flex-row gap-12 items-center text-base mb-28'>

        {/* Image */}
        <img className='w-full md:max-w-[360px] rounded-xl shadow-md' src={assets.contact_image} alt="Contact CurePoint" />

        {/* Info */}
        <div className='flex flex-col justify-center items-start gap-6 text-gray-700'>

          {/* Office */}
          <div>
            <p className='font-semibold text-lg text-gray-800 mb-1'>OUR OFFICE</p>
            <p className='text-gray-600 leading-relaxed'>
              CurePoint HQ<br />
              54709 Willms Station, Suite 350<br />
              Washington, USA
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <p className='text-gray-600 leading-relaxed'>
              Phone: <a href="tel:+14155550132" className='text-blue-600'>+1 (415) 555-0132</a><br />
              Email: <a href="mailto:support@curepoint.com" className='text-blue-600'>support@curepoint.com</a>
            </p>
          </div>

          {/* Careers */}
          <div>
            <p className='font-semibold text-lg text-gray-800 mb-1'>CAREERS AT CUREPOINT</p>
            <p className='text-gray-600 leading-relaxed'>Join our mission to simplify healthcare through innovation. Learn more about our team and current openings.</p>
          </div>

          <button className='border border-green-600 px-6 py-3 text-sm rounded hover:bg-green-600 hover:text-white transition-all duration-300'>
            Explore Careers
          </button>
        </div>
      </div>

    </div>
  )
}

export default Contact
