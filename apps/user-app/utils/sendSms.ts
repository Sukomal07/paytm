/* eslint-disable turbo/no-undeclared-env-vars */
import twilio from 'twilio';

interface SmsOption {
    phoneNumber: string
    message: string
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function sendOtpSms({ phoneNumber, message }: SmsOption) {
    await client.messages.create({
        body: message,
        from: fromPhoneNumber,
        to: `+91${phoneNumber}`,
    });
}
