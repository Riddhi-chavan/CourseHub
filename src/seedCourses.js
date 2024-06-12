// seedCourses.js
import { database } from "./firebaseConfig";
import { ref, set } from "firebase/database";
import coursesData from "./dummy.json";

export const seedCourses = async () => {
  try {
    for (const course of coursesData) {
      await set(ref(database, "courses/" + course.id), course);
    }
    console.log("Courses added successfully!");
  } catch (error) {
    console.error("Error adding courses: ", error);
  }
};
