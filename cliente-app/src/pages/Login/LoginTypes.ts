export interface LoginProps {
  formData,
  setFormData,
  formDataRegistro,
  setRegistrar,
  hashPassword
}

export interface LoginPageFormDataProps {
  key: string,
  nombre: string,
  value: string,
  touched: boolean,
  type: string
}