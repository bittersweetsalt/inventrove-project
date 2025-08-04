// pages/api/tracking/tracking_query.js
import prisma from '../../../lib/prisma/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed'
    });
  }

  const { number } = req.query;

  if (!number) {
    return res.status(400).json({
      success: false,
      message: 'Tracking number is required'
    });
  }

  try {
    const shippingInfo = await prisma.shipping.findFirst({
      where: {
        tracking_number: {
          equals: number,
          mode: 'insensitive'
        }
      },
      include: {
        order: true
      }
    });

    if (!shippingInfo) {
      return res.status(404).json({
        success: false,
        message: 'Tracking number not found'
      });
    }

    // Return the exact structure from Prisma query
    const responseData = {
      shipping_id: shippingInfo.shipping_id,
      order_id: shippingInfo.order_id,
      tracking_number: shippingInfo.tracking_number,
      shipped_date: shippingInfo.shipped_date,
      estimated_delivery_date: shippingInfo.estimated_delivery_date,
      order: {
        order_id: shippingInfo.order.order_id,
        customer_id: shippingInfo.order.customer_id,
        order_date: shippingInfo.order.order_date,
        order_status_id: shippingInfo.order.order_status_id,
        total_price: shippingInfo.order.total_price
      }
    };
    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Tracking query error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}