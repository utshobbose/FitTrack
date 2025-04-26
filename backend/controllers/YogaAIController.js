const axios = require('axios');
const User = require('../models/UserModel');

const generateYogaPlan = async (req, res) => { // Corrected: (req, res)
    try {
        const userId = req.headers.userid;
        if (!userId) return res.status(400).json({ error: "User ID missing" });

        // Check if the user already has a yoga plan
        const existingPlan = await YogaAI.findOne({ userId });
        if (existingPlan) {
            return res.status(200).json({ yogaPlan: existingPlan.yogaPlan });
        }

        // Fetch user details from the database
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
 

        // Create prompt 
        const prompt = `Create a personalized yoga plan for:
        Age: ${user.age}
        Height: ${user.height} cm
        Weight: ${user.weight} kg
        BMI: ${user.BMI}
        Calories: ${user.calories}
        Goals: Flexibility, stress reduction.`;


        // Call the AI API to generate the yoga plan
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

        // Step 5: Save to database
        const newPlan = new YogaAI({ userId, yogaPlan: aiPlan });
        await newPlan.save();
    
        // Step 6: Return the new plan
        res.status(201).json({ yogaPlan: aiPlan });
    
        } catch (error) {
        console.error("Error generating plan:", error.message);
        res.status(500).json({ message: "Failed to generate yoga plan" });
        }
    };

module.exports = { generateYogaPlan };
