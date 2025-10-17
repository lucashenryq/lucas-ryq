import z from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  product: z.string(),
  brand: z.string(),
  quantity: z.number().positive(),
  peso: z.number().positive().optional(), // Weight in kg
  value: z.number().positive(),
  date: z.string(),
  expiryDate: z.string().optional(), // Expiration date for validity control
  description: z.string(),
  duration: z.number().positive(), // Duration in minutes
  createdAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;

export const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LoginCredentials = z.infer<typeof LoginSchema>;

export const StatsSchema = z.object({
  totalTasks: z.number(),
  totalQuantity: z.number(),
  totalValue: z.number(),
  averageQuantity: z.number(),
  averageValue: z.number(),
  lossesPreventedValue: z.number(),
  protectedStockValue: z.number(),
  lossRate: z.number(),
});

export type Stats = z.infer<typeof StatsSchema>;
