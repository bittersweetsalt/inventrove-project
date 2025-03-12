// import { PrismaClient } from '@prisma/client';
import prisma from "../../../lib/prisma/prisma";

// NEEDS TO BE WORKED ON

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
      const { id } = req.query;
        
      try {
        const deletedItem = await prisma.products.delete({
          where: { product_id: parseInt(id) },
        });
        res.status(200).json(deletedItem);
        // console.log("reached: " + id + " will be deleted");
        // console.log(id);
      } catch (error) {
        console.error('Error message:', error.message);

        res.status(500).json({ error: "Unable to delete item" });
      }
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  