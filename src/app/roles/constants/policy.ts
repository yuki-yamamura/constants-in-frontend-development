import { Policy } from "@prisma/client";

const policyOptions = {
  [Policy.READ_ONLY]: "読み取り専用",
  [Policy.READ_WRITE]: "読み書き",
} as const satisfies Record<keyof typeof Policy, string>;

export { policyOptions };
