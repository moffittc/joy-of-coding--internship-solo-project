import { DoneCheckbox, TaskCategoryBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Task } from "@prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { TiArrowSortedUp } from "react-icons/ti";
import authOptions from "../auth/authOptions";
import EditButton from "./EditButton";

interface Props {
  searchParams: { orderBy: keyof Task };
}

const TasksPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);

  const columns: {
    label: string;
    value: keyof Task;
    className?: string;
  }[] = [
    { label: "Task Name", value: "title" },
    {
      label: "Description",
      value: "description",
      className: "hidden md:table-cell",
    },
    { label: "Due", value: "dueDate", className: "hidden md:table-cell" },
    { label: "Priority", value: "category" },
  ];

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  // Get all the tasks from the server
  const tasks = await prisma.task.findMany({
    orderBy,
    select: {
      id: true,
      completed: true,
      title: true,
      description: true,
      dueDate: true,
      category: true,
      userEmail: true,
    },
  });

  return (
    <div>
      <Flex className="mb-3" justify="between">
        <Button>
          <Link href="/tasks/new">+</Link>
        </Button>

        {/* Refresh button */}
        {/* <Button color="gray" variant="surface">
          <Link href={`/tasks?signedin=${session?.user?.email}`}>
            <IoMdRefresh />
          </Link>
        </Button> */}
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell />
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <Link href={`/tasks?orderBy=${column.value}`}>
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && (
                  <TiArrowSortedUp className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
            <Table.ColumnHeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              {task.userEmail === session?.user?.email && (
                <>
                  <Table.RowHeaderCell>
                    <DoneCheckbox id={task.id} isChecked={task.completed} />
                  </Table.RowHeaderCell>

                  <Table.Cell>
                    {task.title}
                    <div className="block md:hidden text-xs text-gray-500">
                      {task.dueDate.toUTCString().slice(0, 16)}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {task.description}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {task.dueDate.toUTCString().slice(0, 16)}
                  </Table.Cell>
                  <Table.Cell>
                    <TaskCategoryBadge
                      category={task.category}
                    ></TaskCategoryBadge>
                  </Table.Cell>

                  <Table.Cell>
                    <EditButton taskID={task.id} />
                  </Table.Cell>
                </>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default TasksPage;
