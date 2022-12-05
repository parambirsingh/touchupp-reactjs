import React from 'react'
import Canvas from './canvas';

function CanvasModal({
  brushStock,
  setImageHistory,
  currentIndex,
  setCurrentIndex,
  image2Dimension,
  setImage,
  image,
  imageDimension,
}) {
  return (
    <>
      <div
        className="modal fade"
        id="canvasModal"
        tabIndex="-1"
        aria-labelledby="canvasModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <Canvas
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                setImageHistory={setImageHistory}
                image2Dimension={image2Dimension}
                brushStock={brushStock}
                setImage={setImage}
                imageDimension={imageDimension}
                image={image}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CanvasModal