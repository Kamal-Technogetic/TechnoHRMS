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
exports.resolvers = void 0;
const employeeBasicDetails_1 = __importDefault(require("../../module/employeeBasicDetails"));
// import EmployeeDetails from "../module/employeeBasicDetails.ts";
const validator_1 = require("../../util/validator");
const graphql_1 = require("graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtsecreat = process.env.SECRET_KEY || "default_secret_key";
function generateToken(user) {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, jwtsecreat, { expiresIn: "1h" });
}
exports.resolvers = {
    Query: {
        default: () => {
            return "Server is running smoothly!";
        },
        getEmpDetails() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const empDetail = yield employeeBasicDetails_1.default.find().sort({ timeStemp: -1 });
                    return empDetail;
                }
                catch (error) {
                    throw new Error(error.message);
                }
            });
        },
    },
    Mutation: {
        registerEmployee(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { name, email, password, contactNumber, jobTitle, department, dateOfJoining, } = args.input;
                    const { valid, errors } = (0, validator_1.validateRegisterInput)({
                        name,
                        email,
                        password,
                        contactNumber,
                        jobTitle,
                        department,
                        dateOfJoining,
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
                    if (!/^\d+$/.test(contactNumber)) {
                        throw new graphql_1.GraphQLError("Invalid Contact Number", {
                            extensions: {
                                code: "Contact Number should only contain numbers.",
                            },
                        });
                    }
                    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                    if (!dateRegex.test(dateOfJoining)) {
                        throw new graphql_1.GraphQLError("Invalid Date Format", {
                            extensions: {
                                code: "Date should be in the format YYYY-MM-DD.",
                            },
                        });
                    }
                    const hashPassword = yield bcryptjs_1.default.hash(password, 12);
                    const uuid = (0, uuid_1.v4)();
                    const timestampPart = uuid.slice(0, 8);
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
                        dateOfJoining,
                    });
                    const res = yield newEmp.save();
                    const employee = {
                        id: res._id,
                        email: res.email,
                        username: res.name,
                    };
                    const token = generateToken(employee);
                    return Object.assign(Object.assign({}, res.toObject()), { id: res._id, token });
                }
                catch (error) {
                    console.log("Error on Registering New Employee: ", error);
                    throw new Error(error.message);
                }
            });
        },
        loginEmployee(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { email, password } = args.input;
                    const { valid, errors } = (0, validator_1.validateLoginInput)(args.input);
                    if (!valid) {
                        throw new graphql_1.GraphQLError("Login-Validation-Error: ", errors);
                    }
                    const user = yield employeeBasicDetails_1.default.findOne({ email }).lean();
                    if (!user) {
                        errors.general = "User not Found";
                        throw new graphql_1.GraphQLError("Wron-Credentials: ", errors);
                    }
                    const match = yield bcryptjs_1.default.compare(password.valueOf(), user.password);
                    if (!match) {
                        errors.general = "Wrong Credentials";
                        throw new graphql_1.GraphQLError("Wrong Credentials: ", errors);
                    }
                    const employee = {
                        id: user._id,
                        email: user.email,
                        username: user.name,
                    };
                    const token = generateToken(employee);
                    return Object.assign(Object.assign({}, user.toObject()), { id: user._id, token });
                }
                catch (error) {
                    console.log("Error on Employee Login: ", error);
                    throw new Error(error.message);
                }
            });
        },
        // async updateEmpDetails(parent, args, context) {
        //   try {
        //     const emp = check_auth(context);
        //     const {
        //       gender,
        //       religion,
        //       nationality,
        //       dateOfBirth,
        //       fatherName,
        //       emergencyNumber,
        //       relationWithEmergencyNumber,
        //     } = args.input;
        //     // const { valid, errors } = validateLoginInput(email, password);
        //     // const updateDetails = new
        //   } catch (error) {
        //     console.log("Error on Employee Data Updation: ", error);
        //     throw new Error(error);
        //   }
        // },
    },
};
