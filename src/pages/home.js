import React, { useState, useEffect } from 'react'
import Canvas from '../components/canvas';
import ImageBox from '../components/imageBox'
import Toolbar from '../components/toolbar'
import UploadImage from '../components/uploadImage'
import { Constants } from '../data/constants';
import ImagePreview from '../components/ImagePreview';

export default function Home() {
    const [imageDimension, setImageDimension] = useState([0, 0]);
    const [image2Dimension, setImage2Dimension] = useState([0, 0]);
    const [imageHistory, setImageHistory] = useState([Constants.base64Image]);
    const [brushStock, setBrushStock] = useState(30)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [scale, setScale] = useState(1)
    const [image, setImage] = useState(Constants.base64Image);
    const [coord, setCoord] = useState(Constants.coordinates);
    const [brushMode, setBrushMode] = useState('')

    useEffect(() => {
        setImage(imageHistory[currentIndex])
    }, [currentIndex])
    return (
        <div className='container-fluid position-relative'>
            {!image?<UploadImage setImage={setImage} />:
            <ImagePreview
                brushMode={brushMode}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                setImageHistory={setImageHistory}
                image2Dimension={image2Dimension}
                brushStock={brushStock} setImage={setImage}
                imageDimension={imageDimension} image={image}
                scale={scale}
                setImage2Dimension={setImage2Dimension}
                setImageDimension={setImageDimension}
                coord={coord}
                setCoord={setCoord}
                setScale={setScale}
                imageHistory={imageHistory}
                setBrushStock={setBrushStock}
                setBrushMode={setBrushMode}
            ></ImagePreview>}
        </div>
    )
}
