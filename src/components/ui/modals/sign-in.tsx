"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { notifyError, notifySuccess } from "@/util/utils";
import { useRouter } from "next/navigation";
import useAuthentication from "@/stores/useAuthentication";

// Regex for email and Nigerian phone numbers
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{9,15}$/;

export default function SignInModal({
  onClose,
  onContinue,
  onSwitchToSignUp,
}: {
  onClose: () => void;
  onContinue: () => void;
  onSwitchToSignUp: () => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuthentication();
  console.log(onContinue);
  const formik = useFormik({
    initialValues: {
      identifier: "",
    },
    validationSchema: Yup.object().shape({
      identifier: Yup.string()
        .required("Email or phone number is required")
        .test(
          "is-valid-email-or-phone",
          "Must be a valid email or phone number",
          (value) => {
            if (!value) return false;
            return emailRegex.test(value) || phoneRegex.test(value);
          }
        ),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await signIn({ emailOrPhone: values.identifier });
        notifySuccess(response.message || "OTP sent successfully");
        localStorage.setItem("user-identifier", values.identifier);
        router.push(`/onboarding/otp?source=sign-in`);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        notifyError(message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-[1px]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          X
        </button>

        <h2 className="text-2xl font-semibold text-center">Sign in</h2>
        <p className="text-center text-gray-500 mt-1 mb-6">
          Enter your email or phone number
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="identifier"
              className="text-sm font-medium text-blue-900 block mb-1"
            >
              Email or Phone
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              placeholder="you@example.com or 7435501903"
              className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md"
              value={formik.values.identifier}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.identifier && formik.errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.identifier}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1A2D7A] text-white py-2.5 rounded-xl text-sm font-medium"
          >
            {isLoading ? "Sending OTP..." : "Continue"}
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
