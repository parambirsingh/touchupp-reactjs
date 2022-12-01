import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getImage } from '../services/imageServices'

let originalHeight = 486
let originalWidth = 864
const originalX = 150
const originalY = 200
let originalCoord = []
function ImageBox({ image, coord, setCoord }) {
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
        let coords = [...coord]
        coords.map((v, i) => {
            xStart = (boxRef.current.clientWidth - imageRef.current.clientWidth) / 2
            yStart = (boxRef.current.clientHeight - imageRef.current.clientHeight) / 2
            setHeight(imageRef.current.clientHeight)
            setWidth(imageRef.current.clientWidth)
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
        originalHeight = imageRef.current.naturalHeight
        originalWidth = imageRef.current.naturalWidth
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
        
    }, [])
    
    useEffect(() => {
        if(originalCoord.length==0)originalCoord = JSON.parse(JSON.stringify(coord))
        //   getImageData();
    }, [])
    useEffect(() => {
        handleResize()
        // handleResize()
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
        <div>
            <div ref={boxRef} className='mt-2 h-max-80vh bg-dark d-flex justify-content-center position-relative'>
                {coord.map((c) => (<div className='position-absolute bg-danger ' key={c.key} style={{ height: '5px', width: '5px', top: c.coordinates[1] + 'px', left: c.coordinates[0] + 'px' }}>
                    <i className="bi bi-x-circle-fill  hover-danger cursor-pointer"></i>
                    {c.key}
                </div>))}
                <img ref={imageRef} src={image} className='h-max-80vh object-fit' style={{ objectFit: 'contain', maxWidth: '100%' }} />
            </div>
        </div>
    )
}

export default ImageBox