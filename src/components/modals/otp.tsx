'use client';

import { Formik, Form, Field, } from 'formik';
import * as Yup from 'yup';

interface OTPValues {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
}

const OTPSchema = Yup.object().shape({
  code1: Yup.string().length(1, '1 digit').required('Required'),
  code2: Yup.string().length(1, '1 digit').required('Required'),
  code3: Yup.string().length(1, '1 digit').required('Required'),
  code4: Yup.string().length(1, '1 digit').required('Required'),
});

export default function OTPModal({
  onClose,
  onBack,
  onSubmit,
}: {
  onClose: () => void;
  onBack: () => void;
  onSubmit?: (code: string) => void;
}) {
  const initialValues: OTPValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-[1px]">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
        >
          ×
        </button>

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-black text-lg"
        >
          ←
        </button>

        <h2 className="text-xl font-semibold text-center text-[#0D0D0D] mb-1">
          Verify Phone Number
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Please input code sent to number
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={OTPSchema}
          onSubmit={(values) => {
            const code = values.code1 + values.code2 + values.code3 + values.code4;
            console.log('Verification code:', code);
            if (onSubmit) onSubmit(code);
          }}
        >
          {({ isValid }) => (
            <Form className="flex flex-col items-center space-y-6">
              <div className="flex justify-center gap-3">
                {['code1', 'code2', 'code3', 'code4'].map((field, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <Field
                      name={field}
                      maxLength={1}
                      className="w-14 h-14 text-center text-xl border rounded-md text-gray-800 bg-gray-100 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className="w-full bg-[#1E2A78] text-white py-3 rounded-xl font-medium disabled:opacity-50"
              >
                Finish Sign Up
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm text-gray-600 mt-6">
          Didn’t receive a code?{' '}
          <span className="text-[#1E2A78] font-semibold cursor-pointer">
            Resend
          </span>
        </p>
        <p className="text-center text-sm text-gray-600 mt-2">
          Have an existing account?{' '}
          <span className="text-[#1E2A78] font-semibold cursor-pointer">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
