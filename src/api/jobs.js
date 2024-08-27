export const alertFunction = async (searchQuery, geo, industry) => {
    try {
      const response = await fetch(`https://jobicy.com/api/v2/remote-jobs?tag=${searchQuery}&geo=${geo}&industry=${industry}`);
      const data = await response.json();
  
      if (data.jobCount === 0) {
        errorMessage.value = 'Job not found';
        jobList.value = [];
      } else {
        jobList.value = data.jobs;
        errorMessage.value = '';
      }
    } catch (error) {
      errorMessage.value = 'An error occurred. Please try again.';
      console.error(error);
    }
  };
  