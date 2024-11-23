import { Role } from "@prisma/client";

const roleOptions = {
  [Role.ADMIN]: "管理者ユーザー",
  [Role.USER]: "一般ユーザー",
  [Role.ROBOT]: "スクリプト",
} as const satisfies Record<keyof typeof Role, string>;

export { roleOptions };
