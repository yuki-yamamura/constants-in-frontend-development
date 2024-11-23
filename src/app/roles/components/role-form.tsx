"use client";

import {
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { policyOptions, roleOptions } from "../constants";
import { RoleFormState } from "../models";
import { cx } from "class-variance-authority";
import { Controller, useForm } from "react-hook-form";
import { postSchema, PostSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { getOptionLabel } from "@/utils/option-label";

export const RoleForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      role: undefined,
      policy: undefined,
    },
  });
  const formState = new RoleFormState(watch());

  const radioGroupRoleOptions = {
    [Role.USER]: "一般ユーザー",
    [Role.ADMIN]: "管理者ユーザー",
    [Role.ROBOT]: "スクリプト",
  } as const satisfies typeof roleOptions;

  const submitHandler = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-y-4 items-start"
    >
      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <RadioGroup
            {...field}
            onValueChange={(value) => {
              const label = getOptionLabel(radioGroupRoleOptions, value);
              if (!label) {
                console.log("unexpected value:", value);
              }

              console.log(label);
            }}
          >
            {Object.entries(roleOptions).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem
                  key={value}
                  value={value}
                  onClick={field.onChange}
                />
                <Label
                  htmlFor={value}
                  className={cx(value === Role.ADMIN && "text-red-500")}
                >
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {errors.role && <div>{errors.role.message}</div>}

      {formState.shouldSelectPolicy && (
        <Controller
          control={control}
          name="policy"
          render={({ field }) => (
            <Select {...field} onValueChange={field.onChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ポリシーを選択してください" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(policyOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}
      {errors.policy && <div>{errors.policy.message}</div>}

      {formState.description && formState.description}

      <button type="submit">ロールを作成</button>
    </form>
  );
};
