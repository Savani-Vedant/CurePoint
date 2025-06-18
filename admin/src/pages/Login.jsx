import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong!')
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center px-4'>
      <div className='flex flex-col gap-4 w-full max-w-md p-8 border rounded-2xl shadow-lg bg-white'>

        <h2 className='text-3xl font-semibold text-center text-gray-800'>
          {state} <span className='text-green-600'>Login</span>
        </h2>

        {/* Email Field */}
        <div className='w-full'>
          <label className='text-sm text-gray-600'>Email</label>
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full mt-1 p-2 border rounded-md outline-green-600'
            placeholder='Enter your email'
          />
        </div>

        {/* Password Field */}
        <div className='w-full'>
          <label className='text-sm text-gray-600'>Password</label>
          <input
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full mt-1 p-2 border rounded-md outline-green-600'
            placeholder='Enter your password'
          />
        </div>

        {/* Login Button */}
        <button
          type='submit'
          className='bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-md text-base'
        >
          Login
        </button>

        {/* Toggle Login Role */}
        <p className='text-sm text-center text-gray-600'>
          {
            state === 'Admin'
              ? <>Doctor Login? <span onClick={() => setState('Doctor')} className='text-green-600 cursor-pointer underline'>Click here</span></>
              : <>Admin Login? <span onClick={() => setState('Admin')} className='text-green-600 cursor-pointer underline'>Click here</span></>
          }
        </p>

      </div>
    </form>
  )
}

export default Login
