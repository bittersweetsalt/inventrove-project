import prisma from "../../../lib/prisma/prisma";

export default async function PrismaQuery(req, res) {
    if (req.method === 'POST') {
        try {
            const product_query = await prisma.products.findUnique({
                where: {
                    product_id: parseInt(req.body.query_id) // Assuming 'id' is the unique identifier field
                }
            });
            res.status(200).json(product_query);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}
