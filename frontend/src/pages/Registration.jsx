



// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Registration() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = React.useState({
//     name: '',
//     email: '',
//     password: '',
//     phonenumber: '',
//     Role: ''
//   });

//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   }

//   async function handleSubmit() {
//     try {
//       const response = await axios.post('http://localhost:3000/user/registerCreate',
//          formData,{withCredentials:true}
//        );
      

//       console.log(response);

//       if (response.data.success === true) {
//         navigate('/login');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//       <div className="bg-white border-2 border-blue-500 rounded-xl p-8 w-96 shadow-lg">

//         <h2 className="text-2xl font-bold text-center mb-6 font-serif">
//           Registration
//         </h2>

        
//         <input
//           type="text"
//           name="name"
//           placeholder="Enter Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full mb-4 px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
//         />

        
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full mb-4 px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full mb-4 px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500"
//         />

     

        
//         <select
//           name="Role"
//           value={formData.Role}
//           onChange={handleChange}
//           className="w-full mb-6 px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600"
//         >
//           <option value="">Select Role</option>
//           <option value="employ">Employ</option>
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>

       
//         <button
//           className="w-full px-7 py-3 bg-blue-600 text-white font-semibold rounded-lg border-2 border-blue-800 hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
//           onClick={handleSubmit}
//         >
//           Register
//         </button>

//       </div>
//     </div>
//   );
// }

// export default Registration;



import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    Role: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.Role
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/user/registerCreate",
        formData,
        { withCredentials: true }
      );

      console.log("Registration Response:", response.data);

      if (response.data.success === true) {
        navigate("/login");
      } else {
        setError(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration Error:", error);

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#030b1b] text-white flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[130px]"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px]"></div>

      {/* Registration Container */}
      <div className="relative w-full max-w-6xl min-h-[650px] grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-blue-400/30 shadow-2xl shadow-blue-950/40">
        {/* Left Side */}
        <div className="relative flex flex-col justify-between p-8 sm:p-12 bg-gradient-to-br from-[#071a35] via-[#061329] to-[#020817] overflow-hidden">
          {/* Decorative Lights */}
          <div className="absolute top-20 -left-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-[90px]"></div>

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-16">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="w-9 h-9 text-white"
                >
                  <path d="M3 13l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 8l2 5v5h-2v-2H5v2H3v-5z" />
                  <path d="M5 13h14M7 16h.01M17 16h.01M6 9h12" />
                </svg>
              </div>

              <div>
                <h1 className="text-3xl font-extrabold tracking-wider">
                  STC
                </h1>
                <p className="text-xs tracking-[0.45em] text-cyan-300">
                  OPRATER
                </p>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Start Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                Journey Today
              </span>
            </h2>

            <p className="mt-6 max-w-md text-gray-300 text-base sm:text-lg leading-8">
              Create your account and explore a premium collection of luxury
              cars, sports cars, and more.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-xl">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">Premium Fleet</h3>
                  <p className="text-sm text-gray-400">
                    Discover your perfect vehicle
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-xl">
                  ♧
                </div>

                <div>
                  <h3 className="font-semibold">Safe & Secure</h3>
                  <p className="text-sm text-gray-400">
                    Your account, your journey
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-xl">
                  →
                </div>

                <div>
                  <h3 className="font-semibold">Easy Reservations</h3>
                  <p className="text-sm text-gray-400">
                    Your next adventure starts here
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-12 text-sm text-gray-500">
            Luxury <span className="mx-3 text-cyan-400">•</span>
            Performance <span className="mx-3 text-cyan-400">•</span>
            Freedom
          </p>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex items-center justify-center p-6 sm:p-12 bg-[#071225]/95 backdrop-blur-xl">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400 uppercase">
                Create Account
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                Registration
              </h2>

              <p className="mt-3 text-gray-400">
                Fill in your details to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className="w-full px-5 py-4 rounded-xl bg-[#101f36] border border-slate-700 text-white placeholder-gray-500 outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="w-full px-5 py-4 rounded-xl bg-[#101f36] border border-slate-700 text-white placeholder-gray-500 outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full px-5 py-4 rounded-xl bg-[#101f36] border border-slate-700 text-white placeholder-gray-500 outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Select Role
                </label>

                <select
                  name="Role"
                  value={formData.Role}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl bg-[#101f36] border border-slate-700 text-white outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                >
                  <option value="" className="bg-[#101f36]">
                    Select your role
                  </option>

                  <option value="employ" className="bg-[#101f36]">
                    Employ
                  </option>

                  <option value="user" className="bg-[#101f36]">
                    User
                  </option>

                  <option value="admin" className="bg-[#101f36]">
                    Admin
                  </option>
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-blue-600/20 transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}

                {!loading && (
                  <span className="inline-block ml-3 transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="ml-1 font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Login
              </button>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs text-gray-600">
              <div className="h-px flex-1 bg-slate-700"></div>
              <span>STC OPRATER</span>
              <div className="h-px flex-1 bg-slate-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;