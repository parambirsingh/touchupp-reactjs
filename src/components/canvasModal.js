import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { ImageContext } from "../context/imageContext";
import Canvas from "./canvas";
import Toolbar from "./toolbar";
import {abortImgageServices} from "../services/imageServices"

function CanvasModal({
  brushData,
  setBrushData,
  brushedImage,
  setBrushedImage,
  isBrushing,
  imageDimension,
}) {
  const [paths, setPaths] = useState([]);
  const [imageData] = useContext(ImageContext);

  const boxRef = useRef();


  const handleDone = () => {
    if (!paths?.length || !paths?.[0]?.paths?.length) return;
    // setPaths([])
    removeSelectedPath();
  };

  const draw = (ctx, img) => {
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();
    for (let item of paths) {
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = brushData.brushStock;

      ctx.moveTo(item?.paths[0]?.x, item?.paths[0]?.y);
      for (let i = 1; i < item?.paths?.length; i++) {
        // let decreaseY = (item?.paths[i]?.y / 100) * percentDecreaseHeight;
        // let decreaseX = (item?.paths[i]?.x / 100) * percentDecreaseWidth;

        // item?.paths[i].y =  item?.paths[i]?.y + decreaseY;
        // item?.paths[i].x =  item?.paths[i]?.x + decreaseX;

        //  ctx.moveTo(item?.paths[i]?.x, item?.paths[i]?.y);
        ctx.lineTo(
          Math.round(item?.paths[i]?.x),
          Math.round(item?.paths[i]?.y)
        );
      }
      ctx.closePath();
      ctx.strokeStyle = "white";
      ctx.stroke();
    }

       var jpegUrl = ctx.canvas.toDataURL("image/jpeg");
   
    let brushedSrc = jpegUrl.slice(jpegUrl?.indexOf(",") + 1);
    setBrushedImage(brushedSrc);
    // canvas.current?.clearCanvas();
  };

  const removeSelectedPath = () => {
    let dyanmicCanvas = document.createElement("CANVAS");
    // dyanmicCanvas.height = 614;
    // dyanmicCanvas.width = 1024;
    var img = document.createElement("IMG");
    img.onload = function () {
      dyanmicCanvas.height = img.height;
      dyanmicCanvas.width = img.width;
      let ctx = dyanmicCanvas.getContext("2d");
      // console.log(img.height, img.width);
      draw(ctx, img, dyanmicCanvas);
    };
    img.src = imageData.base64Start + imageData.originalImage;
  };

  return (
    <>
      <Modal
        show={brushData?.brushMode}
        fullscreen={true}
        onHide={() => {setBrushData({ ...brushData, brushMode: false });abortImgageServices()}}
        backdrop="static"
        keyboard={false}
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Brush Image</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={boxRef}>
          <Canvas
            brushData={brushData}
            brushedImage={brushedImage}
            isBrushing={isBrushing}
            setBrushedImage={setBrushedImage}
            setPaths={setPaths}
            imageDimension={imageDimension}
          />
        </Modal.Body>
        <Modal.Footer>
          <Toolbar
            brushData={brushData}
            setBrushData={setBrushData}
            paths={paths}
            handleDone={handleDone}
            isBrushing={isBrushing}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CanvasModal;
