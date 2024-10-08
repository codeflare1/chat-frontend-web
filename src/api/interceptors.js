import axios from "axios";



const axiosInstance = axios.create({
  baseURL: 'http://16.16.27.134:3000/v1/auth',
  // timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token');
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWY5MzQ2Y2JiM2EyNTI5ZTZkODYzYzMiLCJpYXQiOjE3MTA4MzA3MDEsImV4cCI6MTcxMDgzMjUwMSwidHlwZSI6ImFjY2VzcyJ9.y5Rnth4s8r3BnOP0MRiMALPcS0dEJdiMn0wjcWR_iSo"
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


  export default axiosInstance