// import { PrismaClient } from '@prisma/client';
import prisma from "../../../lib/prisma/prisma";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { product_id, name, description, category_id, price, stock } = req.body;

        try {
            const updatedPost = await prisma.products.update({
                where: { product_id: Number(product_id) },
                data: {  
                    name: name,
                    description: description,
                    category_id: category_id,
                    price: price,
                    stock: stock,
                },
                });
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: 'Post not found or update failed' });
            console.log(error);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}