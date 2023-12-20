import mongoose, { Schema } from "mongoose";

interface AnnotationData {
  title: string;
  notes: string;
  priority: boolean;
}

const AnnotationDataSchema: Schema = new mongoose.Schema(
  {
    title: String,
    notes: String,
    priority: Boolean,
  },
  { versionKey: false }
);

export default mongoose.model<AnnotationData>(
  "Annotations",
  AnnotationDataSchema
);
