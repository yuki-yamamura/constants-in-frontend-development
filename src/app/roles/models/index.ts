import { Role } from "@prisma/client";
import { PostSchema } from "../validation";

class RoleFormState {
  values: PostSchema;
  shouldSelectPolicy: boolean;
  description: string | undefined;

  constructor(formValues: PostSchema) {
    this.values = formValues;
    this.shouldSelectPolicy = this.getShouldSelectPolicy();
    this.description = this.getDescription();
  }

  private getShouldSelectPolicy = () => {
    return this.values.role === Role.ADMIN;
  };

  private getDescription = () => {
    switch (this.values.role) {
      case "ADMIN": {
        return "管理者ロールはポリシーを選択できます。";
      }
      case "USER": {
        return "一般ユーザーのポリシーは読み取り専用になります。";
      }
      case "ROBOT": {
        return undefined;
      }
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _check: never = this.values.role;
      }
    }
  };
}

export { RoleFormState };
