import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";

export const FavoritesMeals = () => {
  const [favorites, setFavorites] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/favorites?userId=${user.id}`)
        .then((res) => res.json())
        .then(setFavorites);
    }
  }, [user]);

  if (!user) return <p>Please log in to view your favorites.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {favorites.map((fav) => (
        <Link key={fav.id} to={`/${fav.meal.strCategory}/${fav.meal.idMeal}`}>
        <div className="p-4 bg-secondary-foreground/10 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
          <LazyImage
            src={fav.meal.strMealThumb} 
            alt={fav.meal.strMeal} 
            className="w-full h-60 rounded-md"
          />
          <h2 className="text-xl font-bold mt-2 text-center">{fav.meal.strMeal}</h2>
        </div>
      </Link>
      ))}
    </div>
  );
};