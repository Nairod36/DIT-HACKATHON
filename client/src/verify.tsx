import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
import * as dotenv from 'dotenv'

const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("http://localhost:3000/api/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
    })
    if (!res.ok) {
        throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
};

const onSuccess = () => {
    // This is where you should perform any actions after the modal is closed
    // Such as redirecting the user to a new page
    window.location.href = "/";
};

dotenv.config();

<IDKitWidget
	app_id= {import.meta.env.APP_ID as `app_${string}`} // obtained from the Developer Portal
	action= {import.meta.env.VITE_ACTION_ID as `action_${string}`} // obtained from the Developer Portal
	onSuccess={onSuccess} // callback when the modal is closed
	handleVerify={handleVerify} // callback when the proof is received
	verification_level={VerificationLevel.Orb}
>
	{({ open }) => 
        // This is the button that will open the IDKit modal
        <button onClick={open}>Verify with World ID</button>
    }
</IDKitWidget>
