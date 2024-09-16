
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { auth } from "@/firebase/Firebase";
import { onAuthStateChanged, updatePassword, signInWithEmailAndPassword, createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";



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

/* 
  const changePassword = async (currentPassword, newPassword) => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Creează credențialele pentru reautentificare
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      
      try {
        // Reautentifică utilizatorul
        await reauthenticateWithCredential(currentUser, credential);
        console.log('User reauthenticated successfully');
        
        // Schimbă parola
        await updatePassword(currentUser, newPassword);
        console.log('Password changed successfully!');
        
        // Actualizează userul în store și în localStorage
        setUser(currentUser);
      } catch (error) {
        // Gestionează erorile de reautentificare sau schimbare a parolei
        errorMessage.value = 'Error: ' + error.message;
        console.error('Error:', error.message);
      }
    } else {
      console.error('No user is currently signed in');
    }
  };
 */


  const reauthenticateUser = async (currentPassword) => {
    console.log(auth.currentUser.email)
    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      console.log(credential._password);
      try {
        await reauthenticateWithCredential(user, credential);
        console.log('User reauthenticated successfully');
        return true
      } catch (error) {
        console.error('Error reauthenticating user:', error.message);
      }
    } else {
      console.error('No user is currently signed in');
    }
  };


  const changePassword = async (newPassword) => {
    const user = auth.currentUser;
    //    console.log(user)
    if (user) {
      try {
        await updatePassword(user, newPassword);
        console.log('Password changed successfully!');
        return true
      } catch (error) {
        console.error('Error changing password:', error.message);
      }
    } else {
      console.error('No user is currently signed in');
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

  return { user, registerUser, authUser, reauthenticateUser, changePassword, setUser, onAuthStateChanged, isAuthenticated };
});
