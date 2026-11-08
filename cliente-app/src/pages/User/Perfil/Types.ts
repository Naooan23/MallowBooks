export interface CampoFormulario {
  key: string;
  label: string;
  value: string;
  touched: boolean;
  type: string;
  disabled?: boolean;
}

export interface UserInfoProps {
  id_user: number;
  nombre_user: string;
  email: string;
  password: string;
  rol: string;
}