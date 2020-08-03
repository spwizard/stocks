import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MetaReducer,
  StoreModule,
} from '@ngrx/store';

import { metaReducers, reducers } from './reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockTableModule } from './components/stock-table/stock-table.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AlertModule } from './components/alert/alert.module';
import { EffectsModule } from '@ngrx/effects';
import { TransactionEffects } from './store/effects/transaction.effects';
import { TransactionService } from './services/transaction.service';
import { HttpClientModule } from '@angular/common/http';
import { TransactionFormModule } from './components/transaction-form/transaction-form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StockTableModule,
    TransactionFormModule,
    AlertModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'LEC App'
    }),
    EffectsModule.forRoot([TransactionEffects]),
  ],
  providers: [TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
