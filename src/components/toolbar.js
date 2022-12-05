import React from 'react'
import CanvasModal from './canvasModal'


function Toolbar({
  brushMode,
  setBrushMode,
  setBrushStock,
  brushStock,
  imageHistory,
  setImageHistory,
  currentIndex,
  setCurrentIndex,
  setScale,
  image2Dimension,
  setImage,image,imageDimension
}) {
  const handleUndo = () => {
    if (currentIndex > 0) setCurrentIndex((curntIndex) => curntIndex - 1);
  };
  const handleRedo = () => {
    if (currentIndex < imageHistory?.length - 1)
      setCurrentIndex((curntIndex) => curntIndex + 1);
  };
  return (
    <div className="justify-content-center priority-top bottom-2 align-items-center d-flex  w-100 pt-5">
      <div className="w-auto bg-white rounded-2">
        {!brushMode ? (
          <>
            <div
              className="btn btn-warning rounded-circle icon-brush"
              onClick={() => {
                setBrushMode(true);
                setBrushStock(30);
              }}
              data-bs-toggle={!brushMode && "modal"}
              data-bs-target={!brushMode && "#canvasModal"}
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
        ) : (
          <>
            <div className="btn" onClick={() => setBrushMode(false)}>
              <i className="bi bi-x-lg"></i>
            </div>
            <div>
              <input
                min="8"
                max="100"
                type="range"
                value={brushStock}
                onChange={(e) => setBrushStock(e.target.valueAsNumber)}
                className="form-range pt-2"
                id="customRange1"
              />
            </div>
          </>
        )}
        <button className="btn" onClick={handleUndo}>
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
        <div className="btn" onClick={handleRedo}>
          <i className="bi bi-arrow-clockwise"></i>
        </div>
      </div>
      <CanvasModal
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setImageHistory={setImageHistory}
        brushStock={brushStock}
        image2Dimension={image2Dimension}
        setImage={setImage}
        imageDimension={imageDimension}
        image={image}
      />
    </div>
  );
}

export default Toolbar