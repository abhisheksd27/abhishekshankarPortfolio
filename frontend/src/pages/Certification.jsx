import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Certification() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/portfolio");
        setCerts(res.data.certification || []);
      } catch (err) {
        console.error("Error fetching certifications:", err);
      }
    };

    load();
  }, []);

  return (
    <div className="main">
      <Navbar />

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Certifications
      </motion.h2>

      <div className="grid">
        {certs.length === 0 && <p>No certifications added yet</p>}

        {certs.map((cert, i) => (
          <motion.div
            className="card"
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* 🏆 NAME */}
            <h3>{cert.name}</h3>

            {/* 📅 YEAR */}
            <p>{cert.year}</p>

            {/* 🖼 IMAGE (optional) */}
            {cert.image && (
              <img
                src={cert.image}
                alt="certificate"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginTop: "10px"
                }}
              />
            )}

            {/* 🔗 LINK */}
            {cert.link && (
              <div className="links" style={{ marginTop: "10px" }}>
                <a href={cert.link} target="_blank" rel="noreferrer">
                  View Certificate
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Certification;