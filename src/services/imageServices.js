import http from "./httpServices";

const apiEndpoint = "";

let controller = new AbortController();

export const getImage = (payload) => {
  return http.post(apiEndpoint + "object_detection", payload, {
    signal: controller.signal,
    // headers: { "Content-Type": "multipart/form-data" },
  });
};

export const removeObject = (data) => {
  return http.post("object_removal", data, {
    signal:controller.signal
    // headers: { "Content-Type": "multipart/form-data" },
  });
};

export const removeFromBrush = (data) => {
  return http.post("removal_brush", data, {
    signal: controller.signal,
    // headers: { "Content-Type": "multipart/form-data" },
  });
};

export const abortImgageServices = (data) => {
  controller.abort();
  controller = new AbortController();
};
