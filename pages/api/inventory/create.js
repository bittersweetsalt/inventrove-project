// import { PrismaClient } from '@prisma/client';
import prisma from "../../../lib/prisma/prisma";


export default async function PrismaQuery(req, res) {
    if (req.method === 'POST') {
        try {
            res.status(200);
            const product_create = await prisma.products.create({
                data:{
                    name: req.body.name,
                    description: req.body.description,
                    category_id: req.body.category_id,
                    price: req.body.price,
                    stock: req.body.stock,
                    minio_image_path: req.body.image_path
                }
            });
            res.status(200).json(product_create);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}
