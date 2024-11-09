import { Link, useLocation } from "react-router-dom";
import { NAVBAR_PAGES } from "./constants.ts";
import useAuth from "../../hooks/useAuth.ts";

const Navbar = ({ userRole = "" }: { userRole?: string }) => {
  const { pathname } = useLocation();

  const { isAuthenticated, logout } = useAuth();

  return (
    <nav
      className={
        "sticky top-0 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10"
      }
    >
      <div className={"flex justify-end gap-3 mr-10"}>
        {NAVBAR_PAGES.map(({ name, to, role, isHidden }) => {
          const isHighlighted = pathname === to;

          if (isHidden) {
            return null;
          }

          if (!role.includes(userRole)) {
            return null;
          }

          return (
            <Link
              to={to}
              key={name}
              className={`${isHighlighted ? "bg-pink-400" : ""} hover:bg-pink-500 text-black hover:text-yellow-300 rounded-full p-2 my-3`}
            >
              {name}
            </Link>
          );
        })}

        {isAuthenticated && (
          <button
            type={"button"}
            onClick={logout}
            className={"bg-red-600 my-2"}
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
