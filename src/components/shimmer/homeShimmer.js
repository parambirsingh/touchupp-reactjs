import React, { useEffect, useState } from 'react'
import './Shimmer.css'

function HomeShimmer() {
  const [height ,setHeight] = useState(400)

  const handleHeight = ()=>{
    let h = (window.innerHeight/1.2);
    setHeight(h)
  }
  useEffect(()=>{
    handleHeight()
    window.addEventListener('resize',()=>{
      handleHeight()
    })
  },[])

  return (
    <div className="pt-5 bg-white container-fluid">
      <div className="w-100 pt-3  mb-3 rounded home-shimmer  row padding-box mb-5">
        <div className="col-1"></div>
        <div
          className="col-10  rounded-2 backlog-simmer "
          style={{ height: height + "px" }}
        ></div>
        {/* <div
          className="col-5  rounded-2 backlog-simmer "
          style={{ height: height + "px" }}
        ></div> */}
        <div className="col-1"></div>
      </div>
    </div>
  );
}

export default HomeShimmer