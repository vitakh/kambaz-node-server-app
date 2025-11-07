import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {

 function findAssignmentsForCourse(courseId) {
   const { assignments } = db;
   return assignments.filter((a) => a.course === courseId);
 }

 function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  db.assignments = [...db.assignments, newAssignment];
  return newAssignment;
}

function deleteAssignment(aid) {
  const { assignments } = db;
  db.assignments = assignments.filter((assignment) => assignment._id !== aid);
}

function updateAssignment(aid, assignmentUpdates) {
  const { assignments } = db;
  const assignment = assignments.find((a) => a._id === aid);
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}


 return {
   findAssignmentsForCourse, createAssignment, deleteAssignment, updateAssignment
 };
}
