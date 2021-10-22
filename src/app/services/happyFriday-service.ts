import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HappyFriday } from '../models/happyfriday';
import { HttpClient, HttpParams } from '@angular/common/http';

const baseUrl = 'https://localhost:44345/api/HappyFriday';

@Injectable({
  providedIn: 'root'
})
export class HappyFridayService {

  constructor(private http: HttpClient) { }

  create(date: any, idcompany: string, idcolaborator:string): Observable<any> {
    let body = {
      collaboratorId: idcolaborator,
      companyId: idcompany,
      happyFridayDate: date
    };
    return this.http.post(baseUrl + "/create" , body);
  }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/GetAllHappyFriday`);
  }

}
