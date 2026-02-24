import { Document } from "mongoose";

export default interface Doc extends Document {
  name?: string;
  content?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}