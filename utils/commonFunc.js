const isValidEmail = (email) => {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email);
  }

module.exports = {isValidEmail}