import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../models/user.model";
import bcrypt from "bcryptjs";
import sendVerificationEmail from "../../../utils/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, username, password } = await request.json();

    const existingVerifiedUserByusername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUserByusername) {
      return Response.json(
        { success: false, message: "username is already taken!" },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          { success: false, message: "User already exists with this email!" },
          { status: 400 }
        );
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = expiryDate;
        await existingUserByEmail.save();
      }
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        messages: [],
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    //Check with email Response by calling api and handle it
  } catch (error) {
    console.error("Error While Registering User!");
    return Response.json(
      {
        success: false,
        message: "Error While Registering User!",
      },
      {
        status: 500,
      }
    );
  }
}
