import { Component, OnInit } from '@angular/core';
import * as fromTransactions from './store/reducers/transactions.reducer';
import { TransactionActions } from './store/actions';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Transaction } from './store/models/transaction.model';
import { TransactionFormState } from './components/transaction-form/transaction-form.component';
import { Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Alert, AlertMessage } from './store/models/alert.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stocks-app';
  transactionSubscription$: Observable<Transaction[]>;
  isLoading$: Observable<boolean>;
  isEdit = false;
  editableTransaction: Transaction;
  actionSuccess$: Subscription;
  alertType: string;
  alertMessage: string;
  cumulativeCashflow$: Observable<number>;

  constructor(
    private store: Store<fromTransactions.TransactionState>,
    private actions$: Actions,
  ) {
    this.store.dispatch(TransactionActions.getTransactions());
  }

  ngOnInit(): void {
    this.transactionSubscription$ = this.store.pipe(select(fromTransactions.getTransactions));
    this.isLoading$ = this.store.pipe(select(fromTransactions.isLoading));
    this.cumulativeCashflow$ = this.store.pipe(select(fromTransactions.getCumulativeCashflow));
    
    this.actionSuccess$  = this.actions$.pipe(
      ofType(
        TransactionActions.addTransactionSuccess,
        TransactionActions.deleteTransactionSuccess,
        TransactionActions.updateTransactionSuccess),
      tap(action => {
        this.setAlertMessage(action.type.toString());
      })).subscribe();
  }

  onDelete(transaction: Transaction): void {
    this.store.dispatch(TransactionActions.deleteTransaction({transaction}));
  }

  onEdit(transaction: Transaction): void {
    this.isEdit = true;
    this.editableTransaction = transaction;
  }

  onTransactionFormChange(transactionFormState: TransactionFormState): void{
    if (transactionFormState.isEdit) {
      this.store.dispatch(TransactionActions.updateTransaction({ transaction: transactionFormState.transaction }));
    } else {
      this.store.dispatch(TransactionActions.addTransaction({ transaction: transactionFormState.transaction }));
    }
  }

  private setAlertMessage(alertType: string): void {
    switch (alertType) {
      case '[Transactions] Add Transaction Success':
        this.alertType = Alert.ADDED;
        this.alertMessage = AlertMessage.ADDED;
        break;
      case '[Transactions] Delete Transaction Success':
        this.alertType = Alert.DELETED;
        this.alertMessage = AlertMessage.DELETED;
        break;
      case '[Transactions] Update Transaction Success':
        this.alertType = Alert.UPDATED;
        this.alertMessage = AlertMessage.UPDATED;
        this.isEdit = false;
        break;

      default:
        break;
    }
  }
}
