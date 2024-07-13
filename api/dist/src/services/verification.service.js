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
exports.VerificationService = void 0;
const index_js_1 = require("@worldcoin/idkit/build/index.js");
class VerificationService {
    verifyProof(proof) {
        return __awaiter(this, void 0, void 0, function* () {
            const app_id = process.env.APP_ID;
            const action = process.env.ACTION_ID;
            if (!app_id || !action) {
                throw new Error("APP_ID or ACTION_ID environment variables are not set");
            }
            return yield (0, index_js_1.verifyCloudProof)(proof, app_id, action);
        });
    }
}
exports.VerificationService = VerificationService;
