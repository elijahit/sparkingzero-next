import Image from "next/image";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="container">
        {/* FOOTER PER DESKTOP */}
        <div className="row">
          <div className="col-12 mt-5 mb-4 d-flex justify-content-center d-lg-block">
            {/* <Image src={"/footer-images/logo.webp"} alt="Logo Sparking Zero Italia" width={22} height={20}></Image> */}
          </div>
          <div className="col-2 d-none d-lg-block">
            <h6>Navigazione</h6>
            <nav aria-label="footer">
              <ul className="list-unstyled mb-3">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/news">News</a>
                </li>
              </ul>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.iubenda.com/privacy-policy/25468910">Privacy Policy</a>
                </li>
                <li>
                  <a href="https://www.iubenda.com/privacy-policy/25468910/cookie-policy">Cookie Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
              </ul>
              </nav>
          </div>
          <div className="col-12 col-lg-10">
            <h6 className="text-center text-lg-start">Informazioni</h6>
            <p className="text-center text-lg-start">SparkingZero.it non è in nessun modo affiliato a <b>Bandai Namco Entertainment</b></p>
            <p className="text-center text-lg-start">
              Developed by: <a href="https://www.linkedin.com/in/gabriele-tosto/"><u>Gabriele Mario Tosto</u></a> <br />
            </p>
          </div>
          <div className="col-12 d-flex flex-column align-items-center align-items-lg-end mb-5">
            <div className="d-flex gap-3 mb-2">
              <div className="social-background d-flex justify-content-center align-items-center">
                <a href="https://x.com/SparkingZero_it" target="_blank">
                  <i className="bi bi-twitter-x"></i>
                </a>
              </div>
              <div className="social-background d-flex justify-content-center align-items-center">
                <a href="https://www.instagram.com/SparkingZero_IT/" target="_blank">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
              <div className="social-background d-flex justify-content-center align-items-center">
                <a href="https://www.facebook.com/SparkingZeroIT/" target="_blank">
                  <i className="bi bi-facebook"></i>
                </a>
              </div>
            </div>
            <p>
              <u>&copy; 2024 - SparkingZero.it</u>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;