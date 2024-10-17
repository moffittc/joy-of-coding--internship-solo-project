import { Category } from "@prisma/client";
import Link from "next/link";
import { TbPencil } from "react-icons/tb";

type Task = {
  dueDate: Date;
  id: number;
  title: string;
  description: string;
  completed: boolean;
  category: Category;
};

const EditButton = ({ task }: { task: Task }) => {
  return (
    <Link
      href={`/tasks/new?id=${task.id}&title=${task.title}&description=${
        task.description
      }&category=${task.category}&ddYear=${task.dueDate.toLocaleDateString(
        "en-US",
        { year: "numeric" }
      )}&ddMonth=${task.dueDate.toLocaleDateString("en-US", {
        month: "2-digit",
      })}&ddDay=${task.dueDate.toLocaleDateString("en-US", {
        day: "2-digit",
      })}`}
    >
      <TbPencil />
    </Link>
  );
};

export default EditButton;
