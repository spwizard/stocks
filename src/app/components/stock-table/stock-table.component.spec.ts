import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Transaction } from 'src/app/store/models/transaction.model';
import { StockTableComponent } from './stock-table.component';
describe('StockTableComponent', () => {
  let component: StockTableComponent;
  let fixture: ComponentFixture<StockTableComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StockTableComponent]
    });
    fixture = TestBed.createComponent(StockTableComponent);
    component = fixture.componentInstance;
  });
  
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

});
