import React, { useContext, useRef } from 'react'
import headingImg from '../assets/img/underline.svg'
import uploadicon from '../assets/img/upload-img.svg'
import { ImageContext } from '../context/imageContext';
// import { Constants } from '../data/constants';

function UploadImage({ isGettingImage }) {
  const [imageData,setImageData] = useContext(ImageContext)

  const image = useRef();
  const handleChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      let data = reader.result;
      data = data.slice(data?.indexOf(",") + 1);
      setImageData({...imageData,originalImage:data})
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  return (
    <section className="py-xl-5 text-center">
      <div className="container py-lg-5">
        <div className="row">
          <div className="col-md-12 py-5">
            <div className="position-relative d-inline-block mb-4 py-1">
              <h2 className="fw-bold mb-3 d-flex">
                <span className="text-danger me-2">Redesign </span> your space
                <img
                  src={headingImg}
                  alt="img"
                  className="img-fluid bottom-0 position-absolute text-heading"
                />
              </h2>
            </div>
            <div className="w-100">
              {/* <button
                type="button"
                disabled={isGettingImage}
                onClick={()=>setOriginalImage(Constants.base64Image)}
                className="btn btn-primary text-uppercase btn-theme fw-bold font-nunito"
              >
                {isGettingImage ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span> Loading... </span>
                  </>
                ) : (
                  <span>See Examples</span>
                )}
              </button> */}
              <div className="file file-upload mt-5 position-relative">
                <label
                  htmlFor="input-file"
                  className="w-100 cursor-pointer d-flex align-items-center justify-content-center flex-wrap"
                >
                  <div className="text-center">
                    <img
                      src={uploadicon}
                      alt="upload"
                      className="img-fluid mb-3"
                    />
                    <div className="w-100 fw-semibold etxt-center">
                      Click here or drag an image file
                    </div>
                  </div>
                </label>
                <input
                  id="input-file"
                  ref={image}
                  onChange={(e) => handleChange(e)}
                  type="file"
                  disabled={isGettingImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UploadImage