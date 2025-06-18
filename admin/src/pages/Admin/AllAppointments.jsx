import React, { useEffect, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-6'>

      <p className='mb-4 text-xl font-semibold text-gray-800'>All Appointments</p>

      <div className='bg-white border rounded-lg text-sm max-h-[80vh] overflow-y-auto shadow-sm'>

        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 font-medium text-gray-600'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments List */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50 transition'
          >
            {/* Index */}
            <p className='max-sm:hidden font-medium text-gray-500'>{index + 1}</p>

            {/* Patient */}
            <div className='flex items-center gap-2'>
              <img
                src={item.userData.image}
                alt='Patient'
                className='w-8 h-8 rounded-full object-cover'
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Doctor */}
            <div className='flex items-center gap-2'>
              <img
                src={item.docData.image}
                alt='Doctor'
                className='w-8 h-8 rounded-full bg-gray-200 object-cover'
              />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p>{currency}{item.amount}</p>

            {/* Status or Action */}
            {item.cancelled ? (
              <p className='text-red-500 text-xs font-semibold'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-600 text-xs font-semibold'>Completed</p>
            ) : (
              <img
                src={assets.cancel_icon}
                alt='Cancel'
                title='Cancel Appointment'
                onClick={() => cancelAppointment(item._id)}
                className='w-8 h-8 cursor-pointer hover:scale-105 transition-transform'
              />
            )}
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllAppointments
