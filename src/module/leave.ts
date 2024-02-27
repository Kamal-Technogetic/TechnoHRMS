import { Schema } from "mongoose";

export interface leaveDetailsInterface {
  _id: string;
  email: string;
  shortLeave: number;
  totalLeaveBalance: number;
  sickLeaveBalance: number;
  personalLeaveBalance: number;
  otherLeaveBalance: number;
  LeaveDetails: [
    {
      _id: String;
      leaveId: string;
      leaveType: string;
      leaveApproval: string;
      reasonForLeave: string;
      status: string;
      startDate: Date;
      endDate: Date;
      managerApprovalRequired: Boolean;
      comments: String;
      statusHistory: [{ status: String; updatedBy: String; timestamp: Date }];
    }
  ];
}
const employees = new Schema<leaveDetailsInterface>({
  _id: String,
  shortLeave: String,
  totalLeaveBalance: String,
  sickLeaveBalance: String,
  personalLeaveBalance: String,
  otherLeaveBalance: String,
  LeaveDetails: [
    {
      leaveId: String,
      leaveType: String,
      reasonForLeave: String,
      leaveApproval: String,

      status: String,
      startDate: Date,
      endDate: Date,
      managerApprovalRequired: Boolean,
      comments: String,
      statusHistory: [{ status: String, updatedBy: String, timestamp: Date }],
    },
  ],
});
