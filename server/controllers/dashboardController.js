exports.getDashboardData = async (req, res) => {
  try {
    // Simplified response for testing
    res.json({ message: "Dashboard data fetch successful" });
  } catch (error) {
    console.error('Error fetching dashboard data', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};




// const pool = require('../config/db');
// const { Transaction, MarketData, Cryptocurrency } = require('../models/index');
// const { calculatePortfolioGrowth, calculate24hGrowth } = require('../helpers/growthCalculations');

// console.log('__dirname:', __dirname);
// console.log('module.paths:', module.paths);


// exports.getDashboardData = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const transactions = await Transaction.findAll({
//       where: { user_id: userId },
//       include: [Cryptocurrency]
//     });

//     const marketData = await MarketData.findAll({
//       where: {
//         crypto_id: transactions.map(t => t.crypto_id)
//       }
//     });

//     const portfolioGrowth = calculatePortfolioGrowth(transactions, marketData);

//     const growth24h = calculate24hGrowth(transactions, marketData);

//     const dashboardData = {
//       portfolioGrowth,
//       growth24h
//     };

//     res.json(dashboardData);
//     } catch (error) {
//       console.error('Error fetching dashboard data', error);
//       res.status(500).json({ message: 'Error fetching dashboard data' });
//     }
//   };
