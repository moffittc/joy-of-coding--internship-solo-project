"use client";

import {
  CancelButton,
  DeleteButton,
  ErrorMessage,
  Spinner,
} from "@/app/components";
import { Category, formSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@prisma/client";
import * as Label from "@radix-ui/react-label";
import {
  Button,
  Callout,
  Heading,
  Select,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TaskFormData = z.infer<typeof formSchema>;

const TaskForm = ({ task }: { task?: Task }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  // For assigning the task with the user

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(formSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      // Sends data to api:
      if (task) await axios.patch("/api/tasks/" + task.id, data.data);
      else await axios.post("/api/tasks", data.data);
      router.push("/tasks");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      <Heading>{task ? "Edit Task" : "Create Task"}</Heading>

      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        {/* Determines whether to use the post or patch schema */}
        <input
          type="hidden"
          value={task ? "patch" : "post"}
          {...register("type")}
        />

        {!task && (
          <input
            type="hidden"
            value={session?.user?.email ? session?.user?.email : undefined}
            {...register("data.userEmail")}
          />
        )}

        {/* Title Field*/}
        <TextField.Root
          placeholder="Title"
          defaultValue={task?.title}
          {...register("data.title")}
        />
        <ErrorMessage>{errors.data?.title?.message}</ErrorMessage>

        {/* Description Field */}
        <TextArea
          placeholder="Description"
          defaultValue={task?.description}
          {...register("data.description")}
        />
        <ErrorMessage>{errors.data?.description?.message}</ErrorMessage>

        <div className="flex justify-between pb-5">
          {/* Category Field */}
          <div className="flex flex-col w-1/2 mr-10">
            <Label.Root
              className="text-[15px] font-medium leading-[35px]"
              htmlFor="category"
            >
              Priority:
            </Label.Root>
            <Select.Root
              defaultValue={task?.category}
              onValueChange={(value) =>
                setValue("data.category", value as Category)
              }
            >
              <Select.Trigger placeholder="Select a category" />
              <Select.Content id="category">
                <Select.Item value={Category.None}>None</Select.Item>
                <Select.Item value={Category.High}>High</Select.Item>
                <Select.Item value={Category.Medium}>Medium</Select.Item>
                <Select.Item value={Category.Low}>Low</Select.Item>
              </Select.Content>
            </Select.Root>
            <ErrorMessage>{errors.data?.category?.message}</ErrorMessage>
          </div>

          {/* Due Date Field - returns a string */}
          <div className="flex flex-col w-1/2">
            <Label.Root
              className="text-[15px] font-medium leading-[35px]"
              htmlFor="dueDate"
            >
              Due Date:
            </Label.Root>
            <input
              type="date"
              id="dueDate"
              defaultValue={
                task?.dueDate.toISOString().slice(0, 10)
                // yyyy-mm-dd
              }
              {...register("data.dueDate")}
            />
            <ErrorMessage>{errors.data?.dueDate?.message}</ErrorMessage>
          </div>
        </div>
        <div className="flex size-full justify-between">
          {/*Delete Button*/}
          {task && <DeleteButton id={task.id} href="/tasks" />}

          <div className="space-x-3">
            {/*Cancel Button*/}
            <CancelButton href="/tasks" />

            {/*Submit Button*/}
            <Button disabled={isSubmitting} className="flexjustify-self-end">
              {task ? "Update" : "Create"}
              {isSubmitting && <Spinner />}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
