import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from './api-url.token';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, @Inject(API_URL) private api_url: string) {}

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http
      .get<T>(`${this.api_url}${url}`, {
        headers: this.headers,
        params,
      })
      .pipe(tap((data) => console.log(`GET ${this.api_url}${url}`, data)));
  }

  post<T, D>(url: string, data?: D): Observable<T> {
    return this.http
      .post<T>(`${this.api_url}${url}`, JSON.stringify(data), { headers: this.headers })
      .pipe(tap((response) => console.log(`POST ${this.api_url}${url}`, data, response)));
  }

  put<T, D>(url: string, data: D): Observable<T> {
    return this.http
      .put<T>(`${this.api_url}${url}`, JSON.stringify(data), {
        headers: this.headers,
      })
      .pipe(tap((response) => console.log(`PUT ${this.api_url}${url}`, data, response)));
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(`${this.api_url}${url}`, {
        headers: this.headers,
      })
      .pipe(tap((response) => console.log(`DELETE ${this.api_url}${url}`, response)));
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
