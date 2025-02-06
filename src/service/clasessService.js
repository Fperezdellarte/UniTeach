import axios from "axios";
import { API_URL } from "../config/constans";

export const fetchUserClasses = async (token) => {
  try {
    const inscriptionsResponse = await axios.get(
      `${API_URL}/inscription/myinscriptions`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const inscriptions = inscriptionsResponse.data.inscription;
    const classesData = await Promise.all(
      inscriptions.map(async (inscription) => {
        const classResponse = await axios.get(
          `${API_URL}/classes/${inscription.Classes_idClasses}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const classData = classResponse.data;
        return {
          idInscription: inscription.idInscription,
          Materia: classData.class.subjectName,
          Mentor: classData.class.creatorName,
          mentorId: classData.class.Users_idCreator,
          ratingMentor: classData.class.userRating,
          commentMentor: classData.class.userComment,
          date: classData.class.Date,
          endDate: classData.class.endDate,
          hour: classData.class.hour,
          Place: classData.class.Place,
          idClasses: classData.class.idClasses,
        };
      })
    );

    return classesData;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching classes data"
    );
  }
};

export const deleteIncripsion = async (idInscription, token) => {
  try {
    await axios.delete(`${API_URL}/inscription/${idInscription}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error deleting inscriptions"
    );
  }
};
