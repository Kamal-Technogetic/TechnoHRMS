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
Object.defineProperty(exports, "__esModule", { value: true });
exports.leave_resolver = void 0;
exports.leave_resolver = {
    Mutation: {
        setLeavesGeneralApi: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
        // applyleave: async (parent: any, args: LeavesInput, context: any) => {},
        // updateLeaveRequest: async (parent: any, args: LeavesInput) => {},
        // deleteApplyLeave: async (parent: any, args: LeavesInput) => {},
        // approveRejectLeave: async (parent: any, args: LeavesInput) => {},
        // currentLeaveStatus: async (parent: any, args: LeavesInput) => {},
    },
};
