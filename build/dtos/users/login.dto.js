"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.LoginSchema = zod_1.default.object({
    email: zod_1.default.string({ required_error: "An email is expected on body.", invalid_type_error: "Email format invalid." }).email(),
    password: zod_1.default.string({ required_error: "A password is expected on body.", invalid_type_error: "" }).min(4, "Try at leat 4 digits.")
}).transform(data => data);
