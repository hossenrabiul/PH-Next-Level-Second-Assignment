"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const route = express_1.default.Router();
route.get("/", (0, auth_1.default)("admin"), user_controller_1.userControllers.getAllUsers);
route.get("/:userId", (0, auth_1.default)("admin", "user"), user_controller_1.userControllers.getSingleUser);
route.put("/:userId", (0, auth_1.default)("admin", "user"), user_controller_1.userControllers.updateUser);
route.delete("/:userId", (0, auth_1.default)("admin"), user_controller_1.userControllers.deleteUser);
exports.usersRoute = route;
