import { Link } from "react-router-dom";

const MissingPage = () => {
  return (
    <div className="max-w-[50rem] flex flex-col mx-auto w-full h-full">
      <header className="mb-auto flex justify-center z-50 w-full py-4 pt-8">
        <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
          <Link
            to={"/"}
            aria-label="Omega Repairs"
            className="flex-none text-xl font-semibold sm:text-3xl dark:text-white"
          >
            Omega Repairs
          </Link>
        </nav>
      </header>

      <div className="text-center py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">
          404
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Oops, something went wrong.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Sorry, we couldn{"'"}t find your page.
        </p>
        <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
          <Link
            to={"/"}
            className="w-full sm:w-auto inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
          >
            Go To Our Home Page
          </Link>
        </div>
      </div>

      <footer className="mt-auto text-center py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">© All Rights Reserved. 2023.</p>
        </div>
      </footer>
    </div>
  );
};

export default MissingPage;
