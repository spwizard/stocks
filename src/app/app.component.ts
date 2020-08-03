import { Component, OnInit } from '@angular/core';
import * as fromTransactions from './store/reducers/transactions.reducer';
import { TransactionActions } from './store/actions';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Transaction } from './store/models/transaction.model';
import { TransactionFormState } from './components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  transactionSubscription$: Observable<Transaction[]>
  isLoading$: Observable<boolean>;
  isEdit: boolean = false;
  editableTransaction: Transaction;
  constructor(
    private store: Store<fromTransactions.TransactionState>,
  ) {
    this.store.dispatch(TransactionActions.getTransactions());
  }

  ngOnInit(): void {
    this.transactionSubscription$ = this.store.pipe(select(fromTransactions.getTransactions));
    this.isLoading$ = this.store.pipe(select(fromTransactions.isLoading));
  }

  onDelete(transaction: Transaction) {
    console.log(transaction);
    this.store.dispatch(TransactionActions.deleteTransaction({transaction: transaction}))
  }

  onEdit(transaction: Transaction) {
    debugger;
    this.isEdit = true
    this.editableTransaction = transaction
  }

  onTransactionFormChange(transactionFormState: TransactionFormState){
    if (transactionFormState.isEdit) {

    } else {
      this.store.dispatch(TransactionActions.addTransaction({ transaction: transactionFormState.transaction }))
    }
  }


  title = 'stocks-app';
}
