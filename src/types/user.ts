export enum UserType {
  BASIC = 'basic',
  PLUS = 'plus',
  PREMIUM = 'premium',
};

export type UserItem = {
  value: string;
  label: string;
}