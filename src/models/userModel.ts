import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/IUser";

export const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        rooms: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Room' 
        }]
    }
);

// Hashes passwords before saving them to database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  });

  // Method to compare passwords
  userSchema.methods.comparePassword = async function (candidatePassword:string) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

export const userModel = mongoose.model<IUser>('User',userSchema);