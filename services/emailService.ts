import { BookingFormData } from '../types';

/**
 * Service to handle email delivery via Resend.
 * 
 * NOTE: Resend requires a backend server (Node.js/Edge) to send emails securely.
 * This service is structured to call a backend API endpoint (e.g., /api/send-email).
 * 
 * For this frontend-only demo, we simulate the API call success if the endpoint is unreachable.
 */
export const sendBookingConfirmation = async (formData: BookingFormData): Promise<boolean> => {
  console.log("Initiating Resend email sequence...");

  // 1. Construct the HTML Email Payload (Standard Resend Format)
  const payload = {
    from: 'Gentry & Co. <appointments@gentryandco.com>',
    to: [formData.email],
    subject: `Appointment Confirmed: ${formData.service} on ${formData.date}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1d24;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D4AF37; text-transform: uppercase; letter-spacing: 2px;">Gentry & Co.</h1>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 30px; border-radius: 4px;">
          <h2 style="margin-top: 0;">Booking Confirmed</h2>
          <p>Dear ${formData.name.split(' ')[0]},</p>
          <p>We are pleased to confirm your appointment. Our barbers are preparing for your visit.</p>
          
          <hr style="border: 0; border-bottom: 1px solid #e0e0e0; margin: 20px 0;" />
          
          <h3 style="font-size: 14px; text-transform: uppercase; color: #666;">Appointment Details</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Service:</strong> ${formData.service}</li>
            <li style="margin-bottom: 10px;"><strong>Date:</strong> ${formData.date}</li>
            <li style="margin-bottom: 10px;"><strong>Time:</strong> ${formData.time}</li>
            <li style="margin-bottom: 10px;"><strong>Location:</strong> Rio Lakefront, Gaithersburg MD</li>
          </ul>
        </div>
        
        <p style="text-align: center; font-size: 12px; color: #888; margin-top: 30px;">
          Please arrive 5 minutes early for a complimentary beverage service.
        </p>
      </div>
    `
  };

  try {
    // 2. Attempt to call a hypothetical Backend API Route
    // In a real Next.js/Node app, this endpoint would use the Resend SDK to send the email.
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Backend endpoint unreachable');
    }
    
    return true;

  } catch (e) {
    // 3. Fallback Simulation (Frontend Demo Mode)
    // Since we don't have a real backend here, we simulate the delay and success
    console.group('📧 [Resend Service Simulation]');
    console.info('Backend not detected. Simulating email delivery with the following payload:');
    console.dir(payload);
    console.groupEnd();

    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  }
};