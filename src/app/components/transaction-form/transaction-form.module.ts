import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionFormComponent } from './transaction-form.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule, 
        CommonModule, ],
    exports: [TransactionFormComponent],
    declarations: [TransactionFormComponent],
    providers: [],
})
export class TransactionFormModule { }
