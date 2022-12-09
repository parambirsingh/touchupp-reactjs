import React, { useContext, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ImageContext } from "../context/imageContext";
import { TailSpin } from "react-loader-spinner";
import ZoomTools from "./zoomTools";

let originalHeight = 486;
let originalWidth = 864;
let originalCoord = [];
function ImageBox({ isDeletingObject, brushData, setBrushData }) {
  const [imageData] = useContext(ImageContext);
  const imageRef = useRef();
  const boxRef = useRef();

  const handleResize = () => {
    if (!imageRef || !boxRef) return;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (originalCoord.length === 0)
      originalCoord = JSON.parse(JSON.stringify(imageData.coords));
    setTimeout(() => {
      originalHeight = imageRef.current.naturalHeight;
      originalWidth = imageRef.current.naturalWidth;
      handleResize();
    });
  }, []);

  return (
    <TransformWrapper
      doubleClick={{ disabled: true }}
      centerOnInit={true}
      centerZoomedOut={true}
      wheel={{ disabled: true }}
      panning={{ disabled: true }}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <TransformComponent>
            <div
              ref={boxRef}
              className="mt-2 w-100 d-grid place-items-center position-relative h-100"
              // style={{ transform: `scale(${imageData.scale})` }}
            >
              {/* {coord.map((c) => (<div className='position-absolute' key={c.key} style={{ top: (c.coordinates[1]) + 'px', left: c.coordinates[0] + 'px' }}>
                            <span className='hover-danger text-primary cursor-pointer' onClick={()=>handleObjectClick(c)}>
                                <i className="bi bi-x-circle-fill"></i>
                            </span>
                        </div>))} */}
              {isDeletingObject && (
                <TailSpin
                  height="50"
                  width="50"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass="position-absolute"
                  visible={true}
                />
              )}
              <img
                ref={imageRef}
                src={imageData.base64Start + imageData.originalImage}
                className={"rounded-2" + (isDeletingObject && "loading-image")}
                style={{ objectFit: "contain", maxWidth: "100%" }}
                alt="img"
              />
            </div>
          </TransformComponent>
          {/* <ZoomTools
            zoomIn={zoomIn}
            zoomOut={zoomOut}
            resetTransform={resetTransform}
          /> */}
        </>
      )}
    </TransformWrapper>
  );
}

export default ImageBox;
