import Link from "next/link";
import { TbPencil } from "react-icons/tb";

const EditButton = ({ taskID }: { taskID: number }) => {
  return (
    <Link href={`/tasks/${taskID}`}>
      <TbPencil />
    </Link>
  );
};

export default EditButton;
