export const isValidateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
export const isValidPassword = () => ({
  hasSpecialChar: (password) => /[@.,\\]/.test(password),
  hasLowerCase: (password) => /[a-z]/.test(password),
  hasUpperCase: (password) => /[A-Z]/.test(password),
});
export const isInstagramBrowser = () => {
  const ua = navigator.userAgent 
  var isInstagram = (ua.indexOf('Instagram') > -1) ? true : false;
  return isInstagram
}