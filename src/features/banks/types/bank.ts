// src/features/banks/types/bank.ts

export interface Bank {
  id: string;
  name: string;
  details: string; // e.g., "**** 1234"
  avatar: string; // e.g., "CH" for Chase
}
