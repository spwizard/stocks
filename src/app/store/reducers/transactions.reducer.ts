import {
  createReducer,
  on,
  Action,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { TransactionActions } from '../actions';
import { Transaction } from '../models/transaction.model';
import { TransactionFormState } from '../../components/transaction-form/transaction-form.component';

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


  on(TransactionActions.deleteTransactionSuccess, (state, { transaction }) => {
    return {
      ...state,
      transactions: state.transactions.filter((transactionItem) => transactionItem.id !== transaction.id)
    };
  }),


  on(TransactionActions.addTransactionSuccess, (state, { transaction }) => {
    return {
      ...state,
      transactions: [...state.transactions, transaction],
    }
  }),

  on(TransactionActions.updateTransactionSuccess, (state, { transaction }) => {
    return {
      ...state,
      transactions: state.transactions.map((transactionItem) => {
        if (transactionItem.id === transaction.id) {
          return transaction
        } else {
          return transactionItem
        }
      })
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

export const getCumulativeCashflow = createSelector(
  getStockFeatureState,
  (state: TransactionState) => {
    if (state.transactions.length > 0) {
      const cashFlow = state.transactions.map(transaction => transaction.value).reduce((prev, next) => prev + next);
      return cashFlow/100
    } else {
      return null;
    }
  }
)

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
