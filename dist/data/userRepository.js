"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdByUsername = exports.getUserById = exports.createNewUser = exports.authenticateUser = void 0;
const userModel_1 = require("../models/userModel");
// Authenticates user
const authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.userModel.findOne({ username });
    if (!user) {
        throw new Error('Invalid username or password');
    }
    const isPasswordMatch = yield user.comparePassword(password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
        throw new Error('Invalid username or password');
    }
    return user;
});
exports.authenticateUser = authenticateUser;
// Creates new user
const createNewUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield userModel_1.userModel.create(data);
    }
    catch (error) {
        // Duplicate username error
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            throw new Error('Username is already taken');
        }
        throw new Error(`Error creating user: ${error.message}`);
    }
});
exports.createNewUser = createNewUser;
// Gets user by Id
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield userModel_1.userModel.findById(id);
    }
    catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
});
exports.getUserById = getUserById;
// Gets user Id from username (unique)
const getUserIdByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.userModel.findOne({ username });
        if (user) {
            return user._id;
        }
        else {
            throw new Error('User not found');
        }
    }
    catch (error) {
        throw new Error(`Error fetching userId: ${error.message}`);
    }
});
exports.getUserIdByUsername = getUserIdByUsername;
