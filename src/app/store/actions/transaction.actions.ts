import { createAction, props } from '@ngrx/store';
import { Transaction } from '../models/transaction.model';

export const getTransactions = createAction(
    '[Transactions] Get Transactions',
    props<{ username: string; password: string }>()
);

export const getTransactionsSuccess = createAction(
    '[Transactions] Get Transactions Success',
    props<{ transactions: Transaction[] }>()
);

export const getTransactionsFailure = createAction(
    '[Transactions] Get Transactions Failure',
    props<{ error: Error }>()
);