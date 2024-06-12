import React, { useState, useEffect, useRef } from "react";

const Syllabus = ({ syllabus }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const accordionRef = useRef(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (accordionRef.current && !accordionRef.current.contains(event.target)) {
      setActiveIndex(null);
    }
  };

  useEffect(() => {
    if (activeIndex !== null) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeIndex]);

  return (
    <div
      className="flex justify-center mx-4 lg:mr-20 md:mx-10  mt-5"
      ref={accordionRef}
    >
      <div id="accordion-collapse" data-accordion="collapse">
        {syllabus.map((item, index) => (
          <div key={index}>
            <h2 id={`accordion-collapse-heading-${index + 1}`}>
              <button
                type="button"
                className="flex items-center justify-between w-[15rem] md:w-[35rem] p-5 font-medium md:rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                data-accordion-target={`#accordion-collapse-body-${index + 1}`}
                aria-expanded={activeIndex === index ? "true" : "false"}
                aria-controls={`accordion-collapse-body-${index + 1}`}
                onClick={() => toggleAccordion(index)}
              >
                <span>Week {item.week}</span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 rotate-${
                    activeIndex === index ? "180" : "0"
                  } shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id={`accordion-collapse-body-${index + 1}`}
              className={`p-5 border w-[15rem] md:w-full border-b-0 border-gray-200 dark:border-gray-700 ${
                activeIndex === index ? "" : "hidden"
              }`}
              aria-labelledby={`accordion-collapse-heading-${index + 1}`}
            >
              <p className="mb-2 text-gray-500 font-bold dark:text-gray-400">
                {item.topic}
              </p>
              <p className="text-gray-500 dark:text-gray-400">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Syllabus;
