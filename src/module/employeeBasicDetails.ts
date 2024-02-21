import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define types for your schema
export interface Attendance {
  timeIn: Date;
  timeOut: Date;
  shift: string;
  shiftDuration: string;
  shiftStartTime: string;
  shiftEndTime: string;
  present: boolean;
}

export interface Leave {
  leaveId: string;
  leaveApproval: string;
  shortLeave: string;
  reasonForLeave: string;
  totalLeaveBalance: string;
  sickLeaveBalance: string;
  personalLeaveBalance: string;
  otherLeaveBalance: string;
  status: string;
}

export interface Salary {
  date: Date;
  bankAccountNumber: string;
  ifscCode: string;
  basicSalary: number;
  housingAllowances: number;
  travelAllowances: number;
  bonus: number;
  taxDeduction: number;
  deduction: number;
}

export interface DocumentInfo {
  highSchoolClgName: string;
  highSchoolboard: string;
  highSchoolpercentage: string;
  highSchoolCertificate: string;

  intermediateClgName: string;
  intermediateboard: string;
  intermediatepercentage: string;
  intermediateCertificate: string;

  bachelorsClgName: string;
  bachelorsboard: string;
  bachelorspercentage: string;
  bachelorsCertificate: string;

  mastersClgName: string;
  mastersboard: string;
  masterspercentage: string;
  mastersCertificate: string;

  certificationClgName: string;
  certificationboard: string;
  certificationpercentage: string;
  certificationCertificate: string;

  passportNumber: string;
  dlNumber: string;
  aadharNumber: string;
}

export interface EmployeeDetailsDocument extends Document {
  _id: string;
  name: string;
  email: string;
  token: string;
  dateOfBirth: string;
  dateOfJoining: Date;
  location: {
    type: string;
    coordinates: [string, string];
    latitude: number[];
    longitude: number[];
  };
  password: string;
  contactNumber: string;
  jobTitle: string;
  department: string;
  performanceRatings: number;
  nationality: string;
  gender: string;
  religion: string;
  photo: string;
  fatherName: string;
  emergencyNumber: string;
  relationWithEmergencyNumber: string;
  attendance: Attendance[];
  leaves: Leave[];
  salary: Salary[];
  workStatus: string;
  documents: DocumentInfo[];
}

// Function to generate employee ID
function generateEmployeeId(): string {
  const uuid = uuidv4();
  const timestampPart = uuid.slice(0, 8);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;
  return `TG${formattedDate}${timestampPart}`;
}

// Define schema
const employeeBasicDetailsSchema = new Schema<EmployeeDetailsDocument>(
  {
    _id: {
      type: String,
      default: () => generateEmployeeId(),
    },
    name: String,
    email: String,
    token: String,
    dateOfBirth: String,
    dateOfJoining: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: [String, String],
      latitude: { type: [Number], required: true },
      longitude: { type: [Number], required: true },
    },
    password: String,
    contactNumber: String,
    jobTitle: String,
    department: String,
    performanceRatings: Number,
    nationality: String,
    gender: String,
    religion: String,
    photo: String,
    fatherName: String,
    emergencyNumber: String,
    relationWithEmergencyNumber: String,
    attendance: [
      {
        timeIn: {
          type: Date,
          default: Date.now,
        },
        timeOut: {
          type: Date,
          default: Date.now,
        },
        shift: String,
        shiftDuration: String,
        shiftStartTime: String,
        shiftEndTime: String,
        present: Boolean,
      },
    ],
    leaves: [
      {
        leaveId: String,
        leaveApproval: String,
        shortLeave: String,
        reasonForLeave: String,
        totalLeaveBalance: String,
        sickLeaveBalance: String,
        personalLeaveBalance: String,
        otherLeaveBalance: String,
        status: String,
      },
    ],
    salary: [
      {
        date: Date,
        bankAccountNumber: String,
        ifscCode: String,
        basicSalary: Number,
        housingAllowances: Number,
        travelAllowances: Number,
        bonus: Number,
        taxDeduction: Number,
        deduction: Number,
      },
    ],
    workStatus: String,
    documents: [
      {
        highSchoolClgName: String,
        highSchoolboard: String,
        highSchoolpercentage: String,
        highSchoolCertificate: String,
        intermediateClgName: String,
        intermediateboard: String,
        intermediatepercentage: String,
        intermediateCertificate: String,
        bachelorsClgName: String,
        bachelorsboard: String,
        bachelorspercentage: String,
        bachelorsCertificate: String,
        mastersClgName: String,
        mastersboard: String,
        masterspercentage: String,
        mastersCertificate: String,
        certificationClgName: String,
        certificationboard: String,
        certificationpercentage: String,
        certificationCertificate: String,
        passportNumber: String,
        dlNumber: String,
        aadharNumber: String,
      },
    ],
  },
  { timestamps: true }
);

// Export model
export default model<EmployeeDetailsDocument>(
  "EmployeeDetails",
  employeeBasicDetailsSchema
);
