import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private baseUrl = 'https://localhost:5001/api';
    private currentUserSource = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSource.asObservable();

    constructor(private http: HttpClient) { }

    public login(model: any): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}/account/login`, model).pipe(
            map((response: User) => {
                localStorage.setItem('user', JSON.stringify(response));
                this.currentUserSource.next(response);
                return response;
            }),
        );
    }

    public logout(): void {
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
    }

    public setCurrentUser(user: User): void {
        this.currentUserSource.next(user);
    }
}
