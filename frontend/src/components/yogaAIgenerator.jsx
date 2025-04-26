import { useState } from "react";
import axios from "axios";
import { backend } from "../context/api"; // You already have this in your project!

function YogaAIGenerator() {
    const [yogaPlan, setYogaPlan] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerateYogaPlan = async () => {
    setLoading(true);
    try {
        const userId = localStorage.getItem("userId");

        const response = await axios.get(`${backend}/yogaai/generate`, {
        headers: { userid: userId },
        });

        setYogaPlan(response.data.yogaPlan); // Must match backend's response key
    } catch (error) {
        console.error("Error generating yoga plan:", error);
    } finally {
        setLoading(false);
    }
    };

    return (
    <section className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-teal-600 mb-6 text-center">
            Personalized Yoga & Meditation Plan
        </h1>

        <div className="flex justify-center mb-8">
            <button
            onClick={handleGenerateYogaPlan}
            disabled={loading}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
            >
            {loading ? "Generating Plan..." : "Generate Your Yoga Routine"}
            </button>
        </div>

        {yogaPlan && (
            <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-line text-gray-700">
            {yogaPlan}
            </div>
        )}
        </div>
    </section>
    );
}

export default YogaAIGenerator;
