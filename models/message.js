import { model, Schema } from "mongoose";

let messageSchema = new Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    msg: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Message = model("Message", messageSchema);
export {Message}