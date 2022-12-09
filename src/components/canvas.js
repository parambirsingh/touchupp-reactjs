import React, { useContext, useEffect, useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { ImageContext } from "../context/imageContext";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { TailSpin } from "react-loader-spinner";

function Canvas({
  brushData,
  canvasDimention,
  actualDimention,
  brushedImage,
  setBrushedImage,
  isBrushing,
}) {
  const [imageData] = useContext(ImageContext);

  const canvas = useRef();
  const boxRef = useRef();

  useEffect(() => {
    if (!brushedImage) canvas.current?.clearCanvas();
  }, [brushedImage]);
  const draw = (ctx, img, paths) => {
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();
    // ctx.save();

    // let xStart = (boxRef.current.clientWidth - img.width) / 2;
    // let yStart = (boxRef.current.clientHeight - img.height) / 2;

    //  ctx.translate(0.5, 0.5);
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushData.brushStock;

    ctx.moveTo(paths[0]?.x, paths[0]?.y);
    for (let i = 1; i < paths?.length; i++) {
      // let decreaseY = (paths[i]?.y / 100) * percentDecreaseHeight;
      // let decreaseX = (paths[i]?.x / 100) * percentDecreaseWidth;

      // paths[i].y =  paths[i]?.y + decreaseY;
      // paths[i].x =  paths[i]?.x + decreaseX;

      //  ctx.moveTo(paths[i]?.x, paths[i]?.y);
      ctx.lineTo(Math.round(paths[i]?.x), Math.round(paths[i]?.y));
    }
    ctx.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke();

    // let percentDecreaseHeight =
    //   100 - (rect.height / img.height) * 100;
    // let percentDecreaseWidth =
    //   100 - (rect.width / img.width) * 100;

    // let decreaseY = (paths[0]?.y / 100) * percentDecreaseHeight;
    // let decreaseX = (paths[0]?.x / 100) * percentDecreaseWidth;
    // // console.log(paths[0]?.x, paths[0]?.y);
    // paths[0].y =   paths[0]?.y +decreaseY;
    // paths[0].x =  paths[0]?.x + decreaseX;

    // // console.log(decreaseY, decreaseX);
    // ctx.moveTo(paths[0]?.x, paths[0]?.y);
    // //  console.log(paths[0]?.x, paths[0]?.y)
    // //   ctx.lineTo(paths[0 + 1]?.x, paths[0 + 1]?.y);
    // // ctx.moveTo(paths[i]?.x, paths[i]?.y);

    // for (let i = 1; i < paths?.length; i++) {
    //   let decreaseY = (paths[i]?.y / 100) * percentDecreaseHeight;
    //   let decreaseX = (paths[i]?.x / 100) * percentDecreaseWidth;

    //   paths[i].y =  paths[i]?.y + decreaseY;
    //   paths[i].x =  paths[i]?.x + decreaseX;

    //   //  ctx.moveTo(paths[i]?.x, paths[i]?.y);
    //   ctx.lineTo(Math.round(paths[i]?.x), Math.round(paths[i]?.y));
    // }
    // ctx.closePath();
    // ctx.strokeStyle = "blue";
    // ctx.stroke();
    // ctx.clip();

    // //  ctx.fillStyle = "white";
    // //  ctx.fill();
    // ctx.restore();

    var jpegUrl = ctx.canvas.toDataURL("image/jpeg");
    // console.log(jpegUrl);
    let brushedSrc = jpegUrl.slice(jpegUrl?.indexOf(",") + 1);
    setBrushedImage(brushedSrc);
    // canvas.current?.clearCanvas();
  };

  let setTimoutHandle;

  const removeSelectedPath = (paths) => {
    // console.log(paths)
    let dyanmicCanvas = document.createElement("CANVAS");
    // dyanmicCanvas.height = 614;
    // dyanmicCanvas.width = 1024;
    var img = document.createElement("IMG");
    img.onload = function () {
      dyanmicCanvas.height = img.height;
      dyanmicCanvas.width = img.width;
      let ctx = dyanmicCanvas.getContext("2d");
      // console.log(img.height, img.width);
      draw(ctx, img, paths, dyanmicCanvas);
    };
    img.src = imageData.base64Start + imageData.originalImage;
  };

  const handlePath = async () => {
    if (canvas) {
      clearTimeout(setTimoutHandle);
      setTimoutHandle = setTimeout(async () => {
        let path;
        path = await canvas.current.exportPaths();

        if (path?.[0]?.paths) removeSelectedPath(path?.[0]?.paths);
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
          let history = h(imageData.imageHistory);
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
    <div className="mt-2">
      <div
        ref={boxRef}
        className="row align-items-center  position-relative"
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
          height={actualDimention.height}
          width={actualDimention.width}
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
