import React, { useEffect, useRef } from 'react'

function UploadImage({ setImage }) {
    const image = useRef()
    const handleChange = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setImage(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        console.log()
    }
    return (
        <div className='container-fluid pt-5 w-50'>
            <input ref={image} className="form-control form-control-md" onChange={(e) => handleChange(e)} id="formFileLg" type="file" />
        </div>

    )
}

export default UploadImage