import { Link } from "react-router-dom"
import { useContext } from "react";
import { Search } from "../components/Search";
import { AuthContext } from "../context/authContext";
import { UserButton } from "../components/userButton";


export const Header = () => {
	const { user } = useContext(AuthContext);

	return (
		<header className="relative h-16 w-full bg-background shadow-md flex justify-center">
			<div className="absolute container  py-4 px-6 md:px-12 flex justify-between items-center z-3">
				<Link to="/" className="text-xl font-bold">🍽️ Meal Finder</Link>
				<div className="flex items-center">
					<Search />
					{user ? (
						<UserButton/>
					) : (
						<Link to="/login" className="bg-primary text-secondary px-4 pb-2 pt-1 rounded-md shadow-md hover:bg-primary-700 transition hover:bg-primary/90">
							Login
						</Link>
					)}
				</div>				
			</div>      
    </header>
	);
}