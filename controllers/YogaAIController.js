const axios = require('axios');
const User = require('../models/UserModel');

const generateYogaPlan = async (req, res) => { // Corrected: (req, res)
    try {
        const userId = req.headers.userid;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ error: 'User not found' });

        const prompt = `Create a personalized yoga plan for:
        Age: ${user.age}
        Height: ${user.height} cm
        Weight: ${user.weight} kg
        BMI: ${user.BMI}
        Calories: ${user.calories}
        Goals: Flexibility, stress reduction.`;

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

    const aiPlan = groqRes.data.choices[0].message.content;
    res.status(200).json({ yogaPlan: aiPlan });

    } catch (error) {
    console.error("Error generating plan:", error.message);
    res.status(500).json({ message: "Failed to generate yoga plan" });
    }
};

module.exports = { generateYogaPlan };
