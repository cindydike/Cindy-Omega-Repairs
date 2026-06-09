import { useRouteError, Link } from "react-router-dom";

const ErrorPage = (props) => {
  const error = useRouteError();

  return (
    <main
      id="error-page"
      className="p-4 min-h-screen flex flex-col items-center text-sm xs:text-base font-barlowSemiCondensed font-semibold relative  w-full pt-10 lg:pt-12 px-4 sm:px-6 md:px-8 lg:pl-72 dark:bg-gray-800 dark:border-gray-700"
    >
      <h1 className="text-3xl md:text-4xl xl:text-5xl mb-10 font-bellefair font-semibold">
        Oops!
      </h1>
      <h2 className="text-xl md:text-2xl xl:text-2.5xl text-center mb-10 font-medium font-bellefair">
        Sorry, an unexpected error has occurred.
      </h2>
      {error && (
        <p className="mb-10 font-barlowCondensed tracking-secondary font-medium text-xl md:text-2xl xl:text-2.5xl text-center text-red-500">
          <i>{error.statusText || error.message}</i>
        </p>
      )}
      {props.error == "errorBoundary" && (
        <p className="mb-10 font-barlowCondensed tracking-secondary font-medium text-xl md:text-2xl xl:text-2.5xl text-center text-red-500">
          <i>Error While Loading Page</i>
        </p>
      )}
      <Link to={"/"}>
        <button className="text-xl md:text-2xl xl:text-2.5xl bg-primary-600 text-white rounded-3xl p-4 px-6 hover:brightness-125 dark:bg-primary-700 hover:text-primaryBlack font-bellefair font-medium">
          Go to Home Page
        </button>
      </Link>
    </main>
  );
};

export default ErrorPage;
