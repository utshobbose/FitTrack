import { useState } from 'react';
import axios from 'axios';
import { backend } from '../context/api';

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWorkoutVideos = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const res = await axios.post(`${backend}/workoutai/generate`, {
        userId,
        note,
      });
      setVideos(res.data.workoutVideos);
    } catch (err) {
      console.error("Failed to fetch workout videos", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const filteredVideos = filter === 'All' ? videos : videos.filter(video => video.category === filter);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-800 mb-6">Workout Videos</h1>

        {/* Input Section */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Enter your fitness goal (e.g. Lose weight)"
            className="flex-1 p-3 border rounded-lg shadow-md"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            onClick={fetchWorkoutVideos}
            disabled={loading || !note.trim()}
            className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            {['All', 'Quick Workouts', 'Beginner-Friendly Workouts', 'Targeted Muscle Group Workouts', 'Home Workouts'].map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 rounded-lg shadow-md ${filter === category ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-teal-600 hover:text-white`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg">
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-700 truncate">{video.title}</h3>
                <p className="text-gray-500 text-sm">{video.duration}</p>
                <p className="text-gray-500 text-sm">{video.category}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-block bg-teal-500 text-white px-4 py-2 rounded-lg text-center hover:bg-teal-600"
                >
                  Watch Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGrid;
