import * as Yup from "yup";


export const FeedbackSchema = Yup.object().shape({
	username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
	email: Yup.string().email("Must be a valid email!").required("Required"),
	date: Yup.string().required("Required"),
	usertext: Yup.string().min(2, "Too short").max(256, "Too long"),
});
