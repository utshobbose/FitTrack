const axios = require('axios');
const User = require('../models/UserModel');

//video list 
// const curatedVideos = [
//     {
//         title: "Heavy Dumbbell Low Rep Strength and Stability",
//         duration: "33 mins",
//         category: "Core Workouts",
//         url: "https://www.fitnessblender.com/videos/heavy-dumbbell-low-rep-strength-and-stability-gain-total-body-strength-and-control"
//     },
//     {
//         title: "Low Impact Cardio with Static Holds",
//         duration: "32 mins",
//         category: "Beginner-Friendly Workouts",
//         url: "https://www.fitnessblender.com/videos/low-impact-cardio-with-static-holds-with-a-red-light-green-light-approach"
//     },
//     {
//         title: "30-Minute HIIT Cardio Workout with Warm Up - No Equipment at Home | SELF",
//         duration: "28 mins",
//         category: "Home Workouts",
//         url: "https://www.youtube.com/watch?v=ml6cT4AZdqI"
//     },
//     {
//         title: "30 Min FULL BODY WORKOUT with WARM UP | No Equipment & No Repeat | Rowan Row",
//         duration: "32 mins",
//         category: "Home Workouts",
//         url: "https://www.youtube.com/watch?v=UIPvIYsjfpo"
//     },
//     {
//         title: "45 Min FULL BODY WORKOUT | No Equipment | No Repeat | Rowan Row",
//         duration: "42 mins",
//         category: "Full Body Workouts",
//         url: "https://www.youtube.com/watch?v=MOrRRvSGIQc"
//     },
//     {
//         title: "Beginner Morning Yoga",
//         duration: "20 mins",
//         category: "Beginner-Friendly Workouts",
//         url: "https://www.youtube.com/watch?v=v7AYKMP6rOE"
//     }
//     ];

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

Suggest a workout plan that uses real, existing YouTube videos.
Search and return only **real and popular YouTube video URLs** for workouts that match this user profile.
Respond ONLY with a pure JSON array of 6-8 YouTube workouts (must exist on YouTube).

Each workout object must have exactly:
- title (string)
- duration (string)
- category (one of: "Full body Workouts", "Quick Workouts","Beginner-Friendly Workouts", "Targeted Muscle Group Workouts", "Home Workouts")
- url (must be a FULL YouTube video URL that actually exists, like https://www.youtube.com/watch?v=...)

Strict JSON ONLY. No explanation.
Example:
[
    {
    "title": "30 Min FULL BODY WORKOUT with WARM UP | No Equipment & No Repeat | Rowan Row",
    "duration": "32:52",
    "category": "Full Body Workouts",
    "url": "https://www.youtube.com/watch?v=UIPvIYsjfpo"
    }
    ]
Do not invent fake IDs. Only return videos that are real and likely to exist.
Strict JSON ONLY. No explanation.
    `;
    // const prompt = `
    // You are given a numbered list of real workout videos:
    
    // 0: Heavy Dumbbell Low Rep Strength and Stability
    // 1: Low Impact Cardio with Static Holds
    // 2: 30-Minute HIIT Cardio Workout with Warm Up
    // 3: 30 Min FULL BODY WORKOUT with Rowan Row
    // 4: 45 Min FULL BODY WORKOUT with Rowan Row
    // 5: Beginner Morning Yoga
    
    // User Profile:
    // - Age: ${user.age}
    // - Height: ${user.height} cm
    // - Weight: ${user.weight} kg
    // - BMI: ${user.BMI || "N/A"}
    // - Goal/Note: ${note}
    
    // Return ONLY a JSON array of the most suitable video indexes (6 to 8 values max).
    
    // Example:
    // [2, 3, 5]
    // `;
    


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
