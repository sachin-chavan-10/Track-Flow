import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Signup() {
  const { signup, loading, error, setError, user } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPw, setShowPw] = useState(false);

  if (user) {
    const routes = { admin: '/admin', manager: '/manager', employee: '/employee' };
    return <Navigate to={routes[user.role] || '/employee'} replace />;
  }

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    signup(form);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side */}
      <div className="hidden md:block w-1/2 h-screen">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="Signup visual"
        />
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col justify-center"
        >
          <h2 className="text-4xl font-semibold text-gray-900">Sign up</h2>
          <p className="text-sm text-gray-500 mt-3">
            Create your account to get started
          </p>

          <div className="flex items-center gap-4 w-full my-8">
            <div className="w-full h-px bg-gray-300"></div>
            <p className="text-nowrap text-sm text-gray-500">sign up with email</p>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

          {error && (
            <div className="w-full mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10ZM10 12.5C5.85786 12.5 2.5 15.8579 2.5 20H17.5C17.5 15.8579 14.1421 12.5 10 12.5Z"
                fill="#6B7280"
              />
            </svg>

            <input
              name="name"
              type="text"
              value={form.name}
              onChange={change}
              placeholder="Full name"
              className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full pr-4"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center mt-6 w-full border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-3">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={change}
              placeholder="Email id"
              className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full pr-4"
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center mt-6 w-full border border-gray-300 h-12 rounded-full overflow-hidden pl-6 pr-4 gap-3">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>

            <input
              name="password"
              type={showPw ? 'text' : 'password'}
              value={form.password}
              onChange={change}
              placeholder="Password"
              className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />

            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>

          <p className="text-gray-500 text-sm mt-4 text-center">
            Already have an account?{' '}
            <Link to="/" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}