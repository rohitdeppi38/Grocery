import React from 'react'

const Signup = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-bl from-green-50 to-amber-100 px-2'>

      <div className='w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 sm:p-8'>

        {/**heading  */}
        <h2 className='text-center text-2xl text-green-600 font-semibold mb-6'>Signup to sabzibazzar</h2>

        {/**information name user give*/}
        <div className='sm:flex sm:justify-between block'>
          <div className='flex flex-col mx-2'>
            <label htmlFor="firstName" className='mx-2 mb-1'>
              First Name
            </label>
            <input
              type="text"
              placeholder='First Name'
              className='focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4 min-w-0 flex-1' />
          </div>

          <div className='flex flex-col mx-2 gap-2'>
            <label
              htmlFor="lastName"
              className='mx-2'>
              Last Name
            </label>
            <input
              type="text"
              placeholder='Last Name'
              className='focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4 min-w-0 flex-1' />
          </div>
        </div>

        {/**date of birth */}

        <div>
          <div className='flex flex-col gap-2 mx-2 mt-2'>
            <label htmlFor="dateOfBirth" className='mx-2'>Date of Birth</label>
            <input
              type="date" max={new Date().toISOString().split('T')[0]}
              className='focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4 min-w-0 flex-1' />
          </div>
        </div>

        {/**address */}

        <div>
          <div className='flex flex-col gap-2 mx-2 mt-2'>
            <label htmlFor="user's address" className='mx-2'>Address</label>
            <input 
            type="text" 
            placeholder='Enter your Address....'
            className='focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 min-w-0 flex-1 px-4'/>
          </div>
        </div>

        {/**Email */}

        <div>
          <div className='flex flex-col gap-2 mx-2 mt-2'>
            <label htmlFor="Email" className='mx-2'>Email</label>
            <input type="email" 
            placeholder='rohit@gmail.com'
            className='focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4 min-w-0 flex-1'/>
          </div>
        </div>

        {/**password */}

        <div>
          <div className='flex flex-col gap-2 mx-2 mt-2'>
            <label htmlFor="password" className='mx-2 block '>Password</label>
            <input type="password" 
            placeholder='Enter password'
            className='focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 px-4 py-2 min-w-0 flex-1'/>
            <input type="password" 
            placeholder='Confirm password'
            className='focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 px-4 py-2 min-w-0 flex-1'/>
          </div>
        </div>

        {/* signup button */}
        <div>
          <div className='m-5'>
            <button className=' w-full text-center bg-green-600 py-2 cursor-pointer border rounded-lg hover:bg-green-700 text-white font-semibold'>
              Sign up
            </button>
          </div>
        </div>

        {/**underline border */}

        <div className='flex gap-2 items-center my-6'>
          <div className='flex-1 bg-gray-300 h-px'/>
          <span className='text-gray-500 '>OR</span>
          <div className='flex-1 bg-gray-300 h-px'/>
        </div>

        {/**continue with google  */}
        <div className='mx-5 flex justify-center'>
        <button className='w-full flex justify-center items-center cursor-pointer gap-2 border py-2 hover:bg-gray-100 duration-400 rounded-lg'>
        <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className='text-sm font-medium text-gray-700'>Continue with Google</span>
        </button>
        </div>
      </div>
    </div>
  )
}

export default Signup