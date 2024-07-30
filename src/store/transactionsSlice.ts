import {Transaction, transactionMutation} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {
  createTransaction,
  deleteTransaction,
  fetchOneTransaction,
  fetchTransactions,
  updateTransaction
} from './transactionsThunks';

export interface TransactionsState {
  transactionMutation: transactionMutation;
  transactions: Transaction[] | null;
  fetchLoading: boolean;
  isFetchingOneTransaction: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isError: boolean;
}
const initialState : TransactionsState = {
  transactionMutation: {
    type: '',
    transaction: {
      idCategory: '',
      amount: 0,
      date: '',
    }
  },
  transactions: null,
  fetchLoading: false,
  isFetchingOneTransaction: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isError: false,
};


export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactionMutation: (state, {payload: {name, value}}) => {
      if (name === 'type') {
        state.transactionMutation[name] = value;
      } else {
        state.transactionMutation.transaction[name] = value;
      }
    },
    clearTransactionMutation: (state) => {
      state.transactionMutation = {
        type: '',
        transaction: {idCategory: '', amount: 0, date: '',}
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isCreating = true;
        state.isError = false;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.isCreating = false;
        state.transactionMutation = {
          type: '',
          transaction: {
            idCategory: '',
            amount: 0,
            date: '',
          }
        };
      })
      .addCase(createTransaction.rejected, (state) => {
        state.isCreating = false;
        state.isError = true;
      });
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.fetchLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, {payload}) => {
        state.fetchLoading = false;
        state.transactions = payload;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.fetchLoading = false;
        state.isError = true;
      });
    builder
      .addCase(fetchOneTransaction.pending, (state) => {
        state.transactionMutation = {
          type: '',
          transaction: {
            idCategory: '',
            amount: 0,
            date: '',
          }
        };
        state.isFetchingOneTransaction = true;
        state.isError = false;
      })
      .addCase(fetchOneTransaction.fulfilled, (state, {payload: transaction}) => {
        state.isFetchingOneTransaction = false;
        state.transactionMutation.transaction = transaction;
      })
      .addCase(fetchOneTransaction.rejected, (state) => {
        state.isFetchingOneTransaction = false;
        state.isError = true;
      });
    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.isDeleting = true;
        state.isError = false;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.isDeleting = false;
        state.isError = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.isDeleting = false;
        state.isError = true;
      });
    builder
      .addCase(updateTransaction.pending, (state) => {
        state.isUpdating = true;
        state.isError = false;
      })
      .addCase(updateTransaction.fulfilled, (state) => {
        state.isUpdating = false;
        state.isError = false;
      })
      .addCase(updateTransaction.rejected, (state) => {
        state.isUpdating = false;
        state.isError = true;
      });
  },
  selectors: {
    selectTransactionMutation: (state) => state.transactionMutation,
    selectIsLoadingOneTransaction: (state) => state.isFetchingOneTransaction,
    selectTransactions: (state) => state.transactions,
    selectIsCreating: (state) => state.isCreating,
    selectIsUpdating: (state) => state.isUpdating,
  }
});

export const transactionsReducer = transactionsSlice.reducer;

export const {setTransactionMutation, clearTransactionMutation} = transactionsSlice.actions;
export const {
  selectTransactionMutation,
  selectIsLoadingOneTransaction,
  selectTransactions,
  selectIsCreating, selectIsUpdating
} = transactionsSlice.selectors;