import validator from "validator";
import moment from "moment";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  jobTitle: string;
  department: string;
  dateOfJoining?: string;
  shift?: string;
}

interface HRRegisterInput {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface UpdateInput {
  gender: string;
  religion: string;
  nationality: string;
  dateOfBirth: string;
  fatherName: string;
  emergencyNumber: string;
  relationWithEmergencyNumber: string;
}

export const validateRegisterInput = ({
  name,
  email,
  password,
  contactNumber,
  jobTitle,
  department,
  dateOfJoining,
  shift,
}: RegisterInput) => {
  const errors: Record<string, string> = {};

  if (name.trim() === "") {
    errors.username = "UserNmame not be empty";
  }

  if (email.trim() === "") {
    errors.email = "email not be empty";
  } else {
    if (!validator.isEmail(email)) {
      errors.email = "Email must be a valid address";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password must not be Empty";
  }

  if (contactNumber.trim() === "") {
    errors.contactNumber = "Contact number must not be empty";
  } else if (
    !validator.isMobilePhone(contactNumber, "any", { strictMode: false })
  ) {
    errors.contactNumber = "Invalid contact number";
  }

  if (!/^\d+$/.test(contactNumber)) {
    errors.contactNumber = "Invalid contact number";
  }

  if (jobTitle.trim() === "") {
    errors.jobTitle = "Job title must not be empty";
  }

  if (department.trim() === "") {
    errors.department = "Department must not be empty";
  }

  dateOfJoining = dateOfJoining ?? moment().format("YYYY-MM-DD");
  if (!validator.isISO8601(dateOfJoining, { strict: true })) {
    errors.dateOfJoining = "Invalid date format for date of joining";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};

export const validateHRRegInput = ({
  name,
  email,
  password,
  contactNumber,
}: HRRegisterInput) => {
  const errors: Record<string, string> = {};

  if (name.trim() === "") {
    errors.username = "UserNmame not be empty";
  }

  if (email.trim() === "") {
    errors.email = "email not be empty";
  } else {
    if (!validator.isEmail(email)) {
      errors.email = "Email must be a valid address";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password must not be Empty";
  }

  if (contactNumber.trim() === "") {
    errors.contactNumber = "Contact number must not be empty";
  } else if (
    !validator.isMobilePhone(contactNumber, "any", { strictMode: false })
  ) {
    errors.contactNumber = "Invalid contact number";
  }

  if (!/^\d+$/.test(contactNumber)) {
    errors.contactNumber = "Invalid contact number";
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};

export const validateLoginInput = ({ email, password }: LoginInput) => {
  const errors: Record<string, string> = {};

  if (email === "") {
    errors.email = "email not be empty";
  } else {
    if (!validator.isEmail(email)) {
      errors.email = "Email must be a valid address";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password must not be Empty";
  }
  return { errors, valid: Object.keys(errors).length < 1 };
};

const validateUpateInput = ({
  gender,
  religion,
  nationality,
  dateOfBirth,
  fatherName,
  emergencyNumber,
  relationWithEmergencyNumber,
}: UpdateInput) => {
  const errors: Record<string, string> = {};

  if (gender.trim() === "") {
    errors.gender = "Select Gender";
  }

  if (religion.trim() === "") {
    errors.gender = "Select Religion";
  }
  if (nationality.trim() === "") {
    errors.gender = "Select Nationality";
  }
  if (!validator.isISO8601(dateOfBirth, { strict: true })) {
    errors.dateOfBirth = "Invalid date format for date of Birth";
  }
  if (fatherName.trim() === "") {
    errors.gender = "Select Fathers Name";
  }
  if (emergencyNumber.trim() === "") {
    errors.gender = "Select Emergency Number";
  }
  if (relationWithEmergencyNumber.trim() === "") {
    errors.gender = "Select Relation with Emergency contact";
  }
  return { errors, valid: Object.keys(errors).length < 1 };
};

// export { validateRegisterInput, validateLoginInput };
