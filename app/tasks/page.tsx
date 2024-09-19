import React from "react";
import { Button, Table } from "@radix-ui/themes";
import { TbPencil } from "react-icons/tb";
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

  return (
    <div>
      <Button>
        <Link href="/tasks/new">+</Link>
      </Button>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell />
            <Table.ColumnHeaderCell>Task Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Due</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {allTasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.RowHeaderCell>
                <DoneCheckbox id={task.id} isChecked={task.completed} />
              </Table.RowHeaderCell>

              <Table.Cell>{task.title}</Table.Cell>
              <Table.Cell>{task.description}</Table.Cell>
              <Table.Cell>{task.dueDate.toDateString()}</Table.Cell>
              <Table.Cell>
                <Link
                  href={`/tasks/new?id=${task.id}&title=${
                    task.title
                  }&description=${
                    task.description
                  }&ddYear=${task.dueDate.toLocaleDateString("en-US", {
                    year: "numeric",
                  })}&ddMonth=${task.dueDate.toLocaleDateString("en-US", {
                    month: "2-digit",
                  })}&ddDay=${task.dueDate.toLocaleDateString("en-US", {
                    day: "2-digit",
                  })}
                  `}
                >
                  <TbPencil />
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TasksPage;

// task: {
//   id: task.id,
//   title: task.title,
//   description: task.description,
//   dueDate: task.dueDate,
// }
