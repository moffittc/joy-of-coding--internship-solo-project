import { z } from "zod"

export const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required.'),
    dueDate: z.coerce.date() // Converts input string into date type
});