import { useParams } from "react-router-dom";
import { CategoryMeals } from "../entities/CategoryMeals";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const Category = () => {
	const { name } = useParams();
	return (
		<div className="container mx-auto p-6">
			<Breadcrumbs/>
			<h1 className="text-3xl font-bold text-center mb-6">{name} meals</h1>
				<CategoryMeals categoryName={name} />
		</div>
	)
}