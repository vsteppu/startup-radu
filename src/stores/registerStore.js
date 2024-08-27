import { defineStore } from "pinia";

// Define a new store
export const useRegisterStore = defineStore('userStore', {
  state: () => ({
    users: []  // Change to an array to store multiple users
  }),
  actions:{ 
    checkUserEmail(email, password) {
      const user = {
        email,
        password
      };
      
      
      const userExists = this.users.find(u => u.email === email);
      
      if (userExists) {
        console.log('User already exists');
      } else {
        this.users.push(user);
        console.log('User added:', this.users);
      }
    },
    clearUser() {
      this.users = [];
      console.log('Users cleared');
    }
  }
});