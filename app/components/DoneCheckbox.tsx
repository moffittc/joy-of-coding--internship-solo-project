"use client";

import { Checkbox } from "@radix-ui/themes";

interface Props {
  checked?: boolean;
}

// Will trigger an update to 'completed' in database with true/false
const DoneCheckbox = ({ checked = false }: Props) => {
  return <Checkbox defaultChecked={checked} />;
};

export default DoneCheckbox;
