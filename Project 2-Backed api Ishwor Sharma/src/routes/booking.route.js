import express from "express";
import { accessTo, protectedRoutes } from "../middleware/protectedRoutes.js";
import { createBooking, deleteBooking, getAllBookings, getBooking, getOwnBooking, updateBooking, updateBookingStatus } from "../controller/booking.controller.js";

const router = express.Router();
router.post("/",protectedRoutes,accessTo("USER"),createBooking);
router.get("/",protectedRoutes,getAllBookings);
router.get("/user",protectedRoutes,accessTo("USER"),getOwnBooking);
router.get("/:id",protectedRoutes,getBooking);
router.patch("/:id",protectedRoutes,accessTo("ADMIN", "USER"),updateBooking);
router.delete("/:id",protectedRoutes,accessTo("ADMIN"),deleteBooking);
router.patch("/:id/status",protectedRoutes,accessTo("ADMIN"),updateBookingStatus);

export default router;
