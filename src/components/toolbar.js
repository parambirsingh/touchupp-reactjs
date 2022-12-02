import React, { useState } from 'react'


function Toolbar({ brushMode, setBrushMode, setBrushStock, brushStock, imageHistory, setImageHistory ,currentIndex, setCurrentIndex ,setScale}) {

    const handleUndo = () => {
        if(currentIndex>0)setCurrentIndex((curntIndex)=>curntIndex-1)
    }
    const handleRedo = () => {
        if(currentIndex<imageHistory?.length-1)setCurrentIndex((curntIndex)=>curntIndex+1)
    }
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
                        <input min="8" max="100" type="range" value={brushStock} onChange={(e) => setBrushStock(e.target.valueAsNumber)} className="form-range pt-2" id="customRange1" />
                    </div>
                </>
            }
            <button className='btn' onClick={handleUndo}>
                <i className="bi bi-arrow-counterclockwise"></i>
            </button>
            <div className='btn' onClick={handleRedo}>
                <i className="bi bi-arrow-clockwise"></i>
            </div>
            <div className='btn' onClick={()=>{setScale((s)=>s<1.6?s+0.1:s)}}>
            <i className="bi bi-zoom-in"></i>
            </div>
            <div className='btn' onClick={()=>{setScale((s)=>s>1?s-0.1:s)}}>
            <i className="bi bi-zoom-out"></i>
            </div>


        </div>
    )
}

export default Toolbar