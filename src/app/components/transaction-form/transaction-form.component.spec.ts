import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TransactionFormComponent } from './transaction-form.component';
describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;
  const mockTransaction = {
    cashflow: 123,
    date: '2020-07-21T15:45:49.958Z',
    id: 987,
    type: 'buy',
    value: 123,
    security: 'BT',
    shares: 123
  };
  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TransactionFormComponent],
      providers: [{ provide: FormBuilder, useFactory: formBuilderStub }]
    });
    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`types has default value`, () => {
    expect(component.types).toEqual([`deposit`, `withdrawal`, `buy`, `sell`]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'buildTransactionForm').and.callThrough();
      spyOn(component, 'setFormMode').and.callThrough();
      component.ngOnInit();
      expect(component.buildTransactionForm).toHaveBeenCalled();
      expect(component.setFormMode).toHaveBeenCalled();
    });
  });

  describe('buildTransactionForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.buildTransactionForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

});
