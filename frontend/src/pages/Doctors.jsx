import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  return (
    <div className="px-5 md:px-10 lg:px-20 py-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Find Your Doctor</h2>
      <p className="text-gray-600 mb-6">Browse through top-rated specialists and book appointments in just a few clicks.</p>

      {/* Filter Toggle Button (Mobile) */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-2 px-4 border rounded-full text-sm transition-all ${showFilter ? 'bg-green-600 text-white' : 'text-gray-700 border-gray-400'}`}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">

        {/* Filters */}
        <div className={`${showFilter ? 'flex' : 'hidden sm:flex'} flex-col gap-3 sm:w-1/4`}>
          {specialities.map((spec, i) => (
            <button
              key={i}
              onClick={() =>
                speciality === spec
                  ? navigate('/doctors')
                  : navigate(`/doctors/${spec}`)
              }
              className={`text-left px-4 py-2 rounded-full border text-sm transition-all ${
                speciality === spec
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`)
                scrollTo(0, 0)
              }}
              className="border border-gray-200 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Doctor Image */}
              <div className="bg-[#EAEFFF] w-full h-60 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.image}
                  alt={item.name}
                />
              </div>

              {/* Doctor Info */}
              <div className="p-4 space-y-2">
                <div className={`flex items-center gap-2 text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-500'}`}>
                  <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-600' : 'bg-red-500'}`}></span>
                  <span>{item.available ? 'Available' : 'Not Available'}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
