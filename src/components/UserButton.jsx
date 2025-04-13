import { Link } from "react-router-dom"
import { useContext, useEffect, useRef } from "react";
import { LogOutIcon } from 'lucide-react';
import { AuthContext } from "../context/authContext";
import { FaHeart } from "react-icons/fa";

export const UserButton = () => {
	const { user, logout, setUser } = useContext(AuthContext);
	const menuRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setUser((prev) => ({ ...prev, showMenu: false }));
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setUser]);

	return (
		<div className="relative" ref={menuRef}>
			<button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/80 text-secondary font-bold cursor-pointer"
				onClick={() => setUser((prev) => ({ ...prev, showMenu: !prev.showMenu }))}>
				{user.username.charAt(0).toUpperCase()}
			</button>

			{user.showMenu && (		
				<div className="absolute right-0 p-4 mt-2 w-42 bg-background shadow-lg rounded-md overflow-hidden">
					<div className='flex justify-center items-center flex-col px-4 py-4 bg-primary/10 rounded-lg'>
						{user.username && <p className='text-xs font-bold text-center'>{user.username}</p>}							
						{user.email &&
							<span className='text-xs font-medium text-secondary-foreground text-center'>{ user.email }</span>
						}	
					</div>
					<div className="border-t border-border my-4"></div>

					<Link 
						to={"/favorites"} 
						onClick={() => setUser((prev) => ({ ...prev, showMenu: false }))} 
						className="flex items-center w-full text-left px-4 py-2 rounded-md text-secondary-foreground hover:bg-secondary-foreground/10 transition-all duration-500 group cursor-pointer"
					>
						<FaHeart size={20} className="text-destructive/80 group-hover:scale-90 transition-all duration-300 ease-in-out mr-1 pt-1"/> 
						Favorites
					</Link>
					<button onClick={logout} 
						className="flex items-center w-full text-left px-4 py-2 rounded-md text-secondary-foreground hover:bg-destructive/20 transition-all duration-500 group cursor-pointer">
						<LogOutIcon size={20} className='group-hover:scale-90 transition-all duration-300 ease-in-out text-card-foreground mr-1 pt-1'/>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}