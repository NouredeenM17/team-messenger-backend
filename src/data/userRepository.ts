import { userModel } from "../models/userModel";
import { IUser } from "../interfaces/IUser";

// Authenticates user
export const authenticateUser = async (username:string, password:string): Promise<IUser | null> => {
    
    const user = await userModel.findOne({ username });

    if(!user){
        throw new Error('Invalid username or password');
    }

    const isPasswordMatch = await user.comparePassword(password);
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
        throw new Error('Invalid username or password');
    }
    
    return user;
}

// Creates new user
export const createNewUser = async (data: any) => {
    try {
        return await userModel.create(data);    
    } catch (error: any) {
        // Duplicate username error
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            throw new Error('Username is already taken');
        }

        throw new Error(`Error creating user: ${error.message}`);
    }
}

// Gets user by Id
export const getUserById = async (id: string) => {
    try {
        return await userModel.findById(id);    
    } catch (error: any) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

// Gets user Id from username (unique)
export const getUserIdByUsername = async (username: string) => {
    try {
        const user = await userModel.findOne({ username });
        if (user) {
            return user._id;
        } else {
            throw new Error('User not found');
        }
    } catch (error: any) {
        throw new Error(`Error fetching userId: ${error.message}`);
    }
}