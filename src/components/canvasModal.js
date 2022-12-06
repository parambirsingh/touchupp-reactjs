import React from 'react'
import { Modal } from 'react-bootstrap';
import Canvas from './canvas';
import Toolbar from './toolbar';

function CanvasModal({ brushData, setBrushData}) {
  return (
    <>
      <Modal
        show={brushData?.brushMode}
        fullscreen={true}
        onHide={() => setBrushData({ ...brushData, brushMode: false })}
        backdrop="static"
        keyboard={false}
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Brush Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Canvas  brushData={brushData}/>
        </Modal.Body>
        <Modal.Footer>
          <Toolbar brushData={brushData} setBrushData={setBrushData} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CanvasModal