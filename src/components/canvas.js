import React, { useEffect, useRef, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';
import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import { Constants } from '../data/constants';

function Canvas({
    image,
    imageDimension,
    brushStock,
    currentIndex,
    setCurrentIndex,
    setImageHistory
}) {
    const canvas = useRef()
    // const [loading, setLoading] = useState(false)

    let setTimoutHandle
    const handlePath = async () => {
        if (canvas) {
            clearTimeout(setTimoutHandle)
            setTimoutHandle = setTimeout(async () => {
                let path
                path = await canvas.current.exportPaths()
                if (path.length) {
                    // console.log('return:', path)
                    let data = await canvas.current.exportImage("png")
                    if(!data) return;
                   data = data.slice(data?.indexOf(",")+1)
                    setImageHistory((arr) => {
                        if (currentIndex < (arr.length - 1)) arr.splice(currentIndex + 1, arr.length - currentIndex, data)
                        else arr.push(data)
                        setCurrentIndex(arr.length - 1)
                        return arr
                    })
                }
                canvas.current.clearCanvas()

            }
                ,1000)
        }
    }
    return (
      <div className="mt-2">
        <div
          className="cursor-area h-max-80vh"
          onMouseUp={() => handlePath()}
          onTouchStart={() => handlePath()}
        >
          <ReactSketchCanvas
            ref={canvas}
            style={{
              height: imageDimension[1],
              width: imageDimension[0],
              margin: "0 auto",
              cursor: "none",
            }}
            strokeWidth={brushStock}
            eraserWidth={brushStock}
            strokeColor="#e4c725bf"
            backgroundImage={Constants.base64Start + image}
          />
        </div>

        <CustomCursor
          targets={[".cursor-area"]}
          customclassName="custom-cursor"
          dimensions={brushStock * 2}
          strokeColor="#e4c725bf"
          fill="#e4c725bf"
          smoothness={{
            movement: 0.2,
            scale: 0.1,
            opacity: 0.2,
          }}
          targetScale={1}
          // targetOpacity={2}
        />
      </div>
    );
}

export default Canvas