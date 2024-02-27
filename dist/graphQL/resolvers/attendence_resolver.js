"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendence_resolver = void 0;
const employeeBasicDetails_1 = __importDefault(require("../../module/employeeBasicDetails"));
const graphql_1 = require("graphql");
const check_auth_1 = require("../../util/check_auth");
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.attendence_resolver = {
    Mutation: {
        AttendanceLogin(parent, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { userId } = args.input;
                    const emp = yield employeeBasicDetails_1.default.findById(userId);
                    const { id, email } = (0, check_auth_1.check_auth)(context);
                    if (!emp) {
                        throw new graphql_1.GraphQLError("Warning: User not Found", {
                            extensions: {
                                code: "No Emp found with That ID",
                            },
                        });
                    }
                    console.log("output at the login Api: ", id, userId);
                    if (userId !== id) {
                        throw new graphql_1.GraphQLError("Error: Token ID Issue", {
                            extensions: {
                                code: "Please Provide Toke for Same User ID",
                            },
                        });
                    }
                    const currentTime = new Date((0, moment_1.default)().format("YYYY-MM-DD HH:mm"));
                    const shiftStartTime = (0, moment_1.default)().set({
                        hour: 9,
                        minute: 0,
                    });
                    const minutesDifference = Math.round((0, moment_1.default)().diff(shiftStartTime, "minutes"));
                    let note = "";
                    if (minutesDifference > 0) {
                        note = `${minutesDifference} minutes late`;
                    }
                    else if (minutesDifference < 0) {
                        note = `${Math.abs(minutesDifference)} minutes early`;
                    }
                    else {
                        note = "On time";
                    }
                    const newObjectId = new mongoose_1.default.Types.ObjectId();
                    emp.attendance.push({
                        _id: newObjectId,
                        email,
                        note,
                        present: true,
                        timeIn: currentTime,
                    });
                    yield emp.save();
                    return Object.assign(Object.assign({}, emp.toObject()), { message: "Attendance successfully updated", id: emp._id, email, attendance: emp.attendance, name: emp.name });
                }
                catch (error) {
                    throw new Error(error.message);
                }
            });
        },
        AttendanceLogout: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { userId } = args.input;
                const emp = yield employeeBasicDetails_1.default.findById(userId);
                const { id, email } = (0, check_auth_1.check_auth)(context);
                if (!emp) {
                    throw new graphql_1.GraphQLError("Warning: No Emp found with That ID", {
                        extensions: {
                            code: "No Emp found with That ID",
                        },
                    });
                }
                if (userId !== id) {
                    throw new graphql_1.GraphQLError("Error: ID and Token Issue", {
                        extensions: {
                            code: "Please Provide Toke for Same User ID",
                        },
                    });
                }
                const todayAttendanceIndex = emp.attendance.findIndex((attendance) => (0, moment_1.default)(attendance.timeIn).isSame((0, moment_1.default)(), "day"));
                if (todayAttendanceIndex === -1) {
                    throw new graphql_1.GraphQLError("Error: Attendence Error", {
                        extensions: {
                            code: "No attendance record found for today",
                        },
                    });
                }
                emp.attendance[todayAttendanceIndex].timeOut = new Date();
                yield emp.save();
                return Object.assign(Object.assign({}, emp.toObject()), { message: "Logout successful", id: emp._id, attendance: emp.attendance, email, name: emp.name });
            }
            catch (error) {
                throw new graphql_1.GraphQLError("Warning: Logout API Error", {
                    extensions: {
                        code: "No Attendance found for Today",
                    },
                });
            }
        }),
    },
};
