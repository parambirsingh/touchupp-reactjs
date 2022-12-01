import React, {useEffect,useState , useRef} from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';
import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';

const styles = {
    // border: '0.0625rem solid #9c9c9c',
    // borderRadius: '0.25rem',
    height: '668px',
    width: '534px',
    margin: '0 auto',
    cursor: 'none'
  };
  
  let x = 206;
  let y = 158
function Canvas({ image ,imageDimension}) {
    const canvas = useRef()
    const container = useRef()
    const [brushStock, setBrushStock] = useState(30)
    const [isEraser, setIsEraser] = useState(false)
    const [loading, setLoading] = useState(false)

    const [brushSelected, setBrushSelected] = useState(false)
    // const [imageDimension, setImageDimension] = useState({ height: 0, width: 0 })
    const [changeImageDimension, setChangeImageDimension] = useState({ height: 0, width: 0 })

    let setTimoutHandle
    // const handleExport = (type) => {
    //     canvas.current.exportImage("png")
    //         .then(data => {
    //             console.log(data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }
    // const handleBrushStock = (e) => {
    //     setLoading(true)

    //     setBrushStock(e.target.valueAsNumber)
    //     clearTimeout(setTimoutHandle)
    //     setTimoutHandle = setTimeout(() => {
    //         setLoading(false)
    //     }, 500)
    // }
    // const handleBrush = () => {
    //     if (!brushSelected) {
    //         setImageDimension({
    //             height: container.current.naturalHeight,
    //             width: container.current.naturalWidth
    //         })
    //         styles.width = container.current.clientWidth + 'px'
    //         styles.height = container.current.clientHeight + 'px'

    //         setChangeImageDimension({
    //             height: container.current.clientHeight,
    //             width: container.current.clientWidth
    //         })

    //     }
    //     setBrushSelected(!brushSelected)
    // }
    const handlePath = async () => {
        if (canvas) {
            clearTimeout(setTimoutHandle)
            setTimoutHandle = setTimeout(async () => {
                let path
                if (!isEraser) {
                    path = await canvas.current.exportPaths()
                    if (path.length) {
                        console.log('return:', path)
                    }
                    canvas.current.clearCanvas()
                }
            }, 1000)
        }
    }
    useEffect(()=>{
        console.log(imageDimension)
        // styles.height = imageDimension[0]+'px';
        // styles.width = imageDimension[1]+'px';
        // console.log(styles)
    },[imageDimension])
    return (<div>
        <ReactSketchCanvas
            ref={canvas}
            style={styles}
            strokeWidth={brushStock}
            eraserWidth={brushStock}
            strokeColor="#e4c725bf"
            
            backgroundImage={image}
            onChange={() => handlePath()}
        />
        <CustomCursor
            targets={['.cursor-area']}
            customClass='custom-cursor'
            dimensions={brushStock + brushStock}
            strokeColor="#e4c725bf"
            fill='#e4c725bf'
            // smoothness={{
            //     movement: 0.2,
            //     scale: 0.5,
            // }}
            targetOpacity={2}
        />
    </div >)
}

export default Canvas