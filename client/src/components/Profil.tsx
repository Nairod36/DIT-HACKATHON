import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Profile() {
    const { address, connector, isConnected } = useAccount();
    const { connect, connectors, error } = useConnect();
    const { disconnect } = useDisconnect();
  
    if (isConnected) {
      return (
        <div className="main">
          <div className="title">Connected to {connector?.name}</div>
          <div>{address}</div>
          <button className="card" onClick={disconnect as any}>
            Disconnect
          </button>
          {/* <SendTransaction />
          <Balance />
          <WriteContract />
          <SwitchChain /> */}
        </div>
      );
    } else {
      return (
        <div className="main">
          {connectors.map((connector) => {
            return (
              <button className="card" key={connector.id} onClick={() => connect({ connector })}>
                {connector.name}
              </button>
            );
          })}
          {error && <div>{error.message}</div>}
        </div>
      );
    }
  }