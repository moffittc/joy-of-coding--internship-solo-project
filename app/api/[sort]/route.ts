import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: {params:{sort: string}}
) {
    const tasks = await prisma.task.findMany({
        orderBy: {
            [params.sort]: "asc",
          },
          select: {
            id: true,
            completed: true,
            title: true,
            description: true,
            dueDate: true,
            category: true,
          },
    });

    return NextResponse.json(tasks);
}