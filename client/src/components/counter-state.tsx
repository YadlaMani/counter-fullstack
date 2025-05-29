import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { program, counterPDA } from "../anchor/setup";
import type { CounterData } from "../anchor/setup";

const CounterState = () => {
  const { connection } = useConnection();
  const [counterData, setCounterData] = useState<CounterData | null>(null);
  const fetchCounterData = async () => {
    try {
      const data = await program.account.counter.fetch(counterPDA);
      setCounterData(data);
    } catch (err) {
      console.log("Error fetching counter data:", err);
    }
  };

  useEffect(() => {
    fetchCounterData();
    const subscriptionId = connection.onAccountChange(
      counterPDA,
      (accountInfo) => {
        try {
          const decodedData = program.coder.accounts.decode(
            "counter",
            accountInfo.data
          );
          setCounterData(decodedData);
        } catch (error) {
          console.log("Error decoding counter data:", error);
        }
      }
    );
    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [program, counterPDA, connection]);
  return (
    <div>
      <h1>Counter State</h1>
      <p className="text-lg">Count: {counterData?.count?.toString()}</p>{" "}
    </div>
  );
};

export default CounterState;
