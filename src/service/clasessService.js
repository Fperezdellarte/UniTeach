import axios from "axios";
import { API_URL } from "../config/constans";

export const fetchUserClasses = async (userId, token) => {
  try {
    const inscriptionsResponse = await axios.get(
      `${API_URL}/inscription/myinscriptions/${userId}`,
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
        const [mentorInfo, subjectInfo] = await Promise.all([
          axios.get(
            `${API_URL}/users/mentor/${classData.class.Users_idCreator}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            `${API_URL}/subjects/${classData.class.Subjects_idSubjects}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        return {
          idInscription: inscription.idInscription,
          Materia: subjectInfo.data.subject.Name,
          Mentor: mentorInfo.data.Name,
          mentorInfo: mentorInfo.data,
          date: classData.class.Date,
          endDate: classData.class.endDate,
          hour: classData.class.hour,
          Place: classData.class.Place,
          idClasses: classData.class.idClasses,
          mentorOpinion: mentorInfo.data.Opinion,
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
