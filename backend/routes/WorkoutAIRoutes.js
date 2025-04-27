const express = require('express');
const { generateWorkoutPlan } = require('../controllers/WorkoutAIController');

const router = express.Router();

// POST /api/workoutai/generate
router.post('/generate', generateWorkoutPlan);

module.exports = router;
