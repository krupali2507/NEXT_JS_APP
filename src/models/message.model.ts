import mongoose, { Schema, Document } from "mongoose";

export interface MessageInterface extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<MessageInterface> = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

export { MessageSchema };

const MessageModel =
  (mongoose.models.Message as mongoose.Model<MessageInterface>) ||
  mongoose.model<MessageInterface>("Message", MessageSchema);

export default { MessageModel };
