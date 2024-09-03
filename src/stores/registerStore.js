import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "@/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

// Define a new store
export const useRegisterStore = defineStore("userStore", () => {
  const user = ref(null);

  function setUser(newUser) {
    user.value = newUser;
  }
  
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;
      } else {
        user.value = null;
      }
    });

  return { user, setUser,  };
});
