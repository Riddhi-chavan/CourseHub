import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";
import { Link } from "react-router-dom";
import Search from "./Search";
import Loading from "./Loading";

const CourseList = ({ setSelectedCourseId, user }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState(""); // Default to an empty string

  useEffect(() => {
    const coursesRef = ref(database, "courses/");
    // Fetch courses from the database
    onValue(
      coursesRef,
      (snapshot) => {
        const coursesData = snapshot.val();
        if (coursesData) {
          // Convert coursesData object to array
          const coursesArray = Object.values(coursesData);
          setCourses(coursesArray);
          setFilteredCourses(coursesArray);
        } else {
          setCourses([]);
          setFilteredCourses([]);
        }
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (searchField === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) =>
        course[searchField].toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, searchField, courses]);

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
          setSearchQuery={setSearchQuery}
          setSearchField={setSearchField}
          searchField={searchField}
        />
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          {filteredCourses.map((course) => (
            <div key={course.id} className="my-3">
              <button onClick={() => setSelectedCourseId(course.id)}>
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
