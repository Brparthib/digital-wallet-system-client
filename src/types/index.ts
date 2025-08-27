import type { ComponentType } from "react";

export interface TMeta {
  page?: number;
  limit?: number;
  totalPage?: number;
  total?: number;
}

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export type TransactionType = "ADD" | "WITHDRAW" | "SEND";

export type Transaction_Status = "PENDING" | "COMPLETE" | "REVERSED";

export interface ITransaction {
  _id?: string;
  transactionId: string;
  type: TransactionType;
  amount: number;
  status: Transaction_Status;
  fromUser: string;
  toUser: string;
  commission?: number;
  fee?: number;
  note?: string;
}

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message?: string;
  errorSources?: ErrorSource[];
  err?: {
    issue: ZodIssue[];
    name: string;
  };
  stack?: string;
}

// user interfaces
export type Role = "ADMIN" | "AGENT" | "USER";

export type Approval = "APPROVED" | "SUSPEND";

export type User_Status = "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export interface IUser {
  _id?: string;
  name: string;
  phone: string;
  password?: string;
  email?: string;
  picture?: string;
  address?: string;
  role: Role;
  approval?: Approval;
  isVerified?: boolean;
  isDeleted?: boolean;
  status?: User_Status;
  auths?: IAuthProvider[];
  claimRole?: Role;
  createdAt?: Date;
}

export type TStatus = "ACTIVE" | "BLOCKED";
export type TWalletStatus = "UNBLOCKED" | "BLOCKED";