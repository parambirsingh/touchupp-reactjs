import http from "./httpServices";

const apiEndpoint = "";

export const getImage = () => {
  return http.get(apiEndpoint);
};
export const saveImage = (data) => {
  return http.post(apiEndpoint, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
