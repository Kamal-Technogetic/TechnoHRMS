"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (Gender = {}));
// Function to generate employee ID
function generateEmployeeId() {
    const uuid = (0, uuid_1.v4)();
    const timestampPart = uuid.slice(0, 8);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;
    return `TG${formattedDate}${timestampPart}`;
}
// Define schema
const employeeBasicDetailsSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: () => generateEmployeeId(),
    },
    name: String,
    email: String,
    token: String,
    dateOfBirth: String,
    dateOfJoining: Date,
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: [String, String],
        latitude: { type: [Number], required: true },
        longitude: { type: [Number], required: true },
    },
    password: String,
    shift: { type: String, default: "Day" },
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
            _id: String,
            email: String,
            timeIn: Date,
            timeOut: Date,
            shiftDuration: String,
            present: { type: Boolean, default: false },
            note: String,
        },
    ],
    shortLeave: String,
    totalLeaveBalance: String,
    sickLeaveBalance: String,
    personalLeaveBalance: String,
    otherLeaveBalance: String,
    leaves: [
        {
            leaveId: String,
            leaveType: String,
            leaveApproval: String,
            reasonForLeave: String,
            status: String,
            startDate: Date,
            endDate: Date,
            managerApprovalRequired: Boolean,
            comments: String,
            statusHistory: [{ status: String, updatedBy: String, timestamp: Date }],
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
}, { timestamps: true });
// Export model
exports.default = (0, mongoose_1.model)("EmployeeDetails", employeeBasicDetailsSchema);
