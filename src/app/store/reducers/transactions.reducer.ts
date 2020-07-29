import {
  createReducer,
  on,
  Action,
} from '@ngrx/store';
import { TransactionActions } from '../actions';
import { Transaction } from '../models/transaction.model';


export interface TransactionState {
  transactions: Transaction[];
}

const initialState = {
  transactions: []
};

const transactionReducer = createReducer(
  initialState,
  on(TransactionActions.getTransactionsSuccess, (state, { transactions }) => {
    return {
      ...state,
      transactions
      
    };
  })
);

export function reducer(
  state: TransactionState | undefined,
  action: Action
): TransactionState {
  return transactionReducer(state, action);
}
