import Portfolio from "../models/Portfolio.js";

// GET portfolio
export const getPortfolio = async (req, res, next) => {
  try {
    const data = await Portfolio.findOne();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// UPDATE portfolio (partial update)
export const updatePortfolio = async (req, res, next) => {
  try {
    const updateData = req.body;

    let portfolio = await Portfolio.findOne();

    if (portfolio) {
      portfolio = await Portfolio.findOneAndUpdate(
        {},
        { $set: updateData }, // ✅ partial update
        { new: true }
      );
    } else {
      portfolio = new Portfolio(updateData);
      await portfolio.save();
    }

    res.json(portfolio);
  } catch (err) {
    next(err);
  }
};