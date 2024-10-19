import { z } from "zod"
/* All validation schemas */

export enum Category {
    None = 'None',
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
}

const baseSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required.'),
    dueDate: z.coerce.date(), // Converts input string into date type
    category: z.enum(['None', 'High', 'Medium', 'Low']),
});

// POST Schema
export const createTaskSchema = baseSchema;

// PATCH Schema
export const updateTaskSchema = baseSchema.partial().extend({
    id: z.coerce.number(),
    completed: z.coerce.boolean().optional(),
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