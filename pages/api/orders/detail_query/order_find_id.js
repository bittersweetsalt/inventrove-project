import prisma from "../../../../lib/prisma/prisma";

export default async function PrismaQuery(req, res) {
    if (req.method === 'POST') {
        try {
            const orders_query = await prisma.orders.findUnique({
                where: {
                    order_id: parseInt(req.body.query_id) // Assuming 'id' is the unique identifier field
                },
                relationLoadStrategy: 'join', // or 'query'
                include: {
                    orderitems: true,
                    shipping: true,
                    transactions: true,
                }, 
            });
            res.status(200).json(orders_query);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}
