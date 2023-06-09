import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarAlt from "../components/NavbarAlt";
import ProfileData from "../components/ProfileData";
import ProfileJobEdu from "../components/ProfileJobEdu";
import ProfileLangCertHobb from "../components/ProfileLangCertHobb";
import FeedbackTextarea from "../components/FeedbackTextarea";

function ProfileUser() {
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({ feedback: [] });
  const [edu, setEdu] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isId, setId] = useState(true);

  useEffect(() => {
    if (typeof id != "undefined") {
      setId(false);
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3001/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId,
            Authorization: `Bearer ${token}`,
          },
        });
        const responseJson = await response.json();
        setUser(responseJson);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3001/jobs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId,
            Authorization: `Bearer ${token}`,
          },
        });
        const jobsJson = await response.json();
        const { results } = jobsJson;
        setJobs(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();

    const fetchEducation = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3001/education/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId,
            Authorization: `Bearer ${token}`,
          },
        });
        const educationJson = await response.json();
        const { results } = educationJson;
        setEdu(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEducation();
  }, []);

  return (
    <div>
      <NavbarAlt />
      <div className="container lg-12 d-flex flex-column flex-md-row justify-content-around">
        <div className="col-lg-5 rounded-3 text-bg-light">
          <ProfileData user={user} />
          <ProfileJobEdu jobs={jobs} botonJob={isId} tituloJob={true} />
        </div>
        <div className="col-lg-5 rounded-3 text-bg-light">
          <ProfileJobEdu edu={edu} botonEdu={isId} tituloEdu={true} />
          <ProfileLangCertHobb user={user} cert={true} />
          <ProfileLangCertHobb user={user} lang={true} />
          <ProfileLangCertHobb user={user} hobb={true} />
          <div className="col bg-light p-3">
            <FeedbackTextarea />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
