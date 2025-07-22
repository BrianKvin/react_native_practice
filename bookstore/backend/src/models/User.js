import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profileImage: {
      type: String,
      default: "",
    }
  }
);

// hash password before saving to db
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next()
})

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// userSchema.methods.generateTokens = function() {accessToken refreshToken} {
//   return generateTokens({
//     userId: this._id.toString(),
//     username: this.username,
//     email: this.email,
//     profileImage: this.profileImage
//   })
// }

const User = mongoose.model("User", userSchema);
export default User;