import React from 'react';
import '../styles/landingPage.css';
import Navbar from '../components/navbar'; // Asegúrate de que la ruta es correcta
import CarouselComponent from '../components/CarouselComponent'; // Asegúrate de que la ruta es correcta
import { Card, CardGroup } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="opacidad">
        <Navbar />
        <CarouselComponent />
      <section>
             {/* Grupo de Tarjetas */}
        <CardGroup className="uni-teach-card-group">
          <Card className="shadow-drop-center">
            <Card.Img
              variant="top"
              src="https://www.unsta.edu.ar/wp-content/uploads/2023/08/unsta-campus-yb.png"
              alt="UNSTA"
              />
            <Card.Body>
              <Card.Title>Conexion</Card.Title>
              <Card.Text>
                De esta manera conectamos las Universidades de Tucuman.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="shadow-drop-center">
            <Card.Img
              variant="top"
              src="https://media.licdn.com/dms/image/C4E1BAQEyl2j7GtRoYg/company-background_10000/0/1593164654141/universidad_nacional_de_tucum_n_cover?e=2147483647&v=beta&t=TVTosgL1vAIqpxNDpy6-AgCfflm6ESs8ZBiyW3g9jrM"
              alt="UNT"
              />
            <Card.Body>
              <Card.Title>Innovacion</Card.Title>
              <Card.Text>
                Una manera simple y rapida de agendar tus clases con tus mentores favoritos.
              </Card.Text>
              
            </Card.Body>
          </Card>

          <Card className="shadow-drop-center">
            <Card.Img
              variant="top"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Fachada_de_la_UTN_-_Facultad_Regional_Tucum%C3%A1n.jpg/1200px-Fachada_de_la_UTN_-_Facultad_Regional_Tucum%C3%A1n.jpg"
              alt="UTN"
              />
            <Card.Body>
              <Card.Title>Simple</Card.Title>
              <Card.Text>
                Tan simple con un solo click tenes al alcance todo el material disponible, para sacarte esa materia funadora.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
              </section>
              <section>
                <div>
                    
                </div>
              </section>

      </div>
    </div>
  );
};

export default LandingPage;
