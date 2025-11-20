import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function ModulesDao() {

function createModule(module) {
  const newModule = { ...module, _id: uuidv4() };
  return model.create(newModule);
}

 function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
 }

 function deleteModule(moduleId) {
  return model.deleteOne({_id: moduleId});
}

function updateModule(moduleId, moduleUpdates) {
  return model.updateOne({_id: moduleId}, moduleUpdates);
}

 return {
   findModulesForCourse, createModule, deleteModule, updateModule
 };
}
