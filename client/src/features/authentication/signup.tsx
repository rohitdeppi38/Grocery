import React, { HtmlHTMLAttributes, useState } from 'react'

import { useAppDispatch } from '../../app/hooks'
import { signupUser } from './Auth/authThunk'
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFromData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [submitted, setSubmitted] = useState(false);
  const isValidate = (formData.password === formData.confirmPassword && formData.password.length >= 8 && formData.confirmPassword.length >= 8)

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromData((prev: FormData) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValidate) return;

    const result = await dispatch(
      signupUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob,
        address: formData.address,
        email: formData.email,
        password: formData.password,
      })
    );
    
    if(signupUser.rejected.match(result)){
      if(result.payload==="User already exists"){
        console.log("navigate to login");
        navigate('/user/api/auth/login')
      }
      else{
        console.error("signup failed :",result.payload);
      }
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-bl from-green-50 to-amber-100 px-2">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 sm:p-8"
      >
        <h2 className="text-center text-2xl text-green-600 font-semibold mb-6">
          Signup to <span>sabzi</span>bazzar
        </h2>

        {/* First & Last Name */}
        <div className="sm:flex sm:justify-between block">
          <div className="flex flex-col mx-2">
            <label className="mx-2 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4"
              required
            />
          </div>

          <div className="flex flex-col mx-2">
            <label className="mx-2 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4"
              required
            />
          </div>
        </div>

        {/* DOB */}
        <div className="flex flex-col mx-2 mt-3">
          <label className="mx-2">Date of Birth</label>
          <input
            type="date"
            name="dob"
            max={new Date().toISOString().split("T")[0]}
            value={formData.dob}
            onChange={handleChange}
            className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4"
            required
          />
        </div>

        {/* Address */}
        <div className="flex flex-col mx-2 mt-3">
          <label className="mx-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address..."
            className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col mx-2 mt-3">
          <label className="mx-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="rohit@gmail.com"
            className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col mx-2 mt-3 gap-2">
          <label className="mx-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4"
            required
          />
        </div>

        {/* Validation Error */}
        {submitted && !isValidate && (
          <p className="text-red-500 text-center mt-2">
            Passwords must match and be at least 8 characters long
          </p>
        )}

        {/* Submit */}
        <div className="m-5">
          <button
            type="submit"
            className="w-full bg-green-600 py-2 border rounded-lg hover:bg-green-700 text-white font-semibold"
          >
            Sign up
          </button>
        </div>
        {/**underline border */}
        <div className='flex gap-2 items-center my-6'>
          <div className='flex-1 bg-gray-300 h-px' />
          <span className='text-gray-500 '>OR</span>
          <div className='flex-1 bg-gray-300 h-px' />
        </div>

        {/**continue with google */}
        <div className='mx-5 flex justify-center'>
          <button className='w-full flex justify-center items-center cursor-pointer gap-2 border py-2 hover:bg-gray-100 duration-400 rounded-lg'>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
            <span className='text-sm font-medium text-gray-700'>Continue with Google</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup