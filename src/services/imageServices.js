import http from "./httpServices";

const apiEndpoint = "https://d93d-103-104-213-226.in.ngrok.io";

export const getImage = (payload) => {
  return http.post(apiEndpoint,payload);
};
export const saveImage = (data) => {
  return http.post(apiEndpoint, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
