import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from '@/firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Define a new store
export const useRegisterStore = defineStore('userStore', () => {
  const user = ref(null);

  // Monitorizează starea de autentificare
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      // Dacă utilizatorul este autentificat, actualizează starea din Pinia
      user.value = firebaseUser;
    } else {
      // Dacă utilizatorul nu este autentificat, resetează starea
      user.value = null;
    }
  });

  return { user };
});

  /*
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
    },
    clearUser() {
      this.user = null;
    },
  },
}
*/