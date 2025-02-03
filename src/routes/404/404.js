import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  Typography, 
  Button, 
  Box,
  Paper,
  useTheme
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { keyframes } from '@mui/system';

// Definir animaciones
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const NotFound = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%)',
        py: 4
      }}
    >
      <Container>
        <Row className="justify-content-center text-center">
          <Col xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                p: 6,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Número 404 animado */}
              <Box
                sx={{
                  position: 'relative',
                  mb: 4,
                  animation: `${pulse} 2s infinite ease-in-out`
                }}
              >
                <Typography 
                  variant="h1" 
                  sx={{
                    fontSize: '8rem',
                    fontWeight: 800,
                    color: theme.palette.primary.main
                  }}
                >
                  404
                </Typography>
                <ErrorOutlineIcon 
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 60,
                    height: 60,
                    color: theme.palette.warning.main,
                    animation: `${bounce} 2s infinite ease-in-out`
                  }}
                />
              </Box>

              {/* Mensaje de error */}
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  color: theme.palette.text.primary 
                }}
              >
                ¡Página no encontrada!
              </Typography>

              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  color: theme.palette.text.secondary
                }}
              >
                Lo sentimos, la página que estás buscando parece que se ha perdido en el ciberespacio.
              </Typography>

              {/* Botón de regreso */}
              <Button 
                variant="contained" 
                size="large"
                onClick={() => window.location.href = '/'}
                sx={{
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                Volver al inicio
              </Button>
            </Paper>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default NotFound;