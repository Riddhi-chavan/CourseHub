import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { signIn } from "../action"; // Import signInAction
import { auth } from "../firebaseConfig";

const Signin = () => {
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Dispatch signInAction to update the Redux store
      dispatch(signIn(user));
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-400">
      <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
        <div className="relative container m-auto px-6 md:w-[25rem]">
          <div className="m-auto">
            <div className="rounded-xl bg-white dark:bg-gray-800 shadow-xl">
              <div className="p-8 ">
                <button
                  type="button"
                  className="absolute top-2 right-8 p-2 text-cyan-900 dark:text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center popup-close"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="#c6c7c7"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      cliprule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close popup</span>
                </button>
                <div className="space-y-4">
                  <img
                    src="/dashboard.png"
                    alt="dashboard"
                    loading="lazy"
                    className="w-10"
                  />
                  <h2 className="mb-8 text-2xl text-cyan-900 dark:text-white font-bold">
                    Sign-in to unlock the <br />
                    best of CourseHub.
                  </h2>
                </div>
                <div className="mt-10 grid space-y-4">
                  <button
                    className="group h-12 px-2 md:px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                    onClick={handleGoogle}
                  >
                    <div className="relative flex items-center space-x-4 justify-center">
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        className="absolute left-0 w-5 "
                        alt="google logo"
                      />
                      <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Continue with Google
                      </span>
                    </div>
                  </button>
                </div>
                <div className="mt-14 space-y-4 py-3 text-gray-600 dark:text-gray-400 text-center">
                  <p className="text-xs">
                    By proceeding, You will be sign-in in to our CourseHub
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
