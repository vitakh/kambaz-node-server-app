import * as dao from "./dao.js";
import CoursesDao from "../Courses/dao.js";

export default function EnrollmentRoutes(app) {
  const coursesDao = CoursesDao();

  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await coursesDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const enrollInCourse = async (req, res) => {
    const currentUser = req.session["currentUser"]; 
    const { courseId } = req.params; 
    const status = await dao.enrollUserInCourse(currentUser._id, courseId); 
    res.json(status); 
  }

  const unenrollFromCourse = async (req, res) => {
    const currentUser = req.session["currentUser"]; 
    const { courseId } = req.params; 
    const data = await dao.deleteEnrollment(currentUser._id, courseId); 
    res.json(data); 
  }

  const findAllEnrollments = async (req, res) => {
    const all = await dao.getEnrollments(); 
    res.json(all); 
  }

  const findEnrollmentsForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollments = await dao.findCoursesForUser(userId);
    res.json(enrollments);
  };

    const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await dao.enrollUserInCourse(uid, cid);
    res.send(status);
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await dao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/enroll/:courseId", enrollInCourse); 
  app.delete("/api/users/unenroll/:courseId", unenrollFromCourse); 
  app.get("/api/users/enrollments", findAllEnrollments); 
  app.get("/api/users/:userId/enrollments", findEnrollmentsForEnrolledUser); 
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}