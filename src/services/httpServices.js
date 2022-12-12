import axios from "axios";
import { toast } from "react-toastify";

const controller = new AbortController();

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) toast.error("An unexpected error occurred.");
  return Promise.reject(error);
});

axios.interceptors.request.use((request)=>{
 return request;
})

// const setJwt = (jwt) => {
//   axios.defaults.headers.common["x-auth-token"] = jwt;
// };


const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  // setJwt,
};

export default http;
