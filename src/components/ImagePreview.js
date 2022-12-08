import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ImageContext } from "../context/imageContext";
import ImageBox from "./imageBox";
import Share from "./share";
import Toolbar from "./toolbar";
import DetectedImageBox from "./detectedImage";

function ImagePreview({
  handleObjectClick,
  handleDownload,
  brushData,
  setBrushData,
  isDeletingObject,
}) {
  const [imageData, setImageData] = useContext(ImageContext);
  const handleBack = () => {
    setImageData({
      ...imageData,
      image: "",
      imageHistory: [],
      currentIndex: 0,
      coords: [],
    });
  };
  return (
    <section className="py-5 text-center">
      <div className="container py-4 my-3">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center pb-4">
              <Link
                onClick={() => {
                  handleBack();
                }}
                className="back fs-5 text-dark text-decoration-none cursor-pointer"
              >
                <span className="me-2">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.57 6.73175L3.5 12.8018L9.57 18.8717"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.5 12.8018H3.67004"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Back
              </Link>
              <div className="ms-auto">
                <button
                  onClick={handleDownload}
                  className="btn btn-primary font-nunito fw-semibold text-uppercase"
                >
                  {" "}
                  <span className="me-2">
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.75 10.25C18.5858 10.2499 18.4232 10.2822 18.2715 10.345C18.1198 10.4077 17.982 10.4998 17.8659 10.6159C17.7498 10.732 17.6577 10.8698 17.595 11.0215C17.5322 11.1732 17.4999 11.3358 17.5 11.5V15.25H2.5V11.5C2.5 11.1685 2.3683 10.8505 2.13388 10.6161C1.89946 10.3817 1.58152 10.25 1.25 10.25C0.91848 10.25 0.600537 10.3817 0.366117 10.6161C0.131696 10.8505 2.00941e-07 11.1685 2.00941e-07 11.5V16.5C-9.29127e-05 16.6642 0.0321757 16.8268 0.0949611 16.9785C0.157747 17.1302 0.249817 17.268 0.365909 17.3841C0.482001 17.5002 0.619837 17.5923 0.771536 17.655C0.923235 17.7178 1.08582 17.7501 1.25 17.75H18.75C18.9142 17.7501 19.0768 17.7178 19.2285 17.655C19.3802 17.5923 19.518 17.5002 19.6341 17.3841C19.7502 17.268 19.8423 17.1302 19.905 16.9785C19.9678 16.8268 20.0001 16.6642 20 16.5V11.5C20.0001 11.3358 19.9678 11.1732 19.905 11.0215C19.8423 10.8698 19.7502 10.732 19.6341 10.6159C19.518 10.4998 19.3802 10.4077 19.2285 10.345C19.0768 10.2822 18.9142 10.2499 18.75 10.25Z"
                        fill="white"
                      />
                      <path
                        d="M9.11631 12.3838C9.23235 12.4999 9.37013 12.592 9.52177 12.6548C9.67342 12.7177 9.83595 12.75 10.0001 12.75C10.1642 12.75 10.3268 12.7177 10.4784 12.6548C10.6301 12.592 10.7679 12.4999 10.8839 12.3838L14.6339 8.63379C14.8672 8.39917 14.998 8.0816 14.9975 7.75072C14.9971 7.41984 14.8654 7.10263 14.6314 6.86866C14.3975 6.63469 14.0803 6.50305 13.7494 6.50258C13.4185 6.50212 13.1009 6.63289 12.8663 6.86621L11.2501 8.48242V1.5C11.2501 1.16848 11.1184 0.850537 10.884 0.616117C10.6496 0.381696 10.3316 0.25 10.0001 0.25C9.66858 0.25 9.35064 0.381696 9.11622 0.616117C8.8818 0.850537 8.7501 1.16848 8.7501 1.5V8.48242L7.13389 6.86621C6.89927 6.63289 6.58171 6.50212 6.25082 6.50258C5.91994 6.50305 5.60274 6.63469 5.36877 6.86866C5.13479 7.10263 5.00315 7.41984 5.00269 7.75072C5.00223 8.0816 5.13299 8.39917 5.36631 8.63379L9.11631 12.3838Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  Download
                </button>
              </div>
            </div>
            <div className="img-sec position-relative">
              <div className="row">
                {/* Original Image */}
                <div className="col-6">
                  <DetectedImageBox
                    handleObjectClick={handleObjectClick}
                    isDeletingObject={isDeletingObject}
                  />
                </div>
                {/* Modified Image */}
                <div className="col-6 side-image">
                  <ImageBox isDeletingObject={isDeletingObject} brushData={brushData} setBrushData={setBrushData} />
                </div>
              </div>
              <div className="row">
                <div className="col-6 "></div>

                <div className="col-6 d-flex justify-content-center">
                  <div>
                    <Toolbar
                      brushData={brushData}
                      setBrushData={setBrushData}
                    /> 
                     <Share />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImagePreview;
