"use client"
import Image from "next/image.js";
import "./Hero.css";

function Hero() {
  return (
    <div id="heroComponents" className="hero d-flex flex-column justify-content-center presentation-section">
      <div className="margin-hero hero-components d-none d-lg-block">
        <div className="hero-logo-absolute">
          <Image src="/hero-images/korat-logo.png" alt="Logo Sparking Zero Italia" className="img-fluid d-none d-lg-block logo-position ms-5 ps-5" width={467} height={131}></Image>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Image src="/hero-images/korat-logo.png" alt="Logo Sparking Zero Italia" className="img-fluid d-lg-none" width={300} height={131}></Image>
      </div>
    </div>
    
  );
}

export default Hero;