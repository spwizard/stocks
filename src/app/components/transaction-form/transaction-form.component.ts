import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Transaction } from 'src/app/store/models/transaction.model';

export interface TransactionFormState {
  transaction: Transaction;
  isEdit: boolean;
}

@Component({
  selector: 'app-transaction-form',
  templateUrl: 'transaction-form.component.html',
  styleUrls: ['transaction-form.component.scss']
})

export class TransactionFormComponent implements OnInit {
  @Input() transaction: Transaction
  @Input()
    set isEdit(isEdit: boolean) {
      if (isEdit) {
        this.buildTransactionForm();
      }
    }
  @Output() transactionFormState = new EventEmitter<TransactionFormState>();

  formMode = this.isEdit ? 'Edit Transaction' : 'Add Transaction'
  transactionForm: FormGroup;
  types = ['deposit', 'withdrawal', 'buy', 'sell'];


  constructor(private fb: FormBuilder) {
    this.buildTransactionForm();
  }

  ngOnInit(): void { }

  onSubmit() {
    const transactionFormState = {
      transaction: this.buildTransaction(this.transactionForm.value),
      isEdit: this.isEdit
    }
    this.transactionFormState.emit(transactionFormState)
  }

  buildTransactionForm() {
    debugger;
    this.transactionForm =  this.fb.group({
      date: [this.isEdit ? this.transaction.date : null],
      type: [this.isEdit ? this.transaction.type : null],
      security: [this.isEdit ? this.transaction.security : null],
      shares: [this.isEdit ? this.transaction.shares : null],
      value: [this.isEdit ? this.transaction.value : null],
      cashflow: [this.isEdit ? this.transaction.cashflow : null]
    })
  }

  buildTransaction(transaction) {
    return {
      ...transaction,
      value: transaction.value * 100,
      cashflow: (transaction.type === 'buy' || transaction.type === ' withdrawal') 
        ? -Math.abs(transaction.value) * 100 : transaction.value * 100
    }
  }

}