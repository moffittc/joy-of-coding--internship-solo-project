"use client";

import {
  Button,
  Callout,
  Heading,
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
import { formSchema } from "@/app/validationSchemas";
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
  const taskYear = searchParams.get("ddYear");
  const taskMonth = searchParams.get("ddMonth");
  const taskDay = searchParams.get("ddDay");

  const {
    register,
    handleSubmit,
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

        {/* Due Date Field - returns a string */}
        <Label.Root
          className="text-[15px] font-medium leading-[35px]"
          htmlFor="dueDate"
        >
          Due Date
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

        {/*Submit Button*/}
        <Button disabled={isSubmitting}>
          {taskID ? "Update" : "Create"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>

      <Button>
        <Link href="/tasks">Cancel</Link>
      </Button>

      {/*Delete Button*/}
      {taskID && <DeleteButton id={Number(taskID)} href="/tasks" />}
    </div>
  );
};

export default NewTaskPage;
