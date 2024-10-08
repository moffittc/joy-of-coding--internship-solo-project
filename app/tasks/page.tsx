import React from "react";
import { Badge, Button, Table } from "@radix-ui/themes";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { TbPencil } from "react-icons/tb";
import DoneCheckbox from "@/app/components/DoneCheckbox";
import Link from "next/link";
import prisma from "@/prisma/client";
import { Category } from "@prisma/client";

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
      category: true,
    },
  });

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

  const toggleGroupItemClasses =
    "flex size-[35px] items-center justify-center bg-white leading-4 text-mauve11 first:rounded-l last:rounded-r hover:bg-violet3 focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none data-[state=on]:bg-violet6 data-[state=on]:text-violet12";

  return (
    <div>
      <Button>
        <Link href="/tasks/new">+</Link>
      </Button>

      <div>
        <ToggleGroup.Root type="single" value="item1">
          <ToggleGroup.Item className={toggleGroupItemClasses} value="item1">
            Item 1
          </ToggleGroup.Item>
        </ToggleGroup.Root>

        <ToggleGroup.Root type="single" value="item2">
          <ToggleGroup.Item className={toggleGroupItemClasses} value="item2">
            Item 2
          </ToggleGroup.Item>
        </ToggleGroup.Root>

        <ToggleGroup.Root type="single" value="item3">
          <ToggleGroup.Item className={toggleGroupItemClasses} value="item3">
            Item 3
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell />

            <Table.ColumnHeaderCell>
              <ToggleGroup.Root type="single" value="Name">
                <ToggleGroup.Item value="Name">Task Name</ToggleGroup.Item>
              </ToggleGroup.Root>
            </Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell>
              <ToggleGroup.Root type="single" value="Description">
                <ToggleGroup.Item value="Description">
                  Description
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell>
              <ToggleGroup.Root type="single" value="Due">
                <ToggleGroup.Item value="Due">Due</ToggleGroup.Item>
              </ToggleGroup.Root>
            </Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell>
              <ToggleGroup.Root type="single" value="Priority">
                <ToggleGroup.Item value="Priority">Priority</ToggleGroup.Item>
              </ToggleGroup.Root>
            </Table.ColumnHeaderCell>

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
