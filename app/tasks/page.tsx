import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const TasksPage = () => {
  return (
    <div>
      <Button>
        <Link href="/tasks/new">+</Link>
      </Button>
    </div>
  );
};

export default TasksPage;
