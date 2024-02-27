import EmployeeDetails, { Attendance } from "../../module/employeeBasicDetails";
import { GraphQLError } from "graphql";
import { JwtPayload } from "jsonwebtoken";
import { check_auth } from "../../util/check_auth";
import { UUID } from "crypto";
import moment from "moment";
import mongoose from "mongoose";

interface employeeInput {
  input: {
    userId: UUID;
  };
}

export const additinalDetails_resolver = {
  Mutation: {
    // updateLeaves: async (parent: any) => {},

    upadteEmpDetails: async (
      parent: any,
      args: employeeInput,
      context: any
    ) => {
      try {
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  },
};
