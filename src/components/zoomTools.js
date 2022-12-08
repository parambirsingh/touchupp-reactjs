import React from 'react'

function ZoomTools({ zoomIn, zoomOut, resetTransform }) {
  return (
    <div className="tools position-absolute mt-4 ">
      <button
        className="btn btn-outline-secondary me-2"
        onClick={() => zoomIn()}
      >
        <i className="bi bi-zoom-in"></i>
      </button>
      <button
        className="btn btn-outline-secondary me-2"
        onClick={() => zoomOut()}
      >
        <i className="bi bi-zoom-out"></i>
      </button>
      <button
        className="btn btn-outline-secondary"
        onClick={() => resetTransform()}
      >
        Reset
      </button>
    </div>
  );
}

export default ZoomTools