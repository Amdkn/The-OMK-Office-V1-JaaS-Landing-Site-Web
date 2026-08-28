let JOBS = [1, 2, 3];
let activeJobs = [];
function setActiveJobs(updater) {
  activeJobs = updater(activeJobs);
}

let current = 0;
let interval = setInterval(() => {
  if (current < JOBS.length) {
    setActiveJobs(prev => [JOBS[current], ...prev]);
    current++;
  } else {
    clearInterval(interval);
  }
}, 10);

setTimeout(() => console.log(activeJobs), 100);
