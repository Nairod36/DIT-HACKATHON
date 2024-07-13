import React from 'react';
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit';
import { Button } from "../ui/button";

const handleVerify = async (proof: ISuccessResult) => {
    try {
        console.log("body", JSON.stringify(proof));
        const res = await fetch("http://localhost:3000/api/verify", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(proof),
        });

        if (!res.ok) {
            throw new Error("Verification failed.");
        }
    } catch (error) {
        console.error(error);
        throw error; // IDKit will display the error message to the user in the modal
    }
};


type IProps = {
    resetVerification: () => void;
}

const VerifyComponent = (props:IProps) => {
    const onSuccess = () => {
      props.resetVerification();  
    };
    return (
        <IDKitWidget
            app_id="app_staging_472279e5e8c78f87ad0b8fc62bd73fb3"
            action="authorisation-user"
            onSuccess={onSuccess}
            handleVerify={handleVerify}
            verification_level={VerificationLevel.Device}
        >
            {({ open }) => 
                <Button onClick={open} className="w-full" size="lg">
                    Verify with World ID
                </Button>
            }
        </IDKitWidget>
    );
};

export default VerifyComponent;