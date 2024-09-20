import { isValidateEmail, isValidPassword } from '@/utilities/utilities.js'


const isValidPass = isValidPassword();

const validationRulesForEmails = {
  email: {
    test: (value) => value.trim() !== '',
    errorMessage: 'Enter the email address',
  },
  emailFormat: {
    test: (value) => isValidateEmail(value),
    errorMessage: 'Enter a valid email address',
  },
};

const validationRulesForPasswords = {
  passwordLength: {
    test: (value) => value.length >= 6,
    errorMessage: 'Passwords must have at least 6 characters',
  },
  passwordSpecialChar: {
    test: (value) => isValidPass.hasSpecialChar(value),
    errorMessage: 'Passwords must have at least one of these /[@.,\\]/ characters',
  },
  passwordLowerCase: {
    test: (value) => isValidPass.hasLowerCase(value),
    errorMessage: 'Passwords must have at least one lowercase character',
  },
  passwordUpperCase: {
    test: (value) => isValidPass.hasUpperCase(value),
    errorMessage: 'Passwords must have at least one uppercase character',
  },
  passwordsMatch: {
    test: (password, confirmationpassword) => password === confirmationpassword,
    errorMessage: 'Passwords are not the same',
  },
};


export const validateFormForEmail = (email) => {
  // Iterate over validation rules and check conditions
  for (const [key, { test, errorMessage }] of Object.entries(validationRulesForEmails)) {
    if (!test(email)) {
      throw new Error(errorMessage);
    }
  }
};

export const validateFormForPassword = (password, confirmationpassword) => {
  // Iterate over validation rules and check conditions
  for (const [key, { test, errorMessage }] of Object.entries(validationRulesForPasswords)) {
    if (!test(password, confirmationpassword)) {
      throw new Error(errorMessage);
    }
  }
};