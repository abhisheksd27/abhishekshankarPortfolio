import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    home: Object,
    about: Object,

    skills: {
      programmingLanguages: { type: [String], default: [] },
      fullStack: { type: [String], default: [] },
      databases: { type: [String], default: [] },
      dataEngineering: { type: [String], default: [] },
      cyberSecurity: { type: [String], default: [] },
      machineLearning: { type: [String], default: [] },
      dsa: { type: [String], default: [] },
      applications: { type: [String], default: [] }
    },
    education: Array,
    experience: {
      type: [
        {
          role: String,
          company: String,
          duration: String,
          location: String,
          description: String,
          technologies: { type: [String], default: [] }
        }
      ],
      default: []
    },
    certification: {
      type: [
        {
          name: String,
          issuer: String,
          link: String,
          image: String,
          skills: String
        }
      ],
      default: []
    },
    projects: {
      type: [
        {
          title: String,
          description: String,
          link: String,
          github: String
        }
      ],
      default: []
    },
    contact: {
      email: String,
      phone: String,
      github: String,
      linkedin: String,
      twitter: String
    }
  },
  { strict: false }
);

export default mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);