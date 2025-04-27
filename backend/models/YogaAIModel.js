const mongoose = require('mongoose');

const yogaAISchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    yogaPlan: {
        type: [ 
            {
                day: String,
                exercise: String,
                description: String,
                instructions: String,
                time: String
            }
            ],
        required: true,
    }
}, { timestamps: true });

const YogaAI = mongoose.model("YogaAI", yogaAISchema);

module.exports = YogaAI;