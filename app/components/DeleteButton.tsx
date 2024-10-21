"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: number;
  href: string;
}

const DeleteButton = ({ id, href }: Props) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteTask = async () => {
    try {
      await axios.delete("/api/tasks/" + id);
      router.push(`${href}`);
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="tomato" variant="soft">
            Delete
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
              <Button color="red" onClick={deleteTask}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {/* Error Dialog */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This task could not be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="surface"
            mt="2"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteButton;
