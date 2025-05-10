import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast, Toaster } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import emailIcon from '/images/icon-email.svg';
import passwordIcon from '/images/icon-password.svg';

const schema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required("Can't be empty"),
  password: Yup.string()
    .min(8, 'At least 8 characters')
    .required('Please check again'),
}).required()

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async data => {
    try {
      await login(data)
      toast.success('Login successful!')
      navigate('/links')
    } catch (err) {
      toast.error(err.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 space-y-6">
      <Toaster position="top-center" />
      {/* Logo */}
      <Link to="/" className="w-max mb-6">
        <img
          src="/images/logo-devlinks-large.svg"
          alt="DevLinks Logo"
          className="h-32 w-32"
        />
      </Link>

      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-heading-m font-bold">Login</h1>
        <p className="text-body-s text-neutral-700">
          Add your details below to get back into the app
        </p>

        <form
          className="flex flex-col gap-[24px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {["email", "password"].map((field) => (
            <div key={field} className="flex flex-col gap-[4px]">
              <label htmlFor={field} className="text-[12px] leading-[150%]">
                {field === "email" ? "Email address" : "Password"}
              </label>
              <span className="relative">
                {field === "email" && (
                  <img src={emailIcon} alt="Email" className="size-[16px] absolute left-3 inset-y-0 my-auto" />

                )}
                {field === "password" && (
                  <img src={passwordIcon} alt="Passowrd" className="size-[16px] absolute left-3 inset-y-0 my-auto" />

                )}
                <input
                  id={field}
                  {...register(field)}
                  type={field === "email" ? "email" : "password"}
                  placeholder={
                    field === "email"
                      ? "e.g. alex@email.com"
                      : "Enter your password"
                  }
                  className={`w-full pl-10 px-[16px] py-[12px] text-base text-gray placeholder:text-gray placeholder:opacity-[0.5] bg-white outline-none border rounded autofill:bg-white ${errors[field]
                      ? "border-danger"
                      : "border-gray-200"
                    } focus:border-primary focus:shadow-input ${errors[field]
                      ? "focus:ring-2 ring-danger ring-1"
                      : ""
                    }`}
                />
                {errors[field] && (
                  <p className="text-danger text-[12px] absolute right-3 inset-y-0 flex items-center">
                    {errors[field]?.message}
                  </p>
                )}
              </span>
            </div>
          ))}

          <button
            type="submit"
            className="bg-primary hover:bg-primary-100 py-[11px] px-[27px] text-base text-white font-semibold active:scale-90 duration-200 rounded cursor-pointer"
          >
            Login
          </button>

          <span className="flex flex-col gap-2 sm:flex-row text-center justify-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="hover:underline text-primary w-max mx-auto sm:mx-0"
            >
              Create account
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}
