// stores/jobStore.js
import { defineStore } from "pinia";

// Define a new store
export const useJobStore = defineStore("jobStore", {
  state: () => ({
    jobItems: [], // Array for job items
    savedItems: [], // Array for saved job items
  }),

  actions: {
    addItem(item) {
      this.jobItems.push(item); // Add item to jobItems
    },

    addToSaved(job) {
      // Add job to savedItems if it's not already there
      if (!this.savedItems.some((savedJob) => savedJob.id === job.id)) {
        this.savedItems.push(job);
      }
    },

    removeItem(index) {
      this.jobItems.splice(index, 1); // Remove item at specific index
    },

    removeSaved(index) {
      this.savedItems.splice(index, 1); // Remove saved item at specific index
    },

    getItems() {
      return this.savedItems;
    },

    localStoredItems() {
      localStorage.setItem('savedItems', JSON.stringify(this.savedItems));
    },
    loadItems() {
      const storedItems = localStorage.getItem('savedItems');
      if (storedItems) {
        this.savedItems = JSON.parse(storedItems);
      }
    },
  },
    persist: true,
  });


/*
() => {
  const jobItems = ref([]); // Array for job items

  const savedItems = ref([]); // Array for saved job items

  const addItem = (item) => {
    this.jobItems.push(item); // Add item to jobItems
  };

  const addToSaved = (job) => {
    // Add job to savedItems if it's not already there
    if (!this.savedItems.some((savedJob) => savedJob.id === job.id)) {
      this.savedItems.push(job);
    }
  };

  const removeItem = (index) => {
    this.jobItems.splice(index, 1); // Remove item at specific index
  };

  const removeSaved = (index) => {
    this.savedItems.splice(index, 1); // Remove saved item at specific index
  };

  const localStoredItems = () => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems.value));
  };
  const getItems = () => {
    return savedItems.value;
  };
}
*/
