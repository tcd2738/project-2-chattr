// Take in error message, and display it to the user.
const handleError = (message) => {
  document.getElementById('errorText').textContent = message;
  document.getElementById('errorMessage').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('errorMessage').classList.add('hidden');
  }, 8000);
};

// Location errors get their own seperate field as they refresh quite frequently.
const handleLocationError = (message) => {
  document.getElementById('locationErrorText').textContent = message;
  document.getElementById('locationErrorMessage').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('locationErrorMessage').classList.add('hidden');
  }, 8000);
};
  
// Sends requests with body data to the server. Will handle returns appropriately.
const sendRequest = async (method, url, data, handler) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  document.getElementById('errorMessage').classList.add('hidden');

  if(result.redirect) {
    window.location = result.redirect;
  }

  if(result.error) {
    handleError(result.error);
  }

  if(handler) {
      handler(result);
  }
};

// Accesses the browser's navigator object, and pulls location data.
const getLocation = async () => navigator.geolocation.getCurrentPosition((position) => {
  const lResult = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
  };
  return lResult;
});

module.exports = {
    handleError,
    handleLocationError,
    sendRequest,
    getLocation
};