import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, password } = await request.json();

        // Check if the user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { number: phone }
                ]
            }
        });

        if (existingUser) {
            return NextResponse.json({ message: "User with this email or phone number already exists" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                number: phone,
                password: hashedPassword
            }
        });

        return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ message: "Internal server error", error: e.message }, { status: 500 });
    }
}
