import axiosInstance from "./interceptors";


// GET request (no request body needed for GET)
export const getData = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;  // Return data instead of just logging it
  } catch (error) {
    console.error('GET request error:', error);
    throw error;  // Re-throw the error for further handling
  }
};

// POST request
export const postData = async (url, reqBody) => {
  try {
    const response = await axiosInstance.post(url, reqBody);  // Include request body
    return response.data;  // Return data
  } catch (error) {
    console.error('POST request error:', error);
    throw error;  // Re-throw the error for further handling
  }
};

// PUT request
export const putData = async (url, reqBody) => {
  try {
    const response = await axiosInstance.put(url, reqBody);  // Include request body
    return response.data;  // Return data
  } catch (error) {
    console.error('PUT request error:', error);
    throw error;  // Re-throw the error for further handling
  }
};

// DELETE request (request body is optional)
export const deleteData = async (url, reqBody = {}) => {
  try {
    const response = await axiosInstance.delete(url, { data: reqBody });  // Pass request body if needed
    return response.data;  // Return data
  } catch (error) {
    console.error('DELETE request error:', error);
    throw error;  // Re-throw the error for further handling
  }
};
