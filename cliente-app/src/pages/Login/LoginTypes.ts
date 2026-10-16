
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
  newValue: string;
}

export interface LoginPageFormDataProps {
  key: string;
  label: string | null;
  value: string;
  touched: boolean;
  type: string;
}

export interface RegisterResponse {
  success: boolean;
  usuario?: User;
  message: string;
}
