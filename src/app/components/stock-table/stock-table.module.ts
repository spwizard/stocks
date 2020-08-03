import { NgModule } from '@angular/core';
import { StockTableComponent } from './stock-table.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [StockTableComponent],
    declarations: [StockTableComponent],
    providers: [],
})
export class StockTableModule { }
