import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../api/fetchRecipeById";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FavoritesButton } from "../components/FavoritesButton";

export const RecipeMeal = ({ recipeId}) => {
	
	const { data, error, isLoading } = useQuery({
    queryKey: ["RecipeMeal", recipeId],
    queryFn: () => fetchRecipeById(recipeId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-destructive">Error: {error.message}</p>;
	if (!data?.meals?.length) return <p>No recipe found!</p>;

  const meal = data.meals[0];	

	const mealName = meal?.strMeal || "Recipe";

	const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient") && meal[key])
    .map((key, index) => ({
      ingredient: meal[key],
      measure: meal[`strMeasure${index + 1}`] || "",
    }));

	return (
		<div className="mx-auto p-6">
			<Breadcrumbs customNames={{ [recipeId]: mealName }}/>
			<div className="flex items-center justify-between">
				<h1 className="text-4xl font-bold mb-6 mr-4">{meal.strMeal}</h1>
				<FavoritesButton recipeId={recipeId} meal={meal}/>
			</div>     

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="w-full rounded-lg shadow-lg"
        />

        <div>
					<h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
					<div className="grid grid-cols-2 gap-2">
						{ingredients.map((item, idx) => (
							<div key={idx} className="flex justify-between p-2 border-b">
								<span className="font-bold">{item.ingredient}</span>
								{item.measure && <span className="text-secondary-foreground/60">{item.measure}</span>}
							</div>
						))}
					</div>
				</div>
      </div>

      <div className="mt-6">
        <p className="text-lg"><strong>Category:</strong> {meal.strCategory}</p>
        <p className="text-lg"><strong>Cuisine:</strong> {meal.strArea}</p>
      </div>

      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <p className="text-secondary-foreground leading-relaxed">{meal.strInstructions}</p>

      {meal.strYoutube && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Watch on YouTube</h2>
          <iframe
            className="w-full h-64 mt-2 rounded-lg"
            src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
            title="Recipe Video"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
	);
}