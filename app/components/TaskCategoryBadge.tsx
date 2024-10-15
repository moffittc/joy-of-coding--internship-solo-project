import { Category } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const categoryMap: Record<
  Category,
  { label: string; color: "pink" | "orange" | "amber" | "gray" }
> = {
  High: { label: "High", color: "pink" },
  Medium: { label: "Medium", color: "orange" },
  Low: { label: "Low", color: "amber" },
  None: { label: "None", color: "gray" },
};

const TaskCategoryBadge = ({ category }: { category: Category }) => {
  return (
    <Badge color={categoryMap[category].color}>
      {categoryMap[category].label}
    </Badge>
  );
};

export default TaskCategoryBadge;
