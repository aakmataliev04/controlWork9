import {AsyncThunk, createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategory, ApiTransaction, ApiTransactions, Transaction} from '../types';
import {AppDispatch} from '../app/store';
import axiosApi from '../axiosApi';
import {setTransactionMutation} from './transactionsSlice';

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  undefined,
  { dispatch: AppDispatch }
>('transaction/fetchTransactions', async (): Promise<Transaction[]> => {
  const {data: transactions} = await axiosApi.get<ApiTransactions | null>('/financeTracker/transactions.json');

  let newTransactions: Transaction[] = [];

  if (transactions) {
    newTransactions = Object.keys(transactions).map((key) => ({
      id: key,
      ...transactions[key],
    }));
  }
  newTransactions.reverse();
  return newTransactions;
});

export const createTransaction: AsyncThunk<void, ApiTransaction, { dispatch: AppDispatch }> =
  createAsyncThunk<void, ApiTransaction, { dispatch: AppDispatch }>(
    'transaction/createTransaction',
    async (transaction) => {
      await axiosApi.post('/financeTracker/transactions.json', transaction);
    }
  );

export const updateTransaction: AsyncThunk<void, { id: string; transaction: ApiTransaction }, { dispatch: AppDispatch }> = createAsyncThunk<void, {id: string, transaction: ApiTransaction}>(
  'transaction/updateTransaction',
  async ({id, transaction}) => {
    await axiosApi.put(`/financeTracker/transactions/${id}.json`, transaction);
  },
);

export const fetchOneTransaction: AsyncThunk<ApiTransaction, string, { dispatch: AppDispatch }> = createAsyncThunk<ApiTransaction, string>(
  'transaction/fetchOneTransaction',
  async (id, thunkAPI) => {
    const { data: transaction } = await axiosApi.get<ApiTransaction | null>(
      `/financeTracker/transactions/${id}.json`,
    );

    if (transaction === null) {
      throw new Error('Not Found');
    }
    const { data: category } = await axiosApi.get<ApiCategory | null>(
      `/financeTracker/categories/${transaction.idCategory}.json`,
    );
    if (category) {
      thunkAPI.dispatch(setTransactionMutation({name: 'type', value: category.type}));
      thunkAPI.dispatch(setTransactionMutation({name: 'idCategory', value: transaction.idCategory}));
    }
    return transaction;
  },
);

export const deleteTransaction: AsyncThunk<void, string, { dispatch: AppDispatch }> = createAsyncThunk<void, string>(
  'transaction/deleteTransaction',
  async (transactionId) => {
    await axiosApi.delete(`/financeTracker/transactions/${transactionId}.json`);
  },
);