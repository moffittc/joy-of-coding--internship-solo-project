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