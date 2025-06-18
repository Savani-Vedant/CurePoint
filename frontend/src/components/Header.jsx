import React from 'react'
import { assets } from '../assets/assets'
import homeImage from '../assets/home.png'

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row bg-green-600 rounded-3xl px-6 md:px-12 lg:px-20 py-10 md:py-16 overflow-hidden">

            {/* --------- Left Section --------- */}
            <div className="md:w-1/2 flex flex-col justify-center gap-6 text-white">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    Book Appointments <br /> with Trusted Doctors
                </h1>
                <p className="text-base md:text-lg font-light">
                    Your health, your schedule — expert care is just a click away.
                </p>

                <div className="flex items-start gap-4">
                    <img className="w-24 sm:w-28" src={assets.group_profiles} alt="Profiles" />
                    <p className="text-sm md:text-base font-light">
                        Explore our verified and experienced doctors. <br className="hidden sm:block" />
                        Book appointments anytime, from anywhere.
                    </p>
                </div>

                <a
                    href="#speciality"
                    className="mt-4 inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300 shadow-sm"
                >
                    Book Appointment
                    <img className="w-3" src={assets.arrow_icon} alt="arrow" />
                </a>
            </div>

            {/* --------- Right Section --------- */}
            <div className="md:w-1/2 flex justify-center items-center mt-10 md:mt-0 relative">
                <img
                    className="w-[90%] md:w-full h-auto rounded-2xl drop-shadow-xl"
                    src={homeImage}
                    alt="Doctor illustration"
                />
            </div>
        </div>
    )
}

export default Header
