import React, { useEffect, useState, useRef } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';
import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';

const styles = {
    // border: '0.0625rem solid #9c9c9c',
    // borderRadius: '0.25rem',
    height: '668px',
    width: '534px',
    margin: '0 auto',
    cursor: 'none'
};
function Canvas({
    image,
    imageDimension,
    brushStock,
    currentIndex,
    setImage,
    image2Dimension,
    setCurrentIndex,
    setImageHistory
}) {
    const canvas = useRef()
    const container = useRef()
    const [isEraser, setIsEraser] = useState(false)
    // const [loading, setLoading] = useState(false)

    // const [brushSelected, setBrushSelected] = useState(false)
    // const [imageDimension, setImageDimension] = useState({ height: 0, width: 0 })
    // const [changeImageDimension, setChangeImageDimension] = useState({ height: 0, width: 0 })

    let setTimoutHandle
    // const handleExport = (type) => {
    //     canvas.current.exportImage("png")
    //         .then(data => {
    //             console.log(data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }
    // const handleBrushStock = (e) => {
    //     setLoading(true)

    //     setBrushStock(e.target.valueAsNumber)
    //     clearTimeout(setTimoutHandle)
    //     setTimoutHandle = setTimeout(() => {
    //         setLoading(false)
    //     }, 500)
    // }
    // const handleBrush = () => {
    //     if (!brushSelected) {
    //         setImageDimension({
    //             height: container.current.naturalHeight,
    //             width: container.current.naturalWidth
    //         })
    //         styles.width = container.current.clientWidth + 'px'
    //         styles.height = container.current.clientHeight + 'px'

    //         setChangeImageDimension({
    //             height: container.current.clientHeight,
    //             width: container.current.clientWidth
    //         })

    //     }
    //     setBrushSelected(!brushSelected)
    // }
    const handlePath = async () => {
        if (canvas) {
            // clearTimeout(setTimoutHandle)
            let path
            if (!isEraser) {
                path = await canvas.current.exportPaths()
                if (path.length) {
                    console.log('return:', path)
                    const data = await canvas.current.exportImage("png")
                    setImageHistory((arr) => {
                        if (currentIndex < (arr.length - 1)) arr.splice(currentIndex + 1, arr.length - currentIndex, data)
                        else arr.push(data)
                        setCurrentIndex(arr.length - 1)
                        return arr
                    })

                }
                canvas.current.clearCanvas()
                
            // setTimoutHandle = setTimeout(async () => {
            //     }
            // }, 1000)
            }
        }
    }
    useEffect(() => {
        console.log(imageDimension)
        // styles.height = imageDimension[0]+'px';
        // styles.width = imageDimension[1]+'px';
        // console.log(styles)
    }, [imageDimension])
    return (
        <div className='mt-2' >
            <div className='h-max-80vh' onMouseUp={() => handlePath()} onTouchStart={() => handlePath()}>
                <ReactSketchCanvas
                    ref={canvas}
                    style={{
                        height: imageDimension[1],
                        width: imageDimension[0],
                        margin: '0 auto',
                        cursor: 'none'
                    }}
                    strokeWidth={brushStock}
                    eraserWidth={brushStock}
                    strokeColor="#e4c725bf"

                    backgroundImage={image}

                // onChange={() => handlePath()}
                />
            </div>
            <CustomCursor
                targets={['.cursor-area']}
                customClass='custom-cursor'
                dimensions={brushStock + brushStock}
                strokeColor="#e4c725bf"
                fill='#e4c725bf'
                smoothness={{
                    movement: 0.5,
                    scale: 0.1,
                    opacity: 0.2,
                }}
                targetOpacity={2}
            />
        </div >)
}

export default Canvas