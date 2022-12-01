import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getImage } from '../services/imageServices'
const originalHeight = 486
const originalWidth = 864

const originalX = 150
const originalY = 200
function ImageBox({ image }) {
    const imageRef = useRef()
    const boxRef = useRef()
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [x, setX] = useState(0)
    const [y, setY] = useState(486)
    let xStart = 100
    let yStart = 100

    let percentDecreaseHeight = 0
    let percentDecreaseWidth = 0
    const handleResize = () => {
        xStart = (boxRef.current.clientWidth - imageRef.current.clientWidth) / 2
        yStart = (boxRef.current.clientHeight - imageRef.current.clientHeight) / 2
        setHeight(imageRef.current.clientHeight)
        setWidth(imageRef.current.clientWidth)
        percentDecreaseHeight = 100 - ((imageRef.current.clientHeight / originalHeight) * 100)
        percentDecreaseWidth = 100 - ((imageRef.current.clientWidth / originalWidth) * 100)
        let decreaseY = (originalY / 100) * percentDecreaseHeight
        let decreaseX = (originalX / 100) * percentDecreaseWidth
        setY(yStart + (originalY - decreaseY))
        setX(xStart + (originalX - decreaseX))
        // console.log(y, x)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [image])

    useEffect(()=>{
          getImageData();
    },[])

       const getImageData = async () => {
         try {
           const {data} = await getImage();
           console.log(data);
         } catch (ex) {
        //    if (ex.response && ex.response.status === 400)
             toast.error(ex.message);
         }
       };

    return (
        <div>
            <div ref={boxRef} className='mt-2 h-max-80vh bg-dark d-flex justify-content-center position-relative'>
                <div className='position-absolute bg-danger ' style={{ height: '5px', width: '5px', bottom: y + 'px', left: x + 'px' }}>
                <i className="bi bi-x-circle-fill  hover-danger cursor-pointer"></i>
                </div>
                <img ref={imageRef} src={image} className='h-max-80vh object-fit' style={{ objectFit: 'contain' ,maxWidth:'100%'}} />
            </div>
        </div>
    )
}

export default ImageBox