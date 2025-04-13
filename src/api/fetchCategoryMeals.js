import { API_URL } from "./config";

export const fetchCategoryMeals = async (catName) => {
	const response = await fetch(`${API_URL}/filter.php?c=${catName}`);
	if (!response.ok) throw new Error("Failed to fetch meals");
  return await response.json();
}