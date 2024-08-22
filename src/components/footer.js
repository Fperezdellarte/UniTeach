import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/footer.css';

export const Footer = () => {
  return (
    <div>
    <footer className="text-center text-lg-start bg-body-tertiary text-muted ">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Encontranos en todas las redes sociales</span>
        </div>
        <div>
          <a href="#" className="me-4 text-reset">
            <i className="fab fa-linkedin">LinkedIn</i>
          </a>
          <a href="#" className="me-4 text-reset">
            <i className="fab fa-github">GitHub</i>
          </a>
        </div>
      </section>

      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-4 ">
              <h6 className="text-uppercase fw-bold mb-4 section-title">
                <i className="fas fa-gem"></i>Uniteach
              </h6>
              <p>
                Un sitio creado por estudiantes para ayudar a estudiantes a encontrar mentores dentro de su misma Universidad.
              </p>
            </div>

            <div className="col-md-6 col-lg-6 col-xl-4 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4 section-title">Contactanos</h6>
              <p><i className="fas fa-home me-3"></i> Uniteach@gmail.com</p>
              <p><i className="fas fa-phone me-3"></i> +54 381 4431244     +54 381 2345678</p>
            </div>  
          </div>
        </div>
      </section>

      <div className="text-center p-4 copyright">
        © 2024 Copyright: <a className="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
