import axios from 'axios';

/**
 * @description Request to the API to get user details
 *
 * @param  {string} token the token set in the header
 *
 * @return {object} dispatch object
 *
 */
export const setAuthorizationToken = (token) => {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization; // eslint-disable-line
    }
};

/**
 * @description Validate input fields
 *
 * @param {object} fields
 *
 */
export const validateInputFields = (fields) => {
    let errorResponse = {};
    for (let property in fields) {
      if (fields[property].toString().trim() === '') {
        errorResponse[property] = `${property.replace("_id", "")} must not be empty`;
      }
    }
    return errorResponse;
  };
  