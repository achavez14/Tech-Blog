const express = require('express');
const router = express.Router();

// Import and use the route files
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

// Import other route files as needed
router.use('/', homeRoutes);
router.use('/', dashboardRoutes);

module.exports = router;