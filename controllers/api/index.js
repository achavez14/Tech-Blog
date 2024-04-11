const express = require('express');
const router = express.Router();

// Import and use the API route files
const commentRoutes = require('./commentRoutes');
const blogPostRoutes = require('./blogpostRoutes');
const userRoutes = require('./userRoutes');

// Import other API route files as needed
router.use('/comments', commentRoutes);
router.use('/blogposts', blogPostRoutes);
router.use('/users', userRoutes);

module.exports = router;