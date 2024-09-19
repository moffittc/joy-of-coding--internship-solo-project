"use client";

import { Callout, Checkbox } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTaskSchema } from "@/app/validationSchemas";
import axios from "axios";

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

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.patch("/api/tasks", data);
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
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
