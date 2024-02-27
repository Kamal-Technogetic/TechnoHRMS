import { Schema, model, Document } from "mongoose";

export interface attendanceDetailsInterface {
  _id: String;
  date:Date;
  start_time: Date;
  end_time: Date;
  note: String;
}
const employees = new Schema<attendanceDetailsInterface>({});
