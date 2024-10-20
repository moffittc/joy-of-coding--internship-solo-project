"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const CancelButton = ({ href }: { href: string }) => {
  return (
    <Button variant="surface">
      <Link href={href}>Cancel</Link>
    </Button>
  );
};

export default CancelButton;
