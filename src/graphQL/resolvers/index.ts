import EmployeeDetails from "../../module/employeeBasicDetails";
import { attendence_resolver } from "./attendence_resolver";
import { registration_resolver } from "./registration_resolver";
import { login_resolver } from "./login_resolver";
import { leave_resolver } from "./leave_resolver";
import { additinalDetails_resolver } from "./additinalDetails_resolver";

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
    ...registration_resolver.Mutation,
    ...attendence_resolver.Mutation,
    ...login_resolver.Mutation,
    ...leave_resolver.Mutation,
    ...additinalDetails_resolver.Mutation,

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

    // async updateAttendanceOnLogin(
    //   parent: any,
    //   args: empAttendanceInterface,
    //   context: any
    // ) {
    //   try {
    //     const { id } = args.input;
    //     const emp = await employeeBasicDetails.findById(id);
    //     const employeeDetails = check_auth(context) as JwtPayload;
    //     const empId = employeeDetails._id;
    //     console.error("result at Attendence: ", emp);

    //     if (!emp) {
    //       throw new GraphQLError("Warning", {
    //         extensions: {
    //           code: "No Emp found with That ID",
    //         },
    //       });
    //     }

    //     if (!emp.attendance || emp.attendance.length === 0) {
    //       // Handle case where attendance array is empty
    //       throw new GraphQLError("Employee attendance record not found", {
    //         extensions: {
    //           code: "ATTENDANCE_NOT_FOUND",
    //         },
    //       });
    //     }

    //     const currentTime = new Date();
    //     const shiftStartTime = new Date().setHours(9, 0, 0, 0);
    //     const minutesDifference = Math.round(
    //       (currentTime.getTime() - shiftStartTime) / 60000
    //     );

    //     let note = "";
    //     if (minutesDifference > 0) {
    //       note = `${minutesDifference} minutes late`;
    //     } else if (minutesDifference < 0) {
    //       note = `${Math.abs(minutesDifference)} minutes early`;
    //     } else {
    //       note = "On time";
    //     }

    //     emp.attendance[0].note = note;
    //     await emp.save();
    //     return {
    //       success: true,
    //       message: "Attendance updated successfully",
    //       attendance: emp.attendance[0],
    //     };
    //   } catch (error) {
    //     throw new Error((error as Error).message);
    //   }
    // },
  },
};
