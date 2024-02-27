import EmployeeDetails from "../../module/employeeBasicDetails";
import {
  validateRegisterInput,
  validateHRRegInput,
} from "../../util/validator";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../../util/generateToken";
import moment from "moment";
import { check_auth } from "../../util/check_auth";
import { JwtPayload } from "jsonwebtoken";

interface RegisterEmployeeArgs {
  input: {
    name: string;
    email: string;
    password: string;
    contactNumber: string;
    jobTitle: string;
    department: string;
    dateOfJoining?: string;
    shift?: string;
  };
}

interface RegisterHRArgs {
  input: {
    name: string;
    email: string;
    password: string;
    contactNumber: string;
    jobTitle?: string;
    department?: string;
    dateOfJoining?: string;
    shift?: string;
  };
}

interface Employee {
  id: string;
  email: string;
  username: string;
  jobTitle: string;
}

export const registration_resolver = {
  Mutation: {
    registerEmployee: async (
      parent: any,
      args: RegisterEmployeeArgs,
      context: any
    ) => {
      try {
        const {
          name,
          email,
          password,
          contactNumber,
          jobTitle,
          department,
          dateOfJoining,
          shift,
        } = args.input;

        const { employJobTitle } = check_auth(context) as JwtPayload;

        if (employJobTitle !== "HR") {
          throw new GraphQLError(
            "Warning: You have No authentication to create Employee.",
            {
              extensions: {
                code: "Only Admin and HR can create Other Employee Profile.",
              },
            }
          );
        }

        const validatedDateOfJoining =
          dateOfJoining ?? moment().format("YYYY-MM-DD");

        const { valid, errors } = validateRegisterInput({
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
          throw new GraphQLError("Validation-Error", errors);
        }

        const emp = await EmployeeDetails.findOne({ email });
        if (emp) {
          throw new GraphQLError("Employee with this email Already Exist", {
            extensions: {
              code: "Warning: This Email is Already Taken by other Employee",
            },
          });
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const uuid = uuidv4();
        const timestampPart = uuid.slice(0, 2);
        const currentDate = new Date();

        const formattedDate = `${currentDate.getFullYear()}${(
          currentDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}${currentDate
          .getDate()
          .toString()
          .padStart(2, "0")}`;

        const newEmp = new EmployeeDetails({
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

        const res = await newEmp.save();

        const employee: Employee = {
          id: res._id,
          email: res.email,
          username: res.name,
          jobTitle: res.jobTitle,
        };
        const formattedDateOfJoining = moment(validatedDateOfJoining).format(
          "YYYY-MM-DD"
        );

        const token = generateToken(employee);

        return {
          ...res.toObject(),
          id: res._id,
          token,
          dateOfJoining: formattedDateOfJoining,
        };
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },

    registerHR: async (parent: any, args: RegisterEmployeeArgs) => {
      try {
        const {
          name,
          email,
          password,
          contactNumber,
          jobTitle,
          department,
          dateOfJoining,
          shift,
        } = args.input;

        const validatedDateOfJoining =
          dateOfJoining ?? moment().format("YYYY-MM-DD");

        const validateJobTitle = jobTitle ?? "HR";
        const validateDepartment = department ?? "HR";

        const { valid, errors } = validateHRRegInput({
          name,
          email,
          password,
          contactNumber,
        });
        if (!valid) {
          console.log("Validation Errors: ", errors);
          throw new GraphQLError("Validation-Error", errors);
        }

        const emp = await EmployeeDetails.findOne({ email });
        if (emp) {
          throw new GraphQLError("Employee with this email Already Exist", {
            extensions: {
              code: "Warning: This Email is Already Taken by other Employee",
            },
          });
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const uuid = uuidv4();
        const timestampPart = uuid.slice(0, 2);
        const currentDate = new Date();

        const formattedDate = `${currentDate.getFullYear()}${(
          currentDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}${currentDate
          .getDate()
          .toString()
          .padStart(2, "0")}`;

        const newEmp = new EmployeeDetails({
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

        const res = await newEmp.save();

        const employee: Employee = {
          id: res._id,
          email: res.email,
          username: res.name,
          jobTitle: res.jobTitle,
        };
        const token = generateToken(employee);

        const formattedDateOfJoining = moment(validatedDateOfJoining).format(
          "YYYY-MM-DD"
        );

        return {
          ...res.toObject(),
          id: res._id,
          token,
          dateOfJoining: formattedDateOfJoining,
        };
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  },
};
