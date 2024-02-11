const express = require('express');
const { getDashboardData } = require('../controllers/dashboardController');
const router = express.Router();

router.get('/', getDashboardData);

module.exports = router;



// server/routes/dashboardRoutes.js
// const express = require('express');
// const { getDashboardData } = require('../controllers/dashboardController');
// const authenticate = require('../middleware/'); 

// const router = express.Router();

// router.get('/dashboard', authenticate, getDashboardData);

// module.exports = router;
