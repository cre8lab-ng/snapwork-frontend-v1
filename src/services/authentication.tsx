import api from "../util/api";
import { apiEndpoints } from "../util/endpoint";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  phone: string;
}

export interface VerifyOtpPayload {
  verify_reference: string;
  otp: string;
}


export async function signIn(payload: SignInPayload) {
  try {
    const response = await api.post(apiEndpoints.auth.LOGIN, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function verifyOtp(payload: VerifyOtpPayload) {
  try {
    const response = await api.post(
      `${apiEndpoints.auth.VERIFY_OTP}/${payload.verify_reference}`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
}


export async function resendOtp(verify_reference: string) {
  try {
    const response = await api.get(
      `${apiEndpoints.auth.RESEND_OTP}/${verify_reference}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function signUp(payload: SignUpPayload) {
  try {
    const response = await api.post(apiEndpoints.auth.REGISTER, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const response = await api.get(apiEndpoints.auth.LOGOUT);
    return response;
  } catch (error) {
    throw error;
  }
}
