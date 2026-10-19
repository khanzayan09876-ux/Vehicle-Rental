import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Gauge,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserRound,
  Briefcase,
  ShieldCheck,
  Zap,
  Headphones,
  CarFront,
  ArrowRight,
} from "lucide-react";

const API = "http://localhost:3000";

// value wahi hain jo database mein hain
const roleOptions = [
  { value: "user", label: "User", icon: UserRound },
  { value: "employ", label: "Employ", icon: Briefcase },
  { value: "admin", label: "Admin", icon: ShieldCheck },
];

function Login() {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
    Role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handlechange(e) {
    const { name, value } = e.target;

    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  }

  function chooseRole(value) {
    setformdata((prev) => ({ ...prev, Role: value }));

    if (error) setError("");
  }

  async function handlelogin(e) {
    e.preventDefault();

    if (!formdata.email.trim() || !formdata.password || !formdata.Role) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const Response = await axios.post(
        `${API}/user/login`,
        {
          email: formdata.email.trim(),
          password: formdata.password,
          Role: formdata.Role,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login Response:", Response.data);

      if (Response.data.success === true) {
        navigate("/Profile");
      } else {
        setError(Response.data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);

      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email, password, and role."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-[#16213a] py-3.5 pl-12 pr-4 text-base text-white outline-none transition duration-300 placeholder:text-slate-500 focus:border-sky-500 focus:bg-[#1a2745] focus:ring-4 focus:ring-sky-500/10";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050b1c] px-4 py-10">
      {/* Background glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-[26rem] w-[26rem] rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      {/* Main card */}
      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-700/60 bg-[#0a1226]/95 shadow-[0_0_60px_rgba(37,99,235,0.25)] backdrop-blur md:grid-cols-2">

        {/* ================= LEFT: BRAND PANEL ================= */}
        <div className="relative hidden flex-col overflow-hidden bg-gradient-to-br from-[#04123a] via-[#061a52] to-[#030a1e] p-10 md:flex">
          <div className="absolute -left-10 top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-sky-500/20 blur-3xl" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 shadow-lg shadow-blue-500/40">
              <Gauge size={30} className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-wide text-white">
                VELOCITY
              </h2>
              <p className="text-xs font-medium text-sky-300">
                Drive &nbsp;•&nbsp; Explore &nbsp;•&nbsp; Freedom
              </p>
            </div>
          </div>

          {/* Headline */}
          <div className="relative z-10 mt-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/60 bg-cyan-400/10 px-3 py-1.5 text-[11px] font-extrabold tracking-wide text-cyan-300">
              <Zap size={14} />
              RENT ANYTIME, ANYWHERE
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white">
              Your next ride
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                is one login away
              </span>
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              Sign in to manage your reservations and rent luxury cars in
              just a few clicks.
            </p>
          </div>

          {/* Features */}
          <div className="relative z-10 mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/60 bg-blue-500/10">
                <ShieldCheck size={19} className="text-sky-400" />
              </div>
              <span className="text-sm font-semibold text-slate-200">
                Secure and reliable access
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/60 bg-blue-500/10">
                <CarFront size={19} className="text-sky-400" />
              </div>
              <span className="text-sm font-semibold text-slate-200">
                Premium fleet at your fingertips
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/60 bg-blue-500/10">
                <Headphones size={19} className="text-sky-400" />
              </div>
              <span className="text-sm font-semibold text-slate-200">
                24/7 VIP support
              </span>
            </div>
          </div>

          {/* Glowing platform */}
          <div className="relative z-10 mt-auto pt-10">
            <div className="mx-auto h-3 w-[80%] rounded-full bg-blue-500/80 shadow-[0_0_30px_rgba(59,130,246,0.9)]" />
          </div>
        </div>

        {/* ================= RIGHT: LOGIN FORM ================= */}
        <div className="p-6 sm:p-10">
          {/* Mobile logo (sirf chhoti screen par) */}
          <div className="mb-6 flex items-center gap-3 md:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600">
              <Gauge size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-black tracking-wide text-white">
              VELOCITY
            </h2>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Welcome Back!
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Sign in to continue to your account.
            </p>
          </div>

          <form onSubmit={handlelogin} noValidate>
            {/* Error box */}
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-xs font-extrabold text-rose-400">
                  !
                </span>
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formdata.email}
                  onChange={handlechange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formdata.password}
                  onChange={handlechange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-700/50 hover:text-sky-400"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="mb-7">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Role
              </label>

              <div className="grid grid-cols-3 gap-3">
                {roleOptions.map(({ value, label, icon: Icon }) => {
                  const active = formdata.Role === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => chooseRole(value)}
                      aria-pressed={active}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-extrabold transition duration-200 ${
                        active
                          ? "border-sky-500 bg-sky-500/15 text-sky-300 shadow-lg shadow-sky-500/10"
                          : "border-slate-700 bg-[#16213a] text-slate-400 hover:border-slate-500 hover:text-white"
                      }`}
                    >
                      <Icon size={20} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-4 font-extrabold text-white shadow-lg shadow-blue-600/30 transition duration-300 hover:-translate-y-0.5 hover:from-sky-400 hover:to-indigo-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Logging in...
                </>
              ) : (
                <>
                  Login to Account
                  <ArrowRight size={19} />
                </>
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/Registration"
              className="font-bold text-sky-400 transition hover:text-sky-300 hover:underline"
            >
              Create account
            </Link>
          </p>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-800 pt-5 text-xs font-medium text-slate-500">
            <ShieldCheck size={15} className="text-emerald-500" />
            Your account security matters
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;