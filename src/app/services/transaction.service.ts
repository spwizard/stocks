import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransactionApiResponse } from '../store/models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(
    private http: HttpClient) { }

  getTransactions(): Observable<TransactionApiResponse> {
    return this.http.get<TransactionApiResponse>(`api/v1/transactions`);
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete<any>(`api/v1/transactions/${id}`);
  }

  addTransaction(data: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`api/v1/transactions`, data);
  }

  updateTransaction(data: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`api/v1/transactions/${data.id}`, data);
  }
}
