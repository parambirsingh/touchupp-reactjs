import React, { useContext, useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { ImageContext } from "../context/imageContext";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Constants } from "../data/constants";
 
function Canvas({ brushData }) {
  const [imageData] = useContext(ImageContext);
  const canvas = useRef();

  let setTimoutHandle;

  useEffect(()=>{
    canvas.current.height =  imageData.imageDimension[1];
    canvas.current.width = imageData.imageDimension[0]
    canvas.current.resetCanvas();
  },[imageData.imageDimension])

  const removeSelectedPath = (paths)=>{
    console.log(paths)
    let canvas = document.createElement("CANVAS");
    canvas.height = 400;
    canvas.width = 700;
    let ctx = canvas.getContext("2d");
    var img = document.createElement("IMG");
    img.onload = function () {
     ctx.drawImage(img, 0, 0);
     ctx.fillStyle = "black";
     ctx.fillRect(0, 0, canvas.width, canvas.height);
     ctx.fill();
     ctx.save();
     ctx.translate(0.5, 0.5);
     ctx.beginPath();
    //  ctx.moveTo(paths[0]?.x, paths[0]?.y);
    //  console.log(paths[0]?.x, paths[0]?.y)
    //   ctx.lineTo(paths[0 + 1]?.x, paths[0 + 1]?.y);
    // ctx.moveTo(paths[i]?.x, paths[i]?.y);

     for(let i=1;i<paths?.length;i+=2){
       ctx.moveTo(paths[i]?.x, paths[i]?.y);
       ctx.lineTo(Math.round(paths[i+1]?.x), Math.round(paths[i+1]?.y));
     }
     ctx.closePath();
     ctx.clip();
     ctx.fillStyle = "white";
     ctx.fill();
     ctx.restore();;
    };
    img.src = imageData.base64Start + imageData.originalImage;
    setTimeout(() => {
      
      var jpegUrl = canvas.toDataURL();
      console.log(jpegUrl);
    }, 2000);
  }


  const handlePath = async () => {
    if (canvas) {
      clearTimeout(setTimoutHandle);
      setTimoutHandle = setTimeout(async () => {
        let path;
        path = await canvas.current.exportPaths();
          // removeSelectedPath(path[0].paths);
        if (path.length ) {
          // console.log('return:', path)
          let data = await canvas.current.exportImage("png");
          if (!data) return;
          data = data.slice(data?.indexOf(",") + 1);
          const h = (arr) => {
            if (imageData.currentIndex < arr.length - 1)
              arr.splice(
                imageData.currentIndex + 1,
                arr.length - imageData.currentIndex,
                data
              );
            else arr.push(data);
            // setImageData({ ...imageData, currentIndex: arr.length - 1 });
            return arr;
          };
          let history =  h(imageData.imageHistory)
          console.log(history[history?.length - 1]);
          // setImageData({
          //   ...imageData,
          //   image:history[history?.length-1],
          //   currentIndex: history.length-1
          // });
        }
      }, 1000);
    }
  };
  return (
    <div className="mt-2 d-flex justify-content-center">
      {/* <TransformWrapper doubleClick={{ disabled: true }}>
        <TransformComponent> */}
      <div
        className="cursor-area h-max-80vh row"
        onMouseUp={() => handlePath()}
        onTouchStart={() => handlePath()}
      >
        <ReactSketchCanvas
          ref={canvas}
          style={{
            height: imageData.imageDimension[1],
            width: imageData.imageDimension[0],
            margin: "0 auto",
            cursor: "none",
          }}
          strokeWidth={brushData.brushStock}
          eraserWidth={brushData.brushStock}
          strokeColor="#e4c725bf"
          preserveBackgroundImageAspectRatio="none"
          backgroundImage={imageData.base64Start + imageData.originalImage}
        />
       
      </div>
      {/* </TransformComponent>
      </TransformWrapper> */}
      <CustomCursor
        targets={[".cursor-area"]}
        customclassName="custom-cursor"
        dimensions={brushData.brushStock * 2}
        strokeColor="#e4c725bf"
        fill="#e4c725bf"
        smoothness={{
          movement: 0.2,
          scale: 0.1,
          opacity: 0.2,
        }}
        targetScale={1}
        // targetOpacity={2}
      />
    </div>
  );
}

export default Canvas;
