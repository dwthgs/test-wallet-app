export interface Transaction {
  id: string;
  type: "Credit" | "Payment";
  amount: number;
  name: string;
  description: string;
  date: string;
  isPending: boolean;
  authorizedUser: string | null;
  icon: string;
  cashbackPercentage: number | null;
}

export interface WalletData {
  cardBalance: number;
  cardLimit: number;
  transactions: Transaction[];
}

export interface CardInfo {
  balance: number;
  limit: number;
  available: number;
}