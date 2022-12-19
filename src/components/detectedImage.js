import React, { useContext, useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ImageContext } from "../context/imageContext";
import ZoomTools from "./zoomTools";

let originalHeight = 0;
let originalWidth = 0;
let originalCoord = [];
function DetectedImageBox({ handleObjectClick, isDeletingObject }) {
  const [imageData, setImageData] = useContext(ImageContext);
  const [ref, setRef] = useState({});

  const imageRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    originalCoord = JSON.parse(JSON.stringify(imageData?.coords)) || [];
  }, [imageData.image]);

  useEffect(() => {
    // if(ref.originalImage){
    setImageData({ ...imageData, ...ref });
    // }
  }, [ref]);
  const handleResize = () => {
    if (!imageRef || !boxRef) return;
    // let arr = [imageRef.current.clientWidth, imageRef.current.clientHeight];

    let percentDecreaseHeight = 0;
    let percentDecreaseWidth = 0;
    let xStart = 0;
    let yStart = 0;
    let coords = JSON.parse(JSON.stringify(imageData?.coords));
    coords?.map((v, i) => {
      xStart =
        (boxRef?.current?.clientWidth - imageRef?.current?.clientWidth) / 2;
      yStart =
        (boxRef?.current?.clientHeight - imageRef?.current?.clientHeight) / 2;
      percentDecreaseHeight =
        100 - (imageRef?.current?.clientHeight / originalHeight) * 100;
      percentDecreaseWidth =
        100 - (imageRef?.current?.clientWidth / originalWidth) * 100;
      let decreaseY =
        (originalCoord[i]?.coordinates?.[1] / 100) * percentDecreaseHeight;
      let decreaseX =
        (originalCoord[i]?.coordinates?.[0] / 100) * percentDecreaseWidth;
      let decreaseWidth =
        (originalCoord[i]?.coordinates?.[2] / 100) * percentDecreaseWidth;
      let decreaseHeight =
        (originalCoord[i]?.coordinates?.[3] / 100) * percentDecreaseHeight;
      v.coordinates[0] =
        xStart + (originalCoord[i].coordinates?.[0] - decreaseX);
      v.coordinates[1] =
        yStart + (originalCoord[i].coordinates?.[1] - decreaseY);
      v.coordinates[2] =
        xStart + (originalCoord[i].coordinates?.[2] - decreaseWidth);
      v.coordinates[3] =
        yStart + (originalCoord[i].coordinates?.[3] - decreaseHeight);
      return v;
    });
    setRef({ coords });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (originalCoord?.length === 0) {
      originalCoord = JSON.parse(JSON.stringify(imageData?.coords));
    }
    setTimeout(() => {
      if (originalCoord?.length < 0) return;
      let img = new Image();
      img.onload = () => {
        originalHeight = img?.height;
        originalWidth = img?.width;
        handleResize();
      };
      img.src = imageData?.base64Start + imageData?.image;
    });
  }, []);

  
  return (
    // <div className="d-flex justify-content-center">
    <TransformWrapper
      doubleClick={{ disabled: true }}
      centerOnInit={true}
      centerZoomedOut={true}
      wheel={{ disabled: true }}
      // pinch={{ disabled: true }}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <TransformComponent>
            <div
              ref={boxRef}
              className="d-flex justify-content-center align-items-center position-relative cursor-pan"
              // style={{ transform: `scale(${imageData?.scale})` }}
            >
              <TailSpin
                height="50"
                width="50"
                color="#dc3545"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{ zIndex: 5 }}
                wrapperClass="position-absolute justify-content-center align-items-center h-100 w-100 cursor-not-allowed"
                visible={isDeletingObject}
              />

              {imageData?.coords?.length &&
                imageData?.coords?.map(
                  (c) =>
                    !c.isTrashed && (
                      <div key={c?.key}>
                        <div
                          className="position-absolute object-box-key"
                          style={{
                            top: c.coordinates[1] - 20 + "px",
                            left: c.coordinates[0] + "px",
                            backgroundColor: `rgb(${c.color?.join(",")})`,
                          }}
                        >
                          {c?.key?.slice(
                            0,
                            c?.key?.indexOf("0") > -1
                              ? c?.key?.indexOf("0")
                              : c?.key?.length
                          )}
                        </div>
                        <div
                          className="position-absolute object-box"
                          style={{
                            top: c.coordinates[1] + "px",
                            left: c.coordinates[0] + "px",
                            width: c.coordinates[2] - c.coordinates[0] + "px",
                            height: c.coordinates[3] - c.coordinates[1] + "px",
                            borderColor: `rgb(${c.color?.join(",")})`,
                          }}
                        ></div>
                        <div
                          className="position-absolute object-button"
                          style={{
                            top: c.coordinates[1] + "px",
                            left: c.coordinates[2] + "px",
                            zIndex: isDeletingObject ? 0 : 1,
                          }}
                        >
                          <span
                            className="hover-danger  cursor-pointer"
                            style={{ color: `rgb(${c.color?.join(",")})` }}
                            onClick={() =>
                              !isDeletingObject ? handleObjectClick(c) : ""
                            }
                          >
                            <i className="bi bi-x-circle-fill"></i>
                            {c?.isTrashed}
                            {/* <span className='text-white text-wrap'>
                                    {c.key}
                                </span> */}
                          </span>
                        </div>
                      </div>
                    )
                )}

              <img
                ref={imageRef}
                src={imageData.base64Start + imageData?.originalImage}
                className={
                  "object-fit rounded-2 " +
                  (isDeletingObject && "loading-image")
                }
                style={{ objectFit: "contain", maxWidth: "100%" }}
                alt="img"
              />
            </div>
          </TransformComponent>
          <ZoomTools
            zoomIn={zoomIn}
            zoomOut={zoomOut}
            resetTransform={resetTransform}
          />
        </>
      )}
    </TransformWrapper>
  );
}

export default DetectedImageBox;
