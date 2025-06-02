// pages/api/register.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    email, 
    password, 
    first_name, 
    last_name, 
    position, 
    department, 
    phone, 
    hire_date 
  } = req.body;

  // Validate required fields
  if (!email || !password || !first_name || !last_name || !position || !department) {
    return res.status(400).json({ 
      message: 'Missing required fields',
      required: ['email', 'password', 'first_name', 'last_name', 'position', 'department']
    });
  }

  try {
    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password with 12 rounds of salting
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with default settings
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        position,
        department,
        phone: phone || null,
        hire_date: hire_date ? new Date(hire_date) : null,
        status: 'active',
        created_at: new Date(),
        settings: {
          create: {
            theme: 'light',
            language: 'en',
            receive_email_notifications: true,
            receive_sms_notifications: false,
            timezone: 'UTC',
            items_per_page: 10
          }
        }
      },
      include: {
        settings: true
      }
    });

    // Construct response without sensitive data
    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      position: newUser.position,
      department: newUser.department,
      phone: newUser.phone,
      hire_date: newUser.hire_date,
      status: newUser.status,
      created_at: newUser.created_at,
      settings: {
        theme: newUser.settings.theme,
        language: newUser.settings.language,
        notifications: {
          email: newUser.settings.receive_email_notifications,
          sms: newUser.settings.receive_sms_notifications
        },
        preferences: {
          timezone: newUser.settings.timezone,
          items_per_page: newUser.settings.items_per_page
        }
      }
    };

    return res.status(201).json(userResponse);

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        message: 'Email address already in use',
        field: 'email'
      });
    }
    
    // Handle other errors
    return res.status(500).json({ 
      message: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        error: error.message,
        stack: error.stack
      })
    });
  } finally {
    await prisma.$disconnect();
  }
}