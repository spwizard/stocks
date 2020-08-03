import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Transaction } from './store/models/transaction.model';
import { TransactionFormState } from './components/transaction-form/transaction-form.component';
import { Actions } from '@ngrx/effects';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    const storeStub = () => ({ dispatch: arg => ({}), pipe: arg => ({}) });
    const actionsStub = () => ({
      pipe: (arg, arg1) => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        { provide: Store, useFactory: storeStub },
        { provide: Actions, useFactory: actionsStub }
      ]
    });
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
});
