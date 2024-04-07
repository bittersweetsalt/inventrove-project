import prisma from "../../../lib/prisma/prisma";

export default async function PrismaQuery(req, res) {
    if (req.method === 'GET') {
        try {
            const allOrders = await prisma.orders.findMany({
                relationLoadStrategy: 'join', // or 'query'
                include: {
                    customer: true,
                    order_status: true,
                }, 
            });
            // console.log(allBuyers);
            res.status(200).json(allOrders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}
