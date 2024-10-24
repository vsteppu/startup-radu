export const isValidateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
export const isValidPassword = () => ({
  hasSpecialChar: (password) => /[@.,\\]/.test(password),
  hasLowerCase: (password) => /[a-z]/.test(password),
  hasUpperCase: (password) => /[A-Z]/.test(password),
});

const isInstagramBrowser = () =>{
  const ua = navigator.userAgent 
  const isInstagram = ua.indexOf('Instagram') > -1;
  return isInstagram
}
export {
  isInstagramBrowser
}