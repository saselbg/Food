import { useQuery } from "@tanstack/react-query";
import { fetchCategoryMeals } from "../api/fetchCategoryMeals";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";

export const CategoryMeals = ({ categoryName }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["CategoryMeals", categoryName],
    queryFn: () => fetchCategoryMeals(categoryName),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-destructive">Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data?.meals?.map((meal) => (
        <Link key={meal.idMeal} to={`/${categoryName}/${meal.idMeal}`}>
        <div className="p-4 bg-secondary-foreground/10 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 flex flex-col h-full">
          <LazyImage
            src={meal.strMealThumb} 
            alt={meal.strMeal} 
            className="w-full h-60 rounded-md"
          />
          <h2 className="text-xl font-bold mt-2 text-center min-h-[3rem]">{meal.strMeal}</h2>
        </div>
      </Link>
      ))}
    </div>
  );
};