import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <div className="container">
  <footer className="py-3 my-4">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">About</Link></li>
      <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Blogs</Link></li>
      <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Jobs</Link></li>
      <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Help</Link></li>
      <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Privacy</Link></li>
      <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Terms</Link></li>
    </ul>
    <p className="text-center text-muted">Copyright© 2024 FriendFusion, Inc</p>
  </footer>
</div>
    </div>
  )
}
