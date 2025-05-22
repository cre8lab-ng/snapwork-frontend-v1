'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import useAuthentication from "@/stores/useAuthentication";
import { useRouter } from 'next/navigation';
import { notifyError, notifySuccess } from '@/util/utils';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{9,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
  referral: Yup.string().notRequired(),
});

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  referral?: string;
}

export function SignUpModal({
  onClose,
  onSwitch,
}: {
  onClose: () => void;
  onSwitch: () => void;
}) {
  const router = useRouter();
  const [show, setShow] = useState(true);
  const { signUp } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  console.log(setShow)
  const initialValues: SignUpFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    referral: '',
  };

  const handleSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);

    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phone,
        referralCode: values.referral,
      };

      const response = await signUp(payload); // Assumes this hits your backend
      notifySuccess(response.message || "Signup successful");

      // Optionally store user context or identifier
      localStorage.setItem("user-email", values.email);

      router.push("/onboarding/otp?source=sign-up");

    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      notifyError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    show && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-[1px]">
        <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 text-xl font-bold hover:text-black"
          >
            ×
          </button>

          <h2 className="text-2xl font-semibold text-center text-[#0D0D0D] mb-6">
            Sign Up
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Field
                    name="firstName"
                    placeholder="Margaret"
                    className="w-full border rounded-xl px-4 py-3 text-gray-500"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>
                <div className="w-1/2">
                  <Field
                    name="lastName"
                    placeholder="Robbie"
                    className="w-full border rounded-xl px-4 py-3 text-gray-500"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="margaretrobbie@gmail.com"
                  className="w-full border rounded-xl px-4 py-3 text-gray-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <select
                    className="border rounded-xl px-2 py-3 text-gray-500"
                    disabled
                  >
                    <option value="NG">NG</option>
                  </select>
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-gray-500 pl-2">+234</span>
                    <Field
                      name="phone"
                      placeholder="743 5501 903"
                      className="w-full border-0 focus:ring-0 text-gray-500"
                    />
                  </div>
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <Field
                  name="referral"
                  placeholder="Referral code (optional)"
                  className="w-full border rounded-xl px-4 py-3 text-gray-500"
                />
                <ErrorMessage
                  name="referral"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1E2A78] text-blue-200 font-semibold py-3 rounded-xl"
              >
                {isLoading ? 'Submitting...' : 'Next'}
              </button>
            </Form>
          </Formik>

          <p className="text-center mt-4 text-sm text-gray-600">
            Have an existing account?{' '}
            <span
              className="text-[#1E2A78] font-semibold cursor-pointer"
              onClick={onSwitch}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    )
  );
}
