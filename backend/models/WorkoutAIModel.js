const mongoose = require('mongoose');

const workoutAISchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    },
    workoutVideos: [
    {
        title: String,
        videoUrl: String,
        duration: String,
        category: String,
        note: { type: String, default: "" }
    }
    ]
}, { timestamps: true });

const WorkoutAI = mongoose.model("WorkoutAI", workoutAISchema);

module.exports = WorkoutAI;
