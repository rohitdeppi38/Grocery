import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "./Auth/authThunk";

const Login = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await dispatch(loginUser({email,password}));
    
    if(loginUser.rejected.match(result)){
      if(result.payload==="User not found"){
        navigate("/user/api/auth/signup");
      }else{
        console.error("login error :",result.payload);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-amber-100 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

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
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;