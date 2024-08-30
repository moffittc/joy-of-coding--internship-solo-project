import React from "react";
import { Button, Table } from "@radix-ui/themes";
import DoneCheckbox from "@/app/components/DoneCheckbox";
import Link from "next/link";
import prisma from "@/prisma/client";

const TasksPage = async () => {
  // Get all the tasks from the server
  const allTasks = await prisma.task.findMany({
    // In order by due date
    orderBy: {
      dueDate: "asc",
    },
    select: {
      id: true,
      completed: true,
      title: true,
      description: true,
      dueDate: true,
    },
  });
  // Executed when page is refreshed:
  console.log("allTasks: ", allTasks[0].completed);
  // How to display them in a table?

  return (
    <div>
      <Button>
        <Link href="/tasks/new">+</Link>
      </Button>
      {allTasks.map((task) => (
        <p key={task.id}>
          <DoneCheckbox />
          {task.title +
            " | " +
            task.description +
            " | " +
            task.dueDate.toDateString()}
        </p>
      ))}
    </div>
  );
};

export default TasksPage;
