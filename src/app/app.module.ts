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
    StoreDevtoolsModule.instrument({
      name: 'LEC App'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
