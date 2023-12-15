import mongoose from "mongoose";

const AnnotationDataSchema = new mongoose.Schema({
  title: String,
  notes: String,
  priority: Boolean,
});

export default mongoose.model("Annotations", AnnotationDataSchema);
