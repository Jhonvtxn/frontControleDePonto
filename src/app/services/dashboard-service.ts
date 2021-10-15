import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard';
import { HttpClient, HttpParams } from '@angular/common/http';

const baseUrl = 'https://localhost:44345/api/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  get(id: any): Observable<Dashboard> {
    return this.http.get(`${baseUrl}/DashboardDates/${id}`);
  }
}
