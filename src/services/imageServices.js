import http from "./httpServices";

const apiEndpoint = "";

export const getImage = (payload) => {
  return http.post(apiEndpoint, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const saveImage = (data) => {
  return http.post(apiEndpoint, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const removeObject = (data) => {
  return http.post("object_removal", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
