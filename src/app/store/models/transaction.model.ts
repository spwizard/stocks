export interface Transaction {
  cashflow: number;
  date: string;
  id: number;
  type: string;
  value: number;
  security: string;
  shares: number;
  
}

export interface TransactionApiResponse {
  transactions: Transaction[]
}

