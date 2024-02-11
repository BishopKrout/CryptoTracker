const db = require("../config/db");
const { Portfolio } = require("../models/portfolio"); // Assuming you have a Portfolio model

exports.buyAsset = async (req, res) => {
    const { userId, assetType, quantity, pricePerUnit } = req.body;
    try {
        // Logic to add the asset to the user's portfolio
        const totalCost = quantity * pricePerUnit;
        // Update user's portfolio here
        return res.status(200).json({ message: "Asset purchased successfully" });
    } catch (error) {
        console.error('Error buying asset:', error);
        res.status(500).send('Server error during asset purchase');
    }
};

exports.sellAsset = async (req, res) => {
    const { userId, assetType, quantity, pricePerUnit } = req.body;
    try {
        // Logic to remove the asset from the user's portfolio
        const totalSale = quantity * pricePerUnit;
        // Update user's portfolio here
        return res.status(200).json({ message: "Asset sold successfully" });
    } catch (error) {
        console.error('Error selling asset:', error);
        res.status(500).send('Server error during asset sale');
    }
};
