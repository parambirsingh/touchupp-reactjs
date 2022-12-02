import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getImage } from '../services/imageServices'
import Draggable from 'react-draggable';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


let originalHeight = 486
let originalWidth = 864
let originalCoord = []
function ImageBox({ image, coord, setCoord, setImageDimension, setImage2Dimension, scale }) {
    const imageRef = useRef()
    const boxRef = useRef()
    let xStart = 100
    let yStart = 100

    const handleResize = () => {
        if (!imageRef || !boxRef) return
        console.log(originalHeight, boxRef.current.clientHeight, imageRef.current.clientHeight)
        let arr = [imageRef.current.clientWidth, imageRef.current.clientHeight]
        setImage2Dimension([imageRef.current.clientWidth, imageRef.current.clientHeight])
        setImageDimension(arr)
        let percentDecreaseHeight = 0
        let percentDecreaseWidth = 0
        let coords = [...coord]
        coords.map((v, i) => {
            xStart = (boxRef.current.clientWidth - imageRef.current.clientWidth) / 2
            yStart = (boxRef.current.clientHeight - imageRef.current.clientHeight) / 2
            percentDecreaseHeight = 100 - ((imageRef.current.clientHeight / originalHeight) * 100)
            percentDecreaseWidth = 100 - ((imageRef.current.clientWidth / originalWidth) * 100)
            let decreaseY = (originalCoord[i].coordinates[1] / 100) * percentDecreaseHeight
            let decreaseX = (originalCoord[i].coordinates[0] / 100) * percentDecreaseWidth
            v.coordinates[1] = yStart + (originalCoord[i].coordinates[1] - decreaseY)
            v.coordinates[0] = xStart + (originalCoord[i].coordinates[0] - decreaseX)
            return v
        })
        setCoord(coords)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, [])

    useEffect(() => {
        if (originalCoord.length == 0) originalCoord = JSON.parse(JSON.stringify(coord))
        // getImageData()
        setTimeout(() => {
            originalHeight = imageRef.current.naturalHeight
            originalWidth = imageRef.current.naturalWidth
            handleResize()
        })
        //   getImageData();
    }, [])
    const getImageData = async () => {
        try {
            const { data } = await getImage();
            console.log(data);
        } catch (ex) {
            //    if (ex.response && ex.response.status === 400)
            toast.error(ex.message);
        }
    };

    return (

        <div className='d-flex justify-content-center'>
            <TransformWrapper
            // initialScale={1}
            // initialPositionX={0}
            // initialPositionY={0}
            >
                <TransformComponent >
                    <div ref={boxRef} className='mt-2 h-max-80vh d-flex justify-content-center position-relative'
                        style={{ transform: `scale(${scale})` }}
                    >
                        {coord.map((c) => (<div className='position-absolute' key={c.key} style={{ top: (c.coordinates[1]) + 'px', left: c.coordinates[0] + 'px' }}>
                            <span className='hover-danger text-primary cursor-pointer'>
                                <i className="bi bi-x-circle-fill"></i>
                                {/* <span className='text-white text-wrap'>
                                    {c.key}
                                </span> */}
                            </span>
                        </div>))}
                        <img ref={imageRef} src={image} className='h-max-80vh object-fit rounded-2' style={{ objectFit: 'contain', maxWidth: '100%' }} />
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

export default ImageBox