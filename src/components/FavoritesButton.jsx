import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const FavoritesButton = ({ recipeId, meal }) => {
	const { user } = useContext(AuthContext);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (user) {
			fetch(`http://localhost:5000/favorites?userId=${user.id}&mealId=${recipeId}`)
				.then((res) => res.json())
				.then((fav) => setIsFavorite(fav.length > 0));
		}
	}, [recipeId, user]);

	const addToFavorites = async () => {
		if (!user) {
			alert("Please log in to add favorites!");
			return;
		}

		const response = await fetch("http://localhost:5000/favorites", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: user.id, mealId: recipeId, meal }),
		});

		if (response.ok) setIsFavorite(true);
	};

	const removeFromFavorites = async () => {
		const response = await fetch(`http://localhost:5000/favorites?userId=${user.id}&mealId=${recipeId}`);
		const fav = await response.json();

		if (fav.length > 0) {
			await fetch(`http://localhost:5000/favorites/${fav[0].id}`, {
				method: "DELETE",
			});
			setIsFavorite(false);
		}
	};

	return (
		<button
			onClick={isFavorite ? removeFromFavorites : addToFavorites}
			className="text-destructive text-2xl cursor-pointer mb-5"
		>
			{isFavorite 
				? <div className="flex"><span className="text-sm mr-3">Remove from Favorites</span><FaHeart /></div> 
				: <div className="flex"><span className="text-sm mr-3">Add to Favorites</span><FaRegHeart /></div>
			}
		</button>
	);
}