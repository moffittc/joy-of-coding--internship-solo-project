import React from "react";
import { Button, Checkbox, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";

const TasksPage = async () => {
  // Get all the tasks from the server
  const allTasks = await prisma.task.findMany({
    orderBy: {
      dueDate: "asc",
    },
    select: {
      completed: true,
      title: true,
      description: true,
      dueDate: true,
    },
  });
  console.log("allTasks: ", allTasks);
  return (
    <div>
      <Button>
        <Link href="/tasks/new">+</Link>
      </Button>
    </div>
  );
};

export default TasksPage;
