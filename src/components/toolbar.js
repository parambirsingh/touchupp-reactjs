import React, { useState } from 'react'

function Toolbar({brushMode,setBrushMode}) {
    return (
        <div className='d-flex justify-content-center'>
            {!brushMode ? <div className='btn' onClick={() => setBrushMode(true)}>
                <i className="bi bi-eraser-fill"></i>
            </div> :
                <>
                    <div className='btn' onClick={() => setBrushMode(false)}>
                        <i className="bi bi-x-lg"></i>
                    </div>
                    <div>
                        <input type="range" className="form-range pt-2" id="customRange1" />
                    </div>
                </>
            }
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