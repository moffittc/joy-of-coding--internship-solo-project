"use client";

import { Checkbox } from "@radix-ui/themes";
import axios from "axios";

interface Props {
  id: number;
  isChecked: boolean;
}

const DoneCheckbox = ({ id, isChecked }: Props) => {
  return (
    <Checkbox
      defaultChecked={isChecked}
      onCheckedChange={(checked) => {
        axios.patch("/api/tasks/" + id, { completed: checked });
      }}
    />
  );
};

export default DoneCheckbox;
