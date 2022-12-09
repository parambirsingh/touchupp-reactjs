import React, { useContext, useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { ImageContext } from "../context/imageContext";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { TailSpin } from "react-loader-spinner";

function Canvas({
  brushData,
  brushedImage,
  setBrushedImage,
  isBrushing,
  setPaths,
  imageDimension,
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

  const handlePath = async () => {
    if (canvas?.current) {
      let path = await canvas?.current?.exportPaths();
      if (path?.[0]?.paths) setPaths(path);
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
  return (
    <div className="mt-2 h-100">
      <div
        ref={boxRef}
        className="row align-items-center  cursor-area justify-content-center position-relative h-100"
        onMouseUp={() => handlePath()}
        onTouchStart={() => handlePath()}
      >
        {isBrushing && (
          <TailSpin
            height="50"
            width="50"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass="position-absolute justify-content-center"
            visible={true}
          />
        )}
        <ReactSketchCanvas
          height={imageDimension?.height}
          width={imageDimension?.width}
          className={
            "cursor-area canvas-con" + (isBrushing ? "loading-image" : "")
          }
          ref={canvas}
          style={{
            // height: canvasDimention?.height,
            // width: canvasDimention?.width,
            // objectFit: "contain",
            margin: "0 auto",
            cursor: "none",
          }}
          strokeWidth={brushData.brushStock}
          eraserWidth={brushData.brushStock}
          strokeColor="#e4c725bf"
          // preserveBackgroundImageAspectRatio="xMidYMid meet"
          backgroundImage={imageData.base64Start + imageData.originalImage}
        />
      </div>

      <CustomCursor
        targets={[".cursor-area"]}
        customClass="custom-cursor"
        dimensions={brushData.brushStock * 2}
        strokeColor="#e4c725bf"
        fill="#e4c725bf"
        smoothness={{
          movement: 0.2,
          scale: 0.1,
          opacity: 0.4,
        }}
        opacity={0}
        targetScale={1}
        // targetOpacity={0.4}
      />
    </div>
  );
}

export default Canvas;
