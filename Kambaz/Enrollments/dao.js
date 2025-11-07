import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {

  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }

    function findAllEnrollments() {
    return db.enrollments;
  }

  function findEnrollmentsForUser(userId) {
  const { enrollments } = db;
  const enrollmentsForUser = enrollments.filter((e) => e.user === userId);
  return enrollmentsForUser;
}

function deleteEnrollment(userId, courseId) {
    const { enrollments } = db;
    db.enrollments = enrollments.filter(
      (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
  return db.enrollments;
}

  return { enrollUserInCourse, findAllEnrollments, findEnrollmentsForUser, deleteEnrollment };
}
