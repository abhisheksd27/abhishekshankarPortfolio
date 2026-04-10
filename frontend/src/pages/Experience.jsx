import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";

function Experience() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/portfolio").then(res => {
      setData(res.data.experience || []);
    });
  }, []);

  return (
    <div className="main">
      <Navbar />

      <h2>Experience</h2>

      {data.map((exp, i) => (
        <div className="card" key={i}>
          <h3>{exp.role}</h3>
          <p>{exp.company}</p>
          <p>{exp.duration}</p>
        </div>
      ))}
    </div>
  );
}

export default Experience;