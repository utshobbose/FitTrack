const axios = require('axios');
const User = require('../models/UserModel');
const YogaAI = require('../models/YogaAIModel');

const generateYogaPlan = async (req, res) => {
  try {
    const userId = req.headers.userid;
    if (!userId) return res.status(400).json({ error: "User ID missing" });

    const existingPlan = await YogaAI.findOne({ userId });
    if (existingPlan) {
      return res.status(200).json({ 
        yogaPlan: existingPlan.yogaPlan,
        source: "database"
      });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const prompt = `Create a detailed personalized yoga plan.
    Respond ONLY with a pure JSON array, without any extra text, headings, or explanation.
    VERY IMPORTANT: 
    - Make 7 full days (Day 1 to Day 7).
    - Each day must have 3 different yoga exercises.
    - Each exercise must include day, exercise, description, instructions, and time fields.
    Format:
    [
      {
        "day": "Day 1",
        "exercise": "Mountain Pose",
        "description": "...",
        "instructions": "...",
        "time": "5 minutes"
      },
      ...
    ]
    User Info:
    Age: ${user.age}
    Height: ${user.height} cm
    Weight: ${user.weight} kg
    BMI: ${user.BMI}
    Calories: ${user.calories}
    Goals: Flexibility, strength, stress reduction.
    `;
    const groqRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
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
    // 🔥 Parse Pure Array
    let yogaPlanArray;
    try {
      yogaPlanArray = JSON.parse(arrayString);
    } catch (error) {
      console.error("Failed to parse AI JSON:", error);
      return res.status(500).json({ error: "Failed to format AI plan" });
    }

    const newPlan = new YogaAI({ userId, yogaPlan: yogaPlanArray });
    await newPlan.save();
  

    return res.status(201).json({ 
      yogaPlan: yogaPlanArray, 
      source: "generated" 
    });

  } catch (error) {
    console.error("Error generating yoga plan:", error.message);
    res.status(500).json({ message: "Failed to generate yoga plan" });
  }
};

module.exports = { generateYogaPlan };
