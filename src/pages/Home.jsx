import { CategoriesMeals } from "../entities/CategoriesMeals";

export const Home = () => {
	return (
		<div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Meal Categories</h1>
        <CategoriesMeals />
    </div>
	)
}