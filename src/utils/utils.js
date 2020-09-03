exports.dateFormat = (dateString) => {
  if (dateString.length < 1) return dateString;

  // this will handle the post date and format it
  const postDate = new Date(dateString);

  // this is getting the current date
  const today = new Date();
  // this will calculate the time in miliseconds
  const diffMs = Math.abs(today - postDate) / 1000;

  // here we'll set the object with time and then iterate it
  const timeAgo = {
    year: Math.floor(diffMs / 31556952),
    month: Math.floor(diffMs / 2629746),
    day: Math.floor(diffMs / 86400),
    hour: Math.floor(diffMs / 3600),
  };

  for (const [key, value] of Object.entries(timeAgo)) {
    if (value === 1) {
      return `${value} ${key} ago`;
    }
    if (value > 1) {
      return `${value} ${key}s ago`;
    }
  }

  // if the for loop fails
  return "a few moments ago";
};
