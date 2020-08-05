import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/store/models/transaction.model';

@Component({
    selector: 'app-stock-table',
    templateUrl: 'stock-table.component.html',
    styleUrls: ['stock-table.component.scss']
})

export class StockTableComponent implements OnInit {
    @Input() transactions: Transaction[];
    @Input() cumulativeCashflow: number;
    @Output() deleteTransaction = new EventEmitter<Transaction>();
    @Output() editTransaction = new EventEmitter<Transaction>();
    constructor() { }

    ngOnInit(): void { }

    onDelete(transaction: Transaction){
        this.deleteTransaction.emit(transaction);
    }

    onEdit(transaction: Transaction): void {
        this.editTransaction.emit(transaction);
    }
}
