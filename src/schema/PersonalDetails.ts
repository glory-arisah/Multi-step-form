import { object, string } from "yup";

const personalDetailsSchema = object({
  fullName: string()
    .required("* full name is required")
    .matches(/^[A-Za-z\s?]+$/, "* only letters are allowed")
    .min(8, "* full name is too short"),
  email: string()
    .required("* email is required")
    .email("* email should be in correct format"),
  phone: string()
    .required("* phone number is required")
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}$/,
      "* phone number is required in correct format"
    ),
  placeOfBirth: string()
    .required("* your place of birth is required")
    .min(5, "* place of birth is too short"),
});

export default personalDetailsSchema;
