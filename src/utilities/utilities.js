export const isValidateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const isValidPassword = () => ({
  hasSpecialChar: (password) => /[@.,\\]/.test(password),
  hasLowerCase: (password) => /[a-z]/.test(password),
  hasUpperCase: (password) => /[A-Z]/.test(password),
});
/* export const isSocialMediaAppBrowser = () => {
  const ua = navigator.userAgent
  const isInstagram = ua.indexOf('Instagram') > -1;
  const isLinkedin = ua.indexOf('linkedin') > -1;
  const isTiktok = ua.indexOf('tiktok') > -1;
  return isInstagram || isLinkedin || isTiktok
} */
  export const isSocialMediaAppBrowser = () =>{
    const ua = navigator.userAgent.toLowerCase()
    const isInstagram = ua.indexOf('instagram') > -1;
    const isLinkedin = ua.indexOf('linkedin') > -1;
    const isTiktok = ua.indexOf('tiktok') > -1;
    return  isLinkedin ||isInstagram || isTiktok;
  }


export let socialButtonStyle = 'font-nunito w-full mx-auto flex justify-center items-center py-2 px-10 rounded-md shadow-sm text-sm font-medium text-gray-800 border border-gray-300 hover:bg-gray-50 focus:outline-none'
export let fadedSocialButtonStyle = 'font-nunito w-full mx-auto flex justify-center items-center py-2 px-10 rounded-md shadow-sm text-sm font-medium text-gray-400 border border-gray-400 bg-gray-300'
