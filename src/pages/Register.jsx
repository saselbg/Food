import { Link } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
	return (
		<div className="flex justify-center mt-16">
      <div className="bg-background shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-secondary-foreground/80 mb-4">Create an account</h2>
        <RegisterForm />
        <p className="text-center text-secondary-foreground/60 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
	)
}