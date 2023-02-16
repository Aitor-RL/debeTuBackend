import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

let ruleSchema = new Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    text: String,
    // idUser: {type: Schema.ObjectId, ref:'User'}
  },
  {
    timestamps: true, // createdAt updatedAt
    versionKey: false, // _V
  }
)

let userSchema = new Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    name: String,
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {type:String, required: true, trim: true, select: false, minLength: 4}, //TODO
    rules: [ruleSchema]
  },
  {
    timestamps: true, // createdAt updatedAt
    versionKey: false, // _V
  }
);

userSchema.pre('save', async function (next) { 
  const user = this
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)
  user.password = hash
  next()
})

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password)
}


const User = model("User", userSchema);
export { User };
