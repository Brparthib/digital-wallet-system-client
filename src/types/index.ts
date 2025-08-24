import type { ComponentType } from "react";

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
