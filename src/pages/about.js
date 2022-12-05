import React from 'react'
import themelogo from '../assets/img/logo.png'
import headingImg from '../assets/img/underline.svg'
import uploadicon from '../assets/img/upload-img.svg'
import galleryimg from '../assets/img/img1.jpg'

export default function About() {
    return (
        <div>
            <img className='d-none' src={themelogo} />
            <nav className="navbar navbar-expand-lg  border-bottom">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src={themelogo} /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                            <a className="nav-link" href="#">API</a>
                            <a className="nav-link" href="#">Explore</a>
                            <a href="#" className="mx-4  btn btn-primary text-uppercase font-nunito btn-theme">Login</a>
                            <a href="#" className="btn btn-danger text-uppercase font-nunito btn-theme">Signup</a>
                        </div>
                    </div>
                </div>
            </nav>
            <section className="py-5 text-center d-none">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="position-relative d-inline-block mb-4">
                                <h2 className="fw-bold mb-3 d-flex mt-5">
                                    <span className="text-danger me-2">Redesign </span>  your space
                                    <img src={headingImg} alt="img" className="img-fluid bottom-0 position-absolute text-heading" />
                                </h2>
                            </div>
                            <div className="w-100">
                                <button type="button" className="btn btn-primary text-uppercase btn-theme fw-bold font-nunito">See Examples</button>
                                <div className="file file-upload mt-5 position-relative">
                                    <label for='input-file' className="w-100 cursor-pointer d-flex align-items-center justify-content-center flex-wrap">
                                        <div className="text-center">
                                            <img src={uploadicon} alt="upload" className="img-fluid mb-3" />
                                            <div className="w-100 fw-semibold etxt-center">
                                                Click here or drag an image file
                                            </div>
                                        </div>
                                    </label>
                                    <input id='input-file' type='file' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className="py-5 text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center pb-4">
                                <a href="#" className="back fs-5 text-dark text-decoration-none"><span className="me-2">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.57 6.73175L3.5 12.8018L9.57 18.8717" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M20.5 12.8018H3.67004" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                </span>Back</a>
                                <div className="ms-auto">

                                    <a href="#" className="btn btn-transparent font-nunito fw-semibold text-uppercase">  <span className="me-2">
                                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.75 10.25C18.5858 10.2499 18.4232 10.2822 18.2715 10.345C18.1198 10.4077 17.982 10.4998 17.8659 10.6159C17.7498 10.732 17.6577 10.8698 17.595 11.0215C17.5322 11.1732 17.4999 11.3358 17.5 11.5V15.25H2.5V11.5C2.5 11.1685 2.3683 10.8505 2.13388 10.6161C1.89946 10.3817 1.58152 10.25 1.25 10.25C0.91848 10.25 0.600537 10.3817 0.366117 10.6161C0.131696 10.8505 2.00941e-07 11.1685 2.00941e-07 11.5V16.5C-9.29127e-05 16.6642 0.0321757 16.8268 0.0949611 16.9785C0.157747 17.1302 0.249817 17.268 0.365909 17.3841C0.482001 17.5002 0.619837 17.5923 0.771536 17.655C0.923235 17.7178 1.08582 17.7501 1.25 17.75H18.75C18.9142 17.7501 19.0768 17.7178 19.2285 17.655C19.3802 17.5923 19.518 17.5002 19.6341 17.3841C19.7502 17.268 19.8423 17.1302 19.905 16.9785C19.9678 16.8268 20.0001 16.6642 20 16.5V11.5C20.0001 11.3358 19.9678 11.1732 19.905 11.0215C19.8423 10.8698 19.7502 10.732 19.6341 10.6159C19.518 10.4998 19.3802 10.4077 19.2285 10.345C19.0768 10.2822 18.9142 10.2499 18.75 10.25Z" fill="black" />
                                            <path d="M9.11631 12.3838C9.23235 12.4999 9.37013 12.592 9.52177 12.6548C9.67342 12.7177 9.83595 12.75 10.0001 12.75C10.1642 12.75 10.3268 12.7177 10.4784 12.6548C10.6301 12.592 10.7679 12.4999 10.8839 12.3838L14.6339 8.63379C14.8672 8.39917 14.998 8.0816 14.9975 7.75072C14.9971 7.41984 14.8654 7.10263 14.6314 6.86866C14.3975 6.63469 14.0803 6.50305 13.7494 6.50258C13.4185 6.50212 13.1009 6.63289 12.8663 6.86621L11.2501 8.48242V1.5C11.2501 1.16848 11.1184 0.850537 10.884 0.616117C10.6496 0.381696 10.3316 0.25 10.0001 0.25C9.66858 0.25 9.35064 0.381696 9.11622 0.616117C8.8818 0.850537 8.7501 1.16848 8.7501 1.5V8.48242L7.13389 6.86621C6.89927 6.63289 6.58171 6.50212 6.25082 6.50258C5.91994 6.50305 5.60274 6.63469 5.36877 6.86866C5.13479 7.10263 5.00315 7.41984 5.00269 7.75072C5.00223 8.0816 5.13299 8.39917 5.36631 8.63379L9.11631 12.3838Z" fill="black" />
                                        </svg>

                                    </span>Download</a>
                                </div>
                            </div>
                            <div className="img-sec">

                                <img className='rounded-2' src={galleryimg} />
                            </div>
                            <div className="brush-img mt-4">

                                <div className="ms-auto text-end">
                                    <div className="d-inline-block border rounded-2">
                                        <ul className="list-unstyled list-inline m-0 d-flex align-items-center justify-content-center">
                                            <li className="list-inline-item mx-0"><div className="share-to px-3">Share</div></li>
                                            <li className="list-inline-item mx-0">
                                                <div className="share-media border-start d-flex align-items-center justify-content-center">
                                                    <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.125 18V10.125H10.5L11.0625 6.75H7.125V5.0625C7.125 3.9375 7.68862 3.375 8.8125 3.375H10.5V0C9.9375 0 8.6775 0 7.6875 0C4.875 0 3.75 1.6875 3.75 4.5V6.75H0.375V10.125H3.75V18H7.125Z" fill="#3B5998" />
                                                    </svg>
                                                </div>
                                            </li>
                                            <li className="list-inline-item mx-0">
                                                <div className="share-media border-start d-flex align-items-center justify-content-center">
                                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.996 2.41831C17.3339 2.7125 16.6229 2.91106 15.8754 2.99938C16.6376 2.54263 17.2231 1.81925 17.4993 0.9575C16.7855 1.37994 15.9957 1.68819 15.1548 1.853C14.4809 1.13581 13.5213 0.6875 12.4587 0.6875C10.4197 0.6875 8.76761 2.34012 8.76761 4.37919C8.76761 4.66831 8.79967 4.95069 8.86268 5.22069C5.79424 5.06656 3.07399 3.59675 1.25261 1.36306C0.935363 1.90869 0.753113 2.54262 0.753113 3.21931C0.753113 4.50069 1.40505 5.63019 2.39505 6.29281C1.79036 6.27313 1.22111 6.10775 0.723301 5.831C0.722738 5.84619 0.722738 5.8625 0.722738 5.87712C0.722738 7.66644 1.99511 9.15875 3.6843 9.49794C3.37493 9.58175 3.04868 9.62731 2.71174 9.62731C2.47324 9.62731 2.24261 9.60425 2.01761 9.5615C2.48674 11.0274 3.8508 12.095 5.46574 12.1254C4.20293 13.1154 2.61105 13.7066 0.881363 13.7066C0.583238 13.7066 0.289051 13.6891 0.000488281 13.6548C1.63399 14.7011 3.57461 15.3125 5.6598 15.3125C12.4503 15.3125 16.1645 9.68694 16.1645 4.80781C16.1645 4.64806 16.16 4.48831 16.1532 4.32969C16.8749 3.80938 17.5004 3.15969 17.996 2.41831Z" fill="#55ACEE" />
                                                    </svg>
                                                </div>

                                            </li>
                                            <li className="list-inline-item mx-0"><div className="share-media border-start d-flex align-items-center justify-content-center">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.99775 0.00393677C4.02863 0.00393677 0 4.032 0 9.00225C0 12.6872 2.21512 15.8518 5.38594 17.2429C5.36062 16.614 5.38144 15.8597 5.54231 15.1774C5.71556 14.4456 6.69994 10.2729 6.69994 10.2729C6.69994 10.2729 6.41194 9.69862 6.41194 8.85037C6.41194 7.51781 7.18594 6.52162 8.14837 6.52162C8.96625 6.52162 9.36169 7.13531 9.36169 7.87162C9.36169 8.694 8.83631 9.92475 8.56744 11.0644C8.34188 12.0184 9.04669 12.7969 9.98606 12.7969C11.691 12.7969 12.8391 10.6082 12.8391 8.01337C12.8391 6.04181 11.511 4.56637 9.09562 4.56637C6.36637 4.56637 4.6665 6.60094 4.6665 8.87456C4.6665 9.65869 4.89769 10.2116 5.25938 10.6397C5.42644 10.8366 5.4495 10.9147 5.38819 11.1409C5.34656 11.3074 5.24756 11.7051 5.20594 11.8626C5.14575 12.0915 4.96181 12.1725 4.75538 12.0876C3.49819 11.5757 2.91319 10.1987 2.91319 8.65069C2.91319 6.09525 5.06812 3.02962 9.34425 3.02962C12.7789 3.02962 15.0413 5.51587 15.0413 8.18437C15.0413 11.7141 13.0776 14.3511 10.1852 14.3511C9.21319 14.3511 8.29912 13.8257 7.9875 13.2306C7.9875 13.2306 7.46438 15.3039 7.35469 15.7033C7.16344 16.3958 6.78994 17.0904 6.44906 17.631C7.25681 17.8701 8.11181 18 8.99775 18C13.9669 18 17.9949 13.9725 17.9949 9.00225C17.9949 4.032 13.9669 0.00393677 8.99775 0.00393677Z" fill="#CA2028" />
                                                </svg>
                                            </div>

                                            </li>
                                            <li className="list-inline-item mx-0"><div className="share-media border-start d-flex align-items-center justify-content-center">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_2_81)">
                                                        <path d="M8.2125 9.2075C7.764 8.8905 6.908 8.1195 6.908 7.666C6.908 7.135 7.0595 6.873 7.859 6.2485C8.678 5.608 9.2585 4.5585 9.2585 3.5105C9.2585 2.2645 8.7025 1.5 7.6605 0.5H9.2325L10.3415 0C10.3415 0 6.6245 0 5.385 0C3.1625 0 1.072 1.681 1.072 3.6305C1.072 5.6235 2.5865 7.231 4.8475 7.231C5.0045 7.231 5.157 7.227 5.307 7.217C5.16 7.497 5.0555 7.813 5.0555 8.1415C5.0555 8.6955 5.3535 9.1445 5.7295 9.5115C5.446 9.5115 5.1705 9.5195 4.871 9.5195C2.1175 9.519 0 11.2715 0 13.0895C0 14.879 2.3225 16 5.074 16C8.212 16 9.9445 14.219 9.9445 12.429C9.945 10.9935 9.521 10.1345 8.2125 9.2075ZM5.5645 6.724C4.287 6.686 3.074 5.2955 2.8535 3.6195C2.6335 1.942 3.4895 0.6585 4.7655 0.6965C6.0425 0.7355 7.256 2.0805 7.477 3.7575C7.6975 5.435 6.8405 6.762 5.5645 6.724ZM5.064 15.2075C3.1615 15.2075 1.7875 14.004 1.7875 12.557C1.7875 11.14 3.4915 9.9595 5.3945 9.98C5.8385 9.985 6.252 10.056 6.627 10.1775C7.66 10.8965 8.401 11.3025 8.611 12.12C8.649 12.286 8.6715 12.4575 8.6715 12.6315C8.6715 14.0775 7.739 15.2075 5.064 15.2075Z" fill="#E02F2F" />
                                                        <path d="M13.5 7V4.5H12.5V7H10V8H12.5V10.5H13.5V8H16V7H13.5Z" fill="#E02F2F" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2_81">
                                                            <rect width="16" height="16" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </div>

                                            </li>
                                            <li className="list-inline-item mx-0"><div className="share-media border-start d-flex align-items-center justify-content-center">
                                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.25 13.3844C0.25 13.5813 0.41875 13.75 0.615625 13.75H3.23125C3.42812 13.75 3.59687 13.5813 3.59687 13.3844V4.72189C3.59687 4.52501 3.42812 4.35626 3.23125 4.35626H0.615625C0.41875 4.35626 0.25 4.52501 0.25 4.72189V13.3844Z" fill="#0072FF" />
                                                    <path d="M11.1062 4.27188C9.84058 4.27188 8.94058 4.77813 8.46245 5.31251C8.34995 5.42501 8.15308 5.34063 8.15308 5.17188V4.72188C8.15308 4.52501 7.98433 4.35626 7.78745 4.35626H5.1437C4.94683 4.35626 4.77808 4.52501 4.77808 4.72188C4.8062 6.32501 4.77808 11.8656 4.77808 13.3563C4.77808 13.5531 4.94683 13.7219 5.1437 13.7219H7.81558C8.01245 13.7219 8.1812 13.5531 8.1812 13.3563V8.65938C8.1812 8.37813 8.1812 8.09688 8.26558 7.90001C8.49058 7.33751 8.99683 6.74688 9.8687 6.74688C11.0218 6.74688 11.5562 7.61876 11.5562 8.88438V13.3563C11.5562 13.5531 11.725 13.7219 11.9218 13.7219H14.5375C14.7343 13.7219 14.9031 13.5531 14.9031 13.3563V8.51876C14.875 5.62188 13.2156 4.27188 11.1062 4.27188Z" fill="#0072FF" />
                                                    <path d="M1.90937 3.31562C2.97812 3.31562 3.625 2.64062 3.625 1.79687C3.59687 0.896875 2.97813 0.25 1.9375 0.25C0.896875 0.25 0.25 0.896875 0.25 1.76875C0.25 2.64062 0.896875 3.31562 1.90937 3.31562Z" fill="#0072FF" />
                                                </svg>
                                            </div>

                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-dark text-white py-5 mt-5 text-center">
                <div className="container py-4">
                    <h3 className="fw-semibold mb-0">Touchupp</h3>

                    <div className="footer-link">
                        <ul className="list-unstyled list-inline my-5">
                            <li className="list-inline-item mx-4"><a href="#" className="font-nunito text-white text-decoration-none">Home</a></li>
                            <li className="list-inline-item mx-4"><a href="#" className="font-nunito text-white text-decoration-none">Pricing</a></li>
                            <li className="list-inline-item mx-4"><a href="#" className="font-nunito text-white text-decoration-none">About us</a></li>
                            <li className="list-inline-item mx-4"><a href="#" className="font-nunito text-white text-decoration-none">Contact</a></li>
                            <li className="list-inline-item mx-4"><a href="#" className="font-nunito text-white text-decoration-none">Privacy</a></li>
                            <li className="list-inline-item mx-4"><a href="#" className="font-nunito text-white text-decoration-none">Terms of Use</a></li>

                        </ul>
                    </div>
                    <p>© 2022-2023, All Rights Reserved</p>
                </div>
            </footer>

        </div>



    )
}
