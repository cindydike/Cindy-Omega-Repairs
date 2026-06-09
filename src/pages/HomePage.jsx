import { useState, useEffect } from "react";
import { IconContext } from "react-icons/lib";
import {
  MdCarRepair,
  MdOutlineDescription,
  MdLocationOn,
  MdStarRate,
  MdStarHalf,
  MdOutlineError,
  MdLocalPhone,
  MdCheckCircle,
  MdOutlineArticle,
  // MdOutlineHandshake,
  MdErrorOutline,
} from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
// import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
// import useFirebase from "../hooks/useFirebase";
import { useContext } from "react";
import FirebaseContext from "../contexts/FirebaseContext";
import BrandName from "../components/BrandName";
import { HashLink } from "react-router-hash-link";

const HomePage = () => {
  const location = useLocation();
  const [repairShops, setRepairShops] = useState([]);
  const { data, isLoading, fetchError, setCollectionName, setCount } =
    useContext(FirebaseContext);
  // const { data, isLoading, fetchError } = useFirebase("repairShops", null, 8);

  useEffect(() => {
    data && setRepairShops(data.slice(0, 5));
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data.length < 1) {
      setCollectionName("repairShops");
      setCount(10);
    }
  }, [setCollectionName, setCount, data]);

  const hasFloat = (number) => {
    return number?.toString().split(".")[1] > 0;
  };

  const getServices = (object) => {
    let arr = [];
    if (object == "N/A") {
      return "N/A";
    }
    for (const [key, value] of Object.entries(object)) {
      if (value) arr.push(key);
    }
    if (arr.length == 0) {
      return "N/A";
    }
    return arr.join(", ");
  };

  const handleIsOpen = (obj) => {
    if (obj.times != "N/A") {
      const date = new Date();
      const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
        date
      );
      const time = new Intl.DateTimeFormat("en-US", {
        timeStyle: "short",
      }).format(date);
      const shopDay = obj.times[day.toLocaleLowerCase()];
      const isOpen = (shopDay) => {
        if (shopDay == "Closed") {
          return false;
        }
        if (shopDay == "Open 24 hours") {
          return true;
        }
        const morning = shopDay.split("\u2013")[0];
        const afternoon = shopDay.split("\u2013")[1];
        let morningIndex = morning.indexOf("A");
        let morningValue;
        let afternoonIndex = afternoon.indexOf("P");
        let afternoonValue;
        let afternoonDecimal;
        let afternoonInt;
        const isMorning = (timeStr) => {
          return "AM" == timeStr.split(" ")[1];
        };
        const currentTimeInt = isMorning(time)
          ? Number(time.split(":")[0])
          : Number(time.split(":")[0]) == 12
          ? Number(time.split(":")[0])
          : Number(time.split(":")[0]) + 12;
        const currentTimeDecimal = Number(time.split(":")[1]);
        let morningInt;
        let morningDecimal;
        if (morningIndex == -1) {
          morningIndex = morning.indexOf("P");
          morningValue = morning.slice(0, morningIndex);
          morningInt = Number(morningValue.split(":")[0]);
          morningDecimal = Number(morningValue.split(":")[1]);
        } else {
          morningValue = morning.slice(0, morningIndex);
          morningInt = Number(morningValue.split(":")[0]);
          morningDecimal = Number(morningValue.split(":")[1]);
        }
        if (afternoonIndex == -1) {
          afternoonIndex = afternoon.indexOf("A");
          afternoonValue = afternoon.slice(0, afternoonIndex);
          afternoonDecimal = afternoonValue.split(":")[1];
          afternoonInt = Number(afternoonValue.split(":")[0]) + 24;
        } else {
          afternoonValue = afternoon.slice(0, afternoonIndex);
          afternoonDecimal = afternoonValue.split(":")[1];
          afternoonInt = Number(afternoonValue.split(":")[0]) + 12;
        }
        const getTimeTruth = (
          currentTimeInt,
          currentTimeDecimal,
          morningInt,
          morningDecimal,
          afternoonInt,
          afternoonDecimal
        ) => {
          // console.log("Current Int", currentTimeInt);
          // console.log("Current Decimal", currentTimeDecimal);
          // console.log("Morning Int", morningInt);
          // console.log("Morning Decimal", morningDecimal);
          // console.log("Afternoon Int", afternoonInt);
          // console.log("Afternoon Decimal", afternoonDecimal);
          if (
            !currentTimeDecimal ||
            (currentTimeDecimal && !morningDecimal && !afternoonDecimal)
          ) {
            return (
              currentTimeInt >= morningInt && currentTimeInt < afternoonInt
            );
          }
          if (currentTimeDecimal && morningDecimal && afternoonDecimal) {
            const isMorningIntLesser = currentTimeInt > morningInt;
            const isMorningIntGood =
              isMorningIntLesser || currentTimeInt == morningInt;
            const isAfternoonIntGreater = currentTimeInt < afternoonInt;
            const isAfternoonIntGood =
              isAfternoonIntGreater || currentTimeInt == afternoonInt;
            const isMorningDecimalLesser =
              isMorningIntGood || currentTimeDecimal > morningDecimal;
            const isAfternoonDecimalGreater =
              isAfternoonIntGood || currentTimeDecimal < afternoonDecimal;
            return isMorningDecimalLesser && isAfternoonDecimalGreater;
          }

          if (currentTimeDecimal && !morningDecimal && afternoonDecimal) {
            const isMorningIntLesser = currentTimeInt >= morningInt;

            const isAfternoonIntGreater = currentTimeInt < afternoonInt;
            const isAfternoonIntGood =
              isAfternoonIntGreater || currentTimeInt == afternoonInt;

            const isAfternoonDecimalGreater =
              isAfternoonIntGood || currentTimeDecimal < afternoonDecimal;
            return isMorningIntLesser && isAfternoonDecimalGreater;
          }
          if (currentTimeDecimal && morningDecimal && !afternoonDecimal) {
            const isMorningIntLesser = currentTimeInt > morningInt;
            const isMorningIntGood =
              isMorningIntLesser || currentTimeInt == morningInt;
            const isAfternoonIntGreater = currentTimeInt < afternoonInt;
            const isMorningDecimalLesser =
              isMorningIntGood || currentTimeDecimal > morningDecimal;

            return isMorningDecimalLesser && isAfternoonIntGreater;
          }
        };
        return getTimeTruth(
          currentTimeInt,
          currentTimeDecimal,
          morningInt,
          morningDecimal,
          afternoonInt,
          afternoonDecimal
        );
      };
      return isOpen(shopDay);
    } else {
      return "N/A";
    }
  };
  return (
    <main className="p-4 min-h-screen text-sm xs:text-base font-barlow font-semibold relative w-full pt-6 sm:pt-10 px-4 sm:px-6 md:px-8 lg:pl-72 dark:bg-gray-800 dark:border-gray-700">
      {/* <!-- Hero --> */}
      <div className="max-w-[85rem] mx-auto">
        {/* <!-- Grid --> */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl lg:leading-tight dark:text-white">
              Welcome to{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Omega Repairs{" "}
              </span>
            </h1>
            <p className="mt-3 text-lg text-gray-800 dark:text-white">
              Your trusted source of the latest recommendations and information
              about auto maintenance and repair shops near you.
            </p>

            {/* <!-- Buttons --> */}
            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Link
                to={"/?search=true"}
                className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
              >
                <span>Search for shops near you</span>
              </Link>
            </div>
            {/* <!-- End Buttons --> */}

            {/* <!-- Review --> */}
            <div className="mt-6 lg:mt-10 grid grid-cols-2 gap-x-5">
              {/* <!-- Review --> */}
              <div className="py-5">
                <div className="flex space-x-1">
                  <svg
                    className="h-4 w-4 text-gray-800 dark:text-gray-200"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="h-4 w-4 text-gray-800 dark:text-gray-200"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="h-4 w-4 text-gray-800 dark:text-gray-200"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="h-4 w-4 text-gray-800 dark:text-gray-200"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="h-4 w-4 text-gray-800 dark:text-gray-200"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <p className="mt-3 text-sm text-gray-800 dark:text-white">
                  <span className="font-bold">4.6</span> /5 - from 12k reviews
                </p>

                <div className="mt-5">
                  {/* <!-- Star --> */}
                  <svg
                    className="h-auto w-16 text-gray-800 dark:text-white"
                    width="80"
                    height="27"
                    viewBox="0 0 80 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.558 9.74046H11.576V12.3752H17.9632C17.6438 16.0878 14.5301 17.7245 11.6159 17.7245C7.86341 17.7245 4.58995 14.7704 4.58995 10.6586C4.58995 6.62669 7.70373 3.51291 11.6159 3.51291C14.6498 3.51291 16.4063 5.42908 16.4063 5.42908L18.2426 3.51291C18.2426 3.51291 15.8474 0.878184 11.4961 0.878184C5.94724 0.838264 1.67578 5.50892 1.67578 10.5788C1.67578 15.5289 5.70772 20.3592 11.6558 20.3592C16.8854 20.3592 20.7177 16.8063 20.7177 11.4969C20.7177 10.3792 20.558 9.74046 20.558 9.74046Z"
                      fill="currentColor"
                    />
                    <path
                      d="M27.8621 7.78442C24.1894 7.78442 21.5547 10.6587 21.5547 14.012C21.5547 17.4451 24.1096 20.3593 27.9419 20.3593C31.415 20.3593 34.2094 17.7645 34.2094 14.0918C34.1695 9.94011 30.896 7.78442 27.8621 7.78442ZM27.902 10.2994C29.6984 10.2994 31.415 11.7764 31.415 14.0918C31.415 16.4072 29.7383 17.8842 27.902 17.8842C25.906 17.8842 24.3491 16.2874 24.3491 14.0519C24.3092 11.8962 25.8661 10.2994 27.902 10.2994Z"
                      fill="currentColor"
                    />
                    <path
                      d="M41.5964 7.78442C37.9238 7.78442 35.2891 10.6587 35.2891 14.012C35.2891 17.4451 37.844 20.3593 41.6763 20.3593C45.1493 20.3593 47.9438 17.7645 47.9438 14.0918C47.9038 9.94011 44.6304 7.78442 41.5964 7.78442ZM41.6364 10.2994C43.4328 10.2994 45.1493 11.7764 45.1493 14.0918C45.1493 16.4072 43.4727 17.8842 41.6364 17.8842C39.6404 17.8842 38.0835 16.2874 38.0835 14.0519C38.0436 11.8962 39.6004 10.2994 41.6364 10.2994Z"
                      fill="currentColor"
                    />
                    <path
                      d="M55.0475 7.82434C51.6543 7.82434 49.0195 10.7784 49.0195 14.0918C49.0195 17.8443 52.0934 20.3992 54.9676 20.3992C56.764 20.3992 57.6822 19.7205 58.4407 18.8822V20.1198C58.4407 22.2754 57.1233 23.5928 55.1273 23.5928C53.2111 23.5928 52.2531 22.1557 51.8938 21.3573L49.4587 22.3553C50.297 24.1517 52.0135 26.0279 55.0874 26.0279C58.4407 26.0279 60.9956 23.9122 60.9956 19.481V8.18362H58.3608V9.26147C57.6423 8.38322 56.5245 7.82434 55.0475 7.82434ZM55.287 10.2994C56.9237 10.2994 58.6403 11.7365 58.6403 14.1317C58.6403 16.6068 56.9636 17.9241 55.2471 17.9241C53.4507 17.9241 51.774 16.4471 51.774 14.1716C51.8139 11.6966 53.5305 10.2994 55.287 10.2994Z"
                      fill="currentColor"
                    />
                    <path
                      d="M72.8136 7.78442C69.62 7.78442 66.9453 10.2994 66.9453 14.0519C66.9453 18.004 69.9393 20.3593 73.093 20.3593C75.7278 20.3593 77.4044 18.8822 78.3625 17.6048L76.1669 16.1277C75.608 17.006 74.6499 17.8443 73.093 17.8443C71.3365 17.8443 70.5381 16.8862 70.0192 15.9281L78.4423 12.4152L78.0032 11.3772C77.1649 9.46107 75.2886 7.78442 72.8136 7.78442ZM72.8934 10.2196C74.0511 10.2196 74.8495 10.8184 75.2487 11.5768L69.6599 13.9321C69.3405 12.0958 71.097 10.2196 72.8934 10.2196Z"
                      fill="currentColor"
                    />
                    <path
                      d="M62.9531 19.9999H65.7076V1.47693H62.9531V19.9999Z"
                      fill="currentColor"
                    />
                  </svg>
                  {/* <!-- End Star --> */}
                </div>
              </div>
              {/* <!-- End Review --> */}

              {/* <!-- Review --> */}
              <div className="py-5">
                <div className="flex space-x-1">
                  <svg
                    className="h-4 w-4 text-gray-800 dark:text-gray-200"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="h-4 w-4 text-gray-800 dark:text-gray-200"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="h-4 w-4 text-gray-800 dark:text-gray-200"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="h-4 w-4 text-gray-800 dark:text-gray-200"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="h-4 w-4 text-gray-800 dark:text-gray-200"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M49.6867 20.0305C50.2889 19.3946 49.9878 18.1228 49.0846 18.1228L33.7306 15.8972C33.4296 15.8972 33.1285 15.8972 32.8275 15.2613L25.9032 0.317944C25.6021 0 25.3011 0 25 0V42.6046C25 42.6046 25.3011 42.6046 25.6021 42.6046L39.7518 49.9173C40.3539 50.2352 41.5581 49.5994 41.2571 48.6455L38.5476 32.4303C38.5476 32.1124 38.5476 31.7944 38.8486 31.4765L49.6867 20.0305Z"
                      fill="transparent"
                    />
                    <path
                      d="M0.313299 20.0305C-0.288914 19.3946 0.0122427 18.1228 0.915411 18.1228L16.2694 15.8972C16.5704 15.8972 16.8715 15.8972 17.1725 15.2613L24.0968 0.317944C24.3979 0 24.6989 0 25 0V42.6046C25 42.6046 24.6989 42.6046 24.3979 42.6046L10.2482 49.9173C9.64609 50.2352 8.44187 49.5994 8.74292 48.6455L11.4524 32.4303C11.4524 32.1124 11.4524 31.7944 11.1514 31.4765L0.313299 20.0305Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <p className="mt-3 text-sm text-gray-800 dark:text-white">
                  <span className="font-bold">4.8</span> /5 - from 5k reviews
                </p>

                <div className="mt-5">
                  {/* <!-- Star --> */}
                  <svg
                    className="h-auto w-16 text-gray-800 dark:text-white"
                    width="110"
                    height="28"
                    viewBox="0 0 110 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M66.6601 8.35107C64.8995 8.35107 63.5167 8.72875 62.1331 9.48265C62.1331 5.4582 62.1331 1.81143 62.2594 0.554199L53.8321 2.06273V2.81736L54.7124 2.94301C55.8433 3.19431 56.2224 3.82257 56.4715 5.33255C56.725 8.35107 56.5979 24.4496 56.4715 27.0912C58.7354 27.5945 61.1257 27.9722 63.5159 27.9722C70.1819 27.9722 74.2064 23.8213 74.2064 17.281C74.2064 12.1249 70.9366 8.35107 66.6601 8.35107ZM63.7672 26.5878C63.2639 26.5878 62.6342 26.5878 62.258 26.4629C62.1316 24.7023 62.0067 17.281 62.1316 10.7413C62.8862 10.4893 63.3888 10.3637 64.0185 10.3637C66.7872 10.3637 68.2965 13.6335 68.2965 17.6572C68.2957 22.6898 66.4088 26.5878 63.7672 26.5878ZM22.1363 1.0568H0V2.18838L1.25796 2.31403C2.89214 2.56533 3.52184 3.57127 3.77242 5.9608C4.15082 10.4886 4.02445 18.6646 3.77242 22.5619C3.52112 24.9522 2.89287 26.0845 1.25796 26.2087L0 26.4615V27.4674H14.2123V26.4615L12.703 26.2087C11.0681 26.0838 10.4392 24.9522 10.1879 22.5619C10.0615 20.9263 9.93583 18.2847 9.93583 15.0156L12.9543 15.1413C14.8413 15.1413 15.7208 16.6505 16.0985 18.7881H17.2308V9.86106H16.0985C15.7201 11.9993 14.8413 13.5078 12.9543 13.5078L9.93655 13.6342C9.93655 9.35773 10.0622 5.33328 10.1886 2.94374H14.59C17.9869 2.94374 19.7475 5.08125 21.0047 8.85513L22.2626 8.47745L22.1363 1.0568Z"
                      fill="currentColor"
                    />
                    <path
                      d="M29.3053 8.09998C35.5944 8.09998 38.7385 12.3764 38.7385 18.0358C38.7385 23.4439 35.2167 27.9731 28.9276 27.9731C22.6393 27.9731 19.4951 23.6959 19.4951 18.0358C19.4951 12.6277 23.0162 8.09998 29.3053 8.09998ZM28.9276 9.35793C26.1604 9.35793 25.4058 13.1311 25.4058 18.0358C25.4058 22.8149 26.6637 26.7137 29.1796 26.7137C32.0703 26.7137 32.8264 22.9405 32.8264 18.0358C32.8264 13.2567 31.5699 9.35793 28.9276 9.35793ZM75.8403 18.1622C75.8403 13.0054 79.1101 8.09998 85.5248 8.09998C90.8057 8.09998 93.3224 11.9995 93.3224 17.1555H81.6253C81.4989 21.8089 83.7628 25.2051 88.2913 25.2051C90.3038 25.2051 91.3098 24.7033 92.5685 23.8223L93.0703 24.4505C91.8124 26.2111 89.0459 27.9731 85.5248 27.9731C79.8647 27.9724 75.8403 23.9479 75.8403 18.1622ZM81.6253 15.7726L87.5366 15.6463C87.5366 13.1311 87.159 9.35793 85.0214 9.35793C82.8839 9.35793 81.7502 12.8791 81.6253 15.7726ZM108.291 9.10663C106.782 8.47693 104.77 8.09998 102.506 8.09998C97.8538 8.09998 94.9594 10.8665 94.9594 14.137C94.9594 17.4075 97.0955 18.7904 100.118 19.7971C103.261 20.9279 104.142 21.8089 104.142 23.3182C104.142 24.8275 103.01 26.2103 100.997 26.2103C98.6084 26.2103 96.8464 24.8275 95.4635 21.0536L94.5825 21.3063L94.7089 26.84C96.2181 27.4683 98.9846 27.9724 101.375 27.9724C106.28 27.9724 109.425 25.4557 109.425 21.5576C109.425 18.9161 108.041 17.4075 104.771 16.1489C101.249 14.766 99.992 13.8857 99.992 12.2501C99.992 10.6152 101.126 9.48286 102.635 9.48286C104.897 9.48286 106.407 10.8665 107.54 14.2627L108.42 14.0114L108.291 9.10663ZM55.0883 8.6033C52.9508 7.3468 49.1769 7.97433 47.1651 12.5028L47.29 8.1007L38.8642 9.73561V10.4902L39.7444 10.6159C40.8775 10.7423 41.3794 11.3705 41.5057 13.0062C41.757 16.0247 41.6314 21.3078 41.5057 23.9486C41.3794 25.4564 40.8775 26.2111 39.7444 26.3374L38.8642 26.4638V27.4697H50.5606V26.4638L49.0513 26.3374C47.7941 26.2111 47.4164 25.4564 47.29 23.9486C47.0387 21.5584 47.0387 16.7793 47.1651 13.7608C47.7933 12.8798 50.5606 12.1259 53.0757 13.7608L55.0883 8.6033Z"
                      fill="currentColor"
                    />
                  </svg>
                  {/* <!-- End Star --> */}
                </div>
              </div>
              {/* <!-- End Review --> */}
            </div>
            {/* <!-- End Review --> */}
          </div>
          {/* <!-- End Col --> */}

          <div className="relative md:ml-4 flex flex-col h-[400px] sm:h-[530px]">
            <img
              src="./backgroundImage.jpg"
              alt=""
              className="w-full h-1/2 object-cover"
            />
            <div className="h-1/2 flex">
              <img
                alt="man refilling motor oil on car engine bay"
                sizes="(min-width: 1335px) 410.6666666666667px, (min-width: 992px) calc(calc(100vw - 88px) / 3), (min-width: 768px) calc(calc(100vw - 64px) / 2), 100vw"
                srcSet="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=100&amp;q=60 100w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=60 200w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=300&amp;q=60 300w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=60 400w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60 500w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=60 600w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=60 700w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60 800w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=900&amp;q=60 900w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=60 1000w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=1200&amp;q=60 1200w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=1400&amp;q=60 1400w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=1600&amp;q=60 1600w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=1800&amp;q=60 1800w, https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=60 2000w"
                src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fHww&amp;w=1000&amp;q=80"
                itemProp="thumbnailUrl"
                loading="lazy"
                className="w-1/2 h-full object-cover"
                data-test="photo-grid-masonry-img"
                style={{ aspectRatio: 7200 / 4800 }}
              ></img>
              <img
                alt="Pleased automotive technician removing protective cover from car engine and looking at its parts"
                sizes="(min-width: 1335px) 410.6666666666667px, (min-width: 992px) calc(calc(100vw - 88px) / 3), (min-width: 768px) calc(calc(100vw - 64px) / 2), 100vw"
                srcSet="https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=100&amp;q=60 100w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=60 200w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=300&amp;q=60 300w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=60 400w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60 500w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=60 600w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=60 700w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60 800w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=900&amp;q=60 900w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=60 1000w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=1200&amp;q=60 1200w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=1400&amp;q=60 1400w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=1600&amp;q=60 1600w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=1800&amp;q=60 1800w, https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=60 2000w"
                src="https://plus.unsplash.com/premium_photo-1661767441726-a5140d5a11e8?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D&amp;w=1000&amp;q=80"
                itemProp="thumbnailUrl"
                loading="lazy"
                className="w-1/2 h-full object-cover"
                data-test="photo-grid-masonry-img"
                style={{ aspectRatio: 6000 / 4000 }}
              ></img>
            </div>

            <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 w-full h-full rounded-md mt-4 -mb-4 mr-4 -ml-4 lg:mt-6 lg:-mb-6 lg:mr-6 lg:-ml-6 dark:from-slate-800 dark:via-slate-900/0 dark:to-slate-900/0"></div>

            {/* <!-- SVG--> */}
            <div className="absolute flex justify-end bottom-0 left-0 w-full">
              <svg
                className="w-2/3 h-auto text-white dark:text-slate-900"
                width="630"
                height="451"
                viewBox="0 0 630 451"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="531"
                  y="352"
                  width="99"
                  height="99"
                  fill="currentColor"
                />
                <rect
                  x="140"
                  y="352"
                  width="106"
                  height="99"
                  fill="currentColor"
                />
                <rect
                  x="482"
                  y="402"
                  width="64"
                  height="49"
                  fill="currentColor"
                />
                <rect
                  x="433"
                  y="402"
                  width="63"
                  height="49"
                  fill="currentColor"
                />
                <rect
                  x="384"
                  y="352"
                  width="49"
                  height="50"
                  fill="currentColor"
                />
                <rect
                  x="531"
                  y="328"
                  width="50"
                  height="50"
                  fill="currentColor"
                />
                <rect
                  x="99"
                  y="303"
                  width="49"
                  height="58"
                  fill="currentColor"
                />
                <rect
                  x="99"
                  y="352"
                  width="49"
                  height="50"
                  fill="currentColor"
                />
                <rect
                  x="99"
                  y="392"
                  width="49"
                  height="59"
                  fill="currentColor"
                />
                <rect
                  x="44"
                  y="402"
                  width="66"
                  height="49"
                  fill="currentColor"
                />
                <rect
                  x="234"
                  y="402"
                  width="62"
                  height="49"
                  fill="currentColor"
                />
                <rect
                  x="334"
                  y="303"
                  width="50"
                  height="49"
                  fill="currentColor"
                />
                <rect x="581" width="49" height="49" fill="currentColor" />
                <rect x="581" width="49" height="64" fill="currentColor" />
                <rect
                  x="482"
                  y="123"
                  width="49"
                  height="49"
                  fill="currentColor"
                />
                <rect
                  x="507"
                  y="124"
                  width="49"
                  height="24"
                  fill="currentColor"
                />
                <rect
                  x="531"
                  y="49"
                  width="99"
                  height="99"
                  fill="currentColor"
                />
              </svg>
            </div>
            {/* <!-- End SVG--> */}
          </div>
          {/* <!-- End Col --> */}
        </div>
        {/* <!-- End Grid --> */}
      </div>
      {/* <!-- End Hero --> */}
      {/* <----- About Us -----> */}
      <section
        id="aboutUs"
        className="pt-10 lg:py-14 mx-auto flex flex-col gap-12 lg:gap-16"
      >
        <div className="flex flex-col gap-2">
          <strong className="flex justify-start text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl lg:leading-tight dark:text-white">
            Are you in need of quick and reliable car repair services?
          </strong>
          <strong className="block text-lg font-bold text-gray-800 sm:text-xl lg:text-2xl lg:leading-tight dark:text-white">
            Look no further! <BrandName /> is here to assist you in finding the
            nearest and most reputable car repair shops in your area.
          </strong>
        </div>
        <article id="ourMission" className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl lg:leading-tight dark:text-white">
            Our Mission
          </h3>
          <p className="text-lg text-gray-800 dark:text-white">
            At <BrandName />, our mission is simple yet essential: to make your
            car repair journey hassle-free. We understand that vehicle issues
            can arise unexpectedly, leaving you in a bind. That{"'"}s why we
            {"'"}ve created a powerful tool that helps you locate the closest
            and most qualified car repair experts with ease.
          </p>
        </article>
        <article id="howItWorks" className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl lg:leading-tight dark:text-white">
            How It Works
          </h3>
          <p className="text-lg text-gray-800 dark:text-white">
            Using our user-friendly website, you can effortlessly find the ideal
            car repair shop near you
          </p>
          <ol className="mt-4 pl-2 lg:pl-4 flex flex-col gap-3">
            <li>
              <div className="flex items-center gap-2">
                <IconContext.Provider
                  value={{
                    className: "w-5 h-5",
                  }}
                >
                  <GiAutoRepair />
                </IconContext.Provider>
                <strong className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl lg:leading-tight dark:text-white">
                  Location Detection
                </strong>
              </div>
              <p className="pl-7">
                Enable geolocation services or manually enter your location.
              </p>
              {/* <!-- Buttons --> */}
              <div className=" mt-1 grid gap-1 w-full sm:inline-flex pl-7">
                <Link
                  to={"/?search=true"}
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-2 px-4 dark:focus:ring-offset-gray-800"
                >
                  <span>Search for shops near you</span>
                </Link>
              </div>
              {/* <!-- End Buttons --> */}
            </li>
            <li>
              <div className="flex items-center gap-2">
                <IconContext.Provider
                  value={{
                    className: "w-5 h-5",
                  }}
                >
                  <GiAutoRepair />
                </IconContext.Provider>
                <strong className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl lg:leading-tight dark:text-white">
                  Comprehensive Information
                </strong>
              </div>
              <p className="pl-7">
                Explore each shop{"'"}s details, including contact information,
                services offered, user ratings, and more.
              </p>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <IconContext.Provider
                  value={{
                    className: "w-5 h-5",
                  }}
                >
                  <GiAutoRepair />
                </IconContext.Provider>
                <strong className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl lg:leading-tight dark:text-white">
                  Instant Results
                </strong>
              </div>
              <p className="pl-7">
                Receive a list of nearby car repair shops ranked by proximity.
              </p>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <IconContext.Provider
                  value={{
                    className: "w-5 h-5",
                  }}
                >
                  <GiAutoRepair />
                </IconContext.Provider>
                <strong className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl lg:leading-tight dark:text-white">
                  User Reviews
                </strong>
              </div>
              <p className="pl-7">
                Benefit from the experiences of others by reading user reviews
                and ratings.
              </p>
            </li>
          </ol>
        </article>
        <article id="whyChooseUs" className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl lg:leading-tight dark:text-white">
            Why Choose Us
          </h3>
          <ul className="mt-4 pl-2 flex flex-col gap-2">
            <li>
              <div className="flex items-center gap-2">
                <IconContext.Provider
                  value={{
                    className:
                      "w-5 h-5 text-customGreen-100 dark:text-green-400",
                  }}
                >
                  <MdCheckCircle />
                </IconContext.Provider>
                <strong className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl lg:leading-tight dark:text-white">
                  Accuracy
                </strong>
              </div>
              <p className="pl-7">
                Our advanced algorithm ensures precise results based on your
                location.
              </p>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <IconContext.Provider
                  value={{
                    className:
                      "w-5 h-5 text-customGreen-100 dark:text-green-400",
                  }}
                >
                  <MdCheckCircle />
                </IconContext.Provider>
                <strong className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl lg:leading-tight dark:text-white">
                  Convenience
                </strong>
              </div>
              <p className="pl-7">
                Save time and effort by quickly identifying the closest repair
                options.
              </p>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <IconContext.Provider
                  value={{
                    className:
                      "w-5 h-5 text-customGreen-100 dark:text-green-400",
                  }}
                >
                  <MdCheckCircle />
                </IconContext.Provider>
                <strong className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl lg:leading-tight dark:text-white">
                  Transparency
                </strong>
              </div>
              <p className="pl-7">
                Access valuable information about each shop, including opening
                hours, services they can offer and customer feedback.
              </p>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <IconContext.Provider
                  value={{
                    className:
                      "w-5 h-5 text-customGreen-100 dark:text-green-400",
                  }}
                >
                  <MdCheckCircle />
                </IconContext.Provider>
                <strong className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl lg:leading-tight dark:text-white">
                  Peace of Mind
                </strong>
              </div>
              <p className="pl-7">
                Make informed decisions and entrust your vehicle to skilled
                professionals.
              </p>
            </li>
          </ul>
        </article>
        <article className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl lg:leading-tight dark:text-white">
            Your Trusted Resource for Car Repairs
          </h3>
          <p className="text-lg text-gray-800 dark:text-white">
            Whether it{"'"}s a routine maintenance check, a minor repair, or a
            major overhaul, <BrandName /> is your go-to destination for all your
            automotive needs. We{"'"}re committed to providing you with the
            tools and information necessary to keep your vehicle in top-notch
            condition. Join the thousands of satisfied users who rely on{" "}
            <BrandName /> to find the best car repair solutions. Let us help you
            get back on the road with confidence!
          </p>
        </article>
        <article
          id="discoverOurRecommendations"
          className="flex flex-col gap-2"
        >
          <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl lg:leading-tight dark:text-white">
            Discover Our Expert Recommendations
          </h3>
          <p className="text-lg text-gray-800 dark:text-white">
            Looking for trusted car repair shops but not sure where to start?{" "}
            <BrandName /> has you covered! In addition to finding nearby
            options, we also provide expert recommendations from our carefully
            curated database of top-notch car repair centers.
          </p>
          <div className="mt-1 grid gap-3 w-full sm:inline-flex">
            <Link
              to={"/repairshops"}
              className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
            >
              <span>See Our Recommendations</span>
            </Link>
          </div>
          <p className="text-lg text-gray-800 dark:text-white">
            Discover recommended car repair shops in top cities in Nigeria and
            embark on a seamless automotive experience with <BrandName />!
          </p>
        </article>
        <article id="startYourJourney" className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl lg:leading-tight dark:text-white">
            Start Your Journey
          </h3>
          <p className="text-lg text-gray-800 dark:text-white">
            Experience the convenience and reliability of <BrandName /> today.
            Simply enter your location, and let us guide you to the nearest car
            repair shop. Your vehicle deserves the best care, and we{"'"}re here
            to ensure you receive it.{" "}
          </p>
          <div className="mt-1 grid gap-3 w-full sm:inline-flex">
            <Link
              to={"/?search=true"}
              className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
            >
              <span>Search for shops near you</span>
            </Link>
          </div>
          <p className="text-lg text-gray-800 dark:text-white">
            Discover the closest car repair shops near you and embark on a
            seamless automotive experience with <BrandName />!
          </p>
        </article>
      </section>
      {/* <----- About Us -----> */}
      {/* <!-- Icon Blocks --> */}
      <div className="max-w-[85rem] py-10 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 items-center gap-6 md:gap-10">
          {/* <!-- Card --> */}
          <Link to={"/repairshops"}>
            <div className="w-full h-full max-h-[350px] bg-white shadow-custom-1 rounded-lg p-5 dark:bg-slate-900 overflow-y-hidden">
              <div className="flex items-center gap-x-4 mb-3">
                <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                  <IconContext.Provider
                    value={{ className: "h-9 w-9 text-blue-500" }}
                  >
                    <MdCarRepair />
                  </IconContext.Provider>
                </div>
                <div className="flex-shrink-0">
                  <h2 className="block text-xl font-bold font-roboto text-gray-800 dark:text-white tracking-wide">
                    Repair Shops
                  </h2>
                </div>
              </div>
              <p className="text-gray-600 dark:text-white mb-4">
                See our collection of repair shops across Nigeria. They can be
                sorted based on popular cities. You can also search for the one
                closest to you just by typing in your location.
              </p>
            </div>
          </Link>
          {/* <!-- End Card --> */}

          {/* <!-- Card --> */}
          {/* <div className="w-full h-full bg-white shadow-custom-1 rounded-lg p-5 dark:bg-slate-900">
            <div className="flex items-center gap-x-4 mb-3">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <IconContext.Provider
                  value={{ className: "h-9 w-9 text-blue-500" }}
                >
                  <LiaFileInvoiceSolid />
                </IconContext.Provider>
              </div>
              <div className="flex-shrink-0">
                <h2 className="block text-xl font-bold font-roboto text-gray-800 dark:text-white">
                  Get Quote
                </h2>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              You can request for a quote for any vehicle repair of your choice.
              We will direct your requet to the most ideal repair shop, keeping
              the proximity to your location in mind.
            </p>
          </div> */}
          {/* <!-- End Card --> */}

          {/* <!-- Card --> */}
          {/* <div className="w-full h-full bg-white shadow-custom-1 rounded-lg p-5 dark:bg-slate-900">
            <div className="flex items-center gap-x-4 mb-3">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <IconContext.Provider
                  value={{ className: "h-9 w-9 text-blue-500" }}
                >
                  <MdOutlineHandshake />
                </IconContext.Provider>
              </div>
              <div className="flex-shrink-0">
                <h2 className="block text-xl font-bold font-roboto text-gray-800 dark:text-white">
                  Request Audit
                </h2>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Would you like your repair shop to appear on our page?
              <br />
              Request an audit and we will arrange for a meeting to check out
              your workshop.
            </p>
          </div> */}
          {/* <!-- End Card --> */}

          {/* <!-- Card --> */}
          <HashLink
            to={`${location.search}#subscribe`}
            scroll={(el) =>
              el.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              })
            }
            className="w-full h-full bg-white shadow-custom-1 rounded-lg p-5 dark:bg-slate-900"
          >
            <div className="flex items-center gap-x-4 mb-3">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <IconContext.Provider
                  value={{ className: "h-9 w-9 text-blue-500" }}
                >
                  <MdOutlineArticle />
                </IconContext.Provider>
              </div>
              <div className="flex-shrink-0">
                <h2 className="block text-xl font-bold font-roboto text-gray-800 dark:text-white tracking-wide">
                  Subscribe For Articles
                </h2>
              </div>
            </div>
            <p className="text-gray-60 dark:text-white">
              Our writers give the best tips and tricks for maintaining your
              vehicle. They gather information from experienced mechanics and
              vehicle owners on how best to take care of various vehicles.
            </p>
          </HashLink>
          {/* <!-- End Card --> */}
        </div>
      </div>
      {/* <!-- End Icon Blocks --> */}
      {repairShops?.length > 0 && (
        <section className="flex flex-col gap-3 items-center">
          <h3 className="font-roboto text-lg self-start">
            Top Rated Repair Shops In Nigeria
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-6">
            {repairShops.map((item, index) => (
              <article
                key={index}
                className="flex flex-col py-3 sm:py-4 px-2 sm:px-3 items-start gap-1 rounded-md overflow-hidden dark:bg-gray-700 border-[2px] border-gray-200 dark:border-gray-600 shadow-lg shadow-black/10 dark:shadow-black/10 text-sm xs:text-base"
              >
                <div className="flex gap-2 lg:gap-1 w-full border-b-2 pb-2 sm:pb-3 h-auto max-h-[130px] sm:max-h-[150px]">
                  <div className="relative min-w-[100px] max-w-[100px] sm:min-w-[220px] sm:max-w-[220px] md:min-w-[240px] md:max-w-[240px] lg:min-w-[150px] lg:max-w-[150px] sm:h-[140px] rounded-lg overflow-hidden">
                    <Link
                      to={`/repairShops/profile/${item.headers.title}?id=${item.id}`}
                    >
                      <img
                        src={
                          item.images?.length > 0 && item.images != "N/A"
                            ? item.images[0]
                            : "https://www.gstatic.com/ads-homeservices/profile_photo_placeholder.png"
                        }
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </Link>
                  </div>

                  <div className="flex flex-col justify-between h-auto overflow-hidden">
                    <Link
                      to={`/repairShops/profile/${item.headers.title}?id=${item.id}`}
                    >
                      <div className="w-full font-bold custom-ellipsis_heading font-roboto">
                        {item.headers.title}
                      </div>
                    </Link>

                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        <IconContext.Provider
                          value={{ className: "w-4 h-4 text-yellow-300" }}
                        >
                          {Math.floor(item.headers.rating) == 1 && (
                            <MdStarRate />
                          )}
                          {Math.floor(item.headers.rating) == 2 && (
                            <>
                              <MdStarRate />
                              <MdStarRate />
                            </>
                          )}{" "}
                          {Math.floor(item.headers.rating) == 3 && (
                            <>
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                            </>
                          )}{" "}
                          {Math.floor(item.headers.rating) == 4 && (
                            <>
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                            </>
                          )}{" "}
                          {Math.floor(item.headers.rating) == 5 && (
                            <>
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                            </>
                          )}{" "}
                          {hasFloat(item.headers.rating) && <MdStarHalf />}
                          {item.headers.rating == "N/A" && "Rating: "}
                        </IconContext.Provider>
                      </div>
                      <span className="text-gray-800 dark:text-gray-300">
                        ({item.headers.rating})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <IconContext.Provider value={{ className: "w-4 h-4" }}>
                        <MdLocalPhone />
                      </IconContext.Provider>
                      <span className="relative transform mr-1">:</span>
                      {item.phone != "N/A" ? (
                        <a
                          href={`tel:${item.phone}`}
                          className="underline text-blue-600 dark:text-blue-400"
                        >
                          {item.phone}
                        </a>
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {handleIsOpen(item) == "N/A" ? (
                        <span>N/A</span>
                      ) : handleIsOpen(item) ? (
                        <>
                          <IconContext.Provider
                            value={{
                              className:
                                "w-4 h-4 text-customGreen-100 dark:text-green-400",
                            }}
                          >
                            <MdCheckCircle />
                          </IconContext.Provider>
                          <span className="relative transform text-customGreen-100 dark:text-green-400">
                            Open
                          </span>
                        </>
                      ) : !handleIsOpen(item) ? (
                        <>
                          <IconContext.Provider
                            value={{ className: "w-4 h-4 text-red-600" }}
                          >
                            <MdOutlineError />
                          </IconContext.Provider>
                          <span className="relative transform text-red-600">
                            Closed
                          </span>
                        </>
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 justify-between overflow-hidden w-full relative">
                  <div className="flex items-start w-full border-b-[1px] py-1 pb-3">
                    <IconContext.Provider
                      value={{
                        className: "w-4 h-4 transform translate-y-[30%]",
                      }}
                    >
                      <MdLocationOn />
                    </IconContext.Provider>
                    <span className="relative mr-1">:</span>
                    <span className="w-full custom-ellipsis">
                      {item.location}
                    </span>
                  </div>
                  <div className="flex items-start w-full border-b-[1px] py-2 pb-3">
                    <IconContext.Provider
                      value={{
                        className: "w-4 h-4 transform translate-y-[30%]",
                      }}
                    >
                      <GiAutoRepair />
                    </IconContext.Provider>
                    <span className="relative mr-1">:</span>
                    <span className="w-full custom-ellipsis">
                      {getServices(item.services)}
                    </span>
                  </div>
                  <div className="flex items-start w-full py-1 pt-2">
                    <IconContext.Provider
                      value={{
                        className: "w-4 h-4 transform translate-y-[30%]",
                      }}
                    >
                      <MdOutlineDescription />
                    </IconContext.Provider>
                    <span className="relative mr-1">:</span>
                    <span className="w-full custom-ellipsis">
                      {item.description}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!isLoading && (
            <div className="py-4">
              <Link
                to={"/repairShops"}
                className="text-center p-2 underline underline-offset-8"
              >
                View More Shops
              </Link>
            </div>
          )}
        </section>
      )}

      {isLoading && (
        <div className="flex justify-center py-4">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-400 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {fetchError && (
        <div className="flex justify-center">
          <i className="text-red-600 dark:text-red-500 dark:brightness-110 font-medium tracking-wide flex gap-2 items-center">
            <span>
              <IconContext.Provider value={{ className: "w-5 h-5" }}>
                <MdErrorOutline />
              </IconContext.Provider>
            </span>
            {fetchError}
          </i>
        </div>
      )}
    </main>
  );
};

export default HomePage;
