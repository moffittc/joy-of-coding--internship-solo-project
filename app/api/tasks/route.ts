import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createTaskSchema } from '../../validationSchemas';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    // Insert new task in database
    const newTask = await prisma.task.create({
        data: { 
            title: body.title, 
            description: body.description, 
            dueDate: body.dueDate, 
            category: body.category,
        },
    });

    return NextResponse.json(newTask, { status: 201 });
}

