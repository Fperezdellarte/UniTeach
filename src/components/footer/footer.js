import React from "react";
import "./footer.css";
import githubIcon from "../../Assest/icone-github-grise.png";
import linkedinIcon from "../../Assest/icone-linkedin-ronde-grise.png";
export const Footer = () => {
  return (
    <div>
      <footer className="text-center text-lg-start bg-dark text-white">
        <section className="social-icons d-flex justify-content-center p-4">
          {/* Icono de LinkedIn */}
          <a
            href="https://www.linkedin.com/in/francisco-javier-perez-dell-arte-1a3062238/"
            className="me-4"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
          </a>
          {/* Icono de GitHub */}
          <a href="https://www.github.com" className="me-4">
            <img src={githubIcon} alt="GitHub" className="social-icon" />
          </a>
        </section>

        <section>
          <div className="container mt-3">
            <div className="row mt-3">
              <div className="col-md-12 col-lg-6 col-xl-6 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text-center">
                  Contáctanos
                </h6>
                <p className="fas fa-envelope  text-center">
                  {" "}
                  uniteach24@gmail.com
                </p>
                <p className="fas fa-phone  text-center">
                  {" "}
                  +54 381 443-1244 | +54 381 2345-678
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4 bg-darker-blue text-white">
          © 2025 Copyright:{" "}
          <a className="text-reset fw-bold" href="/">
            UniTeach
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
