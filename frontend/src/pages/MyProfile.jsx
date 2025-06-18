import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='max-w-lg flex flex-col gap-4 text-sm pt-6 font-[Inter]'>

            {/* --- Profile Image --- */}
            {isEdit
                ? <label htmlFor='image'>
                    <div className='inline-block relative cursor-pointer'>
                        <img className='w-36 h-36 object-cover rounded-full border-4 border-white shadow-md opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        <img className='w-8 absolute bottom-2 right-2' src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
                : <img className='w-36 h-36 object-cover rounded-full border-4 border-white shadow-md' src={userData.image} alt="" />
            }

            {/* --- Name --- */}
            {isEdit
                ? <input className='bg-gray-100 text-2xl font-semibold max-w-60 px-2 py-1 rounded' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                : <p className='font-semibold text-3xl text-[#1F1F1F] mt-4'>{userData.name}</p>
            }

            <hr className='bg-[#ADADAD] h-[1px] border-none my-3' />

            {/* --- Contact Info --- */}
            <div>
                <p className='text-gray-600 font-semibold underline text-sm mb-2'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-3 text-[#363636]'>
                    <p className='font-medium'>Email:</p>
                    <p className='text-blue-600'>{userData.email}</p>

                    <p className='font-medium'>Phone:</p>
                    {isEdit
                        ? <input className='bg-gray-100 px-2 py-1 rounded max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                        : <p className='text-blue-600'>{userData.phone}</p>
                    }

                    <p className='font-medium'>Address:</p>
                    {isEdit
                        ? <div className='flex flex-col gap-1'>
                            <input className='bg-gray-100 px-2 py-1 rounded' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                            <input className='bg-gray-100 px-2 py-1 rounded' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
                        </div>
                        : <p className='text-gray-600'>{userData.address.line1} <br /> {userData.address.line2}</p>
                    }
                </div>
            </div>

            {/* --- Basic Info --- */}
            <div>
                <p className='text-[#797979] font-semibold underline text-sm mt-4 mb-2'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-3 text-gray-700'>
                    <p className='font-medium'>Gender:</p>
                    {isEdit
                        ? <select className='max-w-24 bg-gray-100 px-2 py-1 rounded' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p>{userData.gender}</p>
                    }

                    <p className='font-medium'>Birthday:</p>
                    {isEdit
                        ? <input className='max-w-32 bg-gray-100 px-2 py-1 rounded' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                        : <p>{userData.dob}</p>
                    }
                </div>
            </div>

            {/* --- Save/Edit Button --- */}
            <div className='mt-8'>
                {isEdit
                    ? <button onClick={updateUserProfileData} className='border border-green-700 text-green-700 px-8 py-2 rounded-full hover:bg-green-600 hover:text-white transition-all'>Save Information</button>
                    : <button onClick={() => setIsEdit(true)} className='border border-green-700 text-green-700 px-8 py-2 rounded-full hover:bg-green-600 hover:text-white transition-all'>Edit</button>
                }
            </div>

        </div>
    ) : null
}

export default MyProfile
