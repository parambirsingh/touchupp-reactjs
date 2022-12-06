import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap';
import { ImageContext } from '../context/imageContext';
import Canvas from './canvas';
import Toolbar from './toolbar';

function CanvasModal() {
  const [imageData, setImageData] = useContext(ImageContext)
  return (
    <>
      <Modal
        show={imageData.brushMode}
        fullscreen={true}
        onHide={() => setImageData({ ...imageData, brushMode: false })}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Brush Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Canvas />
        </Modal.Body>
        <Modal.Footer>
          <Toolbar />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CanvasModal