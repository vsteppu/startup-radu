// stores/jobStore.js
import { defineStore } from "pinia";

export const useJobStore = defineStore("jobStore", {
  state: () => ({
    savedItems: JSON.parse(localStorage.getItem('savedItems')) || [], // Load saved items from localStorage
  }),

  actions: {
    
    addToSaved(job) {
      // Add job to savedItems if it's not already there
      if (!this.savedItems.some((savedJob) => savedJob.id === job.id)) {
        this.savedItems.push(job);
        this.localStoredItems(); // Save to localStorage
      }
    },

    removeItem(index) {
      this.jobItems.splice(index, 1); // Remove item at specific index
    },

    removeSaved(index) {
      this.savedItems.splice(index, 1); // Remove saved item at specific index
      this.localStoredItems(); // Update localStorage
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
});
