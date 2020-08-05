import * as fromTransactions from './store/reducers/transactions.reducer';
import { Action, Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { TransactionActions } from './store/actions';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let actions$: Observable<Action>;

  const mockTransaction = {
    cashflow: 1,
    date: '12/1/2020',
    id: 1,
    type: 'sell',
    value: 1,
    security: 'BT',
    shares: 1
  };


  const initialState = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent, TransactionFormComponent],
      providers: [
        provideMockStore(
          {
            initialState: initialState,
            selectors: [
              { selector: fromTransactions.getTransactions, value: [] },
              { selector: fromTransactions.isLoading, value: true },
              { selector: fromTransactions.getCumulativeCashflow, value: 1000 },
            ]
          }),
        provideMockActions(() => actions$)
      ]
    });
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(`stocks-app`);
  });

  it(`isEdit has default value`, () => {
    expect(component.isEdit).toEqual(false);
  });

  describe('ng onInit', () => {
    it('should dispatch get transactions', () => {
      const store = TestBed.inject(Store);
      spyOn(store, 'dispatch');

      const expectedAction = TransactionActions.getTransactions();
      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should subscribe to transactions', () => {
      let result = null;
      component.ngOnInit();
      component.transactionSubscription$.subscribe(t => result = t);
      expect(result).toEqual([]);
    });

    it('should subscribe to loading', () => {
      let result = null;
      component.ngOnInit();
      component.isLoading$.subscribe(t => result = t);
      expect(result).toEqual(true);
    });

    it('should subscribe to cumulative cashflow', () => {
      let result = null;
      component.ngOnInit();
      component.cumulativeCashflow$.subscribe(t => result = t);
      expect(result).toEqual(1000);
    });
  });

  it('should dispatch a delete action on delete', () => {
      const store = TestBed.inject(Store);
      spyOn(store, 'dispatch');
      const expectedAction = TransactionActions.deleteTransaction({transaction: mockTransaction});

      component.onDelete(mockTransaction);
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  describe('should set up a transaction for edit', () => {

    it('should set edit mode', () => {
      fixture.detectChanges();
      component.onEdit(mockTransaction);
      expect(component.isEdit).toBe(true);
    });

    it('should pass transaction to editable transaction', () => {
      fixture.detectChanges();
      component.onEdit(mockTransaction);
      expect(component.editableTransaction).toEqual(mockTransaction);
    });

  });

});
