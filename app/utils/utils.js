// Custom exception to be used when displaying a toast with a custom message
export function CustomException(message) {
  this.message = message;
}

// Check if a string is a valid email address
export function validEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

// Check if a string contains a number
export function hasNumber(myString) {
  return /\d/.test(myString);
}
