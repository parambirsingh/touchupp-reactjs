import React, { useContext } from "react";
import { ImageContext } from "../context/imageContext";

function Toolbar({ brushData, setBrushData, paths, handleDone,isBrushing }) {
  const [imageData, setImageData] = useContext(ImageContext);

  const handleUndo = () => {
    if (imageData.currentIndex > 0)
      setImageData({ ...imageData, currentIndex: imageData.currentIndex - 1 });
  };
  const handleRedo = () => {
    if (imageData.currentIndex < imageData.imageHistory?.length - 1)
      setImageData({ ...imageData, currentIndex: imageData.currentIndex + 1 });
  };
  return (
    <>
      {!brushData.brushMode ? (
        <div className="priority-top float-start">
          <div className="w-auto bg-white rounded-2 d-flex align-items-center">
            <>
              <div
                className="btn btn-warning rounded-circle icon-brush mt-3"
                onClick={() => {
                  setBrushData({
                    ...brushData,
                    brushMode: true,
                    brushStock: 30,
                  });
                }}
              >
                <svg
                  width="14"
                  height="18"
                  viewBox="0 0 14 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_1559)">
                    <path
                      d="M14 11.25C14 12.4938 12.9566 13.5 11.6667 13.5H9.33333V15.75C9.33333 16.9938 8.2899 18 7 18C5.7101 18 4.66667 16.9938 4.66667 15.75V13.5H2.33333C1.04344 13.5 0 12.4938 0 11.25V10.125H14V11.25ZM7 14.9062C6.51693 14.9062 6.125 15.2842 6.125 15.75C6.125 16.2158 6.51693 16.5938 7 16.5938C7.48307 16.5938 7.875 16.2176 7.875 15.75C7.875 15.2824 7.48125 14.9062 7 14.9062ZM1.16667 0H5.83333L7 2.25L8.16667 0H9.33333L10.5 2.25L11.6667 0H12.8333C13.4757 0 14 0.505547 14 1.125V9H0V1.125C0 0.505547 0.525001 0 1.16667 0Z"
                      fill="#A9781D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_1559">
                      <rect
                        width="14"
                        height="18"
                        fill="white"
                        transform="matrix(-1 0 0 1 14 0)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              {/* <div className='btn' onClick={() => { setScale((s) => s < 1.6 ? s + 0.1 : s) }}>
                            <i className="bi bi-zoom-in"></i>
                        </div>
                        <div className='btn' onClick={() => { setScale((s) => s > 1 ? s - 0.1 : s) }}>
                            <i className="bi bi-zoom-out"></i>
                        </div> */}
            </>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center w-100">
          {/* <div
              className="btn"
              onClick={() => setBrushData({ ...brushData, brushMode: false })}
            >
              <i className="bi bi-x-lg"></i>
            </div> */}
          <div className="me-4">
            <button className="btn btn-success ">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 13L1.34921 12.2407C1.16773 12.3963 1.04797 12.6117 1.01163 12.8479L2 13ZM22.5 4L23.49 4.14142C23.5309 3.85444 23.4454 3.5638 23.2555 3.3448C23.0655 3.1258 22.7899 3 22.5 3V4ZM12.5 4V3C12.2613 3 12.0305 3.08539 11.8492 3.24074L12.5 4ZM1 19.5L0.0116283 19.3479C-0.0327373 19.6363 0.051055 19.9297 0.241035 20.1511C0.431014 20.3726 0.708231 20.5 1 20.5V19.5ZM11.5 19.5V20.5C11.7373 20.5 11.9668 20.4156 12.1476 20.2619L11.5 19.5ZM21.5 11L22.1476 11.7619C22.3337 11.6038 22.4554 11.3831 22.49 11.1414L21.5 11ZM2 14H12.5V12H2V14ZM13.169 13.7433L23.169 4.74329L21.831 3.25671L11.831 12.2567L13.169 13.7433ZM22.5 3H12.5V5H22.5V3ZM11.8492 3.24074L1.34921 12.2407L2.65079 13.7593L13.1508 4.75926L11.8492 3.24074ZM1.01163 12.8479L0.0116283 19.3479L1.98837 19.6521L2.98837 13.1521L1.01163 12.8479ZM1 20.5H11.5V18.5H1V20.5ZM12.4884 19.6521L13.4884 13.1521L11.5116 12.8479L10.5116 19.3479L12.4884 19.6521ZM21.51 3.85858L20.51 10.8586L22.49 11.1414L23.49 4.14142L21.51 3.85858ZM20.8524 10.2381L10.8524 18.7381L12.1476 20.2619L22.1476 11.7619L20.8524 10.2381Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          <div className="text-bg-secondary px-4 py-2 rounded">
            <input
              min="8"
              max="100"
              type="range"
              value={brushData.brushStock}
              onChange={(e) =>
                setBrushData({
                  ...brushData,
                  brushStock: e.target.valueAsNumber,
                })
              }
              className="form-range pt-2"
              id="customRange1"
            />
          </div>
          <div className="ms-4">
            <button
              disabled={paths?.length === 0 || isBrushing}
              className="btn btn-primary "
              onClick={() => {
                handleDone();
              }}
            >
              Done
            </button>
          </div>

          {/* <button className="btn" onClick={handleUndo}>
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
            <button className="btn" onClick={handleRedo}>
              <i className="bi bi-arrow-clockwise"></i>
            </button> */}
        </div>
      )}
    </>
  );
}

export default Toolbar;
