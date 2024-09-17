import { z } from "zod"
/* All validation schemas */

export const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required.'),
    dueDate: z.coerce.date() // Converts input string into date type
});

export const updateTaskSchema = z.object({
    id: z.coerce.number(),
    title: z.string().min(1, 'Title is required.').max(255).optional(),
    description: z.string().min(1, 'Description is required.').optional(),
    dueDate: z.coerce.date().optional()
});

export const formSchema = z.union([
    z.object({
        type: z.literal('post'), // Used to determine which schema to use
        data: createTaskSchema,
    }),
    z.object({
        type: z.literal('patch'),
        data: updateTaskSchema,
    }),
]);