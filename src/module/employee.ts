import { Schema, model, Document } from "mongoose";

export interface EmployeeDetailsInterface {
  _id: String;
  name: String;
  email: String;
  password: String;
  phone: String;
  address: String;
  position: String;
  department: String;
  profile: String;
  start_date: Date;
  end_date: Date;
  salary: String;
}
const employees = new Schema<EmployeeDetailsInterface>({});
