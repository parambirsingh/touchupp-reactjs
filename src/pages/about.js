import React from 'react'

export default function About() {
  return (
  

  <div>  
  
    <nav className="navbar navbar-expand-lg  border-bottom">
    <div className="container-fluid">
      <a className="navbar-brand" href="#"></a>
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
