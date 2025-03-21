export enum UserType {
  BASIC = "basic",
  PLUS = "plus",
  PREMIUM = "premium",
}

type UserTarget = {
  target_metric: string;
  target_value: number;
};

export type User = {
  _id: string;
  fullname: string;
  email: string;
  dni: string;
  user_type: UserType;
  role: "administrator" | "user";
  gender: "female" | "male";
  gym_id: string;
  targets: UserTarget[];
  last_logged_in: string | null;
  updatedAt: string;
  createdAt: string;
};

export type UserForm = {
  fullname: string;
  email: string;
  dni: string;
  user_type: UserType;
  gym_id: string;
  gender: "male" | "female";
  target_metric: string;
  target_value: number;
};

export type UserItem = {
  value: string;
  label: string;
};

export type ChangePasswordForm = {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
};
