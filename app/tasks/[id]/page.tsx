import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import TaskForm from "../_components/TaskForm";

interface Props {
  params: { id: string };
}

const EditTaskPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  return <TaskForm task={task} />;
};

export default EditTaskPage;
