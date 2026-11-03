import { mergePortfolioData } from "../../shared/portfolio.mjs";
import Portfolio from "../models/Portfolio.js";

// GET portfolio
export const getPortfolio = async (req, res, next) => {
  try {
    const data = await Portfolio.findOne().lean();
    res.json(mergePortfolioData(data));
  } catch (err) {
    next(err);
  }
};

// UPDATE portfolio (partial update)
export const updatePortfolio = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    delete updateData.sectionUpdatedAt;
    const editedAt = new Date().toISOString();
    const editableSections = ["home", "about", "experience", "education", "certification", "projects", "skills", "contact"];
    const sectionDates = Object.fromEntries(
      editableSections.filter(section => Object.hasOwn(updateData, section))
        .map(section => [`sectionUpdatedAt.${section}`, editedAt])
    );

    let portfolio = await Portfolio.findOne();

    if (portfolio) {
      portfolio = await Portfolio.findOneAndUpdate(
        {},
        { $set: { ...updateData, ...sectionDates } },
        { new: true }
      );
    } else {
      portfolio = new Portfolio({
        ...updateData,
        sectionUpdatedAt: Object.fromEntries(
          Object.keys(sectionDates).map(key => [key.split(".")[1], editedAt])
        ),
      });
      await portfolio.save();
    }

    res.json(mergePortfolioData(portfolio.toObject({ flattenMaps: true })));
  } catch (err) {
    next(err);
  }
};