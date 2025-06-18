import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5'>

      {/* --- Summary Cards --- */}
      <div className='flex flex-wrap gap-4'>
        <SummaryCard icon={assets.earning_icon} title="Earnings" value={`${currency} ${dashData.earnings}`} />
        <SummaryCard icon={assets.appointments_icon} title="Appointments" value={dashData.appointments} />
        <SummaryCard icon={assets.patients_icon} title="Patients" value={dashData.patients} />
      </div>

      {/* --- Latest Bookings --- */}
      <div className='bg-white mt-10 rounded shadow-sm'>
        <div className='flex items-center gap-2.5 px-6 py-4 border-b'>
          <img src={assets.list_icon} alt="List" className='w-5 h-5' />
          <p className='font-semibold text-gray-700 text-lg'>Latest Bookings</p>
        </div>

        <div className='divide-y'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div key={index} className='flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-all'>
              <img className='rounded-full w-10 h-10 object-cover border' src={item.userData.image} alt={item.userData.name} />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-500'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>

              {item.cancelled ? (
                <span className='text-red-500 text-xs font-semibold'>Cancelled</span>
              ) : item.isCompleted ? (
                <span className='text-green-600 text-xs font-semibold'>Completed</span>
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

    </div>
  )
}

const SummaryCard = ({ icon, value, title }) => (
  <div className='flex items-center gap-3 bg-white p-5 min-w-52 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all'>
    <img className='w-12 h-12' src={icon} alt={title} />
    <div>
      <p className='text-lg font-semibold text-gray-700'>{value}</p>
      <p className='text-sm text-gray-500'>{title}</p>
    </div>
  </div>
)

export default DoctorDashboard
