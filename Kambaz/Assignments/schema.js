import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
   _id: String,
   title: String,
   course: String,
   points: Number,
   description: String,
   until_date: Date,
   from_date: Date,
   due_date: Date,
 },
 { collection: "assignments" }
);
export default assignmentSchema;