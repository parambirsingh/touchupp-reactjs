import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { ImageContext } from "../context/imageContext";
import Canvas from "./canvas";
import Toolbar from "./toolbar";
import { abortImageServices } from "../services/imageServices";

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
  const [modal, setModal] = useState({ height: 700, width: 700 });

  const boxRef = useRef();

  const handleDone = () => {
    if (!paths?.length || !paths?.[0]?.paths?.length) return;
    removeSelectedPath();
  };

  const draw = (ctx, img) => {
    let canvaHeight = paths?.[0]?.height
    let canvaWidth = paths?.[0]?.width
      let rx = ctx.canvas.width/canvaWidth;
      let ry = ctx.canvas.height/canvaHeight;
   
    let modifiedPaths  = paths?.map(p=>{  
      let temp={...p};
      temp.paths = temp?.paths?.map(q=>{
        let tempQ = {};
        // tempQ.x = Math.round(q?.x + decreaseX);
        // tempQ.y = Math.round(q?.y + decreaseY);
        tempQ.x = Math.round(q?.x*rx);
        tempQ.y = Math.round(q?.y *ry);
        console.log(tempQ, q);
        return tempQ;
      })
      return temp
    })
    
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();
    for (let item of modifiedPaths) {
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = item.strokeWidth*rx;
      
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

    let brushedSrc = jpegUrl.slice(jpegUrl?.indexOf(",") + 1);
    setBrushedImage(brushedSrc);
    // canvas.current?.clearCanvas();
  };

  const removeSelectedPath = () => {
    let dyanmicCanvas = document.createElement("CANVAS");
    var img = document.createElement("IMG");
    img.onload = function () {
      dyanmicCanvas.height = img.height;
      dyanmicCanvas.width = img.width;
      let ctx = dyanmicCanvas.getContext("2d");
      draw(ctx, img);
    };
    img.src = imageData.base64Start + imageData.originalImage;
  };

  const handleResize = () => {
    if (!boxRef?.current) return;
    // let ratio = imageDimension.width / imageDimension.height;

    let obj = {
      height: boxRef.current.clientHeight,
      width: boxRef.current.clientWidth,
    };
    setModal({ ...obj });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Modal
        show={brushData?.brushMode}
        fullscreen={true}
        // onHide={() => {
        //   setBrushData({ ...brushData, brushMode: false });
        //   abortImageServices();
        // }}
        backdrop="static"
        keyboard={false}
        animation={false}
        centered
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Brush Image</Modal.Title>
          <div
            className="cursor-pointer modal-title h5"
            onClick={() => {
              setBrushData({ ...brushData, brushMode: false });
              abortImageServices();
            }}
          >
            <i className="bi bi-arrow-left me-1 "></i>
            <span>Back</span>
          </div>
        </Modal.Header>
        <Modal.Body ref={boxRef}>
          <Canvas
            brushData={brushData}
            brushedImage={brushedImage}
            isBrushing={isBrushing}
            setBrushedImage={setBrushedImage}
            setPaths={setPaths}
            imageDimension={imageDimension}
            modal={modal}
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
