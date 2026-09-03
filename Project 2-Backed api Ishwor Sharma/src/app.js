import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cabinRoutes from "./routes/cabin.route.js";
import authRoutes from "./routes/user.route.js";
import { connectDB } from "./database.js";
import bookingRoutes from './routes/booking.route.js';
import paymentRoutes from './routes/payment.Routes.js';
import dashboardRoutes from "./routes/dashboard.route.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Cabin Booking API is running");
});

app.use("/api/v1/cabins", cabinRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
