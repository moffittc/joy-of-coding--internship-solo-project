import React, { useEffect, useState } from "react";
import { Badge, Button, Table } from "@radix-ui/themes";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { IoChevronUp } from "react-icons/io5";
import { TbPencil } from "react-icons/tb";
import DoneCheckbox from "@/app/components/DoneCheckbox";
import Link from "next/link";
import prisma from "@/prisma/client";
import axios from "axios";
import { Category } from "@prisma/client";

// type Task = {
//   dueDate: Date;
//   id: number;
//   title: string;
//   description: string;
//   completed: boolean;
//   category: Category;
// };

const TasksPage = async () => {
  // Get all the tasks from the server
  const tasks = await prisma.task.findMany({
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
      category: true,
    },
  });

  // For category badges
  const handleColor = (priority: Category) => {
    switch (priority) {
      case "High":
        return "pink";
      case "Medium":
        return "orange";
      case "Low":
        return "amber";
    }
  };
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/tasks/new">+</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell />
            <Table.ColumnHeaderCell>Task Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Description
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Due
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Priority</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.RowHeaderCell>
                <DoneCheckbox id={task.id} isChecked={task.completed} />
              </Table.RowHeaderCell>

              <Table.Cell>
                {task.title}
                <div className="block md:hidden">
                  {task.dueDate.toDateString()}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.description}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.dueDate.toDateString()}
              </Table.Cell>

              <Table.Cell>
                {task.category !== "None" && (
                  <Badge color={handleColor(task.category)}>
                    {task.category}
                  </Badge>
                )}
              </Table.Cell>

              <Table.Cell>
                <Link
                  href={`/tasks/new?id=${task.id}&title=${
                    task.title
                  }&description=${task.description}&category=${
                    task.category
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
