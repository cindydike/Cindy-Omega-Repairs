import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import FirebaseContext from "../contexts/FirebaseContext";

const PrivateRoutes = () => {
  const { user, authLoading } = useContext(FirebaseContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (user && !authLoading) return <Outlet />;

  if (authLoading) {
    <main className="p-4 min-h-screen text-base font-barlow font-semibold relative overflow-x-hidden w-full pt-6 md:pt-8 px-4 sm:px-6 md:px-8 lg:pl-72 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center">
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-400 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </main>;
  }

  if (!user && !authLoading) return <Navigate to={"/login"} />;
};

export default PrivateRoutes;
