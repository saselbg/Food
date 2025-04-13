import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesMeals } from "../api/fetchCategoriesMeals";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";

export const CategoriesMeals = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['CategoriesMeals'],
		queryFn: fetchCategoriesMeals,
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p className="text-destructive">Error: {error.message}</p>;

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data?.categories.map((category) => (
				<Link key={category.idCategory} to={`/${category.strCategory}`}>
					<div className="p-4 bg-secondary-foreground/10 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
						<LazyImage
							src={category.strCategoryThumb} 
							alt={category.strCategory} 
							className="w-full h-60 rounded-md"
						/>
						<h2 className="text-xl font-bold mt-2 text-center">{category.strCategory}</h2>
					</div>
				</Link>
      ))}
    </div>
	);
}