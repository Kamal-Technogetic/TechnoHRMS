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
exports.login_resolver = void 0;
const employeeBasicDetails_1 = __importDefault(require("../../module/employeeBasicDetails"));
const validator_1 = require("../../util/validator");
const generateToken_1 = require("../../util/generateToken");
const graphql_1 = require("graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.login_resolver = {
    Mutation: {
        loginEmployee: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
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
                const token = (0, generateToken_1.generateToken)(employee);
                return Object.assign(Object.assign({}, user), { id: user._id, token });
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
    },
};
