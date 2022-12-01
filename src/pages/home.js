import React, { useState } from 'react'
import ImageBox from '../components/imageBox'
import UploadImage from '../components/uploadImage'
import { Constants } from '../data/constants';

export default function Home() {
    const [image, setImage] = useState(Constants.base64Image);
    const [coord,setCoord] = useState(Constants.coordinates);
    return (
        <div className='container-fluid'>
            <UploadImage setImage={setImage}/>
            <ImageBox image={image} coord={coord}/>
        </div>
    )
}
