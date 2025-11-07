import * as dao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";
import CoursesDao from "../Courses/dao.js";

export default function EnrollmentRoutes(app, db) {
    const coursesDao = CoursesDao(db);
    const dao = EnrollmentsDao(db);

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = coursesDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const enrollInCourse = (req, res) => {
    const currentUser = req.session["currentUser"]; 
    const { courseId } = req.params; 
    const status = dao.enrollUserInCourse(currentUser._id, courseId); 
    res.json(status); 
  }

  const unenrollFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"]; 
    const { courseId } = req.params; 
    const data = dao.deleteEnrollment(currentUser._id, courseId); 
    res.json(data); 
  }

  const findAllEnrollments = (req, res) => {
    const all = dao.getEnrollments(); 
    res.json(all); 
  }

  const findEnrollmentsForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/enroll/:courseId", enrollInCourse); 
  app.delete("/api/users/unenroll/:courseId", unenrollFromCourse); 
  app.get("/api/users/enrollments", findAllEnrollments); 
  app.get("/api/users/:userId/enrollments", findEnrollmentsForEnrolledUser); 
}