import prisma from "../../../lib/prisma/prisma";

export default async function PrismaQuery(req, res) {
    if (req.method === 'GET') {
        try {
            const allBuyers = await prisma.buyers.findMany({});
            res.status(200).json(allBuyers);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}
