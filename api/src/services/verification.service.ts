import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit-core/backend';
import * as dotenv from 'dotenv';

export class VerificationService {
    public async verifyProof(proof: any): Promise<IVerifyResponse> {
        dotenv.config();

        if (!process.env.APP_ID || !process.env.ACTION_ID) {
            throw new Error("APP_ID or ACTION_ID environment variables are not set");
        }

        const app_id = process.env.APP_ID;
        const action = process.env.ACTION_ID;

        if (!app_id || !action) {
            throw new Error("APP_ID or ACTION_ID environment variables are not set");
        }

        return await verifyCloudProof(proof, app_id as `app_${string}`, action) as IVerifyResponse;
    }
}