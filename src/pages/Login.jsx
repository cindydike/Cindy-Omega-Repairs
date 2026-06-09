import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "../contexts/FirebaseContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    signInWithEmailAndPassword,
    setUser,
    auth,
    setPersistence,
    browserSessionPersistence,
  } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (formData.email && formData.password) {
      const { email, password, remember } = formData;
      // console.log(email, password, remember);
      if (remember) {
        setPersistence(auth, browserSessionPersistence).then(async () => {
          setSubmitLoading(true);
          try {
            await signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                setUser(userCredential.user);
                // console.log("Success");
                navigate("/tpp");
                // ...
              })
              .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                setError("Invalid Username or Password");
                console.log(error.message);
              });
          } finally {
            setFormData({ remember: false, password: "", email: "" });
            setSubmitLoading(false);
          }
        });
      } else {
        setSubmitLoading(true);
        try {
          await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in
              setUser(userCredential.user);
              // console.log("Success");
              navigate("/tpp");
              // ...
            })
            .catch((error) => {
              setError("Invalid Username or Password");
              console.error(error.message);
            });
        } finally {
          setFormData({ remember: false, password: "", email: "" });
          setSubmitLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log(user);
  // console.log(isAuth);

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign in
            </h1>
          </div>

          <div className="mt-5">
            {/* <!-- Form --> */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                {/* <!-- Form Group --> */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-gray-700 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-gray-200 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required
                      aria-describedby="email-error"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        });
                      }}
                      value={formData.email}
                    />
                    {/* <div className="hidden absolute inset-y-0 end-0 items-center pointer-events-none pe-3">
                      <svg
                        className="h-5 w-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div> */}
                  </div>
                  {/* <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p> */}
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Form Group --> */}
                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Password
                    </label>
                    {/* <a
                      className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="../examples/html/recover-account.html"
                    >
                      Forgot password?
                    </a> */}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full border-gray-700 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-gray-200 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required
                      aria-describedby="password-error"
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                      }}
                      value={formData.password}
                    />
                    {/* <div className="hidden absolute inset-y-0 end-0 items-center pointer-events-none pe-3">
                      <svg
                        className="h-5 w-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div> */}
                  </div>
                  {/* <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="password-error"
                  >
                    8+ characters required
                  </p> */}
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Checkbox --> */}
                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      onChange={() =>
                        setFormData({
                          ...formData,
                          remember: !formData.remember,
                        })
                      }
                      checked={formData.remember}
                    />
                  </div>
                  <div className="ms-3">
                    <label
                      htmlFor="remember-me"
                      className="text-sm dark:text-white"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                {/* <!-- End Checkbox --> */}
                {submitLoading ? (
                  <div className="flex justify-center">
                    <div
                      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-400 rounded-full"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Sign in
                  </button>
                )}

                {error && (
                  <p className="font-barlowCondensed tracking-secondary font-medium text-base md:text-xl xl:text-2.5xl text-center text-red-500">
                    <i>{error}</i>
                  </p>
                )}
              </div>
            </form>
            {/* <!-- End Form --> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
