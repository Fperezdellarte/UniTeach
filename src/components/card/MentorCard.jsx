import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarRating } from "./StarRating";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  CardActionArea,
} from "@mui/material";
import "./MentorCards.css";

export const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <Card
      sx={{
        height: 300,
        width: 270,
        maxWidth: 270,
        maxHeight: 300,
        borderRadius: "7px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.21)",
        transform: isHovered ? "scale(1.05)" : "none",
        transition: "transform 0.3s ease-in-out",
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <CardActionArea
        style={{ height: 300 }}
        onClick={() => navigate(`/app/perfilMentor/${mentor.idUser}`)}
      >
        <Chip
          color="primary"
          className="chipUniversity"
          sx={{
            zIndex: "100",
            position: "absolute",
            top: "50px",
            width: "60px",
            fontWeight: "600",
            borderRadius: "0px",
            clipPath: "polygon(0% 0%, 100% 0, 90% 50%, 100% 100%, 0% 100%)",
            "& .MuiChip-label": {
              paddingLeft: "2px",
            },
          }}
          label={mentor.MentorUniversity}
        ></Chip>
        <CardMedia
          component="img"
          style={{
            borderRadius: "200px",
            padding: "2px",
            boxShadow: "2px 2px 8px rgba(18, 18, 18, 0.29)",
            border: "1px solid rgba(17, 25, 255, 0.29)",
            aspectRatio: "1/1",
            width: "100px",
            margin: "auto",
          }}
          image={mentor.Avatar_URL || "https://via.placeholder.com/500x500"}
          alt={`${mentor.MentorName} profile`}
        />
        <CardContent style={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            {mentor.MentorName}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {mentor.SubjectName}
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <StarRating rating={mentor.Opinion || 0} />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
