import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {
        headers: { dToken }
      })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='m-5'>
      <div className='flex flex-col lg:flex-row gap-8'>

        {/* ----------- Left: Large Image ----------- */}
        <div className='lg:w-1/3 w-full'>
          <img
            className='w-full h-auto rounded-2xl border shadow-lg object-cover max-h-[500px]'
            src={profileData.image}
            alt="Doctor"
          />
        </div>

        {/* ----------- Right: Doctor Info ----------- */}
        <div className='lg:w-2/3 w-full border border-gray-100 rounded-2xl bg-white shadow-md p-6'>

          <h2 className='text-2xl font-bold text-gray-800'>{profileData.name}</h2>
          <div className='flex items-center gap-2 mt-2 text-gray-600 text-sm'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <span className='py-0.5 px-2 border text-xs rounded-full border-gray-300'>{profileData.experience}</span>
          </div>

          {/* About Section */}
          <div className='mt-6'>
            <p className='font-medium text-sm text-gray-700 mb-1'>About:</p>
            {
              isEdit
                ? <textarea
                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                    className='w-full border p-2 rounded-md text-sm outline-green-600'
                    rows={6}
                    value={profileData.about}
                  />
                : <p className='text-gray-600 text-sm leading-relaxed'>{profileData.about}</p>
            }
          </div>

          {/* Fees */}
          <div className='mt-5 text-sm text-gray-700'>
            <p className='font-medium mb-1'>Appointment Fee:</p>
            {
              isEdit
                ? <input
                    type='number'
                    className='border p-1 rounded-md w-32 outline-green-600'
                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                    value={profileData.fees}
                  />
                : <span className='text-gray-800'>{currency} {profileData.fees}</span>
            }
          </div>

          {/* Address */}
          <div className='mt-5 text-sm text-gray-700'>
            <p className='font-medium mb-1'>Address:</p>
            <div className='flex flex-col gap-1 text-gray-600'>
              {
                isEdit ? (
                  <>
                    <input
                      type='text'
                      className='border p-1 rounded-md outline-green-600'
                      placeholder='Address line 1'
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value }
                      }))}
                      value={profileData.address.line1}
                    />
                    <input
                      type='text'
                      className='border p-1 rounded-md outline-green-600'
                      placeholder='Address line 2'
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value }
                      }))}
                      value={profileData.address.line2}
                    />
                  </>
                ) : (
                  <>
                    <p>{profileData.address.line1}</p>
                    <p>{profileData.address.line2}</p>
                  </>
                )
              }
            </div>
          </div>

          {/* Availability */}
          <div className='mt-4 flex items-center gap-2'>
            <input
              type="checkbox"
              className='accent-green-600'
              onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
              checked={profileData.available}
            />
            <label className='text-sm text-gray-700'>Available</label>
          </div>

          {/* Buttons */}
          <div className='mt-6'>
            {
              isEdit
                ? <button
                    onClick={updateProfile}
                    className='px-5 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition'
                  >
                    Save
                  </button>
                : <button
                    onClick={() => setIsEdit(prev => !prev)}
                    className='px-5 py-2 border border-green-600 text-green-600 rounded-full text-sm hover:bg-green-600 hover:text-white transition'
                  >
                    Edit
                  </button>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
