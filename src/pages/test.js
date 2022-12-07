import React, { useEffect } from 'react'
import { Constants } from '../data/constants';

function Test() {

    useEffect(()=>{
         var canvas = document.getElementById("mycanvas");
        var ctx = canvas.getContext('2d');
        // ctx.fillStyle = "black";
        // ctx.fill();
        var img = document.createElement('IMG');
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
             ctx.restore();
        }
           img.src = Constants.base64Start + Constants.base64Image;
    },[])

    const draw = ()=>{
        var canvas = document.getElementById("mycanvas");
        var ctx = canvas.getContext('2d');
        // ctx.fillStyle = "black";
        // ctx.fill();
        var img = document.createElement('IMG');
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fill();
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(520, 10);
            ctx.lineTo(800, 30);
            ctx.lineTo(780, 10);
            ctx.lineTo(200, 560);
            ctx.arcTo(180, 70, 120, 0, 10);
            ctx.lineTo(200, 180);
            ctx.lineTo(100, 150);
            ctx.lineTo(70, 180);
            ctx.lineTo(20, 130);
            ctx.lineTo(50, 70);
            ctx.closePath();
            ctx.clip();
            ctx.fillStyle ='white'
            ctx.fill()
            // ctx.drawImage(img, 0, 0);
            ctx.restore();
        }
        img.src = Constants.base64Start+Constants.base64Image;
        var jpegUrl = canvas.toDataURL();
            console.log(jpegUrl);
    }
  return (
    <div>
        <canvas height={500} width={700} id='mycanvas'  > </canvas>
        <button onClick={draw}>Draw</button>
    </div>
  )
}

export default Test