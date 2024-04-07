import prisma from "../../../lib/prisma/prisma";

export default async function PrismaQuery(req, res) {
    if (req.method === 'GET') {
        try {
            const allSellers = await prisma.sellers.findMany({});
            res.status(200).json(allSellers);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}
