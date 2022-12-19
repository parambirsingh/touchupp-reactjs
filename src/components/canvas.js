import React, { useContext, useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { ImageContext } from "../context/imageContext";
import { TailSpin } from "react-loader-spinner";
import { Constants } from "../data/constants";

function Canvas({
  brushData,
  brushedImage,
  isBrushing,
  setPaths,
  imageDimension,
  setBrushedImage,
  setDrawPath
}) {
  const [imageData] = useContext(ImageContext);

  const canvas = useRef();
  const boxRef = useRef();

    const handleDone = (paths) => {
      if (!paths?.length || !paths?.[0]?.paths?.length) return;
      removeSelectedPath(paths);
    };

    const draw = (ctx, img,paths) => {
      let canvaHeight = getDimention()?.height;
      let canvaWidth = getDimention()?.width;
      let rx = ctx.canvas.width / canvaWidth;
      let ry = ctx.canvas.height / canvaHeight;

      let modifiedPaths = paths?.map((p) => {
        let temp = { ...p };
        temp.paths = temp?.paths?.map((q) => {
          let tempQ = {};
          tempQ.x = Math.round(q?.x * rx);
          tempQ.y = Math.round(q?.y * ry);
          return tempQ;
        });
        return temp;
      });
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fill();
      for (let item of modifiedPaths) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = item.strokeWidth * rx;

        ctx.moveTo(item?.paths[0]?.x, item?.paths[0]?.y);
        for (let i = 1; i < item?.paths?.length; i++) {
          ctx.lineTo(
            Math.round(item?.paths[i]?.x),
            Math.round(item?.paths[i]?.y)
          );
        }
        // ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();
      }

      var jpegUrl = ctx.canvas.toDataURL("image/jpeg");
      //     var newTab = window.open();
      // newTab.document.body.innerHTML = `<img src="${jpegUrl}`
      let brushedSrc = jpegUrl.slice(jpegUrl?.indexOf(",") + 1);
      setDrawPath(modifiedPaths);
      setBrushedImage(brushedSrc);
    };

    const removeSelectedPath = (paths) => {
      let dyanmicCanvas = document.createElement("CANVAS");
      var img = document.createElement("IMG");
      img.onload = function () {
        dyanmicCanvas.height = img.height;
        dyanmicCanvas.width = img.width;
        let ctx = dyanmicCanvas.getContext("2d");
        draw(ctx, img,paths);
      };
      img.src = imageData.base64Start + imageData.originalImage;
    };

 
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
    if(isBrushing) return;
    if (canvas?.current) {
      let path = await canvas?.current?.exportPaths();
     
      if (path?.[0]?.paths){
        // path[0].height = getDimention()?.height;
        // path[0].width = getDimention()?.width;
       handleDone(path)
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
 
  const getDimention = () => {
    return imageDimension?.width > 1000
      ? window?.innerWidth >= Constants?.screenDimensions?.xl?.screenWidth
        ? Constants?.screenDimensions?.xl
        : window?.innerWidth >= Constants?.screenDimensions?.lg?.screenWidth
        ? Constants?.screenDimensions?.lg
        : window?.innerWidth >= Constants?.screenDimensions?.md?.screenWidth
        ? Constants?.screenDimensions?.md
        : Constants?.screenDimensions?.sm
      : imageDimension;
  };
  return (
    <div className="h-100 d-flex justify-content-center align-items-center w-100">
      <div
        ref={boxRef}
        className="row mx-0 align-items-center justify-content-center position-relative h-100 hover-effect"
        onMouseUp={() => handlePath()}
        onTouchStart={() => handlePath()}
        // onMouseOut={() => handlePath()}
      >
        <TailSpin
          height="50"
          width="50"
          color="#dc3545"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{zIndex:10001}}
          wrapperClass="position-absolute justify-content-center align-items-center h-100 w-100"
          visible={isBrushing}
        />
 
        <ReactSketchCanvas
          height={getDimention()?.height}
          width={getDimention()?.width}
          className={"canvas-con  " + (isBrushing ? "loading-image" : "")}
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
