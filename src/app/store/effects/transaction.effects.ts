import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  map,
  catchError,
  switchMap,
  mergeMap,
} from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { TransactionActions } from '../actions';

import { Store } from '@ngrx/store';

@Injectable()
export class TransactionEffects {

  getTransactions$ = createEffect(() => this.actions$.pipe(
    ofType(TransactionActions.getTransactions),
    switchMap(() => {
      return this.transactionService
        .getTransactions()
        .pipe(
          map((data) => {
            return ({
              type: TransactionActions.getTransactionsSuccess.type,
              data
            });
          }),
          catchError(() => EMPTY)
        );
    })
  ))

  deleteTransaction$ = createEffect(() => this.actions$.pipe(
    ofType(TransactionActions.deleteTransaction),
    mergeMap(({ transaction }) => {
      const removedTransaction = transaction
      return this.transactionService
        .deleteTransaction(transaction.id)
        .pipe(
          map(() => TransactionActions.deleteTransactionSuccess({ transaction: removedTransaction }))
        )
    }),
  ))

  addTransaction$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TransactionActions.addTransaction),
    mergeMap(({ transaction }) =>
      {
        return this.transactionService.addTransaction(transaction).pipe(
          map((transaction) => {
            return TransactionActions.addTransactionSuccess({ transaction });
          })
        );
      }
    ),
    catchError(() => EMPTY)
  )
);

  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
    public store: Store
  ) { }
}
