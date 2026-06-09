import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../contexts/FirebaseContext";
import CreateTpp from "../components/CreateTpp";
import { CiNoWaitingSign } from "react-icons/ci";
import { IconContext } from "react-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { orderBy } from "firebase/firestore";

const Tpp = () => {
  const {
    user,
    db,
    doc,
    addDoc,
    serverTimestamp,
    collection,
    onSnapshot,
    deleteDoc,
    query,
  } = useContext(FirebaseContext);
  const [dataLoading, setDataLoading] = useState(true);
  const [tppData, setTppData] = useState(null);
  const [create, setCreate] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    let unsubscribe;
    try {
      const q = query(collection(db, "tpp"), orderBy("created", "desc"));
      onSnapshot(
        q,
        (querySnapshot) => {
          setDataLoading(false);
          if (!querySnapshot.empty) {
            const arr = [];
            querySnapshot.forEach((doc) => {
              arr.push({ id: doc.id, ...doc.data() });
            });
            setTppData(arr);
          } else {
            // docSnap.data() will be undefined in this case
            setTppData(null);
            // console.log("No such document!");
          }
        },
        (error) => {
          setDataLoading(false);
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }

    return () => unsubscribe && unsubscribe();
  }, [db, collection, onSnapshot, query]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   document.addEventListener("dblclick", () => {
  //     signOut(auth);
  //   });
  //   return () =>
  //     document.removeEventListener("dblclick", () => {
  //       signOut(auth);
  //     });
  // }, [auth, signOut]);

  const getDate = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let suffix = "";

    if (hours >= 12) {
      hours = hours - 12;
      suffix = "PM";
    } else {
      suffix = "AM";
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    let dateString = date.toDateString();
    let dateStringArr = dateString.split(" ");
    dateStringArr.pop();
    return `${dateStringArr.join(" ")} ${hours}:${minutes} ${suffix}`;
  };
  // console.log(user);

  const handleDelete = async (data) => {
    // console.log(data);
    setDeleteLoading((prev) => {
      if (prev) {
        return [...prev, data.id];
      } else {
        return [data.id];
      }
    });
    await deleteDoc(doc(db, "tpp", data.id));
    setDeleteLoading((prev) => {
      if (prev) {
        const index = prev.indexOf(data.id);
        if (index > -1) {
          prev.splice(index, 1);
        }
        return [...prev];
      } else {
        return null;
      }
    });
  };

  const handleDeleteAll = async () => {
    setDeleteLoading(() => tppData.map((i) => i.id));
    try {
      for (const el of tppData) {
        await deleteDoc(doc(db, "tpp", el.id));
      }
      setTppData(null);
    } catch (err) {
      console.log(err);
    }
    setDeleteLoading(false);
  };

  const handleCopy = (text, e) => {
    function fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }

      document.body.removeChild(textArea);
    }
    function copyTextToClipboard(text) {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(
        function () {
          console.log("Async: Copying to clipboard was successful!");
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    }
    if (e.target.id == "copyButton") {
      const sibling = e.target.nextSibling;
      e.target.classList.add("hidden");
      sibling.classList.remove("hidden");

      copyTextToClipboard(text);

      setTimeout(() => {
        e.target.classList.remove("hidden");
        sibling.classList.add("hidden");
      }, 1000);
    }
  };

  return (
    <main className="p-4 min-h-screen text-base font-barlow font-semibold relative overflow-x-hidden w-full pt-6 md:pt-8 px-4 sm:px-6 md:px-8 lg:pl-72 dark:bg-gray-800 dark:border-gray-700">
      <h1>
        <span className="mr-2">Hello,</span>
        <img
          className="inline-block h-6 w-6 rounded-full mr-1"
          src={user?.photoURL}
          alt="User Display Photo"
        />
        <span>{user?.displayName}</span>
      </h1>

      {create && (
        <section className="w-full flex justify-center mt-10">
          <CreateTpp
            setCreate={setCreate}
            collection={collection}
            db={db}
            serverTimestamp={serverTimestamp}
            user={user}
            toast={toast}
            setTppData={setTppData}
            addDoc={addDoc}
          />
        </section>
      )}

      {/* <!-- Table Section --> */}
      <div
        className="max-w-[85rem] w-full
         px-2 py-6 sm:py-8 md:py-10 lg:py-14 mx-auto"
      >
        {/* <!-- Card --> */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto noScrollBar">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                {/* <!-- Header --> */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                      The People{"'"}s Platform{" "}
                    </h2>
                    {/* <p className="text-sm text-gray-600 dark:text-gray-400">
                        Keys you have generated to connect with third-party
                        clients or access the{" "}
                        <a
                          className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                          href="#"
                        >
                          Preline API.
                        </a>
                      </p> */}
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      {/* <a
                          className="py-2 px-2 sm:px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          href="#"
                        >
                          View all
                        </a> */}
                      {!create && (
                        <button
                          className="py-2 px-3 inline-flex items-center gap-x-1 sm:gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          onClick={() => setCreate(true)}
                        >
                          <svg
                            className="flex-shrink-0 w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                          Create
                        </button>
                      )}

                      <button
                        className="py-2 px-3 inline-flex items-center gap-x-1 sm:gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        data-hs-overlay="#hs-delete-all-modal"
                      >
                        <svg
                          className="flex-shrink-0 w-4 h-4 transform rotate-45"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                        Delete All
                      </button>

                      <div
                        id="hs-delete-all-modal"
                        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                      >
                        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                              <h3 className="font-bold text-gray-800 dark:text-white">
                                Delete All Data
                              </h3>
                              <button
                                type="button"
                                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                data-hs-overlay="#hs-delete-all-modal"
                              >
                                <span className="sr-only">Cancel</span>
                                <svg
                                  className="flex-shrink-0 w-4 h-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 6 6 18" />
                                  <path d="m6 6 12 12" />
                                </svg>
                              </button>
                            </div>
                            <div className="p-4 overflow-y-auto">
                              <p className="mt-1 text-gray-800 dark:text-gray-400">
                                Are you sure, this action will delete all data
                              </p>
                            </div>
                            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                              <button
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                data-hs-overlay="#hs-delete-all-modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                data-hs-overlay="#hs-delete-all-modal"
                                onClick={handleDeleteAll}
                              >
                                Delete All
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Table --> */}
                {tppData && (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-slate-900">
                      <tr>
                        {/* <th
                          scope="col"
                          className=" ps-2 sm:ps-4 md:ps-6 py-3 text-start"
                        >
                          <label
                            htmlFor="hs-at-with-checkboxes-main"
                            className="flex"
                          >
                            <input
                              type="checkbox"
                              className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                              id="hs-at-with-checkboxes-main"
                            />
                            <span className="sr-only">Checkbox</span>
                          </label>
                        </th> */}

                        <th
                          scope="col"
                          className="pl-3 sm:px-4 py-3 text-start"
                        >
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              Name
                            </span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-1 sm:px-2 md:px-4 py-3 text-start"
                        >
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              Created by
                            </span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-1 sm:px-2 md:px-4 py-3 text-start"
                        >
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              Link/URL
                            </span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-1 sm:px-2 md:px-4 py-3 text-start"
                        >
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              Status
                            </span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-1 sm:px-2 md:px-4 py-3 text-start"
                        >
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              Created
                            </span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-1 sm:px-2 md:px-4 py-3 text-start"
                        >
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              Last Modified
                            </span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-1 sm:px-2 md:px-4 py-3 text-end"
                        ></th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {tppData.map((item, index) => (
                        <tr key={index}>
                          {/* <td className="h-px w-px whitespace-nowrap">
                            <div className="px-1 sm:px-2 md:px-4 py-3">
                              <label
                                htmlFor="hs-at-with-checkboxes-2"
                                className="flex"
                              >
                                <input
                                  type="checkbox"
                                  className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-at-with-checkboxes-2"
                                />
                                <span className="sr-only">Checkbox</span>
                              </label>
                            </div>
                          </td> */}
                          <td className="h-px w-px whitespace-nowrap pl-2">
                            <div className="px-1 sm:px-2 md:px-4 py-3">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {item.type}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-px whitespace-nowrap">
                            <div className="px-1 sm:px-2 md:px-4 py-3">
                              <div className="flex items-center gap-x-2">
                                <img
                                  className="inline-block h-6 w-6 rounded-full"
                                  src={item.creator.photoURL}
                                  alt="Image Description"
                                />
                                <div className="grow mr-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.creator.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="h-px w-px whitespace-nowrap">
                            <div className="px-1 sm:px-2 md:px-4 py-3">
                              <button
                                id="copyButton"
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-xs rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onClick={(e) => handleCopy(item.link, e)}
                              >
                                Copy Link
                                <svg
                                  className="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-600"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    width="8"
                                    height="4"
                                    x="8"
                                    y="2"
                                    rx="1"
                                    ry="1"
                                  />
                                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                className="py-2 px-3 hidden items-center gap-x-2 text-xs rounded-lg border border-blue-200 bg-blue-700 text-white shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-700 dark:border-gray-700 dark:text-white"
                                onClick={(e) => handleCopy(item.link, e)}
                              >
                                Copied
                              </button>
                            </div>
                          </td>
                          <td className="h-px w-px whitespace-nowrap">
                            <div className="px-1 sm:px-2 md:px-4 py-3">
                              {item.status == true ? (
                                <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                  <svg
                                    className="w-2.5 h-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                  </svg>
                                  active
                                </span>
                              ) : item.status == "pending" ? (
                                <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
                                  <IconContext.Provider
                                    value={{ className: "w-3 h-3" }}
                                  >
                                    <CiNoWaitingSign />
                                  </IconContext.Provider>
                                  pending
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-green-200">
                                  <svg
                                    className="w-2.5 h-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                  </svg>
                                  inactive
                                </span>
                              )}
                              {/* <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-green-200">
                                <svg
                                  className="w-2.5 h-2.5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                </svg>
                                {item.status}
                              </span> */}
                            </div>
                          </td>
                          <td className="h-px w-px whitespace-nowrap">
                            <div className="px-1 sm:px-2 md:px-4 py-3">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {item.created && getDate(item.created.toDate())}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-px whitespace-nowrap">
                            <div className="px-1 sm:px-2 md:px-4 py-3">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {item.lastModified &&
                                  typeof item.lastModified !== "string" &&
                                  getDate(item.lastModified.toDate())}
                                {item.lastModified &&
                                  typeof item.lastModified == "string" &&
                                  item.lastModified}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-px whitespace-nowrap">
                            <div className="px-2 sm:px-4 md:px-6 py-1.5">
                              <div className="py-2 first:pt-0 last:pb-0">
                                {deleteLoading &&
                                deleteLoading.includes(item.id) ? (
                                  <div className="flex justify-center">
                                    <div
                                      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-400 rounded-full"
                                      role="status"
                                      aria-label="loading"
                                    >
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-white bg-red-600 tracking-wide hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => handleDelete(item)}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                              {/* <div className="hs-dropdown relative inline-block [--placement:bottom-right]">
                                <button
                                  id="hs-table-dropdown-2"
                                  type="button"
                                  className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                >
                                  <svg
                                    className="flex-shrink-0 w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                  </svg>
                                </button>
                                <div
                                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 divide-y divide-gray-200 min-w-[10rem] z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700"
                                  aria-labelledby="hs-table-dropdown-2"
                                >
                                  <div className="py-2 first:pt-0 last:pb-0">
                                    <a
                                      className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                      href="#"
                                    >
                                      Rename
                                    </a>
                                    <a
                                      className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                      href="#"
                                    >
                                      Regenrate Key
                                    </a>
                                    <a
                                      className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                      href="#"
                                    >
                                      Disable
                                    </a>
                                  </div>
                                  <div className="py-2 first:pt-0 last:pb-0">
                                    <button className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-gray-700">
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {!tppData && !dataLoading && (
                  <h1 className="text-center py-4">No Data</h1>
                )}
                {dataLoading && (
                  <div className="flex justify-center my-4">
                    <div
                      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-400 rounded-full"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
                {/* <!-- End Table --> */}

                {/* <!-- Footer --> */}
                {!dataLoading && (
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {tppData ? tppData.length : 0}
                        </span>{" "}
                        results
                      </p>
                    </div>

                    {/* <div>
                      <div className="inline-flex gap-x-2">
                        <button
                          type="button"
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          <svg
                            className="flex-shrink-0 w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m15 18-6-6 6-6" />
                          </svg>
                          Prev
                        </button>

                        <button
                          type="button"
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          Next
                          <svg
                            className="flex-shrink-0 w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                      </div>
                    </div> */}
                  </div>
                )}

                {/* <!-- End Footer --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Table Section --> */}

      <ToastContainer />
    </main>
  );
};

export default Tpp;
