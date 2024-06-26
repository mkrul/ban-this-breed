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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.saveUserData = void 0;
const user_1 = __importDefault(require("../../models/user"));
function saveUserData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_1.default(data);
        yield user.save();
        return user;
    });
}
exports.saveUserData = saveUserData;
function getUserData() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("getting user data");
        // get all "pro" alignment users
        const proUsers = yield user_1.default.find({ alignment: "pro" });
        const moderateUsers = yield user_1.default.find({ alignment: "neutral" });
        const antiUsers = yield user_1.default.find({ alignment: "anti" });
        // get average accuracy for each alignment
        const proAccuracy = proUsers.reduce((acc, user) => acc + user.accuracy, 0) / proUsers.length;
        const moderateAccuracy = moderateUsers.reduce((acc, user) => acc + user.accuracy, 0) / moderateUsers.length;
        const antiAccuracy = antiUsers.reduce((acc, user) => acc + user.accuracy, 0) / antiUsers.length;
        const proCount = proUsers.length;
        const moderateCount = moderateUsers.length;
        const antiCount = antiUsers.length;
        // get count of "pro" alignment users who selected "apbt" as the only breed
        const proApbtCount = proUsers.filter((user) => user.breeds.length === 1 && user.breeds[0].name === "apbt").length;
        // get average accuracy of "pro" alignment users who selected "apbt" as the only breed
        const proApbtAccuracy = proUsers
            .filter((user) => user.breeds.length === 1 && user.breeds[0].name === "apbt")
            .reduce((acc, user) => acc + user.accuracy, 0) / proApbtCount;
        // get count of "pro" alignment users who selected multiple breeds
        const proMultiCount = proUsers.filter((user) => user.breeds.length > 1).length;
        // get average accuracy of "pro" alignment users who selected multiple breeds
        const proMultiAccuracy = proUsers
            .filter((user) => user.breeds.length > 1)
            .reduce((acc, user) => acc + user.accuracy, 0) / proMultiCount;
        // get count of "neutral" alignment users who selected "apbt" as the only breed
        const moderateApbtCount = moderateUsers.filter((user) => user.breeds.length === 1 && user.breeds[0].name === "apbt").length;
        // get average accuracy of "neutral" alignment users who selected "apbt" as the only breed
        const moderateApbtAccuracy = moderateUsers
            .filter((user) => user.breeds.length === 1 && user.breeds[0].name === "apbt")
            .reduce((acc, user) => acc + user.accuracy, 0) / moderateApbtCount;
        // get count of "anti" alignment users who selected "apbt" as the only breed
        const antiApbtCount = antiUsers.filter((user) => user.breeds.length === 1 && user.breeds[0].name === "apbt").length;
        // get average accuracy of "anti" alignment users who selected "apbt" as the only breed
        const antiApbtAccuracy = antiUsers
            .filter((user) => user.breeds.length === 1 && user.breeds[0].name === "apbt")
            .reduce((acc, user) => acc + user.accuracy, 0) / antiApbtCount;
        // get top 5 users with the highest accuracy
        const topUsers = proUsers
            .sort((a, b) => b.accuracy - a.accuracy)
            .slice(0, 5);
        return {
            proAccuracy,
            moderateAccuracy,
            antiAccuracy,
            proCount,
            moderateCount,
            antiCount,
            proApbtCount,
            proApbtAccuracy,
            proMultiCount,
            proMultiAccuracy,
            moderateApbtCount,
            moderateApbtAccuracy,
            antiApbtCount,
            antiApbtAccuracy,
            topUsers
        };
    });
}
exports.getUserData = getUserData;
