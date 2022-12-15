import React, { useContext, useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { ImageContext } from "../context/imageContext";
import { TailSpin } from "react-loader-spinner";

function Canvas({
  brushData,
  brushedImage,
  isBrushing,
  setPaths,
  imageDimension,
  modal,
}) {
  const [imageData] = useContext(ImageContext);

  const canvas = useRef();
  const boxRef = useRef();

  useEffect(() => {
    if (!brushedImage) {
      canvas.current?.clearCanvas();
      setPaths([]);
    }
  }, [brushedImage]);

  useEffect(() => {
    if (!canvas?.current) return;

    canvas.current.height = imageDimension?.height;
    canvas.current.width = imageDimension?.width;
  }, [imageDimension]);

  const handlePath = async () => {
    if (canvas?.current) {
      let path = await canvas?.current?.exportPaths();
     
      if (path?.[0]?.paths){
        path[0].height = getDimention()?.height;
        path[0].width = getDimention()?.width;
        setPaths(path);
      } 
      // clearTimeout(setTimoutHandle);
      // setTimoutHandle = setTimeout(async () => {
      //   let path;
      //   path = await canvas?.current?.exportPaths();

      //   if (path?.[0]?.paths) removeSelectedPath(path?.[0]?.paths);
      //   if (path.length && false) {
      //     // console.log('return:', path)
      //     let data = await canvas.current.exportImage("png");
      //     if (!data) return;
      //     data = data.slice(data?.indexOf(",") + 1);
      //     const h = (arr) => {
      //       if (imageData.currentIndex < arr.length - 1)
      //         arr.splice(
      //           imageData.currentIndex + 1,
      //           arr.length - imageData.currentIndex,
      //           data
      //         );
      //       else arr.push(data);
      //       // setImageData({ ...imageData, currentIndex: arr.length - 1 });
      //       return arr;
      //     };
      //     let history = h(imageData.imageHistory);
      //     console.log(history[history?.length - 1]);
      //     // setImageData({
      //     //   ...imageData,
      //     //   image:history[history?.length-1],
      //     //   currentIndex: history.length-1
      //     // });
      //   }
      // }, 1000);
    }
  };
  const screenDimensions = {
    sm: {
      screenWidth: 1368,
      width: 950,
      height: 550,
    },
    md: {
      screenWidth: 1440,
      width: 1200,
      height: 760,
    },
    lg: {
      screenWidth: 1680,
      width: 850,
      height: 650,
    },
    xl: {
      screenWidth: 1800,
      width: 1200,
      height: 820,
    },
  };
  const getDimention = () => {
    return imageDimension?.width > 1000
      ? window?.innerWidth >= screenDimensions?.xl?.screenWidth
        ? screenDimensions?.xl
        : window?.innerWidth >= screenDimensions?.lg?.screenWidth
        ? screenDimensions?.lg
        : window?.innerWidth >= screenDimensions?.md?.screenWidth
        ? screenDimensions?.md
        : screenDimensions?.sm
      : imageDimension;
  };
  return (
    <div className="h-100 d-flex justify-content-center align-items-center w-100">
      <div
        ref={boxRef}
        className="row mx-0 align-items-center justify-content-center position-relative h-100 hover-effect"
        onMouseUp={() => handlePath()}
        onTouchStart={() => handlePath()}
      >
        {isBrushing && (
          <TailSpin
            height="50"
            width="50"
            color="#dc3545"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass="position-absolute justify-content-center"
            visible={true}
          />
        )}
        <ReactSketchCanvas
          height={getDimention()?.height}
          width={getDimention()?.width}
          className={
            "canvas-con  " + (isBrushing ? "loading-image" : "")
          }
          ref={canvas}
          style={{
            // maxHeight: modal?.height + "px",
            // maxWidth: modal?.width + "px",
            // position: "absolute",
            // objectFit: "contain",
            // margin: "0 auto",
            cursor: "none",
          }}
          strokeWidth={brushData.brushStock}
          eraserWidth={brushData.brushStock}
          strokeColor="#dc3545b3"
          // preserveBackgroundImageAspectRatio="xMidYMid meet"
          backgroundImage={imageData.base64Start + imageData.originalImage}
        />
        <CustomCursor
          targets={[".cursor-area"]}
          customClass="custom-cursor"
          dimensions={brushData.brushStock * 2}
          strokeColor="#dc3545"
          fill="#dc3545"
          smoothness={{
            movement: 0.5,
            scale: 1,
            opacity: 0.7,
          }}
          opacity={0}
          // targetScale={1}
          // targetOpacity={0.7}
        />
      </div>
    </div>
  );
}

export default Canvas;
