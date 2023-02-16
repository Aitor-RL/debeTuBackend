import { model, Schema } from "mongoose";
let debtSchema = new Schema(
    {
        _id: { type: Schema.ObjectId, auto: true },
        concept: {type:String, trim:true, maxLength:200, required:true},
        amount: {type:Number, min:0, required:true},
        isPaid: {type:Boolean, default:false, required:true},
        // connection: {type: Schema.ObjectId, ref:"Connection"}
    },
    {
      timestamps: true,
      versionKey: false,
    }
)
let connectionSchema = new Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    creditor: {type: Schema.ObjectId, ref:'User', required:true} ,
    debtor: {type: Schema.ObjectId, ref:'User', required:true},
    debts: [debtSchema],
    active: {type: Boolean, default: true, required:true}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Connection = model("Connection", connectionSchema);
export {Connection}