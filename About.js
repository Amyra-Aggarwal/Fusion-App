import React from 'react';
import MyNavbar from './Components/myNavbar';
import Footer from './Components/Footer';
import developer from './Components/developer.jpg';
import video from './Components/video.mp4';

export default function About() {
    
  return (
    <div className="text-center">
      <MyNavbar />
      <div className="d-flex justify-content-center align-items-center flex-column mt-5">
        <img src={developer} alt="Developer" className="developer rounded-circle" width="150" height="150" />
        <div className="mt-3">
          <h1>Amyra Aggarwal</h1>
          <p>Founder of Fusion</p>
        </div>
      </div>
      <video width="600" height="340" controls className="mt-4">
        <source src={video} type="video/mp4" />
      </video>
      <Footer />
    </div>
  );
}
