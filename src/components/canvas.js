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


    // console.log(paths)
    let dyanmicCanvas = document.getElementById("CANVAS");
    // dyanmicCanvas.height = 614;
    // dyanmicCanvas.width = 1024;
    let ctx = dyanmicCanvas.getContext("2d");
    var img = document.createElement("IMG");
    img.onload = function () {
      dyanmicCanvas.height = img.height;
      dyanmicCanvas.width = img.width;
      console.log(img.height, img.width);
     ctx.drawImage(img, 0, 0);
    //  ctx.fillStyle = "black";
    //  ctx.fillRect(0, 0, dyanmicCanvas.width, dyanmicCanvas.height);
     ctx.fill();
     ctx.save();
    
      let percentDecreaseHeight =
        100 - (imageData.imageDimension[0] / img.height) * 100;
      let percentDecreaseWidth =
        100 - (imageData.imageDimension[1] / img.width) * 100;
     
    //  ctx.translate(0.5, 0.5);
     ctx.beginPath();
     ctx.lineCap = "round";
     ctx.lineJoin = "round";
     ctx.lineWidth = 30;
     let decreaseY = (paths[0]?.y / 100) * percentDecreaseHeight;
     let decreaseX = (paths[0]?.x / 100) * percentDecreaseWidth;
     console.log(paths[0]?.x, paths[0]?.y);
     paths[0].y = paths[0]?.y + decreaseY;
     paths[0].x = paths[0]?.x + decreaseX;
     
     console.log(decreaseY, decreaseX);
     ctx.moveTo(paths[0]?.x, paths[0]?.y);
    //  console.log(paths[0]?.x, paths[0]?.y)
    //   ctx.lineTo(paths[0 + 1]?.x, paths[0 + 1]?.y);
    // ctx.moveTo(paths[i]?.x, paths[i]?.y);

     for(let i=1;i<paths?.length;i++){
       let decreaseY = (paths[i]?.y / 100) * percentDecreaseHeight;
       let decreaseX = (paths[i]?.x / 100) * percentDecreaseWidth;

       paths[i].y = paths[i]?.y + decreaseY;
       paths[i].x = paths[i]?.x + decreaseX;

      //  ctx.moveTo(paths[i]?.x, paths[i]?.y);
       ctx.lineTo(Math.round(paths[i]?.x), Math.round(paths[i]?.y));
     }
     ctx.closePath();
     ctx.strokeStyle = "white";
     ctx.stroke();
     ctx.clip();

    //  ctx.fillStyle = "white";
    //  ctx.fill();
     ctx.restore();;
    };
    img.src = imageData.base64Start + imageData.originalImage;
    // setTimeout(() => {
      
    //   var jpegUrl = dyanmicCanvas.toDataURL();
    //   console.log(jpegUrl);
    // }, 5000);
  }


  const handlePath = async () => {
    if (canvas) {
      clearTimeout(setTimoutHandle);
      setTimoutHandle = setTimeout(async () => {
        let path;
        path = await canvas.current.exportPaths();
        // console.log(path)
          // removeSelectedPath(path[0].paths);
        if (path.length && false) {
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
        className="h-max-80vh row"
        onMouseUp={() => handlePath()}
        onTouchStart={() => handlePath()}
      >
        <ReactSketchCanvas
          className="cursor-area"
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
        <canvas id="CANVAS"></canvas>
      </div>
      {/* </TransformComponent>
      </TransformWrapper> */}
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
