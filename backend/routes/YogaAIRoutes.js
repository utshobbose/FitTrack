const express = require('express');
const {generateYogaPlan} = require('../controllers/YogaAIController');

const router = express.Router();

// GET /api/yogaai/generate
router.get('/generate', generateYogaPlan);

module.exports = router;