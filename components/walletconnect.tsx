"use client";

import * as fcl from "@onflow/fcl";
import { useEffect, useState } from "react";

type FlowUser = fcl.CurrentUser | null;

export default function WalletConnect() {
  const [flowUser, setFlowUser] = useState<FlowUser>(null);

  useEffect(() => {
    // ✅ subscribe to Flow session
    fcl.currentUser().subscribe(setFlowUser);
  }, []);

  const connectFlow = async () => {
    await fcl.authenticate();
  };

  const disconnectFlow = async () => {
    await fcl.unauthenticate();
  };

  return (
    <div className="w-auto bg-amber-400">
      {/* Flow Wallet */}
      {!flowUser?.addr ? (
        <button
          onClick={connectFlow}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Connect Flow Wallet
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-white">
            {flowUser.addr.slice(0, 6)}...{flowUser.addr.slice(-4)}
          </span>
          <button
            onClick={disconnectFlow}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
