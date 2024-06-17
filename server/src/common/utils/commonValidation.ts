import { z } from 'zod';

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number'),
  // ... other common validations

  formId: z.string().transform(String),
  // ... Form's Id

  objectId: z.string().transform(String),
  // ... Object's Id

  formObjectKind: z.string().transform(String),
  // ... Objects depending on object kind
};
