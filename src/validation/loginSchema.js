import { z } from "zod";
export const loginSchema = z
	.object({
		email: z.string().email("Invalid email").min(5, "Email is too short"),
		password: z.string().min(6, "Password must be at least 6 characters"),
	});