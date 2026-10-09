import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="portfolio-root">
      <div className="background-grid" aria-hidden="true" />
      <Navbar />

      {/* Hero */}
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-status">
            <span className="status-indicator" />
            <span>Associate Software Engineer @ Accenture</span>
          </div>

          <h1 className="hero-headline">
            Hi, I&apos;m <span className="text-accent">Abhishek Shankar</span>.
            <br />
            <span className="text-gradient">
              Building Resilient Data Pipelines & Secure Systems.
            </span>
          </h1>

          <p className="hero-bio">
            Associate Software Engineer at Accenture working in big data workflows,
            ETL/ELT pipelines, and cloud computing. Passionate about turning complex datasets
            into scalable intelligence while actively applying cybersecurity defense standards.
          </p>

          <div className="hero-actions">
            <a href="/#projects" className="btn-primary">
              View Projects
            </a>
            <a href="/#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;