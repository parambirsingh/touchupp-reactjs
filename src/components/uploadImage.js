import React, { useContext, useEffect, useRef, useState } from "react";
import headingImg from "../assets/img/underline.svg";
import { ImageContext } from "../context/imageContext";
import { Constants } from "../data/constants";
// import { Constants } from '../data/constants';

function UploadImage({ isGettingImage, localSrc, setLocalSrc }) {
  const [imageData, setImageData] = useContext(ImageContext);

  const image = useRef();

  useEffect(() => {
    let element = document.getElementById("imgCon");
    element?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  };

  const previewImage = (data)=>{
     setLocalSrc(data);
      setTimeout(() => {
        let element = document.getElementById("imgCon");
        element?.scrollIntoView({ block: "start", behavior: "smooth" });
      });
  }

  const handleFile = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
     previewImage(reader.result);
    };
    reader.onerror = function (error) {
      //  console.log("Error: ", error);
    };
  };

  const emptyImage = () => {
    setLocalSrc("");
    if (image?.current?.value) image.current.value = "";
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  const proceed = () => {
    let data = localSrc?.slice(localSrc?.indexOf(",") + 1);
    let start = localSrc?.slice(0, localSrc?.indexOf(",") + 1);

    setImageData({
      ...imageData,
      originalImage: data,
      base64Start: start,
      getImage: !imageData.getImage,
    });
  };

  useEffect(() => {
    const image_drop_area = document.querySelector("#image_drop_area");
    if (!image_drop_area) return;
    image_drop_area?.addEventListener("dragover", (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (!isGettingImage) {
        image_drop_area.style.borderColor = "#00C";
        event.dataTransfer.dropEffect = "copy";
      }
    });

    image_drop_area.addEventListener("drop", (event) => {
      event.stopPropagation();
      event.preventDefault();
      image_drop_area.style.borderColor = "#656565";
      if (!isGettingImage) {
        const fileList = event?.dataTransfer?.files;
        if (fileList?.[0]) handleFile(fileList?.[0]);
      }
    });

    image_drop_area.addEventListener("dragleave", (event) => {
      event.stopPropagation();
      event.preventDefault();
      image_drop_area.style.borderColor = "#656565";
    });
  }, [localSrc]);
  return (
    <section className={`py-xl-5 text-center ${!localSrc ? "my-xxl-5" : ""}`}>
      <div className={`container py-lg-5  ${!localSrc ? "my-xxl-5" : ""}`}>
        <div className={`row ${!localSrc ? "py-xxl-5" : ""}`}>
          <div className="col-md-8 mx-auto">
            <div className="position-relative d-inline-block mb-4 py-1">
              <h2 className="fw-bold mb-3 d-flex">
                <span className="text-danger me-2">Redesign </span> your space
                <img
                  src={headingImg}
                  alt="img"
                  className="img-fluid bottom-0 position-absolute text-heading"
                />
              </h2>
            </div>
            <div className="w-100">
              {/* <button
                type="button"
                disabled={isGettingImage}
                onClick={()=>setOriginalImage(Constants.base64Image)}
                className="btn btn-primary text-uppercase btn-theme fw-bold font-nunito"
              >
                {isGettingImage ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span> Loading... </span>
                  </>
                ) : (
                  <span>See Examples</span>
                )}
              </button> */}
              {!localSrc && (
                <div>
                  <div className="file file-upload mt-5 position-relative ">
                    <label
                      htmlFor="input-file"
                      className="w-100 cursor-pointer d-flex align-items-center justify-content-center flex-wrap"
                      id="image_drop_area"
                    >
                      <div className="text-center">
                        {/* <img
                        src={uploadicon}
                        alt="upload"
                        className="img-fluid mb-3"
                      /> */}

                        {/* <svg
                        id="pic"
                        width="76"
                        height="76"
                        viewBox="0 0 76 76"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1_71)">
                          <path d="M15.2887 66.5L15.2253 66.5633L15.1588 66.5H9.47468C8.64125 66.4992 7.84225 66.1675 7.25323 65.5779C6.6642 64.9883 6.33334 64.1889 6.33334 63.3555V12.6445C6.33914 11.8129 6.67186 11.0169 7.25963 10.4285C7.84741 9.84016 8.64305 9.50663 9.47468 9.5H66.5253C68.2607 9.5 69.6667 10.9092 69.6667 12.6445V63.3555C69.6609 64.1871 69.3282 64.9831 68.7404 65.5715C68.1526 66.1598 67.357 66.4934 66.5253 66.5H15.2887ZM63.3333 47.5V15.8333H12.6667V60.1667L44.3333 28.5L63.3333 47.5ZM63.3333 56.4553L44.3333 37.4553L21.622 60.1667H63.3333V56.4553ZM25.3333 34.8333C23.6536 34.8333 22.0427 34.1661 20.855 32.9783C19.6673 31.7906 19 30.1797 19 28.5C19 26.8203 19.6673 25.2094 20.855 24.0217C22.0427 22.8339 23.6536 22.1667 25.3333 22.1667C27.013 22.1667 28.624 22.8339 29.8117 24.0217C30.9994 25.2094 31.6667 26.8203 31.6667 28.5C31.6667 30.1797 30.9994 31.7906 29.8117 32.9783C28.624 34.1661 27.013 34.8333 25.3333 34.8333Z" />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_71">
                            <rect width="76" height="76" fill="white" />
                          </clipPath>
                        </defs>
                      </svg> */}

                        <div className="w-100 fw-semibold etxt-center">
                          Click here or drag an image file
                        </div>
                      </div>
                    </label>
                    <input
                      id="input-file"
                      ref={image}
                      onChange={(e) => handleChange(e)}
                      type="file"
                      disabled={isGettingImage}
                      accept="image/*"
                    />
                  </div>
                  <div className="sample-images mt-4 pt-1">
                    <div className="mt-5 fw-semibold etxt-center fs-5">
                      <i className="bi bi-arrow-down"></i>
                      <span> Try with an example </span>
                    </div>  
                    <div className="mt-3 row justify-content-center">
                      {Constants.sampleImages?.map((sample) => {
                        return (
                          <div className="col-2" key={sample.name}>
                            <img
                              onClick={() =>
                                previewImage(
                                  Constants.base64Start + sample?.src
                                )
                              }
                              src={Constants.base64Start + sample?.src}
                              className="img-fluid sample-img rounded"
                              alt="img"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {localSrc && (
        <div className="container">
          <div className="col-10 mx-auto">
            <img
              src={localSrc}
              className="image-container img-fluid"
              id="imgCon"
              alt="img"
            />
          </div>
          <div className=" d-flex justify-content-center mt-5">
            <button
              className="btn btn-danger me-2"
              onClick={emptyImage}
              disabled={isGettingImage}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => proceed()}
              disabled={isGettingImage}
            >
              <div className="w-100 fw-semibold etxt-center">
                {isGettingImage ? (
                  "Uploading...."
                ) : (
                  <>
                    <span>Redesign the room</span>
                    <i className="bi bi-arrow-right ms-2"></i>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default UploadImage;
