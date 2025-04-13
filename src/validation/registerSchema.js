import { z } from "zod";
export const registerSchema = z
	.object({
		username: z.string().min(4, "Please add a name with at least 4 characters"),
		email: z.string().email("Invalid email").min(5, "Email is too short"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters")
	})
	.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });