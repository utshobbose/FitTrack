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
You are a JSON API that returns workout plans. No intro, no explanation.

Rules:
- Return ONLY a valid JSON array (strict format).
- Each item must have: title (string), duration (string), category (string), url (string)
- No trailing commas.
- Do not wrap response in markdown or text. Only valid JSON, starting with "[" and ending with "]"

User:
Age: ${user.age}
Height: ${user.height} cm
Weight: ${user.weight} kg
BMI: ${user.BMI || "N/A"}
Goal: ${note}

Suggest 6-8 YouTube workout videos matching this profile.
They must be real YouTube URLs.
Category must be one of: "Full Body Workouts", "Quick Workouts", "Beginner-Friendly Workouts", "Targeted Muscle Group Workouts", "Home Workouts".

Respond with ONLY pure JSON:
For example:
[
    {
    "title": "30 Min FULL BODY WORKOUT with WARM UP",
    "duration": "32:52",
    "category": "Full Body Workouts",
    "url": "https://www.youtube.com/watch?v=UIPvIYsjfpo"
    }
    ]
    `;

        const groqRes = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama3-70b-8192",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.2
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                }
            }
        );

        const aiContent = groqRes.data.choices[0].message.content.trim();
        console.log("Full AI Raw Output:", aiContent);

        const startIndex = aiContent.indexOf("[");
        const endIndex = aiContent.lastIndexOf("]");

        if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
            return res.status(500).json({ error: "AI response does not contain valid JSON array" });
        }

        let workoutVideos;
        try {
            const arrayJsonString = aiContent.slice(startIndex, endIndex + 1);
            const cleaned = arrayJsonString.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');

            workoutVideos = JSON.parse(cleaned);

            //  Validate required fields
            workoutVideos = workoutVideos.filter(
                (video) =>
                    typeof video.title === "string" &&
                    typeof video.duration === "string" &&
                    typeof video.category === "string" &&
                    typeof video.url === "string"
            );

            if (workoutVideos.length === 0) {
                return res.status(500).json({ error: "No valid workout videos found from AI" });
            }

        } catch (err) {
            console.error("AI response (pre-parse):", aiContent);
            console.error("JSON parse error:", err.message);
            return res.status(500).json({ error: "AI gave invalid workout list. Please try again." });
        }

        res.status(200).json({ workoutVideos });

    } catch (err) {
        console.error("Error in generateWorkoutPlan:", err.message);
        return res.status(500).json({ error: "An error occurred while generating the workout plan." });
    }
};

module.exports = { generateWorkoutPlan };

