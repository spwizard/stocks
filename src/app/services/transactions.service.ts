import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../store/models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TrasnsactionService {
  constructor(
    private http: HttpClient) { }

  getTransactions(designId: string): Observable<Transaction> {
    return this.http.get<Transaction>(`https://transactions-challenge.stockopedia.com/api/v1/transactions`);
  }


}