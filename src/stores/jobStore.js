import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import { db } from "@/firebase/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref } from "vue";


export const useJobStore = defineStore("jobStore", () => {
  const authUser = useAuthStore();
  const savedJobsList = ref([])

   const saveJob = async (job) => {
    const user = authUser.user; 
    const userId = user.uid;
    const userRef = doc(db, 'users', userId);  
    if (user) { // Ensure user and job are defined
      const userDoc = await getDoc(userRef);
      const savedJobs = userDoc.exists() ? userDoc.data().savedJobs || [] : [];
      const checkIfJobIsSaved = savedJobs.some(savedJob => savedJob.id === job.id);
      if (!checkIfJobIsSaved) {
        savedJobs.unshift(job); // Add job to the saved jobs array
        await setDoc(userRef, { savedJobs }, { merge: true }); // Save the updated array to Firestore
        return { success: true, savedJobs }; // Return success status and saved jobs
      } else {
        return { success: false, message: 'Job is already saved' }; // Return message if job exists
      }
    }
    return { success: false, message: 'User is not authenticated or job is invalid' };
  };

  const checkIfJobIsSaved = async (job) => {
    const user = authUser.user; 
    const userId = user.uid;
    const userRef = doc(db, 'users', userId);  
    if (user) {
      const userDoc = await getDoc(userRef);
      const savedJobs = userDoc.exists() ? userDoc.data().savedJobs || [] : [];
      return savedJobs
    }
    return []
  };

  const removeJob = async (jobId) => {
    const user = authUser.user; 
    const userId = user.uid;
    const userRef = doc(db, 'users', userId);  
    if (user) {
      const userDoc = await getDoc(userRef);
      const savedJobs = userDoc.exists() ? userDoc.data().savedJobs || [] : [];
      const updatedJobs = savedJobs.filter(savedJob => savedJob.id !== jobId);
      await setDoc(userRef, { savedJobs: updatedJobs }, { merge: true });
    }
  };

  return {
    savedJobsList,
    saveJob,
    checkIfJobIsSaved,
    removeJob,
  };
});