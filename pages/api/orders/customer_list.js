import prisma from "../../../lib/prisma/prisma";

export default async function PrismaQuery(req, res) {
    if (req.method === 'GET') {
        try {
            const allCustomer = await prisma.customers.findMany({});
            res.status(200).json(allCustomer);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}
