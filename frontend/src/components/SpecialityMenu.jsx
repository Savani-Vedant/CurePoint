import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-6 py-16 px-5 text-[#262626] bg-white'>
            {/* Title */}
            <h1 className='text-3xl font-bold text-center'>Select Your Specialist</h1>
            <p className='max-w-xl text-center text-gray-500 text-sm'>
                Explore our wide range of trusted specialists and book your consultation with ease and trust.
            </p>

            {/* Scrollable Specialities */}
            <div className='flex w-full overflow-x-auto sm:justify-center gap-6 pt-6 scrollbar-hide'>
                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        key={index}
                        className='flex flex-col items-center justify-center min-w-[100px] sm:min-w-[140px] p-4 bg-[#F7F8FF] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 cursor-pointer'
                    >
                        <img className='w-12 sm:w-16 mb-3' src={item.image} alt={item.speciality} />
                        <p className='text-xs sm:text-sm font-medium text-gray-700 text-center'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
