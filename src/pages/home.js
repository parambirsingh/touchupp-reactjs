import React, { useState, useEffect, useContext } from "react";
import UploadImage from "../components/uploadImage";
import ImagePreview from "../components/ImagePreview";
import { getImage, removeFromBrush, removeObject } from "../services/imageServices";
import { toast } from "react-toastify";
import { ImageContext } from "../context/imageContext";
import CanvasModal from "../components/canvasModal";
import HomeShimmer from "../components/shimmer/homeShimmer";
import { Constants } from "../data/constants";

export default function Home() {
  const [imageData, setImageData] = useContext(ImageContext);
  const [originalCoord, setOriginalCoord] = useState([])
  const [isGettingImage, setIsGettingImage] = useState(false);
  const [isDeletingObject, setIsDeletingObject] = useState(false);
  const [isBrushing, setIsBrushing] = useState(false);
  const [brushedImage, setBrushedImage] = useState('');
  const [drawPath, setDrawPath] = useState([])
  const [brushData, setBrushData] = useState({
    brushStock: 110,
    brushMode: false,
  });
  const [imageDimension, setImageDimension] = useState({ height: 700, width: 700 })

  const [localSrc, setLocalSrc] = useState(imageData.originalImage);


  const updateDimension = (url) => {
    let img = new Image();
    img.onload = function () {
      console.log({ height: img?.height, width: img?.width });
      setImageDimension({ height: img?.height, width: img?.width });
    };
    img.src = url;

  }
  useEffect(() => {
    // updateDimension();
  }, [imageData?.image])

  useEffect(() => {
    handleBrushUpdate();
  }, [brushedImage]);

  useEffect(() => {
    getImageData();
  }, [imageData.getImage]);

  const handleObjectClick = async (object) => {
    try {
      setIsDeletingObject(true)
      let form = new FormData();
      form.append("original_image", imageData?.originalImage);
      form.append("folder_name", imageData?.Folder_name_for_masks);
      form.append("object_removal_name", object.key);
      const { data } = await removeObject(form);
      let i = imageData?.coords?.findIndex(c => c.key === object.key);
      if (i > -1) {
        imageData.coords?.splice(i, 1, { ...imageData?.coords?.[i], isTrashed: true });
      }
      originalCoord?.splice(i, 1, {
        ...imageData?.coords?.[i],
        isTrashed: true,
      })
      setOriginalCoord(originalCoord);

      setImageData({
        ...imageData,
        image: data[1].Output_image,
        originalImage: data[1].Output_image,
      });
      toast.success(object.key + " deleted successfully");
      setIsDeletingObject(false);
    } catch (ex) {
      setIsDeletingObject(false);

      if (
        ex?.code !== Constants.ERRORS.CANCELED_ERROR.code &&
        ex?.response?.status > 400 && ex?.response?.status < 500
      )
        toast.error(ex);
    }
  };

  const handleBrushUpdate = async () => {
    try {
      if (!brushedImage) return;
      setIsBrushing(true);
      let form = new FormData();
      form.append("original_image", imageData?.originalImage);
      form.append("image_mask", brushedImage);

      const { data } = await removeFromBrush(form);
      setImageData({
        ...imageData,
        image: data[1].Output_image_using_brush,
        originalImage: data[1].Output_image_using_brush,
      });
      filterCoords()
      setBrushedImage('')
      //  toast.success(object.key + " deleted successfully");
      setIsBrushing(false);
    } catch (ex) {
      setIsBrushing(false);
      setBrushedImage("");

      if (
        ex?.code !== Constants.ERRORS.CANCELED_ERROR.code &&
        ex?.response?.status > 400 &&
        ex?.response?.status < 500
      )
        toast.error(ex);
    }
  };

  const getImageData = async () => {
    try {
      if (!imageData.originalImage) return;
      let form = new FormData();
      form.append("photoBase64", imageData?.originalImage);
      setIsGettingImage(true);
      window.scroll({
        top: 0,
        behavior: "smooth",
      });

      let { data } = await getImage(form);
      if (data?.Status) {
        toast.error(data?.Status);
      } else {
        let newJson = data?.[1]?.Coordinates?.replace(
          /([a-zA-Z0-9]+?):/g,
          '"$1":'
        );
        newJson = newJson?.replace(/'/g, '"');

        let coords = JSON?.parse(newJson) || [];

        setOriginalCoord(JSON?.parse(newJson))
        if (data?.[3]?.Encoded_detected_image) {
          updateDimension(
            imageData.base64Start + data?.[3]?.Encoded_detected_image
          );

          setTimeout(() => {
            setImageData({
              ...imageData,
              imageHistory: [],
              // originalImage: data?.[3]?.Encoded_detected_image,
              image: data?.[3]?.Encoded_detected_image,
              Folder_name_for_masks: data?.[2]?.Folder_name_for_masks,
              coords,
            });
          })
        }

      }
      setIsGettingImage(false);
    } catch (ex) {
      if (isGettingImage) {
        setImageData({
          ...imageData,
          originalImage: "",
        });
      }
      setIsGettingImage(false);
      // setImageData({...imageData,originalImage:''})
      if (
        ex?.code !== Constants.ERRORS.CANCELED_ERROR.code &&
        ex?.response?.status > 400 &&
        ex?.response?.status < 500
      )
        toast.error(ex);
    }
  };

  const filterCoords = () => {
    // console.log(drawPath, originalCoord)
    drawPath?.map((draw) => {
      originalCoord.map((imageCoord) => {
        // console.log(draw, imageCoord)
      })
    })
  }
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
          handleObjectClick={handleObjectClick}
          brushData={brushData}
          setBrushData={setBrushData}
          setLocalSrc={setLocalSrc}
          setOriginalCoord={setOriginalCoord}
          originalCoord={originalCoord}
          imageDimension={imageDimension}
        ></ImagePreview>
      )}
      <CanvasModal
        setDrawPath={setDrawPath}
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
