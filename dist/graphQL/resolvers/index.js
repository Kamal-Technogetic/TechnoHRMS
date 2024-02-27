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
const attendence_resolver_1 = require("./attendence_resolver");
const registration_resolver_1 = require("./registration_resolver");
const login_resolver_1 = require("./login_resolver");
const leave_resolver_1 = require("./leave_resolver");
const additinalDetails_resolver_1 = require("./additinalDetails_resolver");
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
    Mutation: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, registration_resolver_1.registration_resolver.Mutation), attendence_resolver_1.attendence_resolver.Mutation), login_resolver_1.login_resolver.Mutation), leave_resolver_1.leave_resolver.Mutation), additinalDetails_resolver_1.additinalDetails_resolver.Mutation),
};
