import type { coinbaseWallet as CoinbaseWalletFn } from "wagmi/connectors";
import type { injected as InjectedFn } from "wagmi/connectors";
// @ts-expect-error deep import — not in package exports; avoids MetaMask / WalletConnect barrel
import { coinbaseWallet as coinbaseWalletImpl } from "../node_modules/@wagmi/connectors/dist/esm/coinbaseWallet.js";
// @ts-expect-error deep import — not in package exports
import { injected as injectedImpl } from "../node_modules/@wagmi/core/dist/esm/connectors/injected.js";

/** Only Coinbase + injected — avoids MetaMask / WalletConnect barrel deps in the client bundle. */
export const coinbaseWallet: typeof CoinbaseWalletFn = coinbaseWalletImpl;
export const injected: typeof InjectedFn = injectedImpl;
