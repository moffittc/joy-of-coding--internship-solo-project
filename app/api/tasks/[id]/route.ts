import authOptions from '@/app/auth/authOptions';
import { updateTaskSchema } from '@/app/validationSchemas';
import prisma from "@/prisma/client";
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest, 
    { params }: { params: { id: string }}) {
        
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id) }
    });
    if (!task)
        return NextResponse.json({ error: 'Invalid task' }, { status: 404 });
    
    await prisma.task.delete({
        where: { id: task.id },
    });

    return NextResponse.json({});
}

export async function PATCH(
    request: NextRequest, 
    { params }: { params: { id: string }}) {

        const session = await getServerSession(authOptions);
        if (!session)
            return NextResponse.json({}, { status: 401 });
        
    const body = await request.json();
    const validation = updateTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id) }
    });
    if (!task)
        return NextResponse.json({ error: 'Invalid task' }, { status: 404 });

    const {completed, title, description, dueDate, category} = body;
    const updatedTask = await prisma.task.update({
        where: { id: task.id },
        data: {
            completed, 
            title, 
            description, 
            dueDate, 
            category, 
        }
      });

    return NextResponse.json(updatedTask);  
}