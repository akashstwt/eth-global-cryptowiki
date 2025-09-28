// src/lib/flowConfig.ts
import * as fcl from "@onflow/fcl";

fcl.config({
  "app.detail.title": "MyDapp",
  "app.detail.icon": "https://mydapp.com/icon.png",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "walletConnect.projectId": "eeb564acfdbbcc4626eb7c89493ae2ca",
});
