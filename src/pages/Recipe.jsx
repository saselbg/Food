import { useParams } from "react-router-dom";
import { RecipeMeal } from "../entities/RecipeMeal";


export const Recipe = () => {
	const { id } = useParams();
	return (
		<RecipeMeal recipeId={id} />
	)
}