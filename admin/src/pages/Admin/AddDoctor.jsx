import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl } = useContext(AppContext)
  const { aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docImg) return toast.error('Image Not Selected')

      const formData = new FormData();
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
        headers: { aToken }
      })

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setFees('')
        setAbout('')
        setSpeciality('General physician')
        setDegree('')
        setAddress1('')
        setAddress2('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-4 text-2xl font-semibold text-gray-800">Add Doctor</p>

      <div className="bg-white border rounded-xl px-6 py-8 shadow max-w-5xl w-full max-h-[80vh] overflow-y-auto">

        {/* Upload Section */}
        <div className="flex items-center gap-4 mb-8">
          <label htmlFor="doc-img">
            <img
              className="w-20 h-20 object-cover rounded-full border-2 border-dashed border-gray-300 cursor-pointer hover:opacity-80 transition"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload doctor"
            />
          </label>
          <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} />
          <p className="text-sm text-gray-500">Click to upload<br />doctor picture</p>
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col lg:flex-row gap-10 text-gray-700">

          {/* Column 1 */}
          <div className="flex-1 flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span>Name</span>
              <input type="text" className="border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} placeholder="Doctor's Name" required />
            </label>

            <label className="flex flex-col gap-1">
              <span>Email</span>
              <input type="email" className="border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Doctor's Email" required />
            </label>

            <label className="flex flex-col gap-1">
              <span>Password</span>
              <input type="password" className="border rounded px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            </label>

            <label className="flex flex-col gap-1">
              <span>Experience</span>
              <select className="border rounded px-3 py-2" value={experience} onChange={e => setExperience(e.target.value)}>
                {["1 Year", "2 Year", "3 Year", "4 Year", "5 Year", "6 Year", "8 Year", "9 Year", "10 Year"].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span>Fees</span>
              <input type="number" className="border rounded px-3 py-2" value={fees} onChange={e => setFees(e.target.value)} placeholder="Consultation Fees" required />
            </label>
          </div>

          {/* Column 2 */}
          <div className="flex-1 flex flex-col gap-4">

            <label className="flex flex-col gap-1">
              <span>Speciality</span>
              <select className="border rounded px-3 py-2" value={speciality} onChange={e => setSpeciality(e.target.value)}>
                {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span>Degree</span>
              <input type="text" className="border rounded px-3 py-2" value={degree} onChange={e => setDegree(e.target.value)} placeholder="Degree" required />
            </label>

            <label className="flex flex-col gap-1">
              <span>Address Line 1</span>
              <input type="text" className="border rounded px-3 py-2" value={address1} onChange={e => setAddress1(e.target.value)} placeholder="Address 1" required />
            </label>

            <label className="flex flex-col gap-1">
              <span>Address Line 2</span>
              <input type="text" className="border rounded px-3 py-2" value={address2} onChange={e => setAddress2(e.target.value)} placeholder="Address 2" required />
            </label>

          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <label className="flex flex-col gap-2">
            <span>About Doctor</span>
            <textarea rows={5} className="border rounded px-4 py-2 w-full" value={about} onChange={e => setAbout(e.target.value)} placeholder="Write about the doctor..." />
          </label>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-full transition-all">
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
