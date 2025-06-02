import prisma from '../../../lib/prisma/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({ 
        where: { email }, 
        include: {
            settings: true // This includes the related user_settings record
        }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const user_settings = user.settings;
    res.status(200).json({ token, user_settings });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
