import prisma from "../../../../lib/prisma/prisma";

export default async function PrismaQuery(req, res) {
    if (req.method === 'POST') {
        try {
            const buyer_query = await prisma.buyers.findUnique({
                where: {
                    buyer_id: parseInt(req.body.query_id) // Assuming 'id' is the unique identifier field
                },
                relationLoadStrategy: 'join', // or 'query'
                include: {
                    transactions: true,
                }, 
            });
            res.status(200).json(buyer_query);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}
