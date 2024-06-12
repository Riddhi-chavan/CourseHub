import { update } from "firebase/database";
import React, { useState } from "react";
import { ref } from "firebase/database";
import { database } from "../firebaseConfig";

const ProgressTracker = ({ courses }) => {
  // Initialize the state for each course progress
  const [courseProgress, setCourseProgress] = useState({});

  // Handler to update course progress state
  const handleProgressChange = (course, courseId, status) => {
    // Update local state
    setCourseProgress((prevProgress) => ({
      ...prevProgress,
      [course]: status,
    }));

    // Update database
    const courseRef = ref(database, `studentCourses/${course}/${courseId}`);
    update(courseRef, {
      ProgressStatus: status,
    })
      .then(() => {
        console.log("Progress status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating progress status:", error);
      });
  };

  console.log(courseProgress);

  return (
    <div className="flex flex-wrap -m-3">
      {courses.map((courseObj) =>
        Object.entries(courseObj).map(([courseId, course]) => (
          <div key={courseId} className="p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="w-full h-[26rem] flex flex-col justify-between p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
              <div>
                <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                  {course.courseName}
                </h5>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {course.description}
                </p>
              </div>
              <ul className="my-4 space-y-3">
                <li>
                  <button
                    className={`flex w-full text-left items-center p-3 text-base font-bold rounded-lg ${
                      course.ProgressStatus === "Start"
                        ? "bg-[#6387ff] text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() =>
                      handleProgressChange(course.id, courseId, "Start")
                    }
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">Start</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex w-full text-left items-center p-3 text-base font-bold rounded-lg ${
                      course.ProgressStatus === "In Progress"
                        ? "bg-[#f9c440] text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() =>
                      handleProgressChange(course.id, courseId, "In Progress")
                    }
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      In progress
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex w-full text-left items-center p-3 text-base font-bold rounded-lg ${
                      course.ProgressStatus === "Done"
                        ? "bg-[#319f57]/90 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() =>
                      handleProgressChange(course.id, courseId, "Done")
                    }
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">Done</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProgressTracker;
