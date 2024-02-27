import EmployeeDetails, { Attendance } from "../../module/employeeBasicDetails";
import { GraphQLError } from "graphql";
import { JwtPayload } from "jsonwebtoken";
import { check_auth } from "../../util/check_auth";
import { UUID } from "crypto";
import moment from "moment";
import mongoose from "mongoose";

interface empAttendanceInterface {
  input: {
    userId: UUID;
  };
}

export const attendence_resolver = {
  Mutation: {
    async AttendanceLogin(
      parent: any,
      args: empAttendanceInterface,
      context: any
    ) {
      try {
        const { userId } = args.input;
        const emp = await EmployeeDetails.findById(userId);
        const { id, email } = check_auth(context) as JwtPayload;

        if (!emp) {
          throw new GraphQLError("Warning: User not Found", {
            extensions: {
              code: "No Emp found with That ID",
            },
          });
        }
        console.log("output at the login Api: ", id, userId);
        if (userId !== id) {
          throw new GraphQLError("Error: Token ID Issue", {
            extensions: {
              code: "Please Provide Toke for Same User ID",
            },
          });
        }

        const currentTime = new Date(moment().format("YYYY-MM-DD HH:mm"));

        const shiftStartTime = moment().set({
          hour: 9,
          minute: 0,
        });
        const minutesDifference = Math.round(
          moment().diff(shiftStartTime, "minutes")
        );

        let note = "";
        if (minutesDifference > 0) {
          note = `${minutesDifference} minutes late`;
        } else if (minutesDifference < 0) {
          note = `${Math.abs(minutesDifference)} minutes early`;
        } else {
          note = "On time";
        }

        const newObjectId = new mongoose.Types.ObjectId();

        emp.attendance.push({
          _id: newObjectId,
          email,
          note,
          present: true,
          timeIn: currentTime,
        });
        await emp.save();
        return {
          ...emp.toObject(),
          message: "Attendance successfully updated",
          id: emp._id,
          email,
          attendance: emp.attendance,
          name: emp.name,
        };
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },

    AttendanceLogout: async (
      parent: any,
      args: empAttendanceInterface,
      context: any
    ) => {
      try {
        const { userId } = args.input;
        const emp = await EmployeeDetails.findById(userId);
        const { id, email } = check_auth(context) as JwtPayload;

        if (!emp) {
          throw new GraphQLError("Warning: No Emp found with That ID", {
            extensions: {
              code: "No Emp found with That ID",
            },
          });
        }

        if (userId !== id) {
          throw new GraphQLError("Error: ID and Token Issue", {
            extensions: {
              code: "Please Provide Toke for Same User ID",
            },
          });
        }

        const todayAttendanceIndex = emp.attendance.findIndex(
          (attendance: Attendance) =>
            moment(attendance.timeIn).isSame(moment(), "day")
        );

        if (todayAttendanceIndex === -1) {
          throw new GraphQLError("Error: Attendence Error", {
            extensions: {
              code: "No attendance record found for today",
            },
          });
        }

        emp.attendance[todayAttendanceIndex].timeOut = new Date();

        await emp.save();

        return {
          ...emp.toObject(),
          message: "Logout successful",
          id: emp._id,
          attendance: emp.attendance,
          email,
          name: emp.name,
        };
      } catch (error) {
        throw new GraphQLError("Warning: Logout API Error", {
          extensions: {
            code: "No Attendance found for Today",
          },
        });
      }
    },
  },
};
