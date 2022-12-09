import React, { useState, useEffect, useContext } from "react";
import UploadImage from "../components/uploadImage";
import ImagePreview from "../components/ImagePreview";
import { getImage, removeFromBrush, removeObject } from "../services/imageServices";
import { toast } from "react-toastify";
import { ImageContext } from "../context/imageContext";
import CanvasModal from "../components/canvasModal";
import HomeShimmer from "../components/shimmer/homeShimmer";

export default function Home() {
  const [imageData, setImageData] = useContext(ImageContext);
  const [isGettingImage, setIsGettingImage] = useState(false);
  const [isDeletingObject, setIsDeletingObject] = useState(false);
  const [isBrushing, setIsBrushing] = useState(false);
  const [brushedImage, setBrushedImage] = useState('');

  const [brushData, setBrushData] = useState({
    brushStock: 30,
    brushMode: false,
  });
  const [imageDimension,setImageDimension] = useState({height:700,width:700})

   const [localSrc, setLocalSrc] = useState(imageData.originalImage);

  useEffect(() => {
    if(imageData?.originalImage){
      let img = new Image();
      img.onload = function () {
        setImageDimension({height: img?.height, width: img?.width});
      };
      img.src = imageData.base64Start + imageData.originalImage;
    } 
  }, [imageData?.originalImage])

  useEffect(() => {
    handleBrushUpdate();
  }, [brushedImage]);

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

   const handleBrushUpdate = async () => {
     try {
      if(!brushedImage) return;
       setIsBrushing(true);
       let form = new FormData();
       form.append("original_image", imageData?.originalImage);
       form.append("image_mask", brushedImage);
       
       const { data } = await removeFromBrush(form);
       setImageData({
         ...imageData,
         originalImage: data[1].Output_image_using_brush,
       });
       setBrushedImage('')
      //  toast.success(object.key + " deleted successfully");
       setIsBrushing(false);
     } catch (ex) {
       setIsBrushing(false);
        setBrushedImage("");
     
       toast.error(ex);
     }
   };

  const getImageData = async () => {
    try {
      if(!imageData.originalImage) return;
      let form = new FormData();
      form.append("photoBase64", imageData?.originalImage);
      setIsGettingImage(true);
        window.scroll({
          top: 0,
          behavior: "smooth",
        });

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
      setImageData({
        ...imageData,
        originalImage: "",
      });
      setIsGettingImage(false);
      // setImageData({...imageData,originalImage:''})
      toast.error(ex);
    }
  };

  return (
    <div className="container-fluid position-relative">
      {isGettingImage ? (
        <HomeShimmer />
      ) : !imageData?.image ? (
        <UploadImage
          localSrc={localSrc}
          setLocalSrc={setLocalSrc}
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
          setLocalSrc={setLocalSrc}
        ></ImagePreview>
      )}
      <CanvasModal
        brushData={brushData}
        setBrushData={setBrushData}
        brushedImage={brushedImage}
        isBrushing={isBrushing}
        setBrushedImage={setBrushedImage}
        imageDimension={imageDimension}
      />
    </div>
  );
}
