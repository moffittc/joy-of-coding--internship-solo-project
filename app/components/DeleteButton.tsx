"use client";

import { CancelButton, Spinner } from "@/app/components";
import { AlertDialog, Button, Callout, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: number;
  href: string;
}

const DeleteButton = ({ id, href }: Props) => {
  // const router = useRouter();
  // const [error, setError] = useState("");
  // const [isDeleting, setDeleting] = useState(false);

  // const handleDelete = async () => {
  //   try {
  //     setDeleting(true);
  //     await axios.delete(`/api/tasks/${id}`);
  //     router.push(`${href}`);
  //     router.refresh();
  //   } catch (error) {
  //     setDeleting(false);
  //     setError("An unexpected error occurred.");
  //   }
  // };

  return (
    <div>
      {/* {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )} */}
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            // disabled={isDeleting}
            // onClick={handleDelete}
            color="tomato"
            variant="soft"
          >
            Delete
            {/* {isDeleting && <Spinner />} */}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button color="gray" variant="surface">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red">Delete</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteButton;
