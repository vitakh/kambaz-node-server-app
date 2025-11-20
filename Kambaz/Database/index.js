import courses from "./courses.js";
import modules from "./modules.js";
import assignments from "./assignments.js";
import users from "./users.js";
import enrollments from "./enrollments.js";

const db = {
  courses:     Array.isArray(courses)     ? courses     : [],
  modules:     Array.isArray(modules)     ? modules     : [],
  assignments: Array.isArray(assignments) ? assignments : [],
  users:       Array.isArray(users)       ? users       : [],
  enrollments: Array.isArray(enrollments) ? enrollments : [],
};
 
export default db;