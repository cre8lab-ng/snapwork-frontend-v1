"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { notifyError, notifySuccess } from "@/util/utils";
import router from "next/router";
import useAuthentication from "@/stores/useAuthentication";

type SignInFormValues = {
  email: string;
  password: string;
  phone: string;
};

export default function SignInModal({
  onClose,
  onContinue,
  onSwitchToSignUp,
}: {
  onClose: () => void;
  onContinue: () => void;
  onSwitchToSignUp: () => void;
}) {
  const [countryCode, setCountryCode] = useState("234");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuthentication();

  console.log(onContinue, isLoading);
  
  
  const handleSubmit = async (values: SignInFormValues) => {    setIsLoading(true);
    console.log("ff");
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await signIn(payload);
      notifySuccess(response.message);
      setIsLoading(false);
      localStorage.setItem("user-email", values.email);
      router.push({
        pathname: "/onboarding/otp",
        query: { source: "sign-in" },
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      notifyError(message);
    
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Enter a valid email")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Email must have a valid provider"
        )
        .required("Email address is required!"),
      password: Yup.string().required("Password is required!"),
      phone: Yup.string()
        .matches(/^\d{9,15}$/, "Enter a valid phone number")
        .required("Phone number is required!"),
    }),
    validateOnMount: true,

    onSubmit: handleSubmit,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-[1px]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          X{" "}
        </button>

        <h2 className="text-2xl font-semibold text-center">Sign in</h2>
        <p className="text-center text-gray-500 mt-1 mb-6">
          Sign in to continue
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="phone"
              className="text-sm font-medium text-blue-900 block mb-1"
            >
              Phone number
            </label>
            <div className="flex rounded-md overflow-hidden border border-gray-300">
              <select
                className="px-3 py-2 bg-gray-100 text-sm outline-none"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="234">NG</option>
              </select>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="743 5501 903"
                className="flex-1 px-3 py-2 text-sm bg-gray-100 outline-none"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-blue-900 block mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-blue-900 block mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A2D7A] text-white py-2.5 rounded-xl text-sm font-medium"
          >
            Sign in
          </button>

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <span
              className="text-[#1A2D7A] font-semibold cursor-pointer"
              onClick={onSwitchToSignUp}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
