import { PostSchema } from "../validation";

function convertToRole(data: PostSchema): {} {
  return {
    roleToRead: data.role,
    roleToWrite: data.policy,
  };
}

export { convertToRole };
