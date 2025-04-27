const axios = require('axios');
const User = require('../models/UserModel');

const generateWorkoutPlan = async (req, res) => {
    try {
    const { userId, note } = req.body;
    if (!userId || !note) {
        return res.status(400).json({ error: "Missing userId or note" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const prompt = `
Based on the following user info:
- Age: ${user.age}
- Height: ${user.height} cm
- Weight: ${user.weight} kg
- BMI: ${user.BMI || "N/A"}
- Note: ${note}

Suggest a workout plan. 
Respond ONLY with a pure JSON array of 6-8 YouTube workouts (must exist on YouTube).

Each workout object must have exactly:
- title (string)
- duration (string)
- category (one of: "Quick Workouts", "Beginner-Friendly Workouts", "Targeted Muscle Group Workouts", "Home Workouts")
- videoId (11 character YouTube ID ONLY, no full link)

Strict JSON ONLY. No explanation.
Example:
[
    {
    "title": "10 Minute Beginner Cardio",
    "duration": "10 mins",
    "category": "Quick Workouts",
    "videoId": "KrmYjcQzSsQ"
    }
    ]
    `;

    const groqRes = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }]
        },
        {
        headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
        },
        }
    );

    const aiContent = groqRes.data.choices[0].message.content.trim();
    const firstBracket = aiContent.indexOf("[");
    const lastBracket = aiContent.lastIndexOf("]");
    const arrayString = aiContent.substring(firstBracket, lastBracket + 1);

    let workoutVideos;
    try {
        workoutVideos = JSON.parse(arrayString);
    } catch (err) {
        console.error("Failed to parse workout JSON:", err);
        return res.status(500).json({ error: "Failed to format workout plan" });
    }

    res.status(200).json({ workoutVideos });

    } catch (error) {
    console.error("Error generating workout plan:", error.message);
    res.status(500).json({ message: "Failed to generate workout plan" });
    }
};

module.exports = { generateWorkoutPlan };
