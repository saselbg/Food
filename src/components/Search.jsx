import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { searchMeals } from "../api/searchMeals";
import { Link } from "react-router-dom";


export const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["searchMeals", searchTerm],
    queryFn: () => searchMeals(searchTerm),
    enabled: !!searchTerm
	});

	return (
		<div className="hidden relative md:flex mr-2">
			<input
				type="text"
				placeholder="Search meals..."
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
					setShowResults(true);
				}}
				className="px-3 py-2 text-secondary-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
			/>
			
			{showResults && searchTerm && (
				<div className="absolute top-12 left-0 w-64 bg-background text-secondary-foreground shadow-md rounded-lg">
					{isLoading ? (
						<p className="p-2">Loading...</p>
					) : (
						<ul>
							{data?.meals?.length > 0 ? (
								data.meals.map((meal) => (
									<li key={meal.idMeal} className="p-2 hover:bg-secondary">
										<Link
											to={`/${meal.strCategory}/${meal.idMeal}`}
											onClick={() => {
												setSearchTerm("");
												setShowResults(false);
											}}
										>
											{meal.strMeal}
										</Link>
									</li>
								))
							) : (
								<p className="p-2">No results found</p>
							)}
						</ul>
					)}
				</div>
			)}
		</div>
	);
}