import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = ({ customNames = {} }) => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  return (
    <nav className="text-secondary-foreground/80 text-sm mb-4">
      <ul className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        {paths.map((path, index) => {
          const routeTo = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;
          const displayName = customNames[path] || decodeURIComponent(path);

          return (
            <li key={routeTo} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-secondary-foreground/70 capitalize">{displayName}</span>
              ) : (
                <Link to={routeTo} className="hover:underline capitalize">{displayName}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};