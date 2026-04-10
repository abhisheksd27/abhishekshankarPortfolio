import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      {/* Flying birds */}
      <div className="birds" aria-hidden="true">
        <div className="bird bird-1"></div>
        <div className="bird bird-2"></div>
        <div className="bird bird-3"></div>
        <div className="bird bird-4"></div>
      </div>

      {/* Hero */}
      <motion.section
        className="home-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="home-kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Full Stack Developer
        </motion.p>

        <motion.h1
          className="home-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          Hi, I&apos;m <span>Abhishek Shankar</span> 👋
        </motion.h1>

        <motion.p
          className="home-subtitle"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          I build modern, scalable web applications with clean UI, strong backend
          architecture, and polished user experiences.
        </motion.p>

        <motion.div
          className="home-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          <a href="/projects" className="home-btn primary-btn">
            View Projects
          </a>
          <a href="/contact" className="home-btn secondary-btn">
            Contact Me
          </a>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Home;