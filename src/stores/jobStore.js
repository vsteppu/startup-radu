import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import { db } from "@/firebase/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref } from "vue"; // Make sure to import ref

export const useJobStore = defineStore("jobStore", () => {
  // States
  const authUser = useAuthStore();
  const user = authUser.user;
  const userId = user.uid;
  const savedItems = ref([]);
  const userRef = doc(db, 'users', userId);

  // Actions  
  const saveJobForUser = async (job) => {
    if (user) {
      const userDoc = await getDoc(userRef);
      const savedJobs = userDoc.exists()? userDoc.data().savedJobs || [] : [];
      const jobExists = savedJobs.some(savedJob => savedJob.id === job.id);
      if (!jobExists) {
        savedJobs.push(job);
        await setDoc(userRef, { savedJobs }, { merge: true });
        console.log({ savedJobs })
      }

      return savedJobs
    }

  };

  const getSavedJobsForUser = async () => {
    if (user) {
      const userDoc = await getDoc(userRef);
      return userDoc.exists() ? userDoc.data().savedJobs || [] : [];
    }
    return [];
  };

  const loadSavedJobs = async () => {
    if (user) {
      savedItems.value = await getSavedJobsForUser();
    }
  };

  const removeSaved = async (jobId) => {
    if (user) {
      const userDoc = await getDoc(userRef);
      const savedJobs = userDoc.exists() ? userDoc.data().savedJobs || [] : [];
      const updatedJobs = savedJobs.filter(savedJob => savedJob.id !== jobId);
      console.log(updatedJobs)

      // Update the document in Firestore with the new list
      await setDoc(userRef, { savedJobs: updatedJobs }, { merge: true });

      // Update the local state
      savedItems.value = updatedJobs; // If you want to keep savedItems in sync
    }
  };
  return {
    savedItems,
    saveJobForUser,
    getSavedJobsForUser,
    loadSavedJobs,
    removeSaved,  
  }
})
