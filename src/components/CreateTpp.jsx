// import { useEffect } from "react";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { IconContext } from "react-icons/lib";
// import DataContext from "../contexts/DataContext";
import TextInput from "../components/TextInput";

const textInputs = [
  {
    label: "Type",
    id: "tpptype",
    name: "tpptype",
    required: true,
    error: "Must not be empty",
  },
  {
    label: "Link",
    id: "tpplink",
    name: "tpplink",
    type: "url",
    required: true,
    error: "Must not be empty",
  },
];

const CreateTpp = ({
  setCreate,
  addDoc,
  collection,
  db,

  user,
  serverTimestamp,
  toast,
  // setTppData,
}) => {
  const [formData, setFormData] = useState({ tpptype: "", tpplink: "" });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  // const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const toastPromise = new Promise((res, rej) => {
        const dataObj = {
          creator: {
            name: user.displayName,
            photoURL: user.photoURL,
          },
          link: formData["tpplink"],
          type: formData["tpptype"],
          status: "pending",
          created: serverTimestamp(),
          lastModified: "N/A",
        };
        try {
          addDoc(collection(db, "tpp"), dataObj).then(
            (doc) => {
              // setSubmitSuccess(true);
              console.log("NEW DOC ID:", doc.id);
              setCreate(false);
              res("done");
            },
            () => {
              // setSubmitSuccess(true);
              setCreate(false);
              rej("done");
            }
          );
        } catch (err) {
          console.log(err);
          rej(err);
        }
      });
      toast.promise(toastPromise, {
        pending: "Creating Link",
        success: "Link Created",
        error: "An Error Occurred",
      });
    } catch (err) {
      console.log(err);
      setSubmitError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="dark:bg-gray-800 p-2 xs:p-4 rounded-md shadow-custom-1 dark:shadow-gray-700 w-[95%] sm:w-5/6 min-w-[256px] flex flex-col gap-4"
      >
        <div>
          <h3 className="text-lg sm:text-xl text-center">
            Create New Tpp Link
          </h3>
        </div>
        {textInputs.map((i, index) => (
          <TextInput
            key={index}
            {...i}
            formData={formData}
            handleChange={handleChange}
            last={index == textInputs.length - 1 ? "true" : "false"}
          />
        ))}
        {submitLoading && !submitError && (
          <div className="flex justify-center">
            <div
              className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {!submitLoading && (
          <button
            type="submit"
            className="py-2 xs:py-3 px-2 xs:px-4 inline-flex flex-shrink-0 justify-center items-center rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-2"
          >
            Submit
          </button>
        )}
        {submitError && !submitLoading && (
          <div className="flex flex-col gap-2 sm:gap-4 mb-6">
            <div className="flex justify-center">
              <p className="text-red-600 dark:text-red-500 dark:brightness-110 font-medium tracking-wide flex gap-2 items-center">
                <span>
                  <IconContext.Provider value={{ className: "w-5 h-5" }}>
                    <MdErrorOutline />
                  </IconContext.Provider>
                </span>
                <span className="whitespace-normal">{submitError}</span>
              </p>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default CreateTpp;
