"use client";

import { useState } from "react";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Callout } from "@radix-ui/themes";
import axios from "axios";
import Spinner from "@/app/components/Spinner";

interface Props {
  id: number;
  href: string;
}

const DeleteButton = ({ id, href }: Props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      console.log(`/api/tasks/${id}`);
      await axios.delete(`/api/tasks/${id}`);
      router.push(`${href}`);
    } catch (error) {
      setDeleting(false);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Button disabled={isDeleting} onClick={handleDelete}>
        Delete
        {isDeleting && <Spinner />}
      </Button>
    </div>
  );
};

export default DeleteButton;
