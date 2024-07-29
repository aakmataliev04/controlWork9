

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