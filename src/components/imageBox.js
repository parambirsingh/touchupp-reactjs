import React, { useContext, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ImageContext } from "../context/imageContext";
import { TailSpin } from "react-loader-spinner";

let originalHeight = 486;
let originalWidth = 864;
let originalCoord = [];
function ImageBox({ isDeletingObject }) {
  const [imageData] = useContext(ImageContext);
  const imageRef = useRef();
  const boxRef = useRef();

  const handleResize = () => {
    if (!imageRef || !boxRef) return;
    // let arr = [imageRef.current.clientWidth, imageRef.current.clientHeight]
    // setImage2Dimension([imageRef.current.clientWidth, imageRef.current.clientHeight])
    // setImageDimension(arr)
    // let percentDecreaseHeight = 0
    // let percentDecreaseWidth = 0
    // let xStart = 0
    // let yStart = 0
    // let coords = [...coord]
    // coords.map((v, i) => {
    //     xStart = (boxRef.current.clientWidth - imageRef.current.clientWidth) / 2
    //     yStart = (boxRef.current.clientHeight - imageRef.current.clientHeight) / 2
    //     percentDecreaseHeight = 100 - ((imageRef.current.clientHeight / originalHeight) * 100)
    //     percentDecreaseWidth = 100 - ((imageRef.current.clientWidth / originalWidth) * 100)
    //     let decreaseY = (originalCoord[i].coordinates[1] / 100) * percentDecreaseHeight
    //     let decreaseX = (originalCoord[i].coordinates[0] / 100) * percentDecreaseWidth
    //     v.coordinates[1] = yStart + (originalCoord[i].coordinates[1] - decreaseY)
    //     v.coordinates[0] = xStart + (originalCoord[i].coordinates[0] - decreaseX)
    // return v
    // })
    // setCoord(coords)
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
    <TransformWrapper doubleClick={{ disabled: true }}>
      <TransformComponent>
        <div
          ref={boxRef}
          className="mt-2 w-100 d-grid place-items-center justify-content-center position-relative h-100"
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
            className={
              "h-100 object-fit rounded-2 " +
              (isDeletingObject && "loading-image")
            }
            style={{ objectFit: "contain", maxWidth: "100%" }}
            alt="img"
          />
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default ImageBox;
