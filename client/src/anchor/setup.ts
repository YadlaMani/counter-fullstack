import type { IdlAccounts } from "@coral-xyz/anchor";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

import { IDL } from "./idl";
import type { Counter } from "./idl";

const programId = new PublicKey("Dt1Jy254GZUAUFCUcUSmSuAG3Enx1EJHvBEhRowaDQGH");

const connection = new Connection(
  import.meta.env.VITE_RPC_URL || clusterApiUrl("devnet"),
  "confirmed"
);

export const program = new Program<Counter>(IDL, programId, {
  connection,
});

export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("counter")],
  programId
);

export type CounterData = IdlAccounts<Counter>["counter"];
