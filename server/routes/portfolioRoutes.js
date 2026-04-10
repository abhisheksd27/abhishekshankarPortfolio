import express from "express";
import Portfolio from "../models/Portfolio.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==================== HELPER ====================
const getPortfolio = async () => {
  let portfolio = await Portfolio.findOne();

  if (!portfolio) {
    portfolio = new Portfolio({
      home: {},
      about: {},
      skills: [],
      education: [],
      experience: [],
      certification: [],
      projects: {},
      contact: {}
    });
    await portfolio.save();
  }

  return portfolio;
};

// ==================== NAME & ABOUT ====================
router.put("/home-about", authMiddleware, async (req, res) => {
  try {
    const { home, about } = req.body;

    if (!home && !about) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const portfolio = await getPortfolio();

    if (home) portfolio.home = home;
    if (about) portfolio.about = about;

    await portfolio.save();

    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== EXPERIENCE ====================
router.post("/experience/add", authMiddleware, async (req, res) => {
  try {
    const { role, company } = req.body;

    if (!role || !company) {
      return res.status(400).json({ message: "Role & Company required" });
    }

    const portfolio = await getPortfolio();

    portfolio.experience.push(req.body);

    await portfolio.save();

    res.json(portfolio.experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/experience/:index", authMiddleware, async (req, res) => {
  try {
    const index = parseInt(req.params.index);

    const portfolio = await getPortfolio();

    if (index < 0 || index >= portfolio.experience.length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    portfolio.experience[index] = req.body;

    await portfolio.save();

    res.json(portfolio.experience[index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/experience/:index", authMiddleware, async (req, res) => {
  try {
    const index = parseInt(req.params.index);

    const portfolio = await getPortfolio();

    if (index < 0 || index >= portfolio.experience.length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    portfolio.experience.splice(index, 1);

    await portfolio.save();

    res.json(portfolio.experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== EDUCATION ====================
router.post("/education/add", authMiddleware, async (req, res) => {
  try {
    const { degree, college } = req.body;

    if (!degree || !college) {
      return res.status(400).json({ message: "Degree & College required" });
    }

    const portfolio = await getPortfolio();

    portfolio.education.push(req.body);

    await portfolio.save();

    res.json(portfolio.education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/education/:index", authMiddleware, async (req, res) => {
  try {
    const index = parseInt(req.params.index);

    const portfolio = await getPortfolio();

    if (index < 0 || index >= portfolio.education.length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    portfolio.education[index] = req.body;

    await portfolio.save();

    res.json(portfolio.education[index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/education/:index", authMiddleware, async (req, res) => {
  try {
    const index = parseInt(req.params.index);

    const portfolio = await getPortfolio();

    if (index < 0 || index >= portfolio.education.length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    portfolio.education.splice(index, 1);

    await portfolio.save();

    res.json(portfolio.education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== CERTIFICATION ====================
router.post("/certification/add", authMiddleware, async (req, res) => {
  try {
    const { name, issuer } = req.body;

    if (!name || !issuer) {
      return res.status(400).json({ message: "Name & Issuer required" });
    }

    const portfolio = await getPortfolio();

    portfolio.certification.push(req.body);

    await portfolio.save();

    res.json(portfolio.certification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/certification/:index", authMiddleware, async (req, res) => {
  try {
    const index = parseInt(req.params.index);

    const portfolio = await getPortfolio();

    if (index < 0 || index >= portfolio.certification.length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    portfolio.certification[index] = req.body;

    await portfolio.save();

    res.json(portfolio.certification[index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/certification/:index", authMiddleware, async (req, res) => {
  try {
    const index = parseInt(req.params.index);

    const portfolio = await getPortfolio();

    if (index < 0 || index >= portfolio.certification.length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    portfolio.certification.splice(index, 1);

    await portfolio.save();

    res.json(portfolio.certification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== PROJECTS ====================
router.post("/projects/add", authMiddleware, async (req, res) => {
  try {
    const { category, project } = req.body;

    if (!category || !project) {
      return res.status(400).json({ message: "Category & Project required" });
    }

    const portfolio = await getPortfolio();

    if (!portfolio.projects[category]) {
      portfolio.projects[category] = [];
    }

    portfolio.projects[category].push(project);

    await portfolio.save();

    res.json(portfolio.projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/projects/:category/:index", authMiddleware, async (req, res) => {
  try {
    const { category } = req.params;
    const index = parseInt(req.params.index);

    const portfolio = await getPortfolio();

    if (!portfolio.projects[category]) {
      return res.status(400).json({ message: "Category not found" });
    }

    if (index < 0 || index >= portfolio.projects[category].length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    portfolio.projects[category][index] = req.body;

    await portfolio.save();

    res.json(portfolio.projects[category][index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/projects/:category/:index", authMiddleware, async (req, res) => {
  try {
    const { category } = req.params;
    const index = parseInt(req.params.index);

    const portfolio = await getPortfolio();

    if (!portfolio.projects[category]) {
      return res.status(400).json({ message: "Category not found" });
    }

    if (index < 0 || index >= portfolio.projects[category].length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    portfolio.projects[category].splice(index, 1);

    await portfolio.save();

    res.json(portfolio.projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== SKILLS ====================
router.put("/skills", authMiddleware, async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || typeof skills !== "object" || Array.isArray(skills)) {
      return res.status(400).json({ message: "Skills must be an object" });
    }

    const portfolio = await getPortfolio();

    portfolio.skills = {
      programmingLanguages: Array.isArray(skills.programmingLanguages) ? skills.programmingLanguages : [],
      fullStack: Array.isArray(skills.fullStack) ? skills.fullStack : [],
      databases: Array.isArray(skills.databases) ? skills.databases : [],
      dataEngineering: Array.isArray(skills.dataEngineering) ? skills.dataEngineering : [],
      cyberSecurity: Array.isArray(skills.cyberSecurity) ? skills.cyberSecurity : [],
      machineLearning: Array.isArray(skills.machineLearning) ? skills.machineLearning : [],
      dsa: Array.isArray(skills.dsa) ? skills.dsa : [],
      applications: Array.isArray(skills.applications) ? skills.applications : []
    };

    await portfolio.save();

    res.json(portfolio.skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== CONTACT ====================
router.put("/contact", authMiddleware, async (req, res) => {
  try {
    const portfolio = await getPortfolio();

    portfolio.contact = req.body;

    await portfolio.save();

    res.json(portfolio.contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== GET PORTFOLIO ====================
router.get("/", async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;