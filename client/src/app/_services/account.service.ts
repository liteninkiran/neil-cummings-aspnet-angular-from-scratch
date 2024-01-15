import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private baseUrl = environment.apiUrl;
    private currentUserSource = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSource.asObservable();

    constructor(private http: HttpClient) { }

    public register(model: any): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}account/register`, model).pipe(
            map((response: User) => {
                this.setCurrentUser(response);
                return response;
            }),
        );
    }

    public login(model: any): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}account/login`, model).pipe(
            map((response: User) => {
                this.setCurrentUser(response);
                return response;
            }),
        );
    }

    public logout(): void {
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
    }

    public setCurrentUser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
    }
}
