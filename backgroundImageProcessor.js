importScripts("./filters.js");

self.onmessage = (e) => {
  const { imageData, filter } = e.data;
  filters[filter](imageData);
  // array buffer  &  ImageBitmap
  self.postMessage(imageData, [imageData.data.buffer]);
};
