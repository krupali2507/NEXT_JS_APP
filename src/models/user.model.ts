import mongoose, { Schema, Document } from "mongoose";
import { MessageInterface, MessageSchema } from "./message.model";

interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: MessageInterface[];
}

const UserSchema: Schema<UserInterface> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      min: [8, "Password length should be 8 minimum."],
      max: [20, "Password should not be greater than 20 length."],
    },
    verifyCode: {
      type: String,
    },
    verifyCodeExpiry: {
      type: Date,
      require: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAcceptingMessage: {
      type: Boolean,
      default: true,
    },
    messages: [MessageSchema],
  },
  { timestamps: true, versionKey: false }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<UserInterface>) ||
  mongoose.model<UserInterface>("User", UserSchema);

export default UserModel;
