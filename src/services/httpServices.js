import axios from "axios";
import { toast } from "react-toastify";
import { Constants } from "../data/constants";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500 

      if (
        !expectedError &&
        error?.code !== Constants.ERRORS.CANCELED_ERROR.code
      )
        toast.error(Constants.ERRORS.UNEXPECTED_ERROR.message);
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
