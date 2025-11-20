import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {

 function findAssignmentsForCourse(courseId) {
  return model.find({course: courseId});
 }

 function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  return model.create(newAssignment);
}

function deleteAssignment(aid) {
  return model.deleteOne({_id: aid});
}

function updateAssignment(aid, assignmentUpdates) {
  return model.updateOne({_id: aid}, assignmentUpdates);
}


 return {
   findAssignmentsForCourse, createAssignment, deleteAssignment, updateAssignment
 };
}
