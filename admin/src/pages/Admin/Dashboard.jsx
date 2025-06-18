import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>

      {/* ------- Stat Cards Section ------- */}
      <div className='flex flex-wrap gap-5'>
        {/* Doctor Count */}
        <div className='flex items-center gap-4 bg-white p-5 w-full sm:w-[250px] rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200'>
          <img className='w-12 h-12' src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className='text-2xl font-bold text-gray-700'>{dashData.doctors}</p>
            <p className='text-sm text-gray-400'>Doctors</p>
          </div>
        </div>

        {/* Appointments Count */}
        <div className='flex items-center gap-4 bg-white p-5 w-full sm:w-[250px] rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200'>
          <img className='w-12 h-12' src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className='text-2xl font-bold text-gray-700'>{dashData.appointments}</p>
            <p className='text-sm text-gray-400'>Appointments</p>
          </div>
        </div>

        {/* Patients Count */}
        <div className='flex items-center gap-4 bg-white p-5 w-full sm:w-[250px] rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200'>
          <img className='w-12 h-12' src={assets.patients_icon} alt="Patients" />
          <div>
            <p className='text-2xl font-bold text-gray-700'>{dashData.patients}</p>
            <p className='text-sm text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      {/* ------- Latest Bookings Section ------- */}
      <div className='bg-white mt-10 rounded-xl shadow-sm border'>

        {/* Header */}
        <div className='flex items-center gap-3 px-6 py-4 border-b bg-gray-50 rounded-t-xl'>
          <img src={assets.list_icon} alt="List Icon" className='w-5 h-5' />
          <p className='font-semibold text-gray-700'>Latest Bookings</p>
        </div>

        {/* List of Appointments */}
        <div className='divide-y'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div key={index} className='flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition'>

              {/* Doctor Image */}
              <img
                className='rounded-full w-12 h-12 object-cover'
                src={item.docData.image}
                alt="Doctor"
              />

              {/* Booking Details */}
              <div className='flex-1 text-sm'>
                <p className='font-medium text-gray-800'>{item.docData.name}</p>
                <p className='text-gray-500'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>

              {/* Booking Status or Cancel */}
              {
                item.cancelled ? (
                  <span className='text-xs font-semibold text-red-500'>Cancelled</span>
                ) : item.isCompleted ? (
                  <span className='text-xs font-semibold text-green-600'>Completed</span>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-8 cursor-pointer hover:scale-105 transition'
                    src={assets.cancel_icon}
                    alt="Cancel"
                    title='Cancel Appointment'
                  />
                )
              }

            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard
