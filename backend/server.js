const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const stripSlash = (url) => (url ? url.replace(/\/+$/, '') : url);
const userRoutes = require('./routes/UserRoutes');
//const mealRoutes = require('./routes/MealRoutes');
const productRoutes = require('./routes/ProductRoutes');
const orderRoutes = require("./routes/OrderRoutes");
const recipeRoutes = require("./routes/RecipeRoutes");
const progressRoutes = require("./routes/ProgressRoutes");
const YogaAIRoutes = require("./routes/YogaAIRoutes");
const workoutRoutes = require("./routes/WorkoutAIRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const mongoString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clusterfittrack.ji7jdtp.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFitTrack`


// Middleware
// app.use(cors());



// ---- CORS (place before express.json and routes) ----
const allowedOrigins = new Set([
  stripSlash(process.env.CLIENT_ORIGIN),  // e.g., https://fit-track-iota-seven.vercel.app
  'http://localhost:5173',
]);

app.use(cors({
  origin: (origin, cb) => {
    // allow server-to-server or curl (no Origin)
    if (!origin) return cb(null, true);
    const o = stripSlash(origin);
    if (allowedOrigins.has(o)) return cb(null, true);
    return cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: false, // set to true ONLY if you actually use cookies across origins
}));

// Make sure preflight is answered
app.options('*', cors());


app.use(express.json()); // Parse JSON requests

// Database connection
// mongoose.connect(process.env.MONGO_URI).then(() => console.log("Database connected"))
//   .catch((err) => console.error(err));
mongoose.connect(mongoString)
.then (() => console.log("Database connected"))
.catch((err) => console.error(err));

// Import routes
// const userRoutes = require("./routes/userRoutes");

// Routes
app.use('/api/users', userRoutes);
//app.use('/api/meals', mealRoutes);
app.use('/api/product', productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/yogaai", YogaAIRoutes);
app.use("/api/workoutai", workoutRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
