import React, { useState, useEffect } from 'react'
import UploadImage from '../components/uploadImage'
import { Constants } from '../data/constants';
import ImagePreview from '../components/ImagePreview';
import { getImage, removeObject } from '../services/imageServices';
import { toast } from 'react-toastify';

export default function Home() {
    const [imageDimension, setImageDimension] = useState([0, 0]); //no use
    const [image2Dimension, setImage2Dimension] = useState([0, 0]); // no use
    const [imageHistory, setImageHistory] = useState([Constants.base64Image]);
    const [brushStock, setBrushStock] = useState(30)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [scale, setScale] = useState(1) //no use 
    const [originalImage, setOriginalImage] = useState(Constants.base64Image); 
    const [image, setImage] = useState('');//current image display
    const [coord, setCoord] = useState(Constants.coordinates); //cordinates of image 
    const [brushMode, setBrushMode] = useState('') 
    const [Folder_name_for_masks, setFolder_name_for_masks] = useState('');
    const [isGettingImage,setIsGettingImage] = useState(false);

    useEffect(() => {
        setImage(imageHistory[currentIndex])
    }, [currentIndex])

       useEffect(() => {
        //  setImage(originalImage);
       }, [originalImage]);

     useEffect(() => {
        // getImageData()
     }, []);

    const handleObjectClick = async (object) =>{
         try {
           let form = new FormData();
           form.append("original_image", originalImage);
           form.append("folder_name", Folder_name_for_masks);
           form.append("object_removal_name", object.key);
           const { data } = await removeObject(form);
           console.log(data)
        //    setFolder_name_for_masks(data.Folder_name_for_masks)
        //    setOriginalImage(data.   );
         } catch (ex) {
           //    if (ex.response && ex.response.status === 400)
           toast.error(ex.message);
         }
    }

     const getImageData = async () => {
       try {
         let form = new FormData();
         form.append("photoBase64", originalImage);
         setIsGettingImage(true);
         let { data } = await getImage(form);
  
         setFolder_name_for_masks(data?.[2]?.Folder_name_for_masks);
         setImage(data?.[3]?.Encoded_detected_image);

           var newJson = data?.[1]?.Coordinates?.replace(
             /([a-zA-Z0-9]+?):/g,
             '"$1":'
           );
           newJson = newJson?.replace(/'/g, '"');

           let coords = JSON?.parse(newJson);

           setCoord(coords);
          setIsGettingImage(false);
       } catch (ex) {
         setIsGettingImage(false);
         //    if (ex.response && ex.response.status === 400)
         toast.error(ex);
       }
     };
    return (
      <div className="container-fluid position-relative">
        {!image ? (
          <UploadImage
            setOriginalImage={setOriginalImage}
            getImageData={getImageData}
            isGettingImage={isGettingImage}
          />
        ) : (
          <ImagePreview
            brushMode={brushMode}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setImageHistory={setImageHistory}
            image2Dimension={image2Dimension}
            brushStock={brushStock}
            setImage={setImage}
            imageDimension={imageDimension}
            originalImage={originalImage}
            setOriginalImage={setOriginalImage}
            image={image}
            scale={scale}
            setImage2Dimension={setImage2Dimension}
            setImageDimension={setImageDimension}
            handleObjectClick={handleObjectClick}
            coord={coord}
            setCoord={setCoord}
            setScale={setScale}
            imageHistory={imageHistory}
            setBrushStock={setBrushStock}
            setBrushMode={setBrushMode}
          ></ImagePreview>
        )}
      </div>
    );
}
