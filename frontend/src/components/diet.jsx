import  { useState } from 'react';

const DietChart = () => {
  const [Calories, setCalories] = useState(2000); // Default calorie intake
  const [dietPlan, setDietPlan] = useState([]);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Updated Meal Plans with additional calorie data
  const mealPlans = [
    {
      meal: "Breakfast",
      options: [
        { item: "Oatmeal with fruits", calories: 300, protein: 10, carbs: 50, fat: 5, image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { item: "Scrambled eggs with toast", calories: 350, protein: 20, carbs: 30, fat: 15, image: "https://cooktoria.com/wp-content/uploads/2019/09/Best-Egg-Toast-SQ-1.jpg" },
        { item: "Smoothie with nuts", calories: 250, protein: 8, carbs: 35, fat: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7qD6ACFMEXD1SGJn4ewxklu8yoeVXGctPYg&s" },
        { item: "Avocado Toast", calories: 380, protein: 9, carbs: 35, fat: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc9AIvAc6dkD5GTVhVASi91F4Jc4n7AbOFhw&s" },
        { item: "Greek Yogurt Parfait", calories: 320, protein: 15, carbs: 45, fat: 10, image: "https://totaste.com/wp-content/uploads/2022/06/greek-yogurt-parfait.jpeg" }
      ]
    },
    {
      meal: "Lunch",
      options: [
        { item: "Grilled chicken with quinoa", calories: 500, protein: 40, carbs: 45, fat: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnhIqICPHPxwsgFlxFjyehUM5hpAkyH6nGKA&s" },
        { item: "Vegetable stir-fry with rice", calories: 400, protein: 15, carbs: 60, fat: 8, image: "https://cookingwithcoit.com/wp-content/uploads/2021/04/CARD_Vegetable-Stir-Fry.jpg" },
        { item: "Salmon with sweet potato", calories: 450, protein: 35, carbs: 40, fat: 15, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZMWxsJymGB70Y01mawDpf2E5hcKvnsc1DSA&s" },
        { item: "Chicken Caesar Salad", calories: 550, protein: 35, carbs: 25, fat: 28, image: "https://heartbeetkitchen.com/foodblog/wp-content/uploads/2022/06/ultimate-grilled-chicken-caesar-salad.jpg" },
        { item: "Turkey Avocado Wrap", calories: 420, protein: 30, carbs: 40, fat: 15, image: "https://www.melskitchencafe.com/wp-content/uploads/2023/01/veggie-turkey-wrap9.jpg" }
      ]
    },
    {
      meal: "Dinner",
      options: [
        { item: "Grilled vegetables with tofu", calories: 400, protein: 20, carbs: 40, fat: 10, image: "https://www.lastingredient.com/wp-content/uploads/2021/06/grilled-tofu-shawarma-recipe3.jpg" },
        { item: "Pasta with marinara sauce", calories: 350, protein: 12, carbs: 55, fat: 8, image: "https://www.sipandfeast.com/wp-content/uploads/2022/08/marinara-recipe-snippet.jpg" },
        { item: "Soup with whole-grain bread", calories: 300, protein: 10, carbs: 45, fat: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJAZCcdpta01yjl3GA5WFOeut4k_qmFDF_hQ&s" },
        { item: "Lamb Stir Fry with Veggies", calories: 500, protein: 40, carbs: 50, fat: 15, image: "https://igav3-metcdn-com.global.ssl.fastly.net/content/uploads/sites/2/2024/06/06150807/Sweet-and-sour-lamb-stir-fry_v2.png" },
        { item: "Chicken Fajitas with Guacamole", calories: 600, protein: 45, carbs: 45, fat: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNOM9cqtsOxLwdNT-QSu925doMbehnexOv4g&s" }
      ]
    },
    {
      meal: "Snacks",
      options: [
        { item: "Yogurt with granola", calories: 150, protein: 6, carbs: 20, fat: 4, image: "https://dailydish.co.uk/wp-content/uploads/2023/04/yogurt-granola-breakfast-bowl-healthy.jpg" },
        { item: "Almonds (1 oz)", calories: 160, protein: 6, carbs: 6, fat: 14, image: "https://images.unsplash.com/photo-1590080876351-941da357bde6?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { item: "Apple with peanut butter", calories: 250, protein: 6, carbs: 30, fat: 14, image: "https://cdn-uploads.mealime.com/uploads/recipe/thumbnail/2529/presentation_33a8fcf0-a2f8-4847-9580-5d12d5880290.jpeg" },
        { item: "Hard-boiled eggs (2)", calories: 140, protein: 12, carbs: 1, fat: 10, image: "https://cdn.jwplayer.com/v2/media/8l8xcwtv/poster.jpg?width=720" },
        { item: "Protein bar", calories: 200, protein: 20, carbs: 15, fat: 8, image: "https://tastesbetterfromscratch.com/wp-content/uploads/2022/03/Protein-Bars-High-Res-9-scaled.jpg" }
      ]
    }
  ];

  const generateDietPlan = () => {
    const weeklyPlan = [];

    // Loop through each day
    for (let i = 0; i < 7; i++) {
      let totalCaloriesForDay = 0; // Reset calories for each day

      const dailyPlan = mealPlans.map((meal) => {
        const option = meal.options[Math.floor(Math.random() * meal.options.length)];
        totalCaloriesForDay += option.calories;

        return {
          meal: meal.meal,
          ...option
        };
      });

      // Push the daily plan to the weekly plan
      weeklyPlan.push(dailyPlan);
    }

    setDietPlan(weeklyPlan);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Custom Diet Planner</h1>

      {/* User Input Form */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="gender" className="block text-lg font-medium mb-2">Gender:</label>
            <select id="gender" className="w-full p-2 border border-gray-300 rounded-md">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="age" className="block text-lg font-medium mb-2">Age:</label>
            <input type="number" id="age" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="height" className="block text-lg font-medium mb-2">Height (in cm):</label>
            <input type="number" id="height" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="weight" className="block text-lg font-medium mb-2">Weight (in kg):</label>
            <input type="number" id="weight" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="activity" className="block text-lg font-medium mb-2">Activity Level:</label>
            <select id="activity" className="w-full p-2 border border-gray-300 rounded-md">
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="very">Very Active</option>
            </select>
          </div>
          <div>
            <label htmlFor="goal" className="block text-lg font-medium mb-2">Weight Goal:</label>
            <select id="goal" className="w-full p-2 border border-gray-300 rounded-md">
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>
        </div>
      </div>

      <button onClick={generateDietPlan} className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600">Generate Diet Chart</button>

      {dietPlan.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Weekly Meal Plan</h2>
          {dietPlan.map((dayPlan, dayIndex) => (
            <div key={dayIndex} className="mb-6">
              <h3 className="text-lg font-bold mb-4 bg-teal-500 text-white p-2 rounded-lg">{daysOfWeek[dayIndex]}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dayPlan.map((meal, idx) => (
                  <div key={idx} className="p-4 border border-gray-300 rounded-lg">
                    <img src={meal.image} alt={meal.item} className="w-full h-32 object-cover rounded-md mb-2" />
                    <h4 className="text-md font-bold mb-2">{meal.meal}</h4>
                    <p>{meal.item}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      <p>Calories: {meal.calories}</p>
                      <p>Protein: {meal.protein}g</p>
                      <p>Carbs: {meal.carbs}g</p>
                      <p>Fat: {meal.fat}g</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DietChart;
