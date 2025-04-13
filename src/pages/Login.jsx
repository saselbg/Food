import { LoginForm } from "../components/LoginForm"
import { Link } from "react-router-dom";

export const Login = () => {
	return (
		<div className="flex justify-center mt-16">
      <div className="bg-background shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-secondary-foreground/80 mb-4">Welcome Back!</h2>
        <LoginForm />
        <p className="text-center text-secondary-foreground/60 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
	)
}