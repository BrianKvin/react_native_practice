import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }))

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes)

const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, () => {


  // Connect to database
  connectDB()
    .then(() => console.log("✅ Database connected successfully"))
    .catch((err) => {
      process.exit(1);
    });
});












// Request logging middleware
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
//   next();
// });

// Root route
// app.get("/", (req, res) => {
//   console.log("Root route hit");
//   res.status(200).json({
//     status: "Server is running",
//     message: "Welcome to the API",
//     version: "1.0.0",
//   });
// });

// API info route (handle both /api and /api/)
// app.get("/api", (req, res) => {
//   res.json({
//     message: "API is running",
//     version: "1.0.0",
//     endpoints: {
//       auth: {
//         register: "POST /api/auth/register",
//         login: "POST /api/auth/login",
//       },
//     },
//     documentation: "Available endpoints listed above",
//   });
// });

// app.get("/api/", (req, res) => {
//   res.json({
//     message: "API is running",
//     version: "1.0.0",
//     endpoints: {
//       auth: {
//         register: "POST /api/auth/register",
//         login: "POST /api/auth/login",
//       },
//     },
//     documentation: "Available endpoints listed above",
//   });
// });

// Health check route
// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "API is healthy",
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//   });
// });


// 404 handler - must be after all other routes
// app.use((req, res) => {
//   console.log(`404 - Route not found: ${req.method} ${req.path}`);
//   res.status(404).json({
//     success: false,
//     error: {
//       message: `Route ${req.path} not found`,
//       code: "NOT_FOUND",
//       availableRoutes: [
//         "GET /",
//         "GET /api",
//         "GET /api/health",
//         "POST /api/auth/register",
//         "POST /api/auth/login",
//       ],
//     },
//   });
// });

// Global error handling middleware - must be last
// app.use((err, req, res, next) => {
//   console.error("Error:", err);

  // Handle specific error types
  // if (err.name === "ValidationError") {
  //   return res.status(400).json({
  //     success: false,
  //     error: {
  //       message: "Validation Error",
  //       details: err.message,
  //     },
  //   });
  // }

  // if (err.name === "CastError") {
  //   return res.status(400).json({
  //     success: false,
  //     error: {
  //       message: "Invalid ID format",
  //       details: err.message,
  //     },
  //   });
  // }

  // if (err.code === 11000) {
  //   return res.status(400).json({
  //     success: false,
  //     error: {
  //       message: "Duplicate field value",
  //       details: "A record with this value already exists",
  //     },
  //   });
  // }

  // Default error
  // res.status(500).json({
  //   success: false,
  //   error: {
  //     message: "Internal server error",
  //     ...(process.env.NODE_ENV === "development" && {
  //       details: err.message,
  //       stack: err.stack,
  //     }),
  //   },
  // });
// });

// Graceful shutdown handlers
// process.on("SIGTERM", () => {
//   console.log("👋 SIGTERM signal received: closing HTTP server");
//   server.close(() => {
//     console.log("💀 HTTP server closed");
//     process.exit(0);
//   });
// });

// process.on("SIGINT", () => {
//   console.log("👋 SIGINT signal received: closing HTTP server");
//   server.close(() => {
//     console.log("💀 HTTP server closed");
//     process.exit(0);
//   });
// });

// Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.error("💥 Unhandled Rejection at:", promise, "reason:", err);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// Handle uncaught exceptions
// process.on("uncaughtException", (err) => {
//   console.error("💥 Uncaught Exception:", err);
//   process.exit(1);
// });
export default app;
