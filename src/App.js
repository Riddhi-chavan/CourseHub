import { useEffect, useState } from "react";
import "./App.css";
import CourseList from "./component/CourseList";
import Navbar from "./component/Navbar";
import Signin from "./component/Signin";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseDetails from "./component/CourseDetails";
import { seedCourses } from "./seedCourses";
import Dashboard from "./component/Dashboard";
import ProgressTracker from "./component/ProgressTracker";

function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLogin(true);
      } else {
        setUser(null);
        setLogin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLogin(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // const handleButtonClick = () => {
  //   // Call the seedCourses function when the button is clicked
  //   seedCourses()
  //     .then(() => {
  //       console.log("Courses added successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error adding courses: ", error);
  //     });
  // };

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} handleSignOut={handleSignOut} login={login} />
        {login ? (
          <Routes>
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route
              path="/dashboard/progress-tracker"
              element={<ProgressTracker />}
            />
            <Route
              exact
              path="/"
              element={<CourseList setSelectedCourseId={setSelectedCourseId} />}
            />
            {selectedCourseId && (
              <Route
                path="/courses/:id"
                element={<CourseDetails user={user} />}
              />
            )}
          </Routes>
        ) : (
          <Signin setLogin={setLogin} />
        )}
      </div>
      {/* <button onClick={handleButtonClick}>add</button> */}
    </BrowserRouter>
  );
}

export default App;
