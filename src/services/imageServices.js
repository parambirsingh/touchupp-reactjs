import http from "./httpServices";

const apiEndpoint = "";

export const getImage = (payload) => {
  return http.post(apiEndpoint,payload);
};
export const saveImage = (data) => {
  return http.post(apiEndpoint, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
