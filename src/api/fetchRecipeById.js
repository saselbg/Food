import { API_URL } from "./config";

export const fetchRecipeById = async (mealID) => {
	const response = await fetch(`${API_URL}/lookup.php?i=${mealID}`);
	if (!response.ok) throw new Error("Failed to fetch recipe");
  return await response.json();
}