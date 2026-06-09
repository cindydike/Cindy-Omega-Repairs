import { useEffect, useRef, useState } from "react";
import { MdErrorOutline, MdGpsFixed } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { Loader } from "@googlemaps/js-api-loader";
import { createSearchParams, useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

const loader = new Loader({
  apiKey: apiKey,
  version: "weekly",
});

function Search({ toggleSearchOverlay }) {
  const [getPositionError, setGetPositionError] = useState(null);
  const [networkStatus, setNetwrokStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tooltip, setTooltip] = useState(true);
  const searchInput = useRef(null);
  const navigate = useNavigate();

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}&result_type=street_address|&result_type=route`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        if (location.status == "OK") {
          const place = location.results[0];
          console.log(location);
          setSearch(place.formatted_address);
          const onGottenLocation = (place) => {
            const { geometry } = place;
            // console.log(geometry);
            if (!geometry || !geometry.location) {
              setGetPositionError("Location Not Found");
              return;
            }
            toggleSearchOverlay();
            navigate({
              pathname: "/search",
              search: createSearchParams({
                lat: geometry.location.lat,
                lng: geometry.location.lng,
                location: place.formatted_address,
              }).toString(),
            });
          };
          setIsLoading(false);
          onGottenLocation(place);
          searchInput.current.classList.remove(
            "pointer-events-none",
            "user-select-none"
          );
        } else {
          setGetPositionError("Location Not Found");
          setIsLoading(false);
          setSearch("");
        }
      })
      .catch((err) => {
        setGetPositionError(err.message);
      });
  };

  const findMyLocation = () => {
    setTooltip(false);
    setGetPositionError(null);
    if (navigator.geolocation) {
      setIsLoading(true);
      setSearch("Getting your location...");
      searchInput.current.classList.add(
        "pointer-events-none",
        "user-select-none"
      );
      navigator.geolocation.getCurrentPosition(
        (position) => {
          reverseGeocode(position.coords);
          searchInput.current.classList.remove(
            "pointer-events-none",
            "user-select-none"
          );
        },
        (err) => {
          setIsLoading(false);
          setSearch("");
          searchInput.current.classList.remove(
            "pointer-events-none",
            "user-select-none"
          );
          console.log(err);
          if (err.code == 1) {
            setGetPositionError(
              "Please enable your location and reload or type any location in the search box"
            );
          } else if (err.code == 2) {
            setGetPositionError("Network error");
          } else if (err.code == 3) {
            setGetPositionError("Request timeout, please try again");
          } else {
            setGetPositionError(err.message);
          }
        }
      );
    }
  };

  useEffect(() => {
    const onChangeAddress = (autocomplete) => {
      const place = autocomplete.getPlace();
      if (place) {
        // console.log(place.formatted_address);

        if (!place.geometry || !place.geometry.location) {
          setGetPositionError("Location Not Found.");
          return;
        }
        const getAddress = (place) => {
          if (place.formatted_address) return place.formatted_address;
          else {
            let address = place.address_components.find(
              (item) =>
                item.types.includes("route") ||
                item.types.includes("neighborhood") ||
                item.types.includes("locality") ||
                item.types.includes("political")
            );
            if (address) {
              return address.long_name;
            } else {
              return null;
            }
          }
        };
        toggleSearchOverlay();
        navigate({
          pathname: "/search",
          search: createSearchParams({
            lat: place.geometry.location.lat().toString(),
            lng: place.geometry.location.lng().toString(),
            location: getAddress(place),
          }).toString(),
        });
      } else {
        setGetPositionError("Could Not Get Position");
      }
    };
    const initAutocomplete = () => {
      if (!searchInput.current) return;
      const options = {
        componentRestrictions: { country: "ng" },
        // fields: ["address_components", "geometry", "place_id"],
      };
      const autocomplete = new window.google.maps.places.Autocomplete(
        searchInput.current,
        options
      );
      autocomplete.addListener("place_changed", () => {
        onChangeAddress(autocomplete);
      });
    };

    loader.importLibrary("places").then(
      () => initAutocomplete(),
      (err) => {
        console.log(err);
        // setGetPositionError("Could Not Get Position");
        setIsLoading(false);
      }
    );
  }, [navigate, toggleSearchOverlay]);

  useEffect(() => {
    searchInput.current.addEventListener("focus", () =>
      setGetPositionError(null)
    );
    return searchInput.current.removeEventListener("focus", () =>
      setGetPositionError(null)
    );
  }, []);

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

  return (
    <div className="absolute top-20 sm:top-32 w-[95%] sm:w-auto rounded-lg shadow-sm shadow-gray-200 dark:shadow-gray-700 flex flex-col bg-white dark:bg-gray-800 dark:border-gray-700 z-20 overflow-y-visible overscroll-none text-gray-900 dark:text-gray-300">
      <div className="flex sticky flex-col items-center justify-center top-0 bg-white dark:bg-gray-800 dark:border-gray-700 p-3 pt-5 md:p-5 border-b-2 shadow-md gap-4">
        <div className="relative w-full sm:w-[34rem] lg:w-[36rem] rounded-md">
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-2 sm:pl-4">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
          <input
            onChange={(e) => {
              setSearch(e.target.value);
              setGetPositionError(null);
            }}
            value={search}
            ref={searchInput}
            autoFocus
            type="text"
            id="icon"
            name="icon"
            className="py-2 px-8 sm:py-4 sm:px-11 block w-full border-gray-400 rounded-md text-sm xs:text-base focus:z-10 outline-none border-[2px] focus:border-gray-500 focus:ring-gray-500
                dark:focus:border-gray-300 dark:focus:ring-gray-300 dark:bg-gray-800 dark:border-gray-400"
            placeholder="Search for a location..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center z-20 pr-2 sm:pr-4">
            <button onClick={findMyLocation}>
              <IconContext.Provider value={{ className: "w-5 h-5" }}>
                <MdGpsFixed />
              </IconContext.Provider>
            </button>
            {tooltip && (
              <div className="absolute w-max p-1 px-4 bg-gray-300 dark:bg-gray-900 -top-3 md:-top-2 -right-2 sm:right-0 -translate-y-1/2 rounded-xl font-semibold">
                <span>Use My Location</span>
                <div className="absolute border-8 border-y-transparent dark:border-y-transparent border-r-transparent dark:border-r-transparent border-gray-300 dark:border-gray-900 rotate-90 translate-y-1 right-[18px]" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 pt-5 flex flex-col gap-4 overflow-auto overscroll-none h-auto">
        {getPositionError && (
          <div className="flex justify-center">
            <i className="text-red-600 dark:text-red-500 dark:brightness-110 font-medium tracking-wide flex gap-2 items-center">
              <span>
                <IconContext.Provider value={{ className: "w-5 h-5" }}>
                  <MdErrorOutline />
                </IconContext.Provider>
              </span>
              {getPositionError}
            </i>
          </div>
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
        {isLoading && !getPositionError && (
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
        {/* <div className="flex justify-center">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-400 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div> */}
      </div>
      {search && (
        <div className="p-4 overflow-auto overscroll-none min-h-[3rem] h-auto">
          <div className="flex justify-center">
            <button
              className=" mx-auto p-1 px-4  bg-red-700 text-white rounded-lg ring-2 ring-red-500/50 shadow-lg transition-all"
              onClick={() => setSearch("")}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
