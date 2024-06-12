import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedCourseId,
  setCourses,
  setFilteredCourses,
  setLoading,
  setError,
  setSearchQuery,
  setSearchField,
} from "../action"; // Correct import path
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";
import { Link } from "react-router-dom";
import Search from "./Search";
import Loading from "./Loading";

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, filteredCourses, loading, error, searchQuery, searchField } =
    useSelector((state) => state.course);

  useEffect(() => {
    const coursesRef = ref(database, "courses/");
    onValue(
      coursesRef,
      (snapshot) => {
        const coursesData = snapshot.val();
        if (coursesData) {
          const coursesArray = Object.values(coursesData);
          dispatch(setCourses(coursesArray));
          dispatch(setFilteredCourses(coursesArray));
        } else {
          dispatch(setCourses([]));
          dispatch(setFilteredCourses([]));
        }
        dispatch(setLoading(false));
        dispatch(setError(null));
      },
      (error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      }
    );
  }, [dispatch]);

  useEffect(() => {
    if (searchField === "") {
      dispatch(setFilteredCourses(courses));
    } else {
      const filtered = courses.filter((course) =>
        course[searchField].toLowerCase().includes(searchQuery.toLowerCase())
      );
      dispatch(setFilteredCourses(filtered));
    }
  }, [searchQuery, searchField, courses, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex justify-end mr-2 md:mr-10">
        <Search
          setSearchQuery={(query) => dispatch(setSearchQuery(query))}
          setSearchField={(field) => dispatch(setSearchField(field))}
          searchField={searchField}
        />
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          {filteredCourses.map((course) => (
            <div key={course.id} className="my-3">
              <button onClick={() => dispatch(setSelectedCourseId(course.id))}>
                <Link
                  to={`/courses/${course.id}`}
                  className="block mx-6 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="md:flex">
                    <div>
                      <img
                        className="object-cover w-full h-40 rounded-lg"
                        src={course.thumbnail}
                        alt={course.courseName}
                      />
                    </div>
                    <div className="text-left ml-4 mt-3 w-full text-sm md:w-3/4">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {course.courseName}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        <strong>Instructor:</strong> {course.instructor}
                      </p>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        <strong>Description:</strong> {course.description}
                      </p>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        <strong>Location:</strong> {course.location}
                      </p>
                    </div>
                  </div>
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;
