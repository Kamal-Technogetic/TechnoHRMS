"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const employees = new mongoose_1.Schema({
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
