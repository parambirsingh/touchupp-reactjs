import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { ImageContext } from "../context/imageContext";
import Canvas from "./canvas";
import Toolbar from "./toolbar";

function CanvasModal({
  brushData,
  setBrushData,
  brushedImage,
  setBrushedImage,
  isBrushing,
}) {
  const [canvasDimention, setCanvasDimention] = useState({
    height: window.innerHeight - 50,
    width: window.innerWidth - 50,
  });
  const [imageData] = useContext(ImageContext);

  const [originalDimention, setOriginalDimention] = useState({
    height: window.innerHeight - 50,
    width: window.innerWidth - 50,
  });
  const boxRef = useRef();
  const handleResize = () => {
    if (!boxRef?.current) return;
    //  let percentDecreaseHeight =
    //    100- (boxRef?.current?.clientHeight / originalDimention?.height) * 100;
    //  let percentDecreaseWidth =
    //     100-(boxRef?.current?.clientWidth / originalDimention?.width) * 100;
    // let newHeight =
    //   boxRef?.current?.clientWidth /
    //   (originalDimention.width / originalDimention?.height);

    // let newWidth =
    //   newHeight * (originalDimention.width / originalDimention?.height);
    let data = {
      height:
        boxRef?.current?.clientHeight > originalDimention?.height
          ? originalDimention.height
          : boxRef?.current?.clientHeight,
      width:
        boxRef?.current?.clientWidth > originalDimention?.width
          ? originalDimention.width
          : boxRef?.current?.clientWidth,
    };

    // let data = {
    //   height:
    //     boxRef?.current?.clientWidth /
    //       (originalDimention.height / originalDimention?.width),
    //   width: boxRef?.current?.clientWidth/((originalDimention.height/originalDimention?.width)),
    // };

    setCanvasDimention(data);
  };

  const initCanvas = () => {
    let img = new Image();
    img.onload = function () {
      setOriginalDimention({ width: img.width, height: img.height });
      handleResize();
      window.addEventListener("resize", () => {
        handleResize();
      });
    };
    img.src = imageData.base64Start + imageData.originalImage;
  };
  useEffect(() => {
    setTimeout(() => {
      initCanvas();
    });
  }, [brushedImage]);

  return (
    <>
      <Modal
        show={brushData?.brushMode}
        fullscreen={true}
        onHide={() => setBrushData({ ...brushData, brushMode: false })}
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
            canvasDimention={canvasDimention}
            actualDimention={originalDimention}
            brushedImage={brushedImage}
            isBrushing={isBrushing}
            setBrushedImage={setBrushedImage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Toolbar brushData={brushData} setBrushData={setBrushData} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CanvasModal;
