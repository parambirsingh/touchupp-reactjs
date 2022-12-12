import http from "./httpServices";

const apiEndpoint = "";

export const testApi = (payload) => {
  return http.get(apiEndpoint, payload, {
    // headers: { "Content-Type": "multipart/form-data" },
  });
};


export const getImage = (payload) => {
  return http.post(apiEndpoint + "object_detection", payload, {
    // headers: { "Content-Type": "multipart/form-data" },
  });
};
export const saveImage = (data) => {
  return http.post(apiEndpoint, data, {
    // headers: { "Content-Type": "multipart/form-data" },
  });
};

export const removeObject = (data) => {
  return http.post("object_removal", data, {
    // headers: { "Content-Type": "multipart/form-data" },
  });
};

export const removeFromBrush = (data) => {
  return http.post("removal_brush", data, {
    // headers: { "Content-Type": "multipart/form-data" },
  }
  );
};
