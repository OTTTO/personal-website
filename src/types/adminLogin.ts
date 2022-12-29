interface LoginForm {
  email: string;
  password: string;
}

export interface State extends LoginForm {
  showPassword: boolean;
}
