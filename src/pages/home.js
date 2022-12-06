import React, { useState, useEffect, useContext } from 'react'
import UploadImage from '../components/uploadImage'
import ImagePreview from '../components/ImagePreview';
import { getImage, removeObject } from '../services/imageServices';
import { toast } from 'react-toastify';
import { ImageContext } from '../context/imageContext';
import CanvasModal from '../components/canvasModal';

export default function Home() {
  const [imageData,setImageData] = useContext(ImageContext)
  const [isGettingImage,setIsGettingImage] = useState(false)
    useEffect(() => {
        // setImage(imageHistory[currentIndex])
    }, [imageData?.currentIndex])

        useEffect(() => {
          // if(originalImage) 
            // getImageData()
        }, [imageData?.originalImage]);

    const handleObjectClick = async (object) =>{
         try {
           let form = new FormData();
           form.append("original_image", imageData?.originalImage);
           form.append("folder_name", imageData?.Folder_name_for_masks);
           form.append("object_removal_name", object.key);
           const { data } = await removeObject(form);
           setImageData({...imageData,image:data[1].Output_image});
           toast.success(object.key+' deleted successfully');
         } catch (ex) {
           toast.error(ex);
         }
    }

     const getImageData = async () => {
       try {
         let form = new FormData();
         form.append("photoBase64", imageData?.originalImage);
         setIsGettingImage(true);
         let { data } = await getImage(form);
           var newJson = data?.[1]?.Coordinates?.replace(
             /([a-zA-Z0-9]+?):/g,
             '"$1":'
           );
           newJson = newJson?.replace(/'/g, '"');

           let coords = JSON?.parse(newJson);
             
           setImageData({
             ...imageData,
             imageHistory: [],
             image: data?.[3]?.Encoded_detected_image,
             Folder_name_for_masks: data?.[2]?.Folder_name_for_masks,
             coords,
           });

           setIsGettingImage(false);
       } catch (ex) {
        console.log(ex)
         setIsGettingImage(false);
         //    if (ex.response && ex.response.status === 400)
         toast.error(ex);
       }
     };

    return (
      <div className="container-fluid position-relative">
        {!imageData?.image ? (
          <UploadImage
            // setOriginalImage={imageData?.setOriginalImage}
            isGettingImage={isGettingImage}
          />
        ) : (
          <ImagePreview handleObjectClick={handleObjectClick}></ImagePreview>
        )}
        <CanvasModal/>
      </div>
    );
}
