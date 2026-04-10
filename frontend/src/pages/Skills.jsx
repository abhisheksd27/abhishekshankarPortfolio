import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get("/portfolio").then(res => {
      setSkills(res.data.skills || []);
    });
  }, []);

  return (
    <div className="main">
      <Navbar />

      <h2>Skills</h2>

      <div className="grid">
        {skills.map((s, i) => (
          <div className="card" key={i}>{s}</div>
        ))}
      </div>
    </div>
  );
}

export default Skills;