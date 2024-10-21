import { updateTaskSchema } from '@/app/validationSchemas';
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest, 
    { params }: { params: { id: string }}) {
    const deletedTask = await prisma.task.delete({
        where: { id: Number(params.id) },
    });

    return NextResponse.json(deletedTask, { status: 200 })
}

export async function PATCH(
    request: NextRequest, 
    { params }: { params: { id: string }}) {
    const body = await request.json();
    const validation = updateTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const updatedTask = await prisma.task.update({
        where: {
          id: parseInt(params.id)
        },
        data: {
            completed: body.completed, 
            title: body.title, 
            description: body.description, 
            dueDate: body.dueDate, 
            category: body.category, 
        }
      });

    return NextResponse.json(updatedTask, { status: 200 });  
}