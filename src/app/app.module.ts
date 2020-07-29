import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MetaReducer,
  StoreModule,
  USER_PROVIDED_META_REDUCERS
} from '@ngrx/store';

import { metaReducers, reducers } from './reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockTableModule } from './components/stock-table/stock-table.module';

import { AlertModule } from './components/alert/alert.module';
 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    StockTableModule,
    AlertModule,
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
