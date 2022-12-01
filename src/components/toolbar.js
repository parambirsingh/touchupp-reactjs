import React from 'react'

function Toolbar() {
    return (
        <div className='d-flex justify-content-center'>
            <div className='btn'>
                <i className="bi bi-brush"></i>
            </div>
            <div>
                <input type="range" className="form-range pt-2" id="customRange1" />
            </div>
            <div className='btn'>
                <i className="bi bi-arrow-counterclockwise"></i>
            </div>
            <div className='btn'>
                <i className="bi bi-arrow-clockwise"></i>
            </div>

        </div>
    )
}

export default Toolbar