import EmployeeDetails from "../../module/employeeBasicDetails";
import { validateLoginInput } from "../../util/validator";
import { generateToken } from "../../util/generateToken";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";

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
  jobTitle: string;
}

export const login_resolver = {
  Mutation: {
    loginEmployee: async (parent: any, args: loginEmployeeArgs) => {
      try {
        const { email, password } = args.input;
        const { valid, errors } = validateLoginInput(args.input);

        if (!valid) {
          throw new GraphQLError("Login-Validation-Error: ", errors);
        }

        const user = await EmployeeDetails.findOne({ email });

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
          jobTitle: user.jobTitle,
        };
        const token = generateToken(employee);
        console.log("console in Login: ", user);

        return { ...user, id: user._id, token };
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  },
};
