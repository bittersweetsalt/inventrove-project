import prisma from "../../../lib/prisma/prisma";

export default async function PrismaQuery(req, res) {
    if (req.method === 'POST') {

        const { userID } = req.body;
        // console.log(req.body);
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: Number(userID), // Convert string ID to number
                },
                include: {
                    settings: true, // Include all settings data
                },
            })
            res.status(200).json(user);
            // res.status(200);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}
