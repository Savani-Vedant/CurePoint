import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl mx-auto m-5'>

      <p className='mb-4 text-xl font-semibold text-gray-700'>All Appointments</p>

      <div className='bg-white border rounded-lg shadow-sm text-sm max-h-[80vh] overflow-y-auto'>
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 py-4 px-6 border-b bg-gray-50 font-medium text-gray-600'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 items-center py-4 px-6 border-b hover:bg-gray-50 transition-all text-gray-600'
          >
            {/* Index */}
            <p className='hidden sm:block'>{index + 1}</p>

            {/* Patient Info */}
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-9 h-9 rounded-full object-cover border' alt={item.userData.name} />
              <p>{item.userData.name}</p>
            </div>

            {/* Payment */}
            <div>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${item.payment ? 'border-green-500 text-green-600 bg-green-50' : 'border-yellow-500 text-yellow-600 bg-yellow-50'}`}>
                {item.payment ? 'Online' : 'Cash'}
              </span>
            </div>

            {/* Age */}
            <p className='hidden sm:block'>{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p className='text-sm'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Fees */}
            <p className='text-sm'>{currency}{item.amount}</p>

            {/* Actions */}
            {item.cancelled ? (
              <p className='text-red-500 text-xs font-semibold'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-600 text-xs font-semibold'>Completed</p>
            ) : (
              <div className='flex gap-2'>
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className='w-8 cursor-pointer hover:scale-105 transition-transform'
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className='w-8 cursor-pointer hover:scale-105 transition-transform'
                  src={assets.tick_icon}
                  alt="Complete"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments
