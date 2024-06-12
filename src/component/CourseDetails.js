import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ref, get, push, update } from "firebase/database";
import { database } from "../firebaseConfig";
import Syllabus from "./Syllabus";
import Loading from "./Loading";
import Snackbar from "@mui/material/Snackbar";

const CourseDetails = ({ user }) => {
  const { id } = useParams(); // Get course ID from URL params
  const [course, setCourse] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  useEffect(() => {
    const courseRef = ref(database, `courses/${id}`);
    get(courseRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCourse(snapshot.val());
        } else {
          console.log("Course not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
      });
  }, [id]);

  if (!course) {
    return <Loading />;
  }

  const enrollCourse = () => {
    const studentCourseRef = ref(database, `studentCourses/${course.id}`);

    // Check if the course is already enrolled
    get(studentCourseRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Course already added, show snackbar
          setOpenSnackbar(true);
        } else {
          // Course not added, proceed with enrollment
          push(studentCourseRef, course)
            .then(() => {
              console.log("Course added to studentCourses successfully!");
              setSuccessSnackbar(true); // Show success snackbar
            })
            .catch((error) => {
              console.error("Error adding course to studentCourses: ", error);
            });

          // Initialize course.Students if it's not already initialized
          const updatedStudents = course.Students || {};

          // Ensure user.displayName is not undefined before using it
          const userName = user.displayName || "Unknown";

          // Update the course with enrolled student's information
          update(ref(database, `courses/${id}`), {
            Students: {
              ...updatedStudents,
              [user.uid]: {
                id: user.uid,
                name: userName,
                email: user.email,
              },
            },
          })
            .then(() => {
              console.log("Course enrolled successfully!");
              // You can add any additional logic here, such as displaying a success message
            })
            .catch((error) => {
              console.error("Error enrolling in course: ", error);
              // Handle any errors, such as displaying an error message to the user
            });
        }
      })
      .catch((error) => {
        console.error("Error checking studentCourses: ", error);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSuccessSnackbar(false);
  };

  return (
    <>
      <div className="hidden lg:block">
        <div className="mt-20 flex justify-between mx-10">
          <div className="ml-10">
            <p className="text-5xl font-bold tracking-tight text-gray-900 my-4">
              {course.courseName}
            </p>
            <p className="text-3xl ml-1">Instructor : {course.instructor}</p>
            <p className="text-xl ml-1 mt-6">{course.description}</p>
            <div>
              {course.enrollmentStatus === "Open" && (
                <p className="ml-1 bg-[#319f57]/90 w-1/2 my-5 h-10 items-center pt-2 text-center text-white font-bold rounded-lg ">
                  <button onClick={enrollCourse}>Open</button>
                </p>
              )}
              {course.enrollmentStatus === "In Progress" && (
                <p className="ml-1 bg-[#f9c440] w-1/2 my-5 h-10 items-center pt-2 text-center text-white font-bold rounded-lg">
                  In Progress
                </p>
              )}
              {course.enrollmentStatus === "Closed" && (
                <p className="ml-1 bg-[#ff6364] w-1/2 my-5 h-10 items-center pt-2 text-center text-white font-bold rounded-lg">
                  Closed
                </p>
              )}
            </div>
            <div className="flex font-thin text-gray-700 text-lg">
              |<div className="mx-10">{course.duration}</div>|
              <div className="mx-10">{course.schedule}</div>|
              <div className="mx-10">{course.location}</div>|
            </div>
            <p className="my-4 text-gray-600 text-2xl ">
              Prerequisites : {course.prerequisites}
            </p>
            <div>
              <h1 className="font-bold text-gray-900 text-2xl text-center mr-20 bg-gray-200/70 rounded-xl py-3 ">
                Syllabus
              </h1>
              <Syllabus syllabus={course.syllabus} />
            </div>
          </div>
          <div>
            <img src={course.thumbnail} alt="" className="w-[30rem]" />
          </div>
        </div>
      </div>
      <div className="block md:hidden lg:hidden">
        <div className="mt-6 mx-4">
          <p className="text-3xl font-bold text-center text-gray-900  my-4">
            {course.courseName}
          </p>
          <div className="flex justify-center">
            <img src={course.thumbnail} className="w-[20rem]" />
          </div>
          <p className="text-2xl text-center mt-2 ml-1">
            Instructor : {course.instructor}
          </p>
          <p className="text-xl text-center ml-1 mt-6">{course.description}</p>
          <div>
            {course.enrollmentStatus === "Open" && (
              <p className="ml-1 bg-[#319f57]/90 w-full md:w-1/2 my-5 h-10 items-center pt-2 text-center text-white font-bold rounded-lg ">
                <button onClick={enrollCourse}>Open</button>
              </p>
            )}
            {course.enrollmentStatus === "In Progress" && (
              <p className="ml-1 bg-[#f9c440] w-full md:w-1/2 my-5 h-10 items-center pt-2 text-center text-white font-bold rounded-lg">
                In Progress
              </p>
            )}
            {course.enrollmentStatus === "Closed" && (
              <p className="ml-1 bg-[#ff6364] w-full md:w-1/2 my-5 h-10 items-center pt-2 text-center text-white font-bold rounded-lg">
                Closed
              </p>
            )}
          </div>
          <div className=" font-thin text-gray-700 text-sm bg-gray-100 py-2 rounded-lg">
            <div className="ml-5">duration : {course.duration}</div>
            <div className="ml-5">schedule : {course.schedule}</div>
            <div className="ml-5">location : {course.location}</div>
          </div>
          <p className="my-4 text-gray-600 text-2xl ml-2 ">
            Prerequisites : {course.prerequisites}
          </p>
          <div>
            <h1 className="font-bold text-gray-900 text-xl  text-center  bg-gray-200/70 rounded-xl  py-2 ">
              Syllabus
            </h1>
            <Syllabus syllabus={course.syllabus} />
          </div>
        </div>
      </div>
      <div className="hidden md:block lg:hidden">
        <div className="mx-4 mt-6">
          <div className="">
            <div className="flex justify-center">
              <img src={course.thumbnail} className="w-[20rem]" />
            </div>
            <div className="mx-10">
              <p className="text-4xl font-bold tracking-tight text-gray-900  my-4">
                {course.courseName}
              </p>
              <p className="text-3xl ml-1">Instructor : {course.instructor}</p>
              <p className="text-xl ml-1 mt-6">{course.description}</p>
              <div>
                {course.enrollmentStatus === "Open" && (
                  <p className="ml-1 bg-[#319f57]/90 w-full my-5 h-10 items-center pt-2 text-center text-white font-bold rounded-lg ">
                    <button onClick={enrollCourse}>Open</button>
                  </p>
                )}
                {course.enrollmentStatus === "In Progress" && (
                  <p className="ml-1 bg-[#f9c440] w-full my-5 h-10 items-center pt-2 text-center text-white font-bold rounded-lg">
                    In Progress
                  </p>
                )}
                {course.enrollmentStatus === "Closed" && (
                  <p className="ml-1 bg-[#ff6364] w-full my-5 h-10 items-center pt-2 text-center text-white font-bold rounded-lg">
                    Closed
                  </p>
                )}
              </div>
              <div className="flex font-thin ml-2 text-gray-700 text-lg">
                |<div className="mx-10">{course.duration}</div>|
                <div className="mx-10">{course.schedule}</div>|
                <div className="mx-10">{course.location}</div>|
              </div>
              <p className="my-4 text-gray-600 text-2xl ">
                Prerequisites : {course.prerequisites}
              </p>
              <div className="flex justify-center">
                <div>
                  <h1 className="font-bold w-full text-gray-900 text-2xl text-center mr-20 bg-gray-200/70 rounded-xl py-3 ">
                    Syllabus
                  </h1>
                  <Syllabus syllabus={course.syllabus} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Course is already added"
        key={"topcenter"}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={successSnackbar}
        onClose={handleCloseSnackbar}
        message="Course added successfully"
        key={"topcenter-success"}
      />
    </>
  );
};

export default CourseDetails;
