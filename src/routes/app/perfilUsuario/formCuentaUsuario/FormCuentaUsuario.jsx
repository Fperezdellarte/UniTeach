import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

export const FormCuentaUsuario = () => {
  const achievements = [
    {
      name: "Principiante Dedicado",
      description: "¡Completaste tu primer curso!",
      icon: "🎯",
    },
    {
      name: "Estudiante Constante",
      description: "30 días seguidos estudiando",
      icon: "🔥",
    },
    {
      name: "Colaborador Activo",
      description: "Ayudaste a 10 estudiantes",
      icon: "🤝",
    },
  ];

  const currentCourses = [
    { name: "React Avanzado", progress: 75 },
    { name: "Node.js Fundamentals", progress: 45 },
    { name: "UI/UX Design", progress: 30 },
  ];

  return (
    <Box className="space-y-6 p-6">
      {/* Estadísticas */}
      <Box className="grid grid-cols-1 md:grid-cols-4 gap-4"></Box>

      {/* Cursos Actuales */}
      <Card className="bg-white/5 backdrop-blur-sm">
        <CardContent>
          <Box className="flex items-center justify-between mb-4">
            <Typography
              variant="h6"
              className="font-bold flex items-center gap-2"
            >
              Cursos en Progreso
            </Typography>
            <Button variant="text" size="small">
              Ver todos
            </Button>
          </Box>
          <Box className="space-y-4">
            {currentCourses.map((course, index) => (
              <Box key={index} className="space-y-2">
                <Box className="flex justify-between items-center">
                  <Typography>{course.name}</Typography>
                  <Typography className="text-sm text-gray-500">
                    {course.progress}%
                  </Typography>
                </Box>
                <Box className="w-full h-2 bg-gray-200 rounded-full">
                  <Box
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Logros */}
      <Card className="bg-white/5 backdrop-blur-sm">
        <CardContent>
          <Typography
            variant="h6"
            className="font-bold flex items-center gap-2 mb-4"
          >
            Logros Desbloqueados
          </Typography>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <Box
                key={index}
                className="p-4 rounded-lg border border-gray-200 flex items-center gap-3"
              >
                <Typography className="text-2xl">{achievement.icon}</Typography>
                <Box>
                  <Typography className="font-semibold">
                    {achievement.name}
                  </Typography>
                  <Typography className="text-sm text-gray-500">
                    {achievement.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Actividad Reciente */}
      <Card className="bg-white/5 backdrop-blur-sm">
        <CardContent>
          <Typography
            variant="h6"
            className="font-bold flex items-center gap-2 mb-4"
          >
            Actividad Reciente
          </Typography>
          <Box className="space-y-4">
            <Box className="flex items-center gap-3">
              <Typography>
                Completaste la lección "Introducción a React Hooks"
              </Typography>
              <Typography className="text-sm text-gray-500">
                Hace 2 horas
              </Typography>
            </Box>
            <Box className="flex items-center gap-3">
              <Typography>Ganaste 100 puntos XP</Typography>
              <Typography className="text-sm text-gray-500">
                Hace 3 horas
              </Typography>
            </Box>
            <Box className="flex items-center gap-3">
              <Typography>Te uniste a un nuevo grupo de estudio</Typography>
              <Typography className="text-sm text-gray-500">
                Hace 5 horas
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
