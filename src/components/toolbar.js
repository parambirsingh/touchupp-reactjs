import React, { useState } from 'react'


function Toolbar({brushMode,setBrushMode , setBrushStock ,brushStock}) {
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
                        <input min="0" max="100" type="range" value={brushStock} onChange={(e)=>setBrushStock(e.target.valueAsNumber)} className="form-range pt-2" id="customRange1" />
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