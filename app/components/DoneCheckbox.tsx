"use client";

import { updateTaskSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Callout, Checkbox } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  id: number;
  isChecked: boolean;
}
type CheckboxForm = z.infer<typeof updateTaskSchema>;

// Will trigger an update to 'completed' in database with true/false
const DoneCheckbox = ({ id, isChecked }: Props) => {
  const { register, handleSubmit } = useForm<CheckboxForm>({
    resolver: zodResolver(updateTaskSchema),
  });
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data.completed);
      await axios.patch("/api/tasks", data);
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit}>
        <input type="hidden" value={id} {...register("id")} />

        <Checkbox
          type="submit"
          defaultChecked={isChecked}
          onClick={() => {
            isChecked = !isChecked;
          }}
          {...register("completed")}
        />
      </form>
    </div>
  );
};

export default DoneCheckbox;
