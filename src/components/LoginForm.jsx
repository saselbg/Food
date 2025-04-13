import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import bcrypt from "bcryptjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/loginSchema";
import { Eye, EyeOff } from 'lucide-react';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const LoginForm = () => {
	const [ showPassword, setShowPassword ] = useState(false);
	const [ error , setError ] = useState('');
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ 
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	}

	const onSubmit = async (formData) => {
		try {
			const response = await fetch(`http://localhost:5000/users?email=${formData.email}`);
			const users = await response.json();

			if ( users.length > 0 ) {
				const user = users[0];
				const passwordMatch = await bcrypt.compare(formData.password, user.password);

				if ( passwordMatch ) {
					login(users[0]);
					navigate('/');
				} else {
					setError('Invalid credentials');
				}			
			} else {
				setError('Invalid credentials');
			}
			
		} catch (error) {
			setError("Something went wrong!");
      console.error("Error:", error);
		}		
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="text-center">
			<input
			 type="email" 
			 name="email"
			 placeholder="Email"
			 {...register("email")}
			 className="block w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
			/>
			{errors.email && <p className="text-destructive text-sm mb-2 text-left">{errors.email.message}</p>}
			<div className="relative mb-2">
				<input
					type={showPassword ? "text" : "password"}
					name="password"
					placeholder="Password"
					{...register("password")}
					className="block w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
				/>
				{errors.password && <p className="text-destructive text-sm text-left">{errors.password.message}</p>}
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute right-2 top-2 text-sm text-secondary-foreground/60"
				>
					{showPassword ? <EyeOff /> : <Eye />}
				</button>
			</div>
			<FormError message={error}/>
			<button type="submit" className="bg-primary text-secondary p-2 rounded w-full cursor-pointer hover:bg-primary/90">
				Login
			</button>
		</form>
	);
}