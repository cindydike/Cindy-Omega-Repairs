import { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useParams,
  useNavigate,
} from "react-router-dom";
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
import { GiAutoRepair } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
// import useFirebase from "../hooks/useFirebase";
import { locations } from "../utils/utils";
import { useContext } from "react";
import FirebaseContext from "../contexts/FirebaseContext";

const SingleShop = () => {
  const { location: locationParams } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const services = searchParams.get("services");
  const navigate = useNavigate();
  const [repairShops, setRepairShops] = useState([]);
  const [doc, setDoc] = useState(null);

  const [searchServices, setSearchServices] = useState(
    services?.split(",") || null
  );
  const [networkStatus, setNetwrokStatus] = useState(true);

  const {
    data,
    startDoc,
    isLoading,
    docIsLoading,
    fetchError,
    docFetchError,
    hasNextPage,
    singleDoc,
    setCollectionName,
    setStart,
    setCount,
    setDocId,
    setServicesArr,
  } = useContext(FirebaseContext);

  // This prevents unnecessary database calls when route changes
  const [lastDoc, setLastDoc] = useState(
    data?.length <= 0 ? null : "Not Allowed"
  );

  useEffect(() => {
    setCollectionName(() => {
      if (locationParams) {
        if (
          locations.find(
            (i) =>
              i.collectionName.toLowerCase() ==
              locationParams.toLocaleLowerCase()
          )
        ) {
          return locationParams;
        } else {
          return "";
        }
      } else {
        return "repairShops";
      }
    });
    setStart(lastDoc);
    setDocId(id);
    setCount(10);
    setServicesArr(searchServices);
  }, [
    id,
    lastDoc,
    searchServices,
    setCollectionName,
    setCount,
    setStart,
    setDocId,
    setServicesArr,
    locationParams,
  ]);

  useEffect(() => {
    setRepairShops(data);
  }, [data]);

  useEffect(() => {
    setDoc(singleDoc);
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, [singleDoc]);

  useEffect(() => {
    locationParams &&
      !locations.find(
        (i) =>
          i.collectionName.toLowerCase() == locationParams.toLocaleLowerCase()
      ) &&
      navigate("/missing");

    if (services == searchServices?.join(",")) {
      return;
    } else {
      setSearchServices(services?.split(","));
    }
  }, [locationParams, navigate, services, searchServices]);

  // Set LastDoc to allow for Loading More Shops
  useEffect(() => {
    services && data.length < 1 && setLastDoc(null);
    !services && data.length < 1 && setLastDoc(null);
  }, [services, data]);

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

  useEffect(() => {
    if (!id) {
      if (locationParams) {
        navigate(`/repairShops/${locationParams}`);
      } else {
        navigate(`/repairShops`);
      }
    }
  }, [id, navigate, locationParams]);

  useEffect(() => {
    fetchError && setLastDoc("Not Allowed");
  }, [fetchError]);

  useEffect(() => {
    fetchError && navigate("/missing");
  }, [fetchError, navigate]);

  const getNextPage = () => {
    if (hasNextPage.current && networkStatus) {
      setLastDoc(startDoc);
    }
  };

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
    if (services && locationParams)
      return `/repairShops/${locationParams}/profile/${encodeURIComponent(
        item.headers.title
      )}?id=${item.id}&services=${services}`;
    if (services)
      return `/repairShops/profile/${encodeURIComponent(
        item.headers.title
      )}?id=${item.id}&services=${services}`;
    if (locationParams)
      return `/repairShops/${locationParams}/profile/${encodeURIComponent(
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
    <main className="p-4 min-h-screen text-sm xs:text-base font-barlow font-semibold relative w-full pt-6 md:pt-8 overflow-x-hidden px-4 sm:px-6 md:px-8 lg:pl-72 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-8">
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
      {docIsLoading && !docFetchError && (
        <div className="flex justify-center mb-10">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-400 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {docFetchError && !docIsLoading && (
        <section id="Top-Rated" className="flex flex-col gap-2 sm:gap-4 mb-10">
          <div className="flex justify-center">
            <p className="text-red-600 dark:text-red-500 dark:brightness-110 font-medium tracking-wide flex gap-2 items-center">
              <span>
                <IconContext.Provider value={{ className: "w-5 h-5" }}>
                  <MdErrorOutline />
                </IconContext.Provider>
              </span>
              <span className="whitespace-normal">{docFetchError}</span>
            </p>
          </div>
        </section>
      )}

      {doc && !docIsLoading && (
        <section className="flex flex-col gap-4">
          <div className="w-full flex h-[300px] md:h-[350px] overflow-x-auto noScrollBar">
            {doc.images != "N/A" ? (
              doc.images.length > 1 ? (
                doc.images.map((item, index) => (
                  <img
                    alt={`${doc.headers.title} Workshop Image`}
                    src={item}
                    key={index}
                    className="w-5/6 sm:w-2/3 h-full object-cover p-1 rounded-xl"
                  />
                ))
              ) : (
                <img
                  src={doc.images[0]}
                  alt={`${doc.headers.title} Workshop Image`}
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <img
                src="https://www.gstatic.com/ads-homeservices/profile_photo_placeholder.png"
                alt={`${doc.headers.title} Workshop Image`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <article className="flex flex-col py-3 sm:py-4 px-2 sm:px-3 items-start gap-1 rounded-md overflow-hidden dark:bg-slate-900 border-[2px] border-gray-200 dark:border-gray-600 shadow-lg shadow-black/10 dark:shadow-black/10 text-sm xs:text-base w-full">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex border-b-2 pb-2 w-full">
                <h2 className="font-extrabold">
                  Name:
                  <span className="font-semibold"> {doc.headers.title}</span>
                </h2>
              </div>
              <div className="flex border-b-2 pb-2 w-full">
                <b className="font-bold">Rating:</b>
                <span className="whitespace-pre-wrap"> </span>

                {doc.headers.rating != "N/A" ? (
                  <div className="flex items-center">
                    <IconContext.Provider
                      value={{ className: "w-4 h-4 text-yellow-300" }}
                    >
                      {Math.floor(doc.headers.rating) == 1 && (
                        <>
                          <MdStarRate />
                          <MdStarBorder />
                          <MdStarBorder />
                          <MdStarBorder />
                        </>
                      )}
                      {Math.floor(doc.headers.rating) == 2 && (
                        <>
                          <MdStarRate />
                          <MdStarRate />
                          <MdStarBorder />
                          <MdStarBorder />
                        </>
                      )}{" "}
                      {Math.floor(doc.headers.rating) == 3 && (
                        <>
                          <MdStarRate />
                          <MdStarRate />
                          <MdStarRate />
                          <MdStarBorder />
                        </>
                      )}{" "}
                      {Math.floor(doc.headers.rating) == 4 && (
                        <>
                          <MdStarRate />
                          <MdStarRate />
                          <MdStarRate />
                          <MdStarRate />
                          <MdStarBorder />
                        </>
                      )}{" "}
                      {Math.floor(doc.headers.rating) == 5 && (
                        <>
                          <MdStarRate />
                          <MdStarRate />
                          <MdStarRate />
                          <MdStarRate />
                        </>
                      )}{" "}
                      {hasFloat(doc.headers.rating) ? (
                        <MdStarHalf />
                      ) : Math.floor(doc.headers.rating) != 5 ? (
                        <MdStarBorder />
                      ) : (
                        <MdStarRate />
                      )}
                    </IconContext.Provider>{" "}
                    <span>({doc.headers.rating})</span>
                  </div>
                ) : (
                  <span>{doc.headers.rating}</span>
                )}
              </div>
              <div className="flex border-b-2 pb-2 w-full">
                <b className="font-bold">Phone Number:</b>
                <span className="whitespace-pre-wrap"> </span>
                {doc.phone != "N/A" ? (
                  <a
                    href={`tel:${doc.phone}`}
                    className="underline text-blue-600 dark:text-blue-400"
                  >
                    {doc.phone}
                  </a>
                ) : (
                  <span>{doc.phone}</span>
                )}
              </div>
              <div className="flex border-b-2 pb-2 w-full">
                <b className="font-extrabold">Current Status:</b>
                <span className="whitespace-pre-wrap"> </span>
                <div className="flex items-center gap-1">
                  {handleIsOpen(doc) == "N/A" ? (
                    <span>N/A</span>
                  ) : handleIsOpen(doc) ? (
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
                  ) : !handleIsOpen(doc) ? (
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
              <div className="flex border-b-2 pb-2 w-full">
                <b className="font-bold">Work Experience:</b>
                <span className="whitespace-pre-wrap"> </span>
                <span>{doc.headers.experience}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="border-b-2 pb-2 w-full">
                <b className="font-bold inline">Location:</b>
                <span className="whitespace-pre-wrap"> </span>
                <address className="inline">{doc.location}</address>
              </div>
              <div className="border-b-2 pb-2 w-full">
                <b className="font-bold inline">Services:</b>
                <span className="whitespace-pre-wrap"> </span>

                <span>{getServices(doc.services)}</span>
              </div>
              <div className="border-b-2 pb-2 w-full">
                <b className="font-bold">Description:</b>
                <span className="whitespace-pre-wrap"> </span>

                <span>{doc.description}</span>
              </div>
              <div className="border-b-2 pb-2 w-full">
                <b className="font-bold">Website:</b>
                <span className="whitespace-pre-wrap"> </span>
                {doc.website != "N/A" ? (
                  <a
                    href={`https://${doc.website}`}
                    className="underline underline-offset-2 text-blue-600 dark:text-blue-400 active:text-primary-800"
                  >
                    {doc.website}
                  </a>
                ) : (
                  <span>{doc.website}</span>
                )}
              </div>
              <div className="flex gap-1 w-full md:justify-start">
                <b className="font-bold md:w-auto">Opening Times:</b>
                {doc.times != "N/A" ? (
                  <ul className="w-full md:w-auto">
                    <li>
                      <b>Monday</b>: <span>{doc.times.monday}</span>
                    </li>
                    <li>
                      <b>Tuesday</b>: <span>{doc.times.tuesday}</span>
                    </li>
                    <li>
                      <b>Wednesday</b>: <span>{doc.times.wednesday}</span>
                    </li>
                    <li>
                      <b>Thursday</b>: <span>{doc.times.thursday}</span>
                    </li>
                    <li>
                      <b>Friday</b>: <span>{doc.times.friday}</span>
                    </li>
                    <li>
                      <b>Saturday</b>: <span>{doc.times.saturday}</span>
                    </li>
                    <li>
                      <b>Sunday</b>: <span>{doc.times.sunday}</span>
                    </li>
                  </ul>
                ) : (
                  <span>{doc.times}</span>
                )}
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="flex flex-col gap-4 items-center overflow-x-hidden">
        {(!docIsLoading && !isLoading) ||
        (!docIsLoading && isLoading) ||
        (docIsLoading && !isLoading) ? (
          <>
            <div className="flex w-full gap-4 items-center py-1">
              {!services && (
                <h3 className="font-bold">
                  {locationParams &&
                  locations.find(
                    (i) =>
                      i.collectionName.toLowerCase() ==
                      locationParams.toLowerCase()
                  )
                    ? `Recommended Repair Shops In ${
                        locations.find(
                          (i) =>
                            i.collectionName.toLowerCase() ==
                            locationParams.toLowerCase()
                        ).name
                      }`
                    : "Recommended Repair Shops"}
                </h3>
              )}
              {services && (
                <div className="flex sm:flex-row flex-col gap-2">
                  {/* <h3 className="font-bold">Sorted By Services</h3> */}
                  <h3 className="font-bold inline whitespace-nowrap">
                    Shops{" "}
                    {locationParams &&
                      locations.find(
                        (i) => i.collectionName == locationParams
                      ) &&
                      `In ${
                        locations.find(
                          (i) => i.collectionName == locationParams
                        ).name
                      } `}
                    Sorted By Services
                  </h3>
                  <button
                    aria-label="Reset Sorting"
                    onClick={handleReset}
                    className="p-1 px-2 bg-yellow-600 tracking-wider text-white rounded-lg ring-2 ring-yellow-500/50 text-xs shadow-custom-1 transition-all sm:w-auto w-max"
                  >
                    Reset Sorting
                  </button>
                </div>
              )}
            </div>
            {services && (
              <ul className="flex gap-1 sm:gap-2 overflow-x-auto noScrollBar self-start w-full">
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
          </>
        ) : null}
        {repairShops.length > 0 && (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-6 self-start">
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
            {!isLoading &&
              (hasNextPage.current ? (
                <div className="flex justify-center">
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
      {fetchError && !isLoading && (
        <section id="Top-Rated" className="flex flex-col gap-2 sm:gap-4 mb-6">
          {console.log(fetchError)}
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
    </main>
  );
};

export default SingleShop;
