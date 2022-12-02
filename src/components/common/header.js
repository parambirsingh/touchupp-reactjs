import React from 'react'

export default function Header() {
  return (
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
  )
}
