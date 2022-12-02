import React from 'react'

export default function Footer() {
  return (
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
  )
}
