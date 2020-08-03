import { NgModule } from '@angular/core';

import { AlertComponent } from './alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [AlertComponent],
    declarations: [AlertComponent],
    providers: [],
})
export class AlertModule { }
