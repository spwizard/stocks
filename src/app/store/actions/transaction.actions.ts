import { createAction, props } from '@ngrx/store';
import { Transaction, TransactionApiResponse } from '../models/transaction.model';

export const getTransactions = createAction(
    '[Transactions] Get Transactions',
);

export const getTransactionsSuccess = createAction(
    '[Transactions] Get Transactions Success',
    props<{ data: TransactionApiResponse }>()
);

export const getTransactionsFailure = createAction(
    '[Transactions] Get Transactions Failure',
    props<{ error: Error }>()
);

export const deleteTransaction = createAction(
    '[Transactions] Delete Transaction',
    props<{ transaction: Transaction }>()
);

export const deleteTransactionSuccess = createAction(
    '[Transactions] Delete Transaction Success',
    props<{ transaction: Transaction }>()
);

export const deleteTransactionsFailure = createAction(
    '[Transactions] Delete Transaction Failure',
    props<{ error: Error }>()
);

export const addTransaction = createAction(
    '[Transactions] Add Transaction',
    props<{ transaction: Transaction }>()
);

export const addTransactionSuccess = createAction(
    '[Transactions] Add Transaction Success',
    props<{ transaction: Transaction }>()
);

export const addTransactionsFailure = createAction(
    '[Transactions] Add Transaction Failure',
    props<{ error: Error }>()
);

export const updateTransaction = createAction(
    '[Transactions] Update Transaction',
    props<{ transaction: Transaction }>()
);

export const updateTransactionSuccess = createAction(
    '[Transactions] Update Transaction Success',
    props<{ transaction: Transaction }>()
);

export const updateTransactionsFailure = createAction(
    '[Transactions] Update Transaction Failure',
    props<{ error: Error }>()
);
