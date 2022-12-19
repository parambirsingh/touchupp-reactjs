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
  setDrawPath
}) {
  const [paths, setPaths] = useState([]);
  const [modal, setModal] = useState({ height: 700, width: 700 });

  const boxRef = useRef();

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
            setDrawPath={setDrawPath}
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
            // handleDone={handleDone}
            isBrushing={isBrushing}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CanvasModal;
