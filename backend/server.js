import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection string from .env file
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
(async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit the process with failure
  }
})();

// Use the user routes
app.use("/auth", userRoutes);

// Use the project routes
app.use("/projects", projectRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
