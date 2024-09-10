"use client";

import {
  Button,
  Callout,
  Heading,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import * as Label from "@radix-ui/react-label";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/app/validationSchemas";
import { number, z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

// Instead of creating an interface, this gets the obj from validationSchemas
type TaskForm = z.infer<typeof createTaskSchema>;

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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(createTaskSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/tasks", data);
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
        {/* Title Field*/}
        <TextField.Root
          placeholder="Title"
          defaultValue={taskTitle ? taskTitle : undefined}
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* Description Field */}
        <TextArea
          placeholder="Description"
          defaultValue={taskDesc ? taskDesc : undefined}
          {...register("description")}
        />
        {/* <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        /> */}
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

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
          {...register("dueDate")}
        />
        <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>

        {/*Submit Button*/}
        <Button disabled={isSubmitting}>
          Create{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewTaskPage;
