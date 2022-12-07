import React, { useContext, useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ImageContext } from "../context/imageContext";

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
    let arr = [imageRef.current.clientWidth, imageRef.current.clientHeight];
    let newDimensions = { imageDimension: arr, image2Dimension: arr };
    //  imageData.imageDimension=arr;
    //  imageData.image2Dimension=arr

    let percentDecreaseHeight = 0;
    let percentDecreaseWidth = 0;
    let xStart = 0;
    let yStart = 0;
    let coords = JSON.parse(JSON.stringify(imageData?.coords));

    coords.map((v, i) => {
      xStart = (boxRef.current.clientWidth - imageRef.current.clientWidth) / 2;
      yStart =
        (boxRef.current.clientHeight - imageRef.current.clientHeight) / 2;
      percentDecreaseHeight =
        100 - (imageRef.current.clientHeight / originalHeight) * 100;
      percentDecreaseWidth =
        100 - (imageRef.current.clientWidth / originalWidth) * 100;
      let decreaseY =
        (originalCoord[i].coordinates?.[1] / 100) * percentDecreaseHeight;
      let decreaseX =
        (originalCoord[i].coordinates?.[0] / 100) * percentDecreaseWidth;
      v.coordinates[1] =
        yStart + (originalCoord[i].coordinates?.[1] - decreaseY);
      v.coordinates[0] =
        xStart + (originalCoord[i].coordinates?.[0] - decreaseX);
      return v;
    });
    setRef({ coords, ...newDimensions });
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
      originalHeight = imageRef.current.naturalHeight;
      originalWidth = imageRef.current.naturalWidth;
      handleResize();
    });
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <TransformWrapper doubleClick={{ disabled: true }}>
        <TransformComponent>
          <div
            ref={boxRef}
            className="mt-2 d-flex justify-content-center position-relative"
            // style={{ transform: `scale(${imageData?.scale})` }}
          >
            {imageData.coords.map((c) => (
              <div
                className="position-absolute"
                key={c.key}
                style={{
                  top: c.coordinates[1] + "px",
                  left: c.coordinates[0] + "px",
                }}
              >
                <span
                  className="hover-danger text-primary cursor-pointer"
                  onClick={() =>
                    !isDeletingObject ? handleObjectClick(c) : ""
                  }
                >
                  <i className="bi bi-x-circle-fill"></i>
                  {/* <span className='text-white text-wrap'>
                                    {c.key}
                                </span> */}
                </span>
              </div>
            ))}

            <img
              ref={imageRef}
              src={imageData.base64Start + imageData.image}
              className="h-max-80vh object-fit rounded-2"
              style={{ objectFit: "contain", maxWidth: "100%" }}
              alt="img"
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default DetectedImageBox;