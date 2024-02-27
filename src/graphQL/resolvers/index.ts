import EmployeeDetails from "../../module/employeeBasicDetails";
// import EmployeeDetails from "../module/employeeBasicDetails.ts";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../util/validator";
import { check_auth } from "../../util/check_auth";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const jwtsecreat = process.env.SECRET_KEY || "default_secret_key";

interface RegisterEmployeeArgs {
  input: {
    name: string;
    email: string;
    password: string;
    contactNumber: string;
    jobTitle: string;
    department: string;
    dateOfJoining: string;
  };
}

interface loginEmployeeArgs {
  input: {
    email: string;
    password: string;
  };
}

interface Employee {
  id: string;
  email: string;
  username: string;
}

function generateToken(user: Employee): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    jwtsecreat,
    { expiresIn: "1h" }
  );
}

export const resolvers = {
  Query: {
    default: () => {
      return "Server is running smoothly!";
    },

    async getEmpDetails() {
      try {
        const empDetail = await EmployeeDetails.find().sort({ timeStemp: -1 });
        return empDetail;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  },
  Mutation: {
    async registerEmployee(parent: any, args: RegisterEmployeeArgs) {
      try {
        const {
          name,
          email,
          password,
          contactNumber,
          jobTitle,
          department,
          dateOfJoining,
        } = args.input;

        const { valid, errors } = validateRegisterInput({
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

        if (!/^\d+$/.test(contactNumber)) {
          throw new GraphQLError("Invalid Contact Number", {
            extensions: {
              code: "Contact Number should only contain numbers.",
            },
          });
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (!dateRegex.test(dateOfJoining)) {
          throw new GraphQLError("Invalid Date Format", {
            extensions: {
              code: "Date should be in the format YYYY-MM-DD.",
            },
          });
        }
        const hashPassword = await bcrypt.hash(password, 12);

        const uuid = uuidv4();
        const timestampPart = uuid.slice(0, 8);
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
          dateOfJoining,
        });

        const res = await newEmp.save();

        const employee: Employee = {
          id: res._id,
          email: res.email,
          username: res.name,
        };
        const token = generateToken(employee);

        return { ...res.toObject(), id: res._id, token };
      } catch (error) {
        console.log("Error on Registering New Employee: ", error);
        throw new Error((error as Error).message);
      }
    },

    async loginEmployee(parent: any, args: loginEmployeeArgs) {
      try {
        const { email, password } = args.input;
        const { valid, errors } = validateLoginInput(args.input);

        if (!valid) {
          throw new GraphQLError("Login-Validation-Error: ", errors);
        }

        const user = await EmployeeDetails.findOne({ email }).lean();
        if (!user) {
          errors.general = "User not Found";
          throw new GraphQLError("Wron-Credentials: ", errors);
        }

        const match = await bcrypt.compare(password.valueOf(), user.password);
        if (!match) {
          errors.general = "Wrong Credentials";
          throw new GraphQLError("Wrong Credentials: ", errors);
        }

        const employee: Employee = {
          id: user._id,
          email: user.email,
          username: user.name,
        };
        const token = generateToken(employee);
        return { ...user.toObject(), id: user._id, token };
      } catch (error) {
        console.log("Error on Employee Login: ", error);
        throw new Error((error as Error).message);
      }
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
