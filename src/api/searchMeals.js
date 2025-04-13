import { API_URL } from "./config";

export const searchMeals = async (searchTerm) => {
	const response = await fetch(`${API_URL}/search.php?s=${searchTerm}`);
	if (!response.ok) throw new Error("Failed to fetch search result");
  return await response.json();
}