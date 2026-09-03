import { PaymentStatus } from "@prisma/client";
import prisma from "../database.js";

export const getDashboardSummary = async (req, res) => {
    try {
        const [
            totalUsers,
            totalCabins,
            totalBookings,
            paidPaymentsAggregate,
            pendingPayments,
            bookingsByStatusRows,
            recentBookings,
            topCabinsRaw,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.cabin.count(),
            prisma.booking.count(),
            prisma.payment.aggregate({
                _sum: { amount: true },
                where: { status: PaymentStatus.COMPLETED },
            }),
            prisma.payment.count({ where: { status: PaymentStatus.PENDING } }),
            prisma.booking.groupBy({
                by: ["status"],
                _count: { _all: true },
            }),
            prisma.booking.findMany({
                take: 7,
                orderBy: { createdAt: "desc" },
                include: {
                    user: { select: { fullName: true, email: true } },
                    cabin: { select: { name: true } },
                    payment: true,
                },
            }),
            prisma.booking.groupBy({
                by: ["cabinId"],
                _sum: { totalPrice: true },
                _count: { _all: true },
                orderBy: {
                    _sum: { totalPrice: "desc" },
                },
                take: 5,
            }),
        ]);

        const cabinIds = topCabinsRaw.map((item) => item.cabinId);
        const cabinMap = new Map(
            (
                await prisma.cabin.findMany({
                    where: { id: { in: cabinIds } },
                    select: { id: true, name: true, image: true },
                })
            ).map((cabin) => [cabin.id, cabin])
        );

        const bookingsByStatus = {
            UNCONFIRMED: 0,
            CONFIRMED: 0,
            CHECKED_IN: 0,
            CHECKED_OUT: 0,
            CANCELLED: 0,
        };
        bookingsByStatusRows.forEach((row) => {
            bookingsByStatus[row.status] = row._count._all;
        });

        const monthStart = new Date();
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);

        const prevMonthStart = new Date(monthStart);
        prevMonthStart.setMonth(prevMonthStart.getMonth() - 1);

        const [revenueThisMonthAgg, revenueLastMonthAgg] = await Promise.all([
            prisma.payment.aggregate({
                _sum: { amount: true },
                where: {
                    status: PaymentStatus.COMPLETED,
                    paymentDate: { gte: monthStart },
                },
            }),
            prisma.payment.aggregate({
                _sum: { amount: true },
                where: {
                    status: PaymentStatus.COMPLETED,
                    paymentDate: { gte: prevMonthStart, lt: monthStart },
                },
            }),
        ]);

        const topCabins = topCabinsRaw.map((item) => ({
            cabinId: item.cabinId,
            name: cabinMap.get(item.cabinId)?.name || "Unknown cabin",
            image: cabinMap.get(item.cabinId)?.image || null,
            bookings: item._count._all,
            revenue: item._sum.totalPrice || 0,
        }));

        return res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalCabins,
                totalBookings,
                totalRevenue: paidPaymentsAggregate._sum.amount || 0,
                pendingPayments,
                bookingsByStatus,
                revenueThisMonth: revenueThisMonthAgg._sum.amount || 0,
                revenueLastMonth: revenueLastMonthAgg._sum.amount || 0,
                recentBookings,
                topCabins,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
