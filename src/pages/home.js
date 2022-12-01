import React, { useState } from 'react'
import ImageBox from '../components/imageBox'
import Toolbar from '../components/toolbar'
import UploadImage from '../components/uploadImage'

export default function Home() {
    const [image, setImage] = useState('')
    return (
        <div className='container-fluid'>
            <UploadImage setImage={setImage}/>
            <ImageBox image={image}/>
            <Toolbar />
        </div>
    )
}
