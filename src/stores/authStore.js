
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { auth } from "@/firebase/Firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";



export const useAuthStore = defineStore("authStore", () => {

  const user = ref(JSON.parse(localStorage.getItem("user")) ?? null)
  const errorMessage = ref('')

  const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user
      setUser(user)
      console.log(user);
      return user;
    } catch (error) {
      errorMessage.value = 'An unexpected error occurred: ' + error.message;
    }
  };

  const authUser = async (email, password) => {
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      console.log(user.email);
      console.log(user.password);
      return user 
    } catch (error) {
      errorMessage.value = 'Please enter email and password';
    }
  };

  function setUser(newUser) {
    user.value = newUser;
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
    console.log(user)
  }

  function isAuthenticated() {
    return user.value ?? false;
  }

  watch(user, (newValue) => {
    if (newValue) {
      localStorage.setItem("user", JSON.stringify(newValue));
    } else {
      localStorage.removeItem("user");
    }
  });


  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;
    } else {
      user.value = null;
    }
  });

  return { user, registerUser, authUser, setUser, onAuthStateChanged, isAuthenticated };
});
