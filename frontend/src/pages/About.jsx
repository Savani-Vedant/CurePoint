import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-5 md:px-10 lg:px-20'>

      {/* ---- About Us Heading ---- */}
      <div className='text-center text-3xl font-semibold pt-10 text-gray-800'>
        <p>ABOUT <span className='text-green-700'>CUREPOINT</span></p>
      </div>

      {/* ---- About Content ---- */}
      <div className='my-12 flex flex-col md:flex-row gap-12 items-center'>
        <img className='w-full md:max-w-[380px] rounded-xl shadow-md' src={assets.about_image} alt="About CurePoint" />
        <div className='flex flex-col justify-center gap-6 md:w-3/5 text-base text-gray-700 leading-relaxed'>
          <p>
            Welcome to <span className='font-medium text-green-700'>CurePoint</span> — your trusted healthcare companion.
            We’re on a mission to simplify doctor appointments, manage health records, and make care accessible at your fingertips.
          </p>
          <p>
            With a patient-first mindset, CurePoint integrates technology and healthcare to make your wellness journey efficient, secure, and stress-free.
            Whether you're booking your first consultation or managing ongoing care, we ensure a smooth experience throughout.
          </p>
          <div>
            <p className='font-semibold text-lg text-gray-800'>Our Vision</p>
            <p>
              At CurePoint, our vision is to build a digital bridge between patients and healthcare professionals.
              We aim to redefine how healthcare is accessed — fast, transparent, and centered around your well-being.
            </p>
          </div>
        </div>
      </div>

      {/* ---- Why Choose Us ---- */}
      <div className='text-xl font-semibold text-center mb-8 text-gray-800'>
        <p>WHY <span className='text-green-700'>CHOOSE US</span></p>
      </div>

      {/* ---- Features ---- */}
      <div className='flex flex-col md:flex-row gap-6 mb-20'>

        <div className='border rounded-xl px-8 md:px-10 py-8 flex flex-col gap-4 text-gray-700 bg-white hover:bg-green-600 hover:text-white transition duration-300 shadow-sm cursor-pointer'>
          <p className='text-lg font-semibold'>EFFICIENCY</p>
          <p className='text-sm'>Streamlined appointment booking with minimal wait time and instant confirmation.</p>
        </div>

        <div className='border rounded-xl px-8 md:px-10 py-8 flex flex-col gap-4 text-gray-700 bg-white hover:bg-green-600 hover:text-white transition duration-300 shadow-sm cursor-pointer'>
          <p className='text-lg font-semibold'>CONVENIENCE</p>
          <p className='text-sm'>Easily connect with qualified, verified doctors near you — anytime, anywhere.</p>
        </div>

        <div className='border rounded-xl px-8 md:px-10 py-8 flex flex-col gap-4 text-gray-700 bg-white hover:bg-green-600 hover:text-white transition duration-300 shadow-sm cursor-pointer'>
          <p className='text-lg font-semibold'>PERSONALIZATION</p>
          <p className='text-sm'>Smart health tracking, reminders, and tailored insights to keep your health on track.</p>
        </div>

      </div>

    </div>
  )
}

export default About
