import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Transaction } from './store/models/transaction.model';
import { TransactionFormState } from './components/transaction-form/transaction-form.component';
import { Actions } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { TransactionActions } from './store/actions';
import { TransactionState } from './store/reducers/transactions.reducer';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import * as fromTransactions from './store/reducers/transactions.reducer';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let actions$: Observable<Action>;
  const initialState = { };
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        provideMockStore(
          { 
            initialState: initialState,
            selectors: [
              { selector: fromTransactions.getTransactions, value: [] },
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
    })

    it('should subscribe to transactions', () => {
      const store = TestBed.inject(Store);
      spyOn(store, 'pipe');

      const expectedSelector = fromTransactions.getTransactions

      expect(store.pipe).toHaveBeenCalledWith(expectedSelector);
    })
  })

  it

});
