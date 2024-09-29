import React from "react";
import { Badge, Button, Table } from "@radix-ui/themes";
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
      //category: true,
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
            <Table.ColumnHeaderCell>Priority</Table.ColumnHeaderCell>
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
              {/* <Table.Cell>
                {task.category && (
                  <Badge color={task.category === "High" ? "pink" : {task.category === "Medium" ? "orange" : "amber"}}>
                    {task.category}
                  </Badge>
                )}
              </Table.Cell> */}
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
      <div>
        <Badge color="gray">Gray</Badge>
        <Badge color="gold">Gold</Badge>
        <Badge color="bronze">Bronze</Badge>
        <Badge color="brown">brown</Badge>
        <Badge color="yellow">yellow</Badge>
        <Badge color="amber">amber</Badge>
        <Badge color="orange">orange</Badge>
        <Badge color="tomato">tomato</Badge>
        <Badge color="red">red</Badge>
        <Badge color="ruby">ruby</Badge>
        <Badge color="crimson">crimson</Badge>
        <Badge color="pink">pink</Badge>
        <Badge color="plum">plum</Badge>
        <Badge color="purple">purple</Badge>
        <Badge color="violet">violet</Badge>
        <Badge color="iris">iris</Badge>
        <Badge color="indigo">indigo</Badge>
        <Badge color="blue">blue</Badge>
        <Badge color="cyan">cyan</Badge>
        <Badge color="teal">teal</Badge>
        <Badge color="jade">jade</Badge>
        <Badge color="green">green</Badge>
        <Badge color="grass">grass</Badge>
        <Badge color="lime">lime</Badge>
        <Badge color="mint">mint</Badge>
        <Badge color="sky">sky</Badge>
      </div>
    </div>
  );
};

export default TasksPage;
