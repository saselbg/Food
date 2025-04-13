export const Footer = () => {
  return (
    <footer className="bg-secondary-foreground text-secondary text-center py-4">
      <div className="container">
				© {new Date().getFullYear()} Meal Finder. All rights reserved.
			</div>
    </footer>
  );
};