// pages/api/register.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, firstName, lastName, position, department, phone, hireDate } = req.body;

  // Validate required fields
  if (!email || !password || !firstName || !lastName || !position || !department) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.users.create({
      data: {
        email: email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        position,
        department,
        phone,
        hire_date: hireDate ? new Date(hireDate) : null, // Optional hire date
        status: 'active', // Default status is 'active'
      },
    });

    // Respond with the new user's information, excluding the password
    res.status(201).json({
      users: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        position: newUser.position,
        department: newUser.department,
        phone: newUser.phone,
        hireDate: newUser.hireDate,
        status: newUser.status,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await prisma.$disconnect();
  }
}
