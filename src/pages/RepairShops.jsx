import { GiAutoRepair } from "react-icons/gi";
import {
  MdOutlineDescription,
  MdLocationOn,
  MdStarRate,
  MdStarHalf,
  MdOutlineError,
  MdLocalPhone,
  MdCheckCircle,
  MdErrorOutline,
  MdStarBorder,
} from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { useEffect, useState, useRef } from "react";
import {
  useParams,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
// import useFirebase from "../hooks/useFirebase";
import { locations } from "../utils/utils";
import { useContext } from "react";
import FirebaseContext from "../contexts/FirebaseContext";

const HomePage = () => {
  const { location } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const services = searchParams.get("services");
  const navigate = useNavigate();
  const [repairShops, setRepairShops] = useState([]);
  const [networkStatus, setNetwrokStatus] = useState(true);
  const [searchServices, setSearchServices] = useState(
    services?.split(",") || null
  );
  const shopCount = useRef(10);

  const {
    data,
    isLoading,
    fetchError,
    startDoc,
    hasNextPage,
    setCollectionName: setCollection,
    setStart,
    setCount,
    setServicesArr,
    setDocId,
  } = useContext(FirebaseContext);

  // This prevents unnecessary database calls when route changes
  const [lastDoc, setLastDoc] = useState(
    data?.length <= 0 ? null : "Not Allowed"
  );

  useEffect(() => {
    setCollection(() => {
      if (location) {
        if (
          locations.find(
            (i) => i.collectionName.toLowerCase() == location.toLowerCase()
          )
        ) {
          return location;
        } else {
          return "";
        }
      } else {
        return "repairShops";
      }
    });
    setStart(lastDoc);
    setCount(shopCount.current);
    setDocId(null);
    setServicesArr(searchServices);
  }, [
    lastDoc,
    searchServices,
    setCollection,
    setCount,
    setServicesArr,
    setStart,
    setDocId,
    location,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [services, location]);

  // Set LastDoc to allow for Loading More Shops
  useEffect(() => {
    services && data.length < 1 && setLastDoc(null);
    !services && data.length < 1 && setLastDoc(null);
  }, [services, data]);

  useEffect(() => {
    location &&
      !locations.find(
        (i) => i.collectionName.toLowerCase() == location.toLowerCase()
      ) &&
      navigate("/missing");
    if (services == searchServices?.join(",")) {
      return;
    } else {
      setSearchServices(services?.split(","));
    }
  }, [location, navigate, services, searchServices]);

  useEffect(() => {
    setRepairShops(data);
    // console.log(data.map((item) => item.headers.title));
    // console.log(data);
  }, [data]);

  useEffect(() => {
    fetchError && setLastDoc("Not Allowed");
  }, [fetchError]);

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

  const getNextPage = () => {
    if (hasNextPage.current && networkStatus) {
      setLastDoc(startDoc);
    }
  };

  useEffect(() => {
    const handleNetworkChange = () => {
      if (window.navigator.onLine) {
        setNetwrokStatus(true);
      } else {
        setNetwrokStatus(false);
      }
    };
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  const handleIsOpen = (obj) => {
    //check if times is available else return "N/A"
    if (obj.times != "N/A") {
      //Get User Current Date
      const date = new Date();
      const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
        date
      );
      const time = new Intl.DateTimeFormat("en-US", {
        timeStyle: "short",
      }).format(date);
      const shopDay = obj.times[day.toLocaleLowerCase()];
      //Check IsOpen with current User Date
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
        let morningInt;
        let morningDecimal;
        let afternoonIndex = afternoon.indexOf("P");
        let afternoonValue;
        let afternoonDecimal;
        let afternoonInt;
        const isMorning = (timeStr) => {
          return "AM" == timeStr.split(" ")[1];
        };
        const currentTimeInt = isMorning(time)
          ? Number(time.split(" ")[0].split(":")[0])
          : Number(time.split(" ")[0].split(":")[0]) == 12
          ? Number(time.split(" ")[0].split(":")[0])
          : Number(time.split(" ")[0].split(":")[0]) + 12;
        const currentTimeDecimal = Number(time.split(" ")[0].split(":")[1]);

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
          afternoonDecimal = Number(afternoonValue.split(":")[1]);
          afternoonInt =
            Number(afternoonValue.split(":")[0]) == 12
              ? Number(afternoonValue.split(":")[0])
              : Number(afternoonValue.split(":")[0]) + 12;
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

  const handleReset = () => {
    setSearchParams((prev) => {
      let obj = {};
      prev.forEach((val, key) => (obj[key] = val));
      services && delete obj["services"];
      obj["sorting"] = "false";
      return obj;
    });
  };

  const handleShopNav = (item) => {
    if (services && location)
      return `/repairShops/${location}/profile/${encodeURIComponent(
        item.headers.title
      )}?id=${item.id}&services=${services}`;
    if (services)
      return `/repairShops/profile/${encodeURIComponent(
        item.headers.title
      )}?id=${item.id}&services=${services}`;
    if (location)
      return `/repairShops/${location}/profile/${encodeURIComponent(
        item.headers.title
      )}?id=${item.id}`;
    else
      return `/repairShops/profile/${encodeURIComponent(
        item.headers.title
      )}?id=${item.id}`;
  };

  const handleRemove = (item) => {
    setSearchParams((prev) => {
      let obj = {};
      prev.forEach((val, key) => (obj[key] = val));
      let newServices = services
        .split(",")
        .filter((i) => i != item)
        .join(",");
      if (newServices) obj["services"] = newServices;
      else {
        services && delete obj["services"];
        obj["sorting"] = false;
      }
      return obj;
    });
  };

  return (
    <>
      {/* <!-- Content --> */}

      {/* <!-- End Content --> */}
      <main className="p-4 min-h-screen text-base font-barlow font-semibold relative overflow-x-hidden w-full pt-6 md:pt-8 px-4 sm:px-6 md:px-8 lg:pl-72 dark:bg-gray-800 dark:border-gray-700">
        <>
          <section
            id="Top-Rated"
            className="flex flex-col gap-4 mb-6 overflow-x-hidden"
          >
            <div className="flex w-full gap-4 items-center flex-nowrap py-1">
              {!services && (
                <h3 className="font-bold">
                  Highly Recommended Repair Shops{" "}
                  {location &&
                  locations.find((i) => i.collectionName == location)
                    ? `In ${
                        locations.find((i) => i.collectionName == location).name
                      }`
                    : ``}
                </h3>
              )}
              {services && (
                <div className="flex sm:flex-row flex-col gap-2">
                  {/* <h3 className="font-bold">Sorted By Services</h3> */}
                  <h3 className="font-bold inline whitespace-nowrap">
                    Shops{" "}
                    {location &&
                      locations.find((i) => i.collectionName == location) &&
                      `In ${
                        locations.find((i) => i.collectionName == location).name
                      } `}
                    Sorted By Services
                  </h3>
                  <button
                    aria-label="Reset Sorting"
                    onClick={handleReset}
                    className="p-1 px-2 bg-yellow-600 tracking-wider text-white rounded-lg ring-2 ring-yellow-500/50 text-xs shadow-custom-1 transition-all sm:w-auto w-max whitespace-nowrap"
                  >
                    Reset Sorting
                  </button>
                </div>
              )}
            </div>
            {services && (
              <ul className="flex gap-1 sm:gap-2 overflow-x-auto noScrollBar w-full">
                {services.split(",").map((item, index) => (
                  <li
                    key={index}
                    className="inline-flex items-center gap-1.5 py-1.5 pl-3 pr-2 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 whitespace-nowrap"
                  >
                    <span>{item}</span>
                    <button
                      aria-label={`Remove ${item} from sorting`}
                      onClick={() => handleRemove(item)}
                      type="button"
                      className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-200 focus:text-blue-500"
                    >
                      <span className="sr-only">Remove badge</span>
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {repairShops.length > 0 && (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-8">
                  {repairShops.map((item, index) => (
                    <article
                      key={index}
                      className="flex flex-col py-3 sm:py-4 px-2 sm:px-3 items-start gap-1 rounded-md overflow-hidden dark:bg-gray-700 border-[2px] border-gray-200 dark:border-gray-600 shadow-lg shadow-black/10 dark:shadow-black/10 text-sm xs:text-base"
                    >
                      <div className="flex gap-2 lg:gap-1 w-full border-b-2 pb-2 sm:pb-3 h-auto max-h-[130px] sm:max-h-[150px]">
                        <div className="relative min-w-[100px] max-w-[100px] sm:min-w-[220px] sm:max-w-[220px] md:min-w-[240px] md:max-w-[240px] lg:min-w-[150px] lg:max-w-[150px] sm:h-[140px] rounded-lg overflow-hidden">
                          <Link
                            aria-label={`View More About ${item.headers.title}`}
                            to={handleShopNav(item)}
                          >
                            <img
                              src={
                                item.images.length > 0 && item.images != "N/A"
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
                            aria-label={`View More About ${item.headers.title}`}
                            to={handleShopNav(item)}
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
                                  <>
                                    <MdStarRate />
                                    {hasFloat(item.headers.rating) ? (
                                      <MdStarHalf />
                                    ) : (
                                      <MdStarBorder />
                                    )}
                                    <MdStarBorder />
                                    <MdStarBorder />
                                    <MdStarBorder />
                                  </>
                                )}
                                {Math.floor(item.headers.rating) == 2 && (
                                  <>
                                    <MdStarRate />
                                    <MdStarRate />
                                    {hasFloat(item.headers.rating) ? (
                                      <MdStarHalf />
                                    ) : (
                                      <MdStarBorder />
                                    )}
                                    <MdStarBorder />
                                    <MdStarBorder />
                                  </>
                                )}{" "}
                                {Math.floor(item.headers.rating) == 3 && (
                                  <>
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    {hasFloat(item.headers.rating) ? (
                                      <MdStarHalf />
                                    ) : (
                                      <MdStarBorder />
                                    )}
                                    <MdStarBorder />
                                  </>
                                )}{" "}
                                {Math.floor(item.headers.rating) == 4 && (
                                  <>
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    {hasFloat(item.headers.rating) ? (
                                      <MdStarHalf />
                                    ) : (
                                      <MdStarBorder />
                                    )}
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
                              </IconContext.Provider>
                              {item.headers.rating == "N/A" && "Rating: "}
                            </div>
                            <span className="text-gray-800 dark:text-gray-300">
                              ({item.headers.rating})
                            </span>
                          </div>
                          <div className="flex items-center">
                            <IconContext.Provider
                              value={{ className: "w-4 h-4" }}
                            >
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
                {!isLoading &&
                  (hasNextPage.current ? (
                    <div className="flex justify-center self-center">
                      <button
                        aria-label="View More Shops"
                        onClick={getNextPage}
                        className="text-center p-2 underline underline-offset-8 hover:opacity-40 transition-opacity"
                      >
                        View More Shops
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <i>That{"'"}s All We Have</i>
                    </div>
                  ))}
              </>
            )}
          </section>
        </>

        {fetchError && !isLoading && (
          <section id="Top-Rated" className="flex flex-col gap-2 sm:gap-4 mb-6">
            <div className="flex justify-center">
              <p className="text-red-600 dark:text-red-500 dark:brightness-110 font-medium tracking-wide flex gap-2 items-center">
                <span>
                  <IconContext.Provider value={{ className: "w-5 h-5" }}>
                    <MdErrorOutline />
                  </IconContext.Provider>
                </span>
                <span className="whitespace-normal">{fetchError}</span>
              </p>
            </div>
          </section>
        )}
        {!networkStatus && (
          <div className="flex justify-center">
            <i className="text-red-600 dark:text-red-500 dark:brightness-110 font-medium tracking-wide flex gap-2 items-center">
              <span>
                <IconContext.Provider value={{ className: "w-5 h-5" }}>
                  <MdErrorOutline />
                </IconContext.Provider>
              </span>
              You are offline
            </i>
          </div>
        )}
        {isLoading && !fetchError && (
          <div className="flex justify-center">
            <div
              className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-400 rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default HomePage;
