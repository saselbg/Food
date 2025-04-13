import { API_URL } from "./config";

export const fetchCategoriesMeals = async () => {
	const response = await fetch(`${API_URL}/categories.php`);
	if (!response.ok) throw new Error("Failed to fetch meals");
	return await response.json();
}