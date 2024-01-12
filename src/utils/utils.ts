//电话号码增加空格
const formatPhone = (phoneNumber: string): string => {
  const phoneNumberTrim: string = phoneNumber.replace(/\s+/g, '');
  const result = [
    phoneNumberTrim.slice(0, 3),
    phoneNumberTrim.slice(3, 7),
    phoneNumberTrim.slice(7, 11),
  ]
    .filter(item => !!item)
    .join(' ');
  return result;
};

//取出空格
const replaceBlank = (phoneNumber: string): string => {
  return phoneNumber ? phoneNumber.replace(/\s+/g, '') : '';
};

//验证手机号
const verifyPhone = (phone: string) => {
  const regs =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  return regs.test(phone);
};

//验证密码
const verifyPassword = (password: string) => {
  const regs = /^[a-zA-Z0-9@\$\^\.\*\\?]{6}$/;
  return regs.test(password);
};

export {formatPhone, replaceBlank, verifyPhone, verifyPassword};
