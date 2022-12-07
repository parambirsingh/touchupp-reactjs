
import {   RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/css/style.css'
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { ImageContext } from './context/imageContext';
import { useEffect, useState } from 'react';
import { Constants } from './data/constants';
import { ToastContainer } from 'react-toastify';
function App({router}) {
  const [imageData, setImageData] = useState({
    image:'',
    originalImage:'',
    base64Start:'',
    coords: Constants.coordinates,
    Folder_name_for_masks: "",
    imageHistory: [],
    currentIndex: 0,
    imageDimension:[0,0],
    image2Dimension:[0,0],
    scale:1,
    getImage: false,
  });
  useEffect(()=>{
    // console.log(imageData)
  })
  return (
    <div>
      <ImageContext.Provider value={[imageData, setImageData]}>
        <ToastContainer  autoClose={300} hideProgressBar={true} />
        <RouterProvider router={router} />
      </ImageContext.Provider>
    </div>
  );
}

export default App;
