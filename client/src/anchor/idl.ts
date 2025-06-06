import type { Idl } from "@coral-xyz/anchor";

export const IDL: Idl = {
  address: "Dt1Jy254GZUAUFCUcUSmSuAG3Enx1EJHvBEhRowaDQGH",
  name: "counter",
  version: "0.1.0",
  metadata: {
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "decrement",
      discriminator: [106, 227, 168, 59, 248, 27, 150, 101],
      accounts: [
        {
          name: "counter",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [99, 111, 117, 110, 116, 101, 114],
              },
            ],
          },
        },
      ],
      args: [],
    },
    {
      name: "increment",
      discriminator: [11, 18, 104, 9, 104, 174, 59, 33],
      accounts: [
        {
          name: "counter",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [99, 111, 117, 110, 116, 101, 114],
              },
            ],
          },
        },
      ],
      args: [],
    },
    {
      name: "initialize",
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "counter",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [99, 111, 117, 110, 116, 101, 114],
              },
            ],
          },
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "counter",
      discriminator: [255, 176, 4, 245, 188, 253, 124, 25],
    },
  ],
  types: [
    {
      name: "counter",
      type: {
        kind: "struct",
        fields: [
          {
            name: "count",
            type: "u64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
} as const;

export type Counter = typeof IDL;
