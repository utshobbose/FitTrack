import { useEffect, useState } from "react";
import axios from "axios";
import { backend } from "../context/api";

function YogaAIGenerator() {
  const [yogaPlan, setYogaPlan] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId"); // Get userId early

  useEffect(() => {
    if (userId) {
      const savedPlan = localStorage.getItem(`yogaPlan_${userId}`);
      if (savedPlan) {
        setYogaPlan(JSON.parse(savedPlan));
      }
    }
  }, [userId]);

  const handleGenerateYogaPlan = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backend}/yogaai/generate`, {
        headers: { userid: userId },
      });

      // Save user-specific yoga plan
      localStorage.setItem(`yogaPlan_${userId}`, JSON.stringify(response.data.yogaPlan));
      setYogaPlan(response.data.yogaPlan);

    } catch (error) {
      console.error("Error generating yoga plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-teal-600 mb-6 text-center">
          Personalized Yoga & Meditation Plan
        </h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleGenerateYogaPlan}
            disabled={loading || yogaPlan.length > 0}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Generating Plan..." : "Generate Your Yoga Routine"}
          </button>
        </div>

        {yogaPlan.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow">
              <thead>
                <tr className="bg-teal-500 text-white">
                  <th className="py-3 px-6 text-left">Day</th>
                  <th className="py-3 px-6 text-left">Exercise</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Instructions</th>
                  <th className="py-3 px-6 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {yogaPlan.map((item, index) => (
                  <tr key={index} className="border-t even:bg-gray-50 hover:bg-gray-100">
                    <td className="py-3 px-6 font-semibold">{item.day}</td>
                    <td className="py-3 px-6">{item.exercise}</td>
                    <td className="py-3 px-6">{item.description}</td>
                    <td className="py-3 px-6">{item.instructions}</td>
                    <td className="py-3 px-6">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default YogaAIGenerator;
