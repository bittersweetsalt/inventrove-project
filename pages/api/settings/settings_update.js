// pages/api/settings/update.js
import prisma from "../../../lib/prisma/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { 
      userId,
      userData,
      settings 
    } = req.body;

    try {
      // Update both user and settings in a single transaction
      const [updatedUser, updatedSettings] = await prisma.$transaction([
        prisma.users.update({
          where: { id: Number(userId) },
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone: userData.phone,
          },
          include: {
            settings: true // Include the settings in the user response
          }
        }),
        prisma.user_settings.update({
          where: { user_id: Number(userId) },
          data: {
            theme: settings.theme,
            language: settings.language,
            receive_email_notifications: settings.receive_email_notifications,
            receive_sms_notifications: settings.receive_sms_notifications,
            timezone: settings.timezone,
            items_per_page: settings.items_per_page,
          }
        })
      ]);

      res.status(200).json({
        user: updatedUser,
        settings: updatedSettings
      });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ 
        error: 'Update failed',
        details: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}