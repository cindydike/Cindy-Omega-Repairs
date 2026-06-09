import { createContext, useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [geometry, setGeometry] = useState(null);
  const [placesError, setPlacesError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [singlePlaceId, setSinglePlaceId] = useState(null);
  const [placesDetails, setPlacesDetails] = useState([]);
  const [singlePlaceDetail, setSinglePlaceDetail] = useState(null);
  const [isSinglePlaceLoading, setIsSinglePlaceLoading] = useState(false);
  const [singlePlaceError, setSinglePlaceError] = useState(null);
  const [service, setService] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(null);
  const [networkStatus, setNetwrokStatus] = useState(true);
  const placesCount = useRef(0);
  const placesSlice = useRef(0);

  useEffect(() => {
    const initDetailsSearch = async () => {
      const requiredDetails = [
        "formatted_address",
        "formatted_phone_number",
        "place_id",
        "geometry",
        "rating",
        "photos",
        "name",
        "international_phone_number",
        "website",
        "opening_hours",
        "business_status",
      ];

      let slicedPlaces = places.slice(placesSlice.current);
      for (const place of slicedPlaces) {
        if (place.place_id) {
          const detailsRequest = {
            placeId: place.place_id,
            fields: requiredDetails,
          };
          const detailsCallback = (place, status) => {
            if (status == window.google.maps.places.PlacesServiceStatus.OK) {
              if (!placesCount.current) {
                setPlacesDetails([place]);
                placesCount.current += 1;
              } else {
                setPlacesDetails((prev) => [...prev, place]);
              }
            }
            setIsLoading(false);
          };
          await service.getDetails(detailsRequest, detailsCallback);
          // console.log("AFTER AWAIT");/\
        } else {
          continue;
        }
      }
    };
    if (places.length > 0 && service) {
      setPlacesError(null);
      setIsLoading(true);
      initDetailsSearch();
    } else {
      setIsLoading(false);
    }
  }, [places, service]);

  useEffect(() => {
    const initNearBySearch = async () => {
      if (!geometry) {
        setPlacesError("No parameters for request");
        return;
      }
      const request = {
        location: {
          lat: parseFloat(geometry.lat),
          lng: parseFloat(geometry.lng),
        },
        rankBy: window.google.maps.places.RankBy.PROMINENCE,
        type: ["car_repair"],
        radius: 50000,
      };
      const callback = (results, status, pagination) => {
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
          if (!placesCount.current) {
            placesSlice.current = 0;
            setPlaces([...results]);
          } else {
            placesSlice.current = results.length;
            setPlaces((prev) => [...prev, ...results]);
          }
          // setIsLoading(false);
          setHasNextPage(pagination);
          return;
        }
        switch (status) {
          case "ZERO_RESULTS":
            setPlacesError("No Results For Location");
            break;

          default:
            setPlacesError("An Error Occurred");
            break;
        }
      };
      setIsLoading(true);
      setPlacesError(null);
      await service.nearbySearch(request, callback);
    };
    if (service) {
      placesCount.current = 0;
      setPlacesDetails(null);
      initNearBySearch();
    }
    // console.log("After entire funciton:", placesCount.current);
  }, [geometry, service]);

  useEffect(() => {
    if (lat && lng && lat != geometry?.lat && lng != geometry?.lng) {
      setGeometry({ lat, lng });
    }
  }, [lat, lng, geometry]);

  useEffect(() => {
    const getSinglePlace = async () => {
      const detailsRequest = {
        placeId: singlePlaceId,
      };
      const detailsCallback = (place, status) => {
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
          setSinglePlaceDetail(place);
        }
        setIsSinglePlaceLoading(false);
      };

      try {
        setIsSinglePlaceLoading(true);
        await service.getDetails(detailsRequest, detailsCallback);
      } catch (err) {
        setSinglePlaceError(err);
      }
    };
    if (singlePlaceId && service) {
      getSinglePlace();
    }
  }, [singlePlaceId, service]);

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

  const nextPage = () => {
    if (!hasNextPage) {
      return;
    }
    if (hasNextPage.hasNextPage) {
      setIsLoading(true);
      hasNextPage.nextPage();
      placesCount.current += 1;
    }
  };

  return (
    <DataContext.Provider
      value={{
        placesError,
        isLoading,
        placesDetails,
        singlePlaceDetail,
        setSinglePlaceDetail,
        hasNextPage,
        nextPage,
        setService,
        service,
        setSinglePlaceId,
        networkStatus,
        isSinglePlaceLoading,
        singlePlaceError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
