import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Contact() {
  const [contact, setContact] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/portfolio");
        setContact(res.data.contact || {});
      } catch (err) {
        console.error("Error fetching contact:", err);
      }
    };

    load();
  }, []);

  return (
    <div className="main">
      <Navbar />

      <motion.section
        className="section contact"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Contact</h2>

        <div className="card">
          <p><strong>Email:</strong> {contact.email || "Not added yet"}</p>
          <p><strong>Phone:</strong> {contact.phone || "Not added yet"}</p>

          <div className="links" style={{ marginTop: "15px" }}>
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}

            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}

            {contact.twitter && (
              <a href={contact.twitter} target="_blank" rel="noreferrer">
                Twitter
              </a>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Contact;