import React from "react";

const ProgressBar = ({ course }) => {
  const progress = course;
  let width = 0;

  // Calculate width based on progress status
  if (progress === "Start") {
    width = 30;
  } else if (progress === "In Progress") {
    width = 50;
  } else if (progress === "Done") {
    width = 100;
  }
  return (
    <div className="w-full bg-gray-200 rounded-full h-6 mb-4 dark:bg-gray-700">
      <div
        className={`text-white h-6 text-center rounded-full ${
          progress === "Start" && "bg-[#6387ff]"
        }
        ${progress === "In Progress" && "bg-[#f9c440]"} ${
          progress === "Done" && "bg-[#319f57]/90"
        } `}
        style={{ width: `${width}%` }}
      >
        {progress === "Start" && "Start"}
        {progress === "In Progress" && "In Progress"}
        {progress === "Done" && "Done"}
      </div>
    </div>
  );
};

export default ProgressBar;
