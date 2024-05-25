import { NextRequest, NextResponse } from "next/server";
import { generateOtp, setOtp } from "../../../lib/otpStore";
import { sendOtpSms } from "../../../utils/sendSms";


export async function POST(request: NextRequest) {
    try {
        const { phone } = await request.json();

        if (!phone) {
            return NextResponse.json({ message: "Phone number is required" }, { status: 400 })
        }

        const otp = generateOtp()

        const smsOption = {
            phoneNumber: phone,
            message: `Your OTP code is ${otp}`
        }

        try {
            await sendOtpSms(smsOption)
            setOtp(phone, otp)
            return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 })
        } catch (error) {
            console.log(error)
            return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 })
        }

    } catch (error: any) {
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}