import * as anchor from "@coral-xyz/anchor";

import { Keypair, PublicKey } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { assert } from "chai";

describe("counter", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.counter as Program<Counter>;
  const [counterPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId
  );
  it("Is initialized!", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        counter: counterPDA,
      })

      .rpc();
    const accountData = await program.account.counter.fetch(counterPDA);
    assert.equal(accountData.count.toNumber(), 0);
  });
  it("Increment the counter!", async () => {
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counterPDA,
      })
      .rpc({ skipPreflight: true });
    const accountData = await program.account.counter.fetch(counterPDA);
    assert.equal(accountData.count.toNumber(), 1);
  });
  it("Decrement the counter!", async () => {
    const tx = await program.methods
      .decrement()
      .accounts({
        counter: counterPDA,
      })

      .rpc({ skipPreflight: true });
    const accountData = await program.account.counter.fetch(counterPDA);
    assert.equal(accountData.count.toNumber(), 0);
  });
});
