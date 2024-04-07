import prisma from "../../../lib/prisma/prisma";

export default async function PrismaQuery(req, res) {
    if (req.method === 'GET') {
        try {
            const product_query = await prisma.products.findMany({});
            res.status(200).json(product_query);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}
