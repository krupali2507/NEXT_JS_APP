import resend from "../lib/resend";
import verificationEmail from "../emails/VerificationEmail";
import { ApiResponse } from "../types/ApiResponses";

const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Verification Code",
      react: verificationEmail({ username, otp: verifyCode }),
    });
    console.log("🚀 ~ data:", data);
    return { success: true, message: "Verification Email sent successfully!" };
  } catch (error) {
    console.error("Error in sending verification email", error);
    return { success: false, message: "Failed to send verification email" };
  }
};

export default sendVerificationEmail;
