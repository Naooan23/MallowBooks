
import type { Dispatch, SetStateAction } from "react";
import type { User } from "../../services/ServicesTypes";

export interface LoginProps {
  formData: LoginPageFormDataProps[];
  setFormData: Dispatch<SetStateAction<LoginPageFormDataProps[]>>;
  formDataRegistro: LoginPageFormDataProps[] | null;
  setRegistrar: Dispatch<SetStateAction<boolean>>;
  hashPassword: (s: string) => void;
}

export interface ActualizarProps {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newValue: any;
}

export interface LoginPageFormDataProps {
  key: string;
  label: string | null;
  value: string;
  touched: boolean;
  disabled: boolean;
  type: string;
}

export interface RegisterResponse {
  success: boolean;
  usuario?: User;
  message: string;
}

export async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}