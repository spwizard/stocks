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
  private _transaction: Transaction;
  private _isEdit: boolean;

  @Input()
  set transaction(transaction: Transaction) {
    this._transaction = transaction
    if (transaction) {
      this.isEdit = true;
      this.setFormMode();
      this.buildTransactionForm();
    }
  }
  get transaction() {
    return this._transaction;
  }

  @Input()
  set isEdit(isEdit: boolean) {
    this._isEdit = isEdit
    if (!isEdit) {
      this.transaction = null;
      this.setFormMode();
      this.buildTransactionForm();
    }
  }
  get isEdit() {
    return this._isEdit;
  }

  @Output() transactionFormState = new EventEmitter<TransactionFormState>();

  formMode: string;
  transactionForm: FormGroup;
  types = ['deposit', 'withdrawal', 'buy', 'sell'];


  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.buildTransactionForm();
    this.setFormMode();
  }

  onSubmit() {
    const transactionFormState = {
      transaction: this.buildTransaction(this.transactionForm.value),
      isEdit: this.isEdit
    }
    this.transactionFormState.emit(transactionFormState)
  }

  buildTransactionForm() {
    this.transactionForm = this.fb.group({
      date: [this.isEdit ? this.transaction.date.substring(0, 10) : null],
      type: [this.isEdit ? this.transaction.type : null],
      security: [this.isEdit ? this.transaction.security : null],
      shares: [this.isEdit ? this.transaction.shares : null],
      value: [this.isEdit ? this.transaction.value/100 : null],
      cashflow: [this.isEdit ? this.transaction.cashflow : null],
      id: [this.isEdit ? this.transaction.id : null]
    })
  }

  buildTransaction(transaction) {
    // Remove id as api returns error if passed on adding new transaction
    if (!this.isEdit) {
      delete transaction.id
    }

    return {
      ...transaction,
      value: transaction.value * 100,
      cashflow: (transaction.type === 'buy' || transaction.type === ' withdrawal')
        ? -Math.abs(transaction.value) * 100 : transaction.value * 100
    }
  }

  setFormMode() {
    this.formMode = this.isEdit ? 'Edit Transaction' : 'Add Transaction'
  }

}