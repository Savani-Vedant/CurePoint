import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626] px-4 md:px-10">
      <h1 className="text-3xl font-semibold">Top-Ranked Specialists</h1>
      <p className="sm:w-1/2 text-center text-sm text-gray-600">
        Consult with professionals known for their trusted advice and successful outcomes.
      </p>

      <div className="w-full grid grid-cols-auto gap-6 pt-6">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className="cursor-pointer border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-[1.02]"
          >
            <div className="bg-[#EAEFFF] w-full h-60 flex items-end justify-center overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="object-contain h-full"
              />
            </div>
            <div className="p-4 space-y-1">
              <div className={`flex items-center gap-2 text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-500'}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-600' : 'bg-red-500'}`}></span>
                <span>{item.available ? 'Available' : 'Not Available'}</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors')
          scrollTo(0, 0)
        }}
        className="mt-10 bg-primary text-white px-8 py-3 rounded-full shadow hover:bg-blue-700 transition-all duration-300"
      >
        View More Doctors
      </button>
    </div>
  )
}

export default TopDoctors
