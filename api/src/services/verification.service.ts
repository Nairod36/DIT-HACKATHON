import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit/build/index.js';

export class VerificationService {
    public async verifyProof(proof: any): Promise<IVerifyResponse> {
        const app_id = process.env.APP_ID;
        const action = process.env.ACTION_ID;

        if (!app_id || !action) {
            throw new Error("APP_ID or ACTION_ID environment variables are not set");
        }

        return await verifyCloudProof(proof, app_id as `app_${string}`, action as `action_${string}`) as IVerifyResponse;
    }
}