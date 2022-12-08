import React from "react";

function ZoomTools({ zoomIn, zoomOut, resetTransform }) {
  return (
    <div className="tools position-absolute mt-4 ">
      <button className="btn btn-primary me-2" onClick={() => zoomIn()}>
        <i className="bi bi-zoom-in"></i>
      </button>
      <button className="btn btn-warning me-2" onClick={() => zoomOut()}>
        <i className="bi bi-zoom-out"></i>
      </button>
      <button className="btn btn-secondary" onClick={() => resetTransform()}>
        Reset
      </button>
    </div>
  );
}

export default ZoomTools;
