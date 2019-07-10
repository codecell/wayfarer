const emailHelper = {
  /**
     * validate email
     * @param {String} email 
     * @returns {boolean}
     */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
};

export default emailHelper;
