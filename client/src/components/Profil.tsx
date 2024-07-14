import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "./ui/button";

export default function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (error) {
    console.error("Connection error:", error);
  }

  if (isConnected) {
    console.log("Connected to", connector?.name, "address:", address);
    return (
      <div className="ml-auto flex items-center">
        <div className="title mr-2">Connected to {connector?.name}</div>
        <Button onClick={disconnect as any} className="card">
          Disconnect
        </Button>
        {/* <SendTransaction />
          <Balance />
          <WriteContract />
          <SwitchChain /> */}
      </div>
    );
  } else {
    return (
      <div>
        {connectors
          .filter((connector: Connector) => connector.id === "web3auth")
          .map((connector: Connector) => (
            <Button
              className="card"
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              Login with {connector.name}
            </Button>
          ))}
      </div>
    );
  }
}
