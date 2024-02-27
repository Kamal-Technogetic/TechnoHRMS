"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = exports.validateHRRegInput = exports.validateRegisterInput = void 0;
const validator_1 = __importDefault(require("validator"));
const moment_1 = __importDefault(require("moment"));
const validateRegisterInput = ({ name, email, password, contactNumber, jobTitle, department, dateOfJoining, shift, }) => {
    const errors = {};
    if (name.trim() === "") {
        errors.username = "UserNmame not be empty";
    }
    if (email.trim() === "") {
        errors.email = "email not be empty";
    }
    else {
        if (!validator_1.default.isEmail(email)) {
            errors.email = "Email must be a valid address";
        }
    }
    if (password.trim() === "") {
        errors.password = "Password must not be Empty";
    }
    if (contactNumber.trim() === "") {
        errors.contactNumber = "Contact number must not be empty";
    }
    else if (!validator_1.default.isMobilePhone(contactNumber, "any", { strictMode: false })) {
        errors.contactNumber = "Invalid contact number";
    }
    if (!/^\d+$/.test(contactNumber)) {
        errors.contactNumber = "Invalid contact number";
    }
    if (jobTitle.trim() === "") {
        errors.jobTitle = "Job title must not be empty";
    }
    if (department.trim() === "") {
        errors.department = "Department must not be empty";
    }
    dateOfJoining = dateOfJoining !== null && dateOfJoining !== void 0 ? dateOfJoining : (0, moment_1.default)().format("YYYY-MM-DD");
    if (!validator_1.default.isISO8601(dateOfJoining, { strict: true })) {
        errors.dateOfJoining = "Invalid date format for date of joining";
    }
    return { errors, valid: Object.keys(errors).length < 1 };
};
exports.validateRegisterInput = validateRegisterInput;
const validateHRRegInput = ({ name, email, password, contactNumber, jobTitle, department, dateOfJoining, shift, }) => {
    const errors = {};
    if (name.trim() === "") {
        errors.username = "UserNmame not be empty";
    }
    if (email.trim() === "") {
        errors.email = "email not be empty";
    }
    else {
        if (!validator_1.default.isEmail(email)) {
            errors.email = "Email must be a valid address";
        }
    }
    if (password.trim() === "") {
        errors.password = "Password must not be Empty";
    }
    if (contactNumber.trim() === "") {
        errors.contactNumber = "Contact number must not be empty";
    }
    else if (!validator_1.default.isMobilePhone(contactNumber, "any", { strictMode: false })) {
        errors.contactNumber = "Invalid contact number";
    }
    if (!/^\d+$/.test(contactNumber)) {
        errors.contactNumber = "Invalid contact number";
    }
    if (department.trim() === "") {
        errors.department = "Department must not be empty";
    }
    dateOfJoining = dateOfJoining !== null && dateOfJoining !== void 0 ? dateOfJoining : (0, moment_1.default)().format("YYYY-MM-DD");
    if (!validator_1.default.isISO8601(dateOfJoining, { strict: true })) {
        errors.dateOfJoining = "Invalid date format for date of joining";
    }
    return { errors, valid: Object.keys(errors).length < 1 };
};
exports.validateHRRegInput = validateHRRegInput;
const validateLoginInput = ({ email, password }) => {
    const errors = {};
    if (email === "") {
        errors.email = "email not be empty";
    }
    else {
        if (!validator_1.default.isEmail(email)) {
            errors.email = "Email must be a valid address";
        }
    }
    if (password.trim() === "") {
        errors.password = "Password must not be Empty";
    }
    return { errors, valid: Object.keys(errors).length < 1 };
};
exports.validateLoginInput = validateLoginInput;
const validateUpateInput = ({ gender, religion, nationality, dateOfBirth, fatherName, emergencyNumber, relationWithEmergencyNumber, }) => {
    const errors = {};
    if (gender.trim() === "") {
        errors.gender = "Select Gender";
    }
    if (religion.trim() === "") {
        errors.gender = "Select Religion";
    }
    if (nationality.trim() === "") {
        errors.gender = "Select Nationality";
    }
    if (!validator_1.default.isISO8601(dateOfBirth, { strict: true })) {
        errors.dateOfBirth = "Invalid date format for date of Birth";
    }
    if (fatherName.trim() === "") {
        errors.gender = "Select Fathers Name";
    }
    if (emergencyNumber.trim() === "") {
        errors.gender = "Select Emergency Number";
    }
    if (relationWithEmergencyNumber.trim() === "") {
        errors.gender = "Select Relation with Emergency contact";
    }
    return { errors, valid: Object.keys(errors).length < 1 };
};
// export { validateRegisterInput, validateLoginInput };
