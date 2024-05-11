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
exports.getRoomById = exports.createNewRoom = void 0;
const roomModel_1 = require("../models/roomModel");
// Creates new room
const createNewRoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield roomModel_1.roomModel.create(data);
    }
    catch (error) {
        throw new Error(`Error creating room: ${error.message}`);
    }
});
exports.createNewRoom = createNewRoom;
// Gets room by Id
const getRoomById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield roomModel_1.roomModel.findById(id);
    }
    catch (error) {
        throw new Error(`Error fetching room: ${error.message}`);
    }
});
exports.getRoomById = getRoomById;
