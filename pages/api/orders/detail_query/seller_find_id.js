import prisma from "../../../../lib/prisma/prisma";

export default async function PrismaQuery(req, res) {
    if (req.method === 'POST') {
        try {
            const seller_query = await prisma.sellers.findUnique({
                where: {
                    seller_id: parseInt(req.body.query_id) // Assuming 'id' is the unique identifier field
                },
                relationLoadStrategy: 'join', // or 'query'
                include: {
                    transactions: true,
                }, 
            });
            res.status(200).json(seller_query);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}
