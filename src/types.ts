export interface Transaction {
  id: string;
  idCategory: string,
  amount: number,
  date: string,
}

export interface ApiTransaction {
  idCategory: string,
  amount: number,
  date: string,
}
export interface transactionMutation {
  type: string,
  transaction: ApiTransaction,
}
export interface ApiTransactions {
  [id: string]: ApiTransaction;
}

export interface Category {
  id: string;
  type: 'income' | 'expense',
  name: string,
}

export interface ApiCategory {
  type: 'income' | 'expense',
  name: string,
}
export interface ApiCategories {
  [id: string]: ApiCategory;
}