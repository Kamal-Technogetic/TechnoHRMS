// import { gql } from "@apollo/server";

export const typeDefs = `
  scalar BirthDate
  scalar JoinDate
  scalar DateTime

  input RegisterEmployeeLogin {
    name: String!
    email: String!
    password: String!
    contactNumber: String!
    jobTitle: String!
    department: String!
    dateOfJoining: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input updateEmpDetailsInput {
    gender: String
    religion: String
    nationality: String
    dateOfBirth: String
    fatherName: String
    emergencyNumber: String
    relationWithEmergencyNumber: String
  }

  type EmpDetails {
    id: ID!
    name: String!
    email: String!
    password: String!
    contactNumber: String!
    jobTitle: String!
    department: String!
    dateOfJoining: String!
    token: String!
  }

  type EmpAllDetails {
    name: String
    email: String
    token: String
    dateOfBirth: BirthDate
    dateOfJoining: JoinDate
    location: String
    password: String
    contactNumber: String
    jobTitle: String
    department: String
    performanceRatings: Int
    nationality: String
    gender: String
    religion: String
    photo: String
    fatherName: String
    emergencyNumber: String
    relationWithEmergencyNumber: String
    attendance: DateTime
    workStatus: String
    leaves: [Leave]
    salary: [Salary]
    documents: [Documents]
  }

  type Leave {
    leaveId: String
    leaveApproval: String
    shortLeave: String
    reasonForLeave: String
    totalLeaveBalance: Int
    sickLeaveBalance: String
    personalLeaveBalance: String
    otherLeaveBalance: String
    status: String
  }

  type Salary {
    date: DateTime
    bankAccountNumber: String
    ifscCode: String
    basic: Int
    housingAllowances: Int
    travelAllowances: Int
    bonus: Int
    taxDeduction: Int
    deduction: Int
  }

  type Documents {
    highSchoolClgName: String
    highSchoolboard: String
    highSchoolpercentage: String
    highSchoolCertificate: String

    intermediateClgName: String
    intermediateboard: String
    intermediatepercentage: String
    intermediateCertificate: String

    bachelorsClgName: String
    bachelorsboard: String
    bachelorspercentage: String
    bachelorsCertificate: String

    mastersClgName: String
    mastersboard: String
    masterspercentage: String
    mastersCertificate: String

    certificationClgName: String
    certificationboard: String
    certificationpercentage: String
    certificationCertificate: String

    passportNumber: String
    dlNumber: String
    aadharNumber: String
  }

  type Query {
    getEmpDetails: [EmpDetails]
    default: String!
  }

  type Mutation {
    registerEmployee(input: RegisterEmployeeLogin): EmpDetails!
    loginEmployee(input: LoginInput): EmpDetails!
    updateEmpDetails(input: updateEmpDetailsInput): EmpAllDetails
  }
`;
