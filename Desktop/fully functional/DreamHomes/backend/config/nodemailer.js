// backend/nodemailer.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Chooses SMTP config based on NODE_ENV:
 * - development: Mailtrap (safe sandbox)
 * - production:  Brevo (smtp-relay.brevo.com) by default
 * You can override host/port/secure via .env in any env.
 */
function getSmtpConfig() {
  const isProd = process.env.NODE_ENV === 'production';

  // If explicit host provided, use it (advanced override)
  if (process.env.SMTP_HOST) {
    return {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };
  }

  // Defaults per env
  if (isProd) {
    // Brevo defaults for production
    return {
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };
  } else {
    // Mailtrap defaults for development
    return {
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };
  }
}

function createTransporter() {
  const missing = [];
  if (!process.env.SMTP_USER) missing.push('SMTP_USER');
  if (!process.env.SMTP_PASS) missing.push('SMTP_PASS');

  // For dev, allow running without SMTP (emails disabled)
  const isProd = process.env.NODE_ENV === 'production';
  if (missing.length && !isProd) {
    console.warn(
      `⚠️  Email disabled in development (missing ${missing.join(', ')}).`
    );
    return null; // server runs; email features will throw if used
  }
  if (missing.length && isProd) {
    console.error(
      `❌ Email configuration missing in production: ${missing.join(', ')}`
    );
    return null;
  }

  const config = getSmtpConfig();
  const transporter = nodemailer.createTransport(config);

  // Verify only in production; skip in dev
  if (isProd) {
    transporter
      .verify()
      .then(() => console.log('✅ SMTP ready (production)'))
      .catch((err) =>
        console.error('❌ SMTP verification failed (production):', err.message)
      );
  } else {
    console.log(
      `ℹ️  Using Mailtrap in development: ${config.host}:${config.port} (verification skipped)`
    );
  }

  return transporter;
}

const transporter = createTransporter();

export const sendEmail = async (mailOptions) => {
  if (!transporter) {
    throw new Error(
      'Email transporter not configured (dev mode without SMTP or missing creds).'
    );
  }
  // Ensure a default From
  const from =
    mailOptions.from ||
    process.env.EMAIL_FROM ||
    'DreamHomes <no-reply@DreamHomes.local>';

  const info = await transporter.sendMail({ ...mailOptions, from });
  console.log('✅ Email sent:', info.messageId);
  return info;
};

export const checkEmailHealth = async () => {
  if (!transporter) {
    return { status: 'error', message: 'Transporter not configured' };
  }
  try {
    await transporter.verify();
    return { status: 'healthy', message: 'Email service is operational' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export default transporter;
