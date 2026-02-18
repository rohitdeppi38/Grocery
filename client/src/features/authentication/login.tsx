const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-amber-100 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
          Login to SABJI BAZZAR
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="rohit@gmail.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            name="email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            name="password"
          />
        </div>

        {/* Forgot password */}
        <div className="flex justify-end mb-4">
          <button className="text-sm text-green-700 hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Login */}
        <button className="w-full border flex items-center justify-center gap-3 py-2 rounded-lg hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        {/* Signup */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?
          <span className="text-green-700 font-semibold cursor-pointer hover:underline ml-1">
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
