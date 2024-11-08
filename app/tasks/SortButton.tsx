"use client";

import { Task } from "@prisma/client";
import { Link } from "@radix-ui/themes";
import { TiArrowSortedUp } from "react-icons/ti";

interface Props {
  currentCol: boolean;
  label: string;
  value: keyof Task;
}

const SortButton = ({ currentCol, label, value }: Props) => {
  return (
    <>
      <Link color="gray" href={`/tasks?orderBy=${value}`}>
        {label}
      </Link>
      {currentCol && <TiArrowSortedUp className="inline" />}
    </>
  );
};

export default SortButton;
