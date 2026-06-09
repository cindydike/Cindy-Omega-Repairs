import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DataProvider } from "./contexts/DataContext";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage";
import { FirebaseProvider } from "./contexts/FirebaseContext";

const App = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <FirebaseProvider>
          <div className="w-screen text-sm xs:text-base max-w-[1440px] min-h-screen mx-auto flex flex-col items-center text-black dark:text-gray-100 dark:border-black scroll-smooth">
            <Header />
            <ErrorBoundary fallback={<ErrorPage error={"errorBoundary"} />}>
              <Suspense
                fallback={
                  <main className="p-4 min-h-screen text-sm xs:text-base font-barlowSemiCondensed font-semibold relative  w-full pt-10 lg:pt-12 px-4 sm:px-6 md:px-8 lg:pl-72 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex min-h-screen justify-center items-center">
                      <div
                        className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </main>
                }
              >
                <Outlet />
              </Suspense>
            </ErrorBoundary>
            <Footer />
            {/* <ScrollRestoration /> */}
          </div>
        </FirebaseProvider>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
