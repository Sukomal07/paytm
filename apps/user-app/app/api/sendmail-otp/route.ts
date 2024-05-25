import { NextRequest, NextResponse } from "next/server";
import { generateOtp, setOtp } from "../../../lib/otpStore";
import { sendMail } from "../../../utils/sendEmail";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 })
        }

        const otp = generateOtp()

        const mailOption = {
            toMail: email,
            subject: "Your OTP Code for verification",
            message: `Your OTP code is ${otp}`
        }

        try {
            await sendMail(mailOption)
            setOtp(email, otp)
            return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 })
        }

    } catch (error: any) {
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}