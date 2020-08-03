import {
  createReducer,
  on,
  Action,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { TransactionActions } from '../actions';
import { Transaction } from '../models/transaction.model';

export const stockFeatureKey = 'stockFeature';
export interface TransactionState {
  loading: boolean;
  transactions: Transaction[];
}

const initialState = {
  loading: false,
  transactions: []
};

const transactionReducer = createReducer(
  initialState,

  on(TransactionActions.getTransactions, (state) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(TransactionActions.getTransactionsSuccess, (state, { data }) => {
    return {
      ...state,
      transactions: data.transactions,
      loading: false
    };
  }),

  on(TransactionActions.deleteTransaction, (state) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(TransactionActions.deleteTransactionSuccess, (state, { transaction }) => {
    return {
      ...state,
      transactions: state.transactions.filter((transactionItem) => transactionItem.id !== transaction.id)
    };
  }),

  on(TransactionActions.addTransaction, (state, { transaction }) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(TransactionActions.addTransactionSuccess, (state, { transaction }) => {
    return {
      ...state,
      transactions: [...state.transactions, transaction],
      loading: false
    }
  })

);

// Selectors

export const getStockFeatureState = createFeatureSelector<TransactionState>(
  stockFeatureKey
);

export const getTransactions = createSelector(
  getStockFeatureState,
  (state: TransactionState) => state && state.transactions
);

export const isLoading = createSelector(
  getStockFeatureState,
  (state: TransactionState) => state && state.loading
);

export const getTransactionById = (id: number) =>
  createSelector(getStockFeatureState, (state: TransactionState) => {
    return (
      state.transactions.filter(transaction => {
        return transaction.id === id;
      })
    )
  })


export function reducer(
  state: TransactionState | undefined,
  action: Action
): TransactionState {
  return transactionReducer(state, action);
}
