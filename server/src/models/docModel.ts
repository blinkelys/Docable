import { Schema, model, InferSchemaType } from "mongoose";

const docSchema = new Schema(
  {
    name: { type: String },
    content: { type: String },

  },
  {
    timestamps: true,
  },
);

// Let Mongoose infer the type automatically
export type Doc = InferSchemaType<typeof docSchema>;

const DocModel = model<Doc>("Doc", docSchema);
export default DocModel;