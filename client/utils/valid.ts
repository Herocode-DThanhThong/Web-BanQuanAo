export const validRegister = (
  firstName: string,
  lastName: string,
  birthday: string,
  gender: string,
  email: string,
  password: string,
  phone: string
) => {
  if (
    !firstName ||
    !lastName ||
    !birthday ||
    !gender ||
    !email ||
    !password ||
    !phone
  )
    return "Vui lòng nhập đầy đủ thông tin";

  if (!validateEmail(email)) return "Email không hợp lệ";

  if (password.length < 6) return "Password phải có ít nhất 6 kí tự";
};

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
