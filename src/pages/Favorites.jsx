import { Breadcrumbs } from "../components/Breadcrumbs"
import { FavoritesMeals } from "../entities/FavoritesMeals"

export const Favorites = () => {
	return (
		<div className="container mx-auto p-6">
			<Breadcrumbs/>
      <h1 className="text-3xl font-bold text-center mb-6">My Favorites</h1>
      <FavoritesMeals />
    </div>
	)
}