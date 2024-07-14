import { SessionProvider } from "next-auth/react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import "../styles/globals.css";
import { mergeNetworks } from "@dynamic-labs/sdk-react-core";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

const customEvmNetworks = [
  {
    blockExplorerUrls: ['https://explorer-holesky.morphl2.io'],
    chainId: 2810,
    chainName: 'Morph Holesky Testnet',
    iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
    name: 'Morph Holesky',
    nativeCurrency: {
      decimals: 18,
      name: 'Holesky Ether',
      symbol: 'ETH',
    },
    networkId: 2810,
    rpcUrls: ['https://rpc-quicknode-holesky.morphl2.io'],
    vanityName: 'Holesky',
  },
  {
    blockExplorerUrls: ['https://holesky.etherscan.io'],
    chainId: 17000,
    chainName: 'Ethereum Holesky',
    iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
    name: 'Ethereum Holesky',
    nativeCurrency: {
      decimals: 18,
      name: 'Holesky Ether',
      symbol: 'ETH',
    },
    networkId: 17000,
    rpcUrls: ['https://ethereum-holesky-rpc.publicnode.com/'],
    vanityName: 'Holesky',
  },
  {
    blockExplorerUrls: ['https://explorer-testnet.morphl2.io'],
    chainId: 2710,
    chainName: 'Morph Sepolia Testnet',
    iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
    name: 'Morph Sepolia',
    nativeCurrency: {
      decimals: 18,
      name: 'Sepolia Ether',
      symbol: 'ETH',
    },
    networkId: 2710,
    rpcUrls: ['https://rpc-testnet.morphl2.io'],
    vanityName: 'Sepolia',
  },
  {
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
    chainId: 11155111,
    chainName: 'Ethereum Sepolia',
    iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
    name: 'Ethereum Sepolia',
    nativeCurrency: {
      decimals: 18,
      name: 'Sepolia Ether',
      symbol: 'ETH',
    },
    networkId: 11155111,
    rpcUrls: ['https://eth-sepolia-public.unifra.io'],
    vanityName: 'Sepolia',
  },
];

const DynamicSettings = {
  overrides: {
    evmNetworks: (networks) => mergeNetworks(customEvmNetworks, networks),
  },
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <DynamicContextProvider
        settings={{
          environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
          walletConnectors: [EthereumWalletConnectors],
          overrides: DynamicSettings.overrides,
        }}
      >
        <Component {...pageProps} />
      </DynamicContextProvider>
    </SessionProvider>
  );
}
