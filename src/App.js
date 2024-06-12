import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Signin from "./component/Signin";
import CourseList from "./component/CourseList";
import CourseDetails from "./component/CourseDetails";
import Dashboard from "./component/Dashboard";
import ProgressTracker from "./component/ProgressTracker";
import Navbar from "./component/Navbar";
import { auth } from "./firebaseConfig";
import { signIn } from "./action";
import { seedCourses } from "./seedCourses";

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signIn(user));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          {user ? (
            <>
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route
                path="/dashboard/progress-tracker"
                element={<ProgressTracker />}
              />
              <Route path="/" element={<CourseList />} />
              <Route
                path="/courses/:id"
                element={<CourseDetails user={user} />}
              />
            </>
          ) : (
            <Route path="/" element={<Signin />} />
          )}
          {user && (
            <Route path="/signin" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
