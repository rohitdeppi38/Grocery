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
              className='focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4 min-w-0 flex-1'/>
          </div>
        </div>

        {/**date of birth */}

        <div>
          <div className='flex flex-col gap-2 mx-2 mt-2'>
            <label htmlFor="dateOfBirth" className='mx-2'>Date of Birth</label>
            <input 
            type="date" max={new Date().toISOString().split('T')[0]}
            className='focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg border mx-2 py-2 px-4 min-w-0 flex-1'/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup