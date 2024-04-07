import prisma from "../../../lib/prisma/prisma";

export default async function PrismaQuery(req, res) {
    if (req.method === 'GET') {
        try {
            const allTransactions = await prisma.transactions.findMany({
                relationLoadStrategy: 'join', // or 'query'
                include: {
                    buyer: true,
                    seller: true,
                    order: true,
                }, 
            });
            res.status(200).json(allTransactions);
            // return res;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
            // return res;

        }
    }
}
