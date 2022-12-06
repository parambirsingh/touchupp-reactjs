
import {   RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/css/style.css'
import './App.css';
import { ImageContext } from './context/imageContext';
import { useEffect, useState } from 'react';
import { Constants } from './data/constants';
function App({router}) {
  const [imageData, setImageData] = useState({
    image: Constants.base64Image,
    originalImage: Constants.base64Image,
    coords: Constants.coordinates,
    Folder_name_for_masks: "",
    imageHistory: [],
    currentIndex: 0,
    imageDimension:[0,0],
    image2Dimension:[0,0],
    scale:1,
  });
  useEffect(()=>{
    // console.log(imageData)
  })
  return (
    <div>
      <ImageContext.Provider value={[imageData, setImageData]}>
        <RouterProvider router={router} />
      </ImageContext.Provider>
    </div>
  );
}

export default App;
