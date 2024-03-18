export enum UserType {
  BASIC = "basic",
  PLUS = "plus",
  PREMIUM = "premium",
}

export type User = {
  _id: string;
  fullname: string;
  email: string;
  dni: string;
  user_type: UserType;
  role: "admin" | "user";
  gender: "female" | "male";
  gym_id: string;
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
};

export type UserItem = {
  value: string;
  label: string;
};
