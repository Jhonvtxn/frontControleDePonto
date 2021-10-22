import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedules } from '../models/schedules';
import { HttpClient, HttpParams } from '@angular/common/http';

const baseUrl = 'https://localhost:44345/api/Schedules';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(private http: HttpClient) { }

  get(id: any): Observable<Schedules> {
    return this.http.get(`${baseUrl}/CollaboratorSchedulesByToday/${id}`);
  }

  getall(id: any): Observable<Schedules> {
    return this.http.get(`${baseUrl}/CollaboratorSchedules/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  beattime(id: any): Observable<Schedules> {
    const params = new HttpParams()
    .set('id', id.toString());
    var url = `${baseUrl}/BeatTime`;
    return this.http.get(url, {params});
  }

  getallMonthYear(id: string, year: number, month: number): Observable<Schedules[]> {
    return this.http.get<any>(`${baseUrl}/CollaboratorSchedulesByMonthAndYear?id=${id}&year=${year}&month=${month}`);
  }
}
