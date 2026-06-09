import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";
// import { LiaFileInvoiceSolid } from "react-icons/lia";
import {
  MdOutlineSort,
  MdOutlineDescription,
  MdMap,
  MdContactMail,
  MdOutlineContactMail,
} from "react-icons/md";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
  useParams,
  // createSearchParams,
} from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import { HashLink } from "react-router-hash-link";
import Search from "./Search";
import ThemeContext from "../contexts/ThemeContext";
import { locations, services } from "../utils/utils";
import FirebaseContext from "../contexts/FirebaseContext";

const Header = () => {
  const { location: locationParam, id: shopName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchServices = searchParams.get("services");
  const sorting = searchParams.get("sorting");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const shopId = searchParams.get("id");
  const searchedLocation = searchParams.get("location");
  const [geometry, setGeometry] = useState({});
  const mobileSearchRef = useRef(null);
  const sidebarButton = useRef(null);
  const checkBoxesContainer = useRef(null);
  const asideRef = useRef(null);
  const checked = useRef([]);
  const [paths, setPaths] = useState(["Home"]);
  const { theme, setTheme } = useContext(ThemeContext);
  const { auth, signOut } = useContext(FirebaseContext);

  const handleClearSelected = () => {
    let checkBoxes = Array.from(
      checkBoxesContainer.current.querySelectorAll("input")
    );
    checkBoxes.forEach((i) => (i.checked = false));
    sidebarButton.current.classList.add("disabled");
    checked.current = [];
  };

  const handleCheck = (e) => {
    if (e.target.checked && !checked.current?.includes(e.target.dataset.name)) {
      checked.current.push(e.target.dataset.name);
      if (checked.current.length) {
        sidebarButton.current.classList.remove("disabled");
      } else {
        sidebarButton.current.classList.add("disabled");
      }
    } else if (
      !e.target.checked &&
      checked.current?.includes(e.target.dataset.name)
    ) {
      let index = checked.current.findIndex((i) => i == e.target.dataset.name);
      checked.current.splice(index, 1);
      if (checked.current.length) {
        sidebarButton.current.classList.remove("disabled");
      } else {
        sidebarButton.current.classList.add("disabled");
      }
    }
  };

  const handleReset = () => {
    handleClearSelected();
    setSearchParams((prev) => {
      let obj = {};
      prev.forEach((val, key) => (obj[key] = val));
      searchServices && delete obj["services"];
      obj["sorting"] = false;
      return obj;
    });
  };

  const handleSearchSelected = () => {
    if (checked.current.length) {
      if (shopName && locationParam && shopId) {
        navigate(
          `/repairshops/${locationParam}/profile/${shopName}?id=${shopId}&services=${checked.current.join(
            ","
          )}`
        );
      } else if (shopName && shopId) {
        navigate(
          `/repairshops/profile/${shopName}?id=${shopId}&services=${checked.current.join(
            ","
          )}`
        );
      } else if (locationParam) {
        navigate(
          `/repairshops/${locationParam}?services=${checked.current.join(",")}`
        );
      } else {
        navigate(`/repairshops?services=${checked.current.join(",")}`);
      }
    } else return;
  };

  useEffect(() => {
    if (lat && lng) {
      setGeometry({ lat: lat, lng: lng, location: searchedLocation });
    }
  }, [lat, lng, searchedLocation]);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname == "/") {
      setPaths(["home"]);
    } else {
      const pathArr = location.pathname.split("/").slice(1);
      setPaths(["Home", ...pathArr]);
    }
    if (pathname == "/" && searchParams.get("search") == "true") {
      toggleSearchOverlay();
    }
    sorting == "false" && handleClearSelected();
    if (searchServices) {
      checked.current = searchServices.split(",");
      let checkBoxes = Array.from(
        checkBoxesContainer.current.querySelectorAll("input")
      );
      checkBoxes.forEach((i) => {
        if (!checked.current?.includes(i.dataset.name)) {
          i.checked = false;
        } else {
          i.checked = true;
        }
      });
      sidebarButton.current.classList.remove("disabled");
    }
  }, [location, searchParams, sorting, navigate, searchServices]);

  useEffect(() => {
    let domRef;
    if (asideRef.current) {
      domRef = asideRef.current;
      let sidebarOverlay = asideRef.current.querySelector("#sidebar-overlay");
      let sidebarMain = asideRef.current.querySelector("#sidebar-main");
      sidebarOverlay.addEventListener("animationend", (e) => {
        if (e.animationName == "fade_out_normal") {
          asideRef.current.classList.add("hidden");
          sidebarOverlay.classList.remove("fade_out_normal");
        }
      });
      sidebarMain.addEventListener("animationend", (e) => {
        if (e.animationName == "slide_out_left") {
          asideRef.current.classList.add("hidden");
          sidebarMain.classList.remove("slide_out_left");
        }
      });
    }
    return () => {
      if (domRef) {
        let sidebarOverlay = domRef.querySelector("#sidebar-overlay");
        let sidebarMain = domRef.querySelector("#sidebar-main");
        sidebarOverlay.removeEventListener("animationend", (e) => {
          if (e.animationName == "fade_out_normal") {
            domRef.classList.add("hidden");
            sidebarOverlay.classList.remove("fade_out_normal");
          }
        });
        sidebarMain.removeEventListener("animationend", (e) => {
          if (e.animationName == "slide_out_left") {
            domRef.classList.add("hidden");
            sidebarMain.classList.remove("slide_out_left");
          }
        });
      }
    };
  }, []);

  const toggleSearchOverlay = () => {
    mobileSearchRef.current.classList.toggle("hidden");
    mobileSearchRef.current.classList.toggle("flex");
  };

  const toggleAside = () => {
    asideRef.current.classList.toggle("flex");
    let sidebarOverlay = asideRef.current.querySelector("#sidebar-overlay");
    let sidebarMain = asideRef.current.querySelector("#sidebar-main");
    if (asideRef.current.classList.contains("flex")) {
      asideRef.current.classList.remove("hidden");
      sidebarOverlay.classList.add("fade_in_normal");
      sidebarMain.classList.add("slide_in_left");
      sidebarOverlay.classList.remove("fade_out_normal");
      sidebarMain.classList.remove("slide_out_left");
    } else {
      sidebarOverlay.classList.remove("fade_in_normal");
      sidebarMain.classList.remove("slide_in_left");
      sidebarOverlay.classList.add("fade_out_normal");
      sidebarMain.classList.add("slide_out_left");
    }
  };

  const capitalizeFirstLetter = (str) => {
    let lowercaseStr = str.toLowerCase();
    return lowercaseStr[0]?.toUpperCase() + lowercaseStr?.slice(1);
  };

  const handleSubNav = (item, index) => {
    if (item.toLowerCase() == "home") return "/";
    if (item.toLowerCase() == "search") {
      return `/search?lat=${geometry.lat}&lng=${
        geometry.lng
      }&location=${encodeURIComponent(geometry.location)}`;
    }
    if (item.toLowerCase() == "repairshops" && checked.current?.length) {
      return `/repairshops?services=${checked.current?.join(",")}`;
    }
    if (item.toLowerCase() == "repairshops") {
      return `/repairshops`;
    }
    if (
      item.toLowerCase() == "profile" &&
      paths[index - 1].toLowerCase() == "repairshops" &&
      checked.current?.length
    ) {
      return `/repairshops?services=${checked.current?.join(",")}`;
    }
    if (
      item.toLowerCase() == "profile" &&
      paths[index - 1].toLowerCase() == "repairshops" &&
      !locationParam
    ) {
      return `/repairshops`;
    }
    if (
      item.toLowerCase() == "profile" &&
      paths[index - 1].toLowerCase() == "search" &&
      !locationParam
    ) {
      return `/search?lat=${geometry.lat}&lng=${
        geometry.lng
      }&location=${encodeURIComponent(geometry.location)}`;
    }
    if (
      item.toLowerCase() == "profile" &&
      locationParam &&
      paths[index - 1].toLowerCase() == locationParam.toLowerCase() &&
      checked.current?.length
    ) {
      return `/repairshops/${locationParam}?services=${checked.current?.join(
        ","
      )}`;
    }
    if (
      item.toLowerCase() == "profile" &&
      locationParam &&
      paths[index - 1].toLowerCase() == locationParam.toLowerCase()
    ) {
      return `/repairshops/${locationParam}`;
    }
    if (
      item.toLowerCase() != "profile" &&
      paths[index - 1].toLowerCase() == "repairshops" &&
      locationParam &&
      checked.current?.length
    ) {
      return `/repairshops/${locationParam}?services=${checked.current.join(
        ","
      )}`;
    }
    if (
      item.toLowerCase() != "profile" &&
      paths[index - 1].toLowerCase() == "repairshops" &&
      locationParam
    ) {
      return `/repairshops/${locationParam}`;
    }
    if (index == 1) return `/${item}`;
    if (index == 2) return `/${paths[1]}/${item}`;
    if (index == 3) return `/${paths[1]}/${paths[2]}/${item}`;
    else return "#";
  };

  return (
    <>
      {/* <!-- ========== HEADER ========== --> */}
      <header className="sticky top-0 inset-x-0 font-barlow flex flex-col flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm xs:text-base lg:text-lg py-2.5 pb-0 sm:py-4 sm:pb-0 lg:pl-64 dark:bg-gray-800 dark:border-gray-700 shadow-md">
        <nav
          className="flex basis-full items-center w-full mx-auto pb-2 px-2 xs:px-4 sm:px-6 sm:pl-6 md:px-8 lg:px-10"
          aria-label="Global"
        >
          <div className="mr-1 xs:mr-2 lg:mr-0 lg:hidden">
            <Link
              to={"/"}
              className="flex-none text-lg xs:text-xl font-semibold dark:text-white"
              aria-label="Omega Repair"
            >
              Omega
            </Link>
          </div>

          <div className="w-full flex items-center justify-end ml-auto gap-2 xs:gap-3 sm:gap-x-3 sm:order-3">
            <div className="flex gap-2 sm:gap-x-3.5">
              <button
                onClick={toggleSearchOverlay}
                type="button"
                className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[1.5rem] w-[1.5rem] xs:h-[2rem] xs:w-[2rem] sm:h-[2.375rem] sm:w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
              {theme === "light" ? (
                <button
                  className="hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500 xs:p-2"
                  href="#"
                  onClick={() => {
                    theme === "dark" ? setTheme("light") : setTheme("dark");
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                  </svg>
                </button>
              ) : (
                <button
                  className="flex hs-dark-mode group items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500 xs:p-2"
                  href="#"
                  onClick={() => {
                    theme === "dark" ? setTheme("light") : setTheme("dark");
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex flex-row items-center justify-end gap-1 sm:gap-2 transform -translate-y-[1px]">
              <Link
                to={"/"}
                className="flex items-center gap-x-3.5 p-1 text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <svg
                  className="w-3.5 h-3.5 hidden sm:inline"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                  />
                </svg>
                <span>Home</span>
              </Link>
              <HashLink
                to="/#aboutUs"
                scroll={(el) =>
                  el.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  })
                }
                className="flex items-center gap-x-3.5 p-1 text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <svg
                  className="w-3.5 h-3.5 hidden sm:inline"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                <span>About</span>
              </HashLink>
              {/* <a
                href={"/#about"}
                className="flex items-center gap-x-3.5 p-1 text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <svg
                  className="w-3.5 h-3.5 hidden sm:inline"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                <span>About</span>
              </a> */}

              <HashLink
                to={`${location.search ? location.search : ""}#subscribe`}
                scroll={(el) =>
                  el.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  })
                }
                className="hs-accordion-toggle flex items-center gap-x-3.5 p-1 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white"
              >
                <IconContext.Provider
                  value={{ className: "w-3.5 h-3.5 hidden sm:inline" }}
                >
                  <MdOutlineContactMail />
                </IconContext.Provider>
                {/* <svg
                  className="w-3.5 h-3.5 hidden sm:inline"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg> */}
                <span>Subscribe</span>
              </HashLink>

              {/* <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-offcanvas="#hs-offcanvas-right"
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                  <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                </svg>
              </button> */}

              {/* <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                >
                  <img
                    className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                    alt="Image Description"
                  />
                </button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
                      james@site.com
                    </p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      href="#"
                    >
                      <svg
                        className="flex-none"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                      </svg>
                      Newsletter
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      href="#"
                    >
                      <svg
                        className="flex-none"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                        <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                      </svg>
                      Purchases
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      href="#"
                    >
                      <svg
                        className="flex-none"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"
                        />
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                      </svg>
                      Downloads
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      href="#"
                    >
                      <svg
                        className="flex-none"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                      </svg>
                      Team Account
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </nav>
        <div className="sticky top-0 inset-x-0 w-full z-20 bg-white border-y lg:border-b-0 px-4 pl-8 xs:pl-10 sm:px-6 md:px-8 md:pl-10 lg:pl-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center py-3 overflow-x-auto noScrollBar">
            {/* <!-- Navigation Toggle --> */}
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 absolute left-2 xs:left-4 sm:left-6 lg:hidden"
              data-hs-overlay="#application-sidebar"
              aria-controls="application-sidebar"
              aria-label="Toggle navigation"
              onClick={toggleAside}
            >
              <span className="sr-only">Toggle Navigation</span>
              <svg
                className="w-5 h-5"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            {/* <!-- End Navigation Toggle --> */}

            {/* <!-- Breadcrumb --> */}
            <ol
              className="ml-2 sm:ml-8 lg:ml-0 flex items-center whitespace-nowrap min-w-0 gap-2"
              aria-label="Breadcrumb"
            >
              {paths.length > 0 &&
                paths.map(
                  (item, index) =>
                    item && (
                      <li key={index}>
                        <Link
                          to={handleSubNav(item, index)}
                          className="flex items-center gap-1 text-sm xs:text-base font-semibold text-gray-800 truncate dark:text-gray-400"
                          aria-current="page"
                        >
                          <span>
                            {item.indexOf("%") == -1
                              ? capitalizeFirstLetter(item)
                              : decodeURIComponent(item)}
                          </span>
                          <IconContext.Provider
                            value={{
                              className: "w-4 h-4 transform translate-y-[10%]",
                            }}
                          >
                            <AiOutlineRight />
                          </IconContext.Provider>
                        </Link>
                      </li>
                    )
                )}
            </ol>
            {/* <!-- End Breadcrumb --> */}
          </div>
        </div>
      </header>
      {/* <!-- ========== END HEADER ========== --> */}

      {/* <!-- ========== MAIN CONTENT ========== --> */}
      {/* <!-- Sidebar Toggle --> */}

      {/* <!-- End Sidebar Toggle --> */}

      {/* <!-- Sidebar --> */}
      <aside
        className="hidden lg:flex fixed inset-0 lg:inset-auto z-[60]"
        ref={asideRef}
      >
        <div
          id="sidebar-overlay"
          onClick={toggleAside}
          className="fixed inset-0 bg-black/40 z-10 lg:hidden"
        ></div>
        <div
          id="sidebar-main"
          className="font-barlow transition-all duration-300 transform fixed top-0 left-0 bottom-0 w-64 z-20 bg-white border-r border-gray-200 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700 overscroll-none noScrollBar"
        >
          <div className="px-2 pr-4 py-4 flex justify-between items-center sticky top-0 z-10 bg-inherit shadow-md">
            <a
              className="flex-none p-2 text-xl font-semibold dark:text-white"
              href="#"
              aria-label="Omega Repair"
            >
              Omega
            </a>

            <div
              className="p-1 sm:p-2 border-[2px] border-gray-400  rounded-md lg:hidden hover:cursor-pointer"
              data-hs-overlay="#application-sidebar"
              onClick={toggleAside}
            >
              <IconContext.Provider
                value={{ className: "w-5 h-5 sm:w-6 sm:h-6" }}
              >
                <AiOutlineClose />
              </IconContext.Provider>
            </div>
          </div>

          <nav
            className="hs-accordion-group p-2 py-4 w-full flex flex-col flex-wrap text-sm xs:text-base"
            data-hs-accordion-always-open
          >
            <ul className="space-y-1.5">
              <li>
                <Link
                  to={"/"}
                  className="flex items-center gap-x-3.5 py-2 px-2.5   text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />
                  </svg>
                  Home
                </Link>
              </li>

              <li className="hs-accordion" id="Locations-accordion">
                <div className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-white dark:hover:text-slate-300 dark:hs-accordion-active:text-white hover:cursor-default">
                  <IconContext.Provider value={{ className: "w-5 h-5" }}>
                    <MdMap />
                  </IconContext.Provider>
                  <span>Locations</span>
                  <svg
                    className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <svg
                    className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </div>
                <div
                  id="users-accordion-sub-2-child"
                  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden pl-2"
                >
                  <ul className="pt-2 pl-2">
                    {locationParam ? (
                      <li>
                        <Link
                          aria-label="Visit All Repairshops Main Page"
                          to={
                            checked.current.length
                              ? `/repairshops?services=${checked.current.join(
                                  ","
                                )}`
                              : `/repairshops`
                          }
                          className="flex items-center gap-x-3.5 py-2 px-2.5 text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-100 dark:hover:text-slate-300"
                        >
                          All Shops
                        </Link>
                      </li>
                    ) : location.pathname.split("/").includes("repairshops") ? (
                      <li>
                        <Link
                          aria-label="Visit All Repairshops Main Page"
                          to={
                            checked.current.length
                              ? `/repairshops?services=${checked.current.join(
                                  ","
                                )}`
                              : `/repairshops`
                          }
                          className="flex items-center gap-x-3.5 py-2 px-2.5 text-slate-700 rounded-md bg-gray-100 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-100 dark:hover:text-slate-300"
                        >
                          All Shops
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <Link
                          aria-label="Visit All Repairshops Main Page"
                          to={
                            checked.current.length
                              ? `/repairshops?services=${checked.current.join(
                                  ","
                                )}`
                              : `/repairshops`
                          }
                          className="flex items-center gap-x-3.5 py-2 px-2.5 text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-100 dark:hover:text-slate-300"
                        >
                          All Shops
                        </Link>
                      </li>
                    )}
                    {locations.map((item) =>
                      locationParam &&
                      locationParam.toLowerCase() == item.name.toLowerCase() ? (
                        <li key={item.name}>
                          <Link
                            aria-label={`Visit Repair Shops in ${item.name}`}
                            to={
                              checked.current.length
                                ? `/repairshops/${
                                    item.collectionName
                                  }?services=${checked.current.join(",")}`
                                : `/repairshops/${item.collectionName}`
                            }
                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-slate-700 rounded-md bg-gray-100 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-100 dark:hover:text-slate-300"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ) : (
                        <li key={item.name}>
                          <Link
                            aria-label={`Visit Repair Shops in ${item.name}`}
                            to={
                              checked.current.length
                                ? `/repairshops/${
                                    item.collectionName
                                  }?services=${checked.current.join(",")}`
                                : `/repairshops/${item.collectionName}`
                            }
                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-100 dark:hover:text-slate-300"
                          >
                            {item.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </li>

              <li className="hs-accordion" id="sort-accordion">
                <div
                  className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-white dark:hover:text-slate-300 dark:hs-accordion-active:text-white hover:cursor-default"
                  href="#"
                >
                  <IconContext.Provider value={{ className: "h-5 w-5" }}>
                    <MdOutlineSort />
                  </IconContext.Provider>
                  <span>Sort</span>
                  <svg
                    className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <svg
                    className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </div>

                <div
                  id="sort-accordion-child"
                  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden pl-2 pt-2  flex-col"
                >
                  <div className="flex flex-col">
                    <div className="flex mb-3 items-center justify-between">
                      <div
                        ref={sidebarButton}
                        className="flex justify-between disabled w-2/3"
                      >
                        <button
                          onClick={handleClearSelected}
                          className=" mx-auto p-1 px-2 bg-red-700 text-white rounded-lg ring-2 ring-red-500/50 shadow-lg transition-all"
                        >
                          Clear All
                        </button>
                        <button
                          onClick={handleSearchSelected}
                          className=" mx-auto p-1 px-2  bg-green-700 text-white rounded-lg ring-2 ring-green-500/50  shadow-lg transition-all"
                        >
                          Search
                        </button>
                      </div>
                      {searchServices && (
                        <button
                          onClick={handleReset}
                          className="mx-auto p-1 px-2 bg-yellow-700 text-white rounded-lg ring-2 ring-yellow-500/50  shadow-lg transition-all"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                    <div
                      ref={checkBoxesContainer}
                      className="flex flex-col gap-2"
                    >
                      {services.map((item, index) => (
                        <label
                          key={item}
                          htmlFor={`hs-checkbox-${index}-on-right`}
                          className="flex p-2.5 gap-1 w-full bg-white border border-gray-200 rounded-md hover:cursor-pointer focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-white"
                          data-name={item}
                        >
                          <span className="text-gray-500 dark:text-gray-400">
                            {item}
                          </span>
                          <input
                            type="checkbox"
                            className="shrink-0 ml-auto mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            data-name={item}
                            id={`hs-checkbox-${index}-on-right`}
                            onChange={handleCheck}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <HashLink
                  className="flex items-center gap-x-3.5 py-2 px-2.5  text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-white dark:hover:text-slate-300"
                  to="/#aboutUs"
                  scroll={(el) =>
                    el.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    })
                  }
                >
                  <IconContext.Provider value={{ className: "w-5 h-5" }}>
                    <MdOutlineDescription />
                  </IconContext.Provider>
                  <span>About Us</span>
                </HashLink>
              </li>

              {/* <li>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-2.5  text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-white dark:hover:text-slate-300"
                  href="#contact"
                >
                  <IconContext.Provider value={{ className: "w-5 h-5" }}>
                    <MdContactMail />
                  </IconContext.Provider>
                  <span>Contact Us</span>
                </a>
              </li> */}
              <li>
                <HashLink
                  className="flex items-center gap-x-3.5 py-2 px-2.5  text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-white dark:hover:text-slate-300"
                  to={`${location.search ? location.search : ""}#subscribe`}
                  scroll={(el) =>
                    el.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    })
                  }
                >
                  <IconContext.Provider value={{ className: "w-5 h-5" }}>
                    <MdContactMail />
                  </IconContext.Provider>
                  <span>Subscribe</span>
                </HashLink>
              </li>
              <li>
                <Link
                  to={"/login"}
                  className="flex items-center gap-x-3.5 py-2 px-2.5   text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-white"
                >
                  <IconContext.Provider value={{ className: "w-5 h-5" }}>
                    <IoLogInOutline />
                  </IconContext.Provider>
                  Login
                </Link>
              </li>
              <li>
                <button
                  className="flex items-center gap-x-3.5 py-2 px-2.5   text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-white w-full"
                  onClick={() => {
                    signOut(auth);
                  }}
                >
                  <IconContext.Provider value={{ className: "w-5 h-5" }}>
                    <IoLogOutOutline />
                  </IconContext.Provider>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      {/* <!-- End Sidebar --> */}

      <div
        className="fixed hidden z-[90] inset-0 flex-col justify-center items-center gap-2 p-4 max-w-[1440px] mx-auto"
        ref={mobileSearchRef}
      >
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-10"
          onClick={toggleSearchOverlay}
        ></div>
        <Search toggleSearchOverlay={toggleSearchOverlay} />
      </div>

      {/* <!-- ========== END MAIN CONTENT ========== --> */}
    </>
  );
};

export default Header;
