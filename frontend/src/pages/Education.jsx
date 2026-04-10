import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/portfolio");
        setEducation(res.data.education || []);
      } catch (err) {
        console.error("Error fetching education:", err);
      }
    };

    load();
  }, []);

  return (
    <div className="main">
      <Navbar />

      <motion.section
        className="section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Education</h2>

        {education.length === 0 ? (
          <p>No education details added yet</p>
        ) : (
          <div className="grid">
            {education.map((edu, i) => (
              <motion.div
                className="card"
                key={i}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3>{edu.degree}</h3>
                <p>{edu.college}</p>
                <p>{edu.year}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
}

export default Education;