export const isValidateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
export const isValidPassword = () => ({
  hasSpecialChar: (password) => /[@.,\\]/.test(password),
  hasLowerCase: (password) => /[a-z]/.test(password),
  hasUpperCase: (password) => /[A-Z]/.test(password),
});
export const redirectFromInstagram = async () => {
  const ua = navigator.userAgent 
  const isInstagram = ua.indexOf('Instagram') > -1;
  if (isInstagram) {

    if (/iPad|iPhone|iPod/.test(ua)) {
      window.location.href = 'https://search-for-jobs.netlify.app';

    } else {
      window.location.href = 'intent:https://search-for-jobs.netlify.app#Intent;end'; 
    }
    return
  } 
}