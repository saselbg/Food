import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';
import bcrypt from "bcryptjs";
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from '../validation/registerSchema';

export const RegisterForm = () => {
	
	const navigate = useNavigate();
	const [ error, setError ] = useState('');
	const [ success, setSuccess ] = useState('');
	const [ showPassword, setShowPassword ] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ 
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});


	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	}

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	}

 	const onSubmit = async (formData) => {
    try {
      const userExists = await fetch(`http://localhost:5000/users?email=${formData.email}`);
      const existingUsers = await userExists.json();

      if (existingUsers.length > 0) {
        setError("User with this email already exists!");
        return;
      }

      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: hashedPassword,
        }),
      });

      if (response.ok) {
        setSuccess("User registered successfully!");
        navigate("/login");
      } else {
        setError("Registration failed!");
      }
    } catch (error) {
      setError("Something went wrong!");
      console.error("Error:", error);
    }
  };

 return (
	<form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-sm mx-auto">
		<input 
			type="text"
			name="username"
			placeholder='Username' 
			{...register("username")}
      className="block w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
		/>
		{errors.username && <p className="text-destructive text-sm mb-2 text-left">{errors.username.message}</p>}
		<input 
			type="email"
			name="email"
			placeholder='Email'
			autoComplete='email'
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
		<div className="relative mb-2">
			<input
				type={showConfirmPassword ? "text" : "password"} 
				name="confirmPassword"
				placeholder="Confirm password"
				{...register("confirmPassword")}
				className="block w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
			/>
			{errors.confirmPassword && <p className="text-destructive text-sm text-left">{errors.confirmPassword.message}</p>}
			<button
				type="button"
				onClick={toggleConfirmPasswordVisibility}
				className="absolute right-2 top-2 text-sm text-secondary-foreground/60"
			>
				{showConfirmPassword ? <EyeOff /> : <Eye />}
			</button>
		</div>		
		<FormSuccess message={ success }/>
		<FormError message={ error }/>
		<button type="submit" className="bg-primary text-secondary p-2 rounded w-full cursor-pointer hover:bg-primary/90">
			Register
		</button>
	</form>
 );
}