import { useEffect, useRef, useContext } from "react";
import { LuCalendarDays } from "react-icons/lu";
import {
  MdErrorOutline,
  MdLocationOn,
  MdStarRate,
  MdStarHalf,
  MdOutlineError,
  MdLocalPhone,
  MdCheckCircle,
  MdStarBorder,
} from "react-icons/md";
import { IconContext } from "react-icons/lib";
import DataContext from "../contexts/DataContext";
import { Link, useSearchParams } from "react-router-dom";

const FindRepairShopsTest = () => {
  const [searchParams] = useSearchParams();
  let searchedLocation = searchParams.get("location");
  let lat = searchParams.get("lat");
  let lng = searchParams.get("lng");
  const {
    placesError,
    isLoading,
    placesDetails,
    hasNextPage,
    nextPage,
    setService,
    service,
    networkStatus,
  } = useContext(DataContext);
  const divRef = useRef(null);
  const nextPageButtonRef = useRef(null);

  useEffect(() => {
    const initPlaces = async () => {
      const { PlacesService } = await window.google.maps.importLibrary(
        "places"
      );
      const service = new PlacesService(divRef.current);
      setService(service);
    };
    if (!service) {
      initPlaces();
    }
  }, [setService, service]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, []);

  const getNextPage = () => {
    if (!hasNextPage) {
      return;
    }
    if (hasNextPage.hasNextPage && networkStatus) {
      nextPageButtonRef.current.classList.add("hidden");
      nextPageButtonRef.current.classList.add("pointer-events-none");
      nextPage();
    }
  };

  const hasFloat = (number) => {
    return number?.toString().split(".")[1] > 0;
  };

  const handleGoogleIsOpen = (obj) => {
    const date = new Date();
    const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      date
    );
    const time = new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
    }).format(date);
    let textArr = obj.weekday_text;
    let arr = [];
    // console.log(day, time, textArr);
    textArr.forEach((i) => {
      let splitArr = i.split(": ");
      let obj = {};
      obj[splitArr[0].toLowerCase()] = splitArr[1];
      arr.push(obj);
    });
    let dayLowercase = day.toLowerCase();
    let shopDayItem = arr.find((i) => Object.keys(i)[0] == dayLowercase);
    let shopDay = shopDayItem[dayLowercase]
      .replaceAll("\u202f", "")
      .replaceAll("\u2009", "");
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
          return currentTimeInt >= morningInt && currentTimeInt < afternoonInt;
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
  };

  return (
    <main className="p-4 text-sm xs:text-base font-barlow font-semibold relative w-full pt-6 md:pt-8 px-4 sm:px-6 md:px-8 lg:pl-72 dark:bg-gray-800 dark:border-gray-700 min-h-screen">
      {placesDetails?.length > 0 && (
        <section id="Top-Rated" className="flex flex-col gap-2 xs:gap-4 mb-6">
          <h2 className="custom-ellipsis_line-1">
            Repair Shops close to{" "}
            {searchedLocation
              ? decodeURIComponent(searchedLocation)
              : "your search"}
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-6">
            {placesDetails.map((item, index) => (
              <article
                key={index}
                className="flex flex-col py-3 sm:py-4 px-2 sm:px-3 items-start gap-1 rounded-md overflow-hidden dark:bg-gray-700 border-[2px] border-gray-200 dark:border-gray-600 shadow-lg shadow-black/10 dark:shadow-black/10 text-sm xs:text-base"
              >
                <div className="flex gap-2 lg:gap-1 w-full border-b-2 pb-2 sm:pb-3 h-auto min-h-[120px] max-h-[130px] sm:max-h-[150px]">
                  <div className="relative min-w-[100px] max-w-[100px] sm:min-w-[220px] sm:max-w-[220px] md:min-w-[240px] md:max-w-[240px] lg:min-w-[150px] lg:max-w-[150px] sm:h-[140px] rounded-lg overflow-hidden">
                    <Link
                      aria-label={`View More About ${item.name}`}
                      to={`/search/profile/${encodeURIComponent(
                        item.name.slice(
                          0,
                          item.name.indexOf(".") != -1
                            ? item.name.indexOf(".")
                            : item.name.length
                        )
                      )}?lat=${encodeURIComponent(
                        lat
                      )}&lng=${encodeURIComponent(lng)}&id=${
                        item.place_id
                      }&location=${encodeURIComponent(searchedLocation)}`}
                    >
                      <img
                        src={
                          item.photos?.length
                            ? item.photos[0].getUrl()
                            : "https://www.gstatic.com/ads-homeservices/profile_photo_placeholder.png"
                        }
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col w-full justify-between h-auto overflow-hidden">
                    <div className="w-auto font-bold custom-ellipsis_heading font-roboto">
                      <Link
                        aria-label={`View More About ${item.name}`}
                        to={`/search/profile/${encodeURIComponent(
                          item.name.slice(
                            0,
                            item.name.indexOf(".") != -1
                              ? item.name.indexOf(".")
                              : item.name.length
                          )
                        )}?lat=${encodeURIComponent(
                          lat
                        )}&lng=${encodeURIComponent(lng)}&id=${
                          item.place_id
                        }&location=${encodeURIComponent(searchedLocation)}`}
                      >
                        {item.name ? item.name : "N/A"}
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        <IconContext.Provider
                          value={{ className: "w-4 h-4 text-yellow-300" }}
                        >
                          {Math.floor(item.rating) == 1 && (
                            <>
                              <MdStarRate />
                              {hasFloat(item.rating) ? (
                                <MdStarHalf />
                              ) : (
                                <MdStarBorder />
                              )}
                              <MdStarBorder />
                              <MdStarBorder />
                              <MdStarBorder />
                            </>
                          )}
                          {Math.floor(item.rating) == 2 && (
                            <>
                              <MdStarRate />
                              <MdStarRate />
                              {hasFloat(item.rating) ? (
                                <MdStarHalf />
                              ) : (
                                <MdStarBorder />
                              )}
                              <MdStarBorder />
                              <MdStarBorder />
                            </>
                          )}{" "}
                          {Math.floor(item.rating) == 3 && (
                            <>
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                              {hasFloat(item.rating) ? (
                                <MdStarHalf />
                              ) : (
                                <MdStarBorder />
                              )}
                              <MdStarBorder />
                            </>
                          )}{" "}
                          {Math.floor(item.rating) == 4 && (
                            <>
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                              {hasFloat(item.rating) ? (
                                <MdStarHalf />
                              ) : (
                                <MdStarBorder />
                              )}
                            </>
                          )}{" "}
                          {Math.floor(item.rating) == 5 && (
                            <>
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                              <MdStarRate />
                            </>
                          )}{" "}
                        </IconContext.Provider>
                        {!item.rating && <span>Rating: </span>}
                      </div>
                      <span className="text-gray-800 dark:text-gray-300">
                        ({item.rating ? item.rating : "N/A"})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <IconContext.Provider value={{ className: "w-4 h-4" }}>
                        <MdLocalPhone />
                      </IconContext.Provider>
                      <span className="relative transform mr-1">:</span>

                      {item.international_phone_number ? (
                        <a
                          href={`tel:${item.international_phone_number}`}
                          className="underline text-blue-600 dark:text-blue-400"
                        >
                          {item.formatted_phone_number}
                        </a>
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {item.opening_hours ? (
                        handleGoogleIsOpen(item.opening_hours) ? (
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
                        ) : (
                          <>
                            <IconContext.Provider
                              value={{ className: "w-4 h-4 text-red-600" }}
                            >
                              <MdOutlineError />
                            </IconContext.Provider>
                            <span className="relative transform text-red-600">
                              Closed for today
                            </span>
                          </>
                        )
                      ) : (
                        <>
                          <IconContext.Provider
                            value={{ className: "w-4 h-4 text-red-600" }}
                          >
                            <MdOutlineError />
                          </IconContext.Provider>
                          <span className="relative transform text-red-600">
                            Closed for today
                          </span>
                        </>
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
                      {item.formatted_address ? item.formatted_address : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-start w-full py-2 pb-3">
                    <IconContext.Provider
                      value={{
                        className: "w-4 h-4 transform translate-y-[30%]",
                      }}
                    >
                      <LuCalendarDays />
                    </IconContext.Provider>
                    <span className="relative mr-1">:</span>
                    <span className="w-full custom-ellipsis">
                      {item.opening_hours?.weekday_text.length > 0
                        ? item.opening_hours?.weekday_text.join(", ")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!isLoading &&
            (hasNextPage.hasNextPage ? (
              <div className="flex justify-center pt-4">
                <button
                  aria-label="View More Shops"
                  ref={nextPageButtonRef}
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
        </section>
      )}

      {isLoading && !placesError && networkStatus && (
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

      {placesError && (
        <section id="Top-Rated" className="flex flex-col gap-2 sm:gap-4 mb-6">
          <div className="flex justify-center">
            <p className="text-red-600 dark:text-red-500 dark:brightness-110 font-medium tracking-wide flex gap-2 items-center">
              <span>
                <IconContext.Provider value={{ className: "w-5 h-5" }}>
                  <MdErrorOutline />
                </IconContext.Provider>
              </span>
              <span className="whitespace-normal">{placesError}</span>
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
      <div ref={divRef}></div>
    </main>
  );
};

export default FindRepairShopsTest;
