// src/providers.tsx
"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, polygon } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { ReactNode } from "react";
import "../lib/flowConfig"; // ✅ ensures FCL config runs on client

const queryClient = new QueryClient();

const prijectIdNew = "eeb564acfdbbcc4626eb7c89493ae2ca"
const wagmiConfig = createConfig({
  chains: [mainnet, polygon],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: prijectIdNew! }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
