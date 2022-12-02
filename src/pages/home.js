import React, { useState,useEffect } from 'react'
import Canvas from '../components/canvas';
import ImageBox from '../components/imageBox'
import Toolbar from '../components/toolbar'
import UploadImage from '../components/uploadImage'
import { Constants } from '../data/constants';

export default function Home() {
    const [imageDimension, setImageDimension] = useState([0, 0]);
    const [image2Dimension, setImage2Dimension] = useState([0, 0]);

    const [brushStock, setBrushStock] = useState(30)
    const [image, setImage] = useState(Constants.base64Image);
    const [coord, setCoord] = useState(Constants.coordinates);
    const [brushMode, setBrushMode] = useState('')
    useEffect(()=>{
        console.log(imageDimension)
    },[imageDimension])
    return (
        <div className='container-fluid'>
            <UploadImage setImage={setImage} />
            {brushMode ?
                <Canvas image2Dimension={image2Dimension} brushStock={brushStock} setImage={setImage} imageDimension={imageDimension} image={image} /> :
                <ImageBox setImage2Dimension={setImage2Dimension} setImageDimension={setImageDimension} image={image} coord={coord} setCoord={setCoord} />
            }
            <Toolbar setBrushStock={setBrushStock} brushMode={brushMode} brushStock={brushStock} setBrushMode={setBrushMode} />
        </div>
    )
}
