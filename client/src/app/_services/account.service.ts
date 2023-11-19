import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private baseUrl = 'https://localhost:5001/api';

    constructor(private http: HttpClient) { }

    public login(model: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/account/login`, model);
    }
}
