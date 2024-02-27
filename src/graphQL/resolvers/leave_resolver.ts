import EmployeeDetails, { Attendance } from "../../module/employeeBasicDetails";
import { GraphQLError } from "graphql";
import { JwtPayload } from "jsonwebtoken";
import { check_auth } from "../../util/check_auth";
import { UUID } from "crypto";
import moment from "moment";
import mongoose from "mongoose";

interface LeavesInput {
  input: {
    shortLeave: string;
    totalLeaveBalance: string;
    sickLeaveBalance: string;
    personalLeaveBalance: string;
    otherLeaveBalance: string;
  };
}

export const leave_resolver = {
  Mutation: {
    setLeavesGeneralApi: async (
      parent: any,
      args: LeavesInput,
      context: any
    ) => {
      try {
        const {
          shortLeave,
          totalLeaveBalance,
          sickLeaveBalance,
          personalLeaveBalance,
          otherLeaveBalance,
        } = args.input;

        const { employJobTitle } = check_auth(context) as JwtPayload;

        if (employJobTitle !== "HR") {
          throw new GraphQLError(
            "Warning: You are Not authentication to Create/Modify Leave.",
            {
              extensions: {
                code: "Only Admin and HR can Create/Modify Leaves.",
              },
            }
          );
        }

        
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },

    // applyleave: async (parent: any, args: LeavesInput, context: any) => {},

    // updateLeaveRequest: async (parent: any, args: LeavesInput) => {},
    // deleteApplyLeave: async (parent: any, args: LeavesInput) => {},
    // approveRejectLeave: async (parent: any, args: LeavesInput) => {},
    // currentLeaveStatus: async (parent: any, args: LeavesInput) => {},
  },
};
