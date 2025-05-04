import { promises as fs } from 'fs';
import path from 'path';
import { Eta } from 'eta';

import { TEMPLATES_DIR } from '../constants/common';
import { sendEmail } from '../utils/sendMail';
import { OrderType } from '@/db/models/order';

export async function sendEmailsAboutOrder(payload: OrderType) {
  const eta = new Eta({ useWith: true });

  const newOrderTemplatePath = path.join(TEMPLATES_DIR, 'new-order-email.eta');
  const templateSource = (await fs.readFile(newOrderTemplatePath)).toString();

  const thanksToClientTemplatePath = path.join(
    TEMPLATES_DIR,
    'thanks-to-client-email.eta'
  );
  const templateSourceForClient = (
    await fs.readFile(thanksToClientTemplatePath)
  ).toString();

  const emailData = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    comment: payload.comment,
    deliveryType: payload.deliveryType,
    deliveryLocation: payload.deliveryLocation
      ? payload.deliveryLocation
      : 'До відділення',
    location: payload.location,
    division: payload.division,
    totalAmount: payload.totalAmount,
    items: payload.items,
  };

  const html = eta.renderString(templateSource, emailData);
  const htmlForClient = eta.renderString(templateSourceForClient, emailData);

  const adminEmail = process.env.ADMIN_EMAIL;
  const clientEmail = String(payload.email);

  try {
    await sendEmail({
      from: process.env.SMTP_FROM,
      to: clientEmail,
      subject: 'Дякуємо за замовлення!',
      html: htmlForClient || '',
    });
  } catch (err) {
    console.log(err);
  }
  try {
    await sendEmail({
      from: process.env.SMTP_FROM,
      to: adminEmail,
      subject: 'Новый заказ на нашем сайте!',
      html: html || '',
    });
  } catch (err) {
    console.log(err);
  }
}
