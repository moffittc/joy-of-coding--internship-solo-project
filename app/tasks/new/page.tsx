"use client";

import {
  Button,
  Callout,
  Heading,
  Select,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import * as Label from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, Category } from "@/app/validationSchemas";
import { z } from "zod";
import Link from "next/link";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import DeleteButton from "@/app/components/DeleteButton";

// Instead of creating an interface, this gets the obj from validationSchemas
type TaskForm = z.infer<typeof formSchema>;

const NewTaskPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // For retrieving task data
  const taskID = searchParams.get("id");
  const taskTitle = searchParams.get("title");
  const taskDesc = searchParams.get("description");
  const taskCategory = searchParams.get("category");
  const taskYear = searchParams.get("ddYear");
  const taskMonth = searchParams.get("ddMonth");
  const taskDay = searchParams.get("ddDay");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(formSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      // Sends data to api:
      if (data.type === "post") {
        await axios.post("/api/tasks", data.data);
      } else if (data.type === "patch") {
        await axios.patch("/api/tasks", data.data);
      }
      router.push("/tasks");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      <Heading>{taskID ? "Edit Task" : "Create Task"}</Heading>

      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        {/* Determines whether to use the post or patch schema */}
        <input
          type="hidden"
          value={taskID ? "patch" : "post"}
          {...register("type")}
        />

        {/* ID Field - for editing a task */}
        {taskID && (
          <input type="hidden" value={taskID} {...register("data.id")} />
        )}

        {/* Title Field*/}
        <TextField.Root
          placeholder="Title"
          defaultValue={taskTitle ? taskTitle : undefined}
          {...register("data.title")}
        />
        <ErrorMessage>{errors.data?.title?.message}</ErrorMessage>

        {/* Description Field */}
        <TextArea
          placeholder="Description"
          defaultValue={taskDesc ? taskDesc : undefined}
          {...register("data.description")}
        />
        <ErrorMessage>{errors.data?.description?.message}</ErrorMessage>

        <div className="flex justify-between">
          {/* Category Field */}
          <div className="flex flex-col w-1/2 mr-10">
            <Label.Root
              className="text-[15px] font-medium leading-[35px]"
              htmlFor="category"
            >
              Priority:
            </Label.Root>
            <Select.Root
              defaultValue={taskCategory ? taskCategory : undefined}
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
                taskDay ? taskYear + "-" + taskMonth + "-" + taskDay : undefined
              }
              {...register("data.dueDate")}
            />
            <ErrorMessage>{errors.data?.dueDate?.message}</ErrorMessage>
          </div>
        </div>

        {/*Submit Button*/}
        <Button disabled={isSubmitting}>
          {taskID ? "Update" : "Create"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>

      {/*Cancel Button*/}
      <Button>
        <Link href="/tasks">Cancel</Link>
      </Button>

      {/*Delete Button*/}
      {taskID && <DeleteButton id={Number(taskID)} href="/tasks" />}
    </div>
  );
};

export default NewTaskPage;
