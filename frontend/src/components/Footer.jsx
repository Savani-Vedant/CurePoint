import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* ---- About CurePoint ---- */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="CurePoint Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            CurePoint is your trusted platform to connect with experienced doctors and healthcare professionals. 
            We simplify appointment booking, ensuring timely care for you and your family. Your health is our mission.
          </p>
        </div>

        {/* ---- Company Links ---- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Find a Doctor</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* ---- Contact Info ---- */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>📞 +91-98765-43210</li>
            <li>📧 support@curepoint.in</li>
            <li>🏢 CurePoint HealthTech Pvt. Ltd.</li>
            <li>📍 Mumbai, India</li>
          </ul>
        </div>

      </div>

      {/* ---- Footer Bottom ---- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center text-gray-500'>
          © 2024 CurePoint.in – All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
