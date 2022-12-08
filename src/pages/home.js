import React, { useState, useEffect, useContext } from "react";
import UploadImage from "../components/uploadImage";
import ImagePreview from "../components/ImagePreview";
import { getImage, removeObject } from "../services/imageServices";
import { toast } from "react-toastify";
import { ImageContext } from "../context/imageContext";
import CanvasModal from "../components/canvasModal";

export default function Home() {
  const [imageData, setImageData] = useContext(ImageContext);
  const [isGettingImage, setIsGettingImage] = useState(false);
  const [isDeletingObject, setIsDeletingObject] = useState(false);

  const [brushData, setBrushData] = useState({
    brushStock: 30,
    brushMode: false,
  });

  // useEffect(() => {
  //   console.log(imageData.imageHistory,imageData.currentIndex);
  //   if (imageData.imageHistory[imageData.currentIndex])
  //     setImageData({
  //       ...imageData,
  //       image: imageData.imageHistory[imageData.currentIndex],
  //     });
  // }, [imageData?.currentIndex])

  useEffect(() => {
     getImageData();
  }, [imageData.getImage]);

  const handleDownload = async () => {
    const a = document.createElement("a");
    // let startIndex = imageData.base64Start.indexOf("/");
    // let endIndex = imageData.base64Start.indexOf(";");
    //imageData.base64Start.slice(startIndex+1,endIndex
    a.download = imageData.Folder_name_for_masks + ".jpg";
    a.href = imageData.base64Start + imageData.originalImage;
    a.click();
  };

  const handleObjectClick = async (object) => {
    try {
      setIsDeletingObject(true)
      let form = new FormData();
      form.append("original_image", imageData?.originalImage);
      form.append("folder_name", imageData?.Folder_name_for_masks);
      form.append("object_removal_name", object.key);
      const { data } = await removeObject(form);
      setImageData({ ...imageData, originalImage: data[1].Output_image });
      toast.success(object.key + " deleted successfully");
       setIsDeletingObject(false);
    } catch (ex) {
       setIsDeletingObject(false);
      toast.error(ex);
    }
  };

  const getImageData = async () => {
    try {
      if(!imageData.originalImage) return;
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
        if (data?.[3]?.Encoded_detected_image){
          setImageData({
            ...imageData,
            imageHistory: [],
            // image: imageData?.originalImage,
            image: data?.[3]?.Encoded_detected_image,
            Folder_name_for_masks: data?.[2]?.Folder_name_for_masks,
            coords,
          });
        }

      setIsGettingImage(false);
    } catch (ex) {
      setIsGettingImage(false);
       setImageData({
         ...imageData,
         originalImage: "",
       });
      // setImageData({...imageData,originalImage:''})
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
        <ImagePreview
          isDeletingObject={isDeletingObject}
          handleDownload={handleDownload}
          handleObjectClick={handleObjectClick}
          brushData={brushData}
          setBrushData={setBrushData}
        ></ImagePreview>
      )}
      <CanvasModal brushData={brushData} setBrushData={setBrushData} />
    </div>
  );
}
