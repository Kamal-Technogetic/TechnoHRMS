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
exports.registration_resolver = void 0;
const employeeBasicDetails_1 = __importDefault(require("../../module/employeeBasicDetails"));
const validator_1 = require("../../util/validator");
const graphql_1 = require("graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const generateToken_1 = require("../../util/generateToken");
const moment_1 = __importDefault(require("moment"));
exports.registration_resolver = {
    Mutation: {
        registerEmployee: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { name, email, password, contactNumber, jobTitle, department, dateOfJoining, shift, } = args.input;
                const validatedDateOfJoining = dateOfJoining !== null && dateOfJoining !== void 0 ? dateOfJoining : (0, moment_1.default)().format("YYYY-MM-DD");
                const { valid, errors } = (0, validator_1.validateRegisterInput)({
                    name,
                    email,
                    password,
                    contactNumber,
                    jobTitle,
                    department,
                    dateOfJoining: validatedDateOfJoining,
                    shift,
                });
                if (!valid) {
                    console.log("Validation Errors: ", errors);
                    throw new graphql_1.GraphQLError("Validation-Error", errors);
                }
                const emp = yield employeeBasicDetails_1.default.findOne({ email });
                if (emp) {
                    throw new graphql_1.GraphQLError("Employee with this email Already Exist", {
                        extensions: {
                            code: "Warning: This Email is Already Taken by other Employee",
                        },
                    });
                }
                const hashPassword = yield bcryptjs_1.default.hash(password, 12);
                const uuid = (0, uuid_1.v4)();
                const timestampPart = uuid.slice(0, 2);
                const currentDate = new Date();
                const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}${currentDate
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`;
                const newEmp = new employeeBasicDetails_1.default({
                    _id: `TG${formattedDate}${timestampPart}`,
                    name,
                    email,
                    password: hashPassword,
                    contactNumber,
                    jobTitle,
                    department,
                    dateOfJoining: validatedDateOfJoining,
                    shift,
                });
                const res = yield newEmp.save();
                const employee = {
                    id: res._id,
                    email: res.email,
                    username: res.name,
                };
                const formattedDateOfJoining = (0, moment_1.default)(validatedDateOfJoining).format("YYYY-MM-DD");
                const token = (0, generateToken_1.generateToken)(employee);
                return Object.assign(Object.assign({}, res.toObject()), { id: res._id, token, dateOfJoining: formattedDateOfJoining });
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
        registerHR: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { name, email, password, contactNumber, jobTitle, department, dateOfJoining, shift, } = args.input;
                const validatedDateOfJoining = dateOfJoining !== null && dateOfJoining !== void 0 ? dateOfJoining : (0, moment_1.default)().format("YYYY-MM-DD");
                const validateJobTitle = jobTitle !== null ? jobTitle : "HR";
                const validateDepartment = department !== null && department !== void 0 ? department : "HR";
                const { valid, errors } = (0, validator_1.validateHRRegInput)({
                    name,
                    email,
                    password,
                    contactNumber,
                    jobTitle: validateJobTitle,
                    department: validateDepartment,
                    dateOfJoining: validatedDateOfJoining,
                    shift,
                });
                if (!valid) {
                    console.log("Validation Errors: ", errors);
                    throw new graphql_1.GraphQLError("Validation-Error", errors);
                }
                const emp = yield employeeBasicDetails_1.default.findOne({ email });
                if (emp) {
                    throw new graphql_1.GraphQLError("Employee with this email Already Exist", {
                        extensions: {
                            code: "Warning: This Email is Already Taken by other Employee",
                        },
                    });
                }
                const hashPassword = yield bcryptjs_1.default.hash(password, 12);
                const uuid = (0, uuid_1.v4)();
                const timestampPart = uuid.slice(0, 2);
                const currentDate = new Date();
                const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}${currentDate
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`;
                const newEmp = new employeeBasicDetails_1.default({
                    _id: `TG${formattedDate}${timestampPart}`,
                    name,
                    email,
                    password: hashPassword,
                    contactNumber,
                    jobTitle: validateJobTitle,
                    department: validateDepartment,
                    dateOfJoining: validatedDateOfJoining,
                    shift,
                });
                const res = yield newEmp.save();
                const employee = {
                    id: res._id,
                    email: res.email,
                    username: res.name,
                };
                const formattedDateOfJoining = (0, moment_1.default)(validatedDateOfJoining).format("YYYY-MM-DD"); // Format dateOfJoining
                const token = (0, generateToken_1.generateToken)(employee);
                return Object.assign(Object.assign({}, res.toObject()), { id: res._id, token, dateOfJoining: formattedDateOfJoining });
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
    },
};
