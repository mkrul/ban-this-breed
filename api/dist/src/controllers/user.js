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
const user_1 = require("../services/user");
const asyncHandler = require("express-async-handler");
exports.createUserData = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    yield (0, user_1.saveUserData)(data);
    res.status(201);
}));
exports.getUserData = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, user_1.fetchUsers)();
    res.status(200).json({ data });
}));
