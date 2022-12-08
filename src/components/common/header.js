import React from "react";
import { Link } from "react-router-dom";
import themelogo from "../../assets/img/logo.png";
export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg  border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="">
          <img src={themelogo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="">
              Home
            </Link>
            <Link className="nav-link" to="">
              API
            </Link>
            <Link className="nav-link" to="">
              Explore
            </Link>
            <Link
              to=""
              className="mx-4  btn btn-primary text-uppercase font-nunito btn-theme pt-2"
            >
              Login
            </Link>
            <Link
              to=""
              className="btn btn-danger text-uppercase font-nunito btn-theme pt-2"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
