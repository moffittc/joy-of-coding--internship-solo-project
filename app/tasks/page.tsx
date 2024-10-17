import { DoneCheckbox, TaskCategoryBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import EditButton from "./EditButton";

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
      createdAt: true,
      updatedAt: true,
    },
  });

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
                <div className="block md:hidden text-xs text-gray-500">
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
                <TaskCategoryBadge category={task.category}></TaskCategoryBadge>
              </Table.Cell>
              <Table.Cell>
                <EditButton task={task} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TasksPage;
