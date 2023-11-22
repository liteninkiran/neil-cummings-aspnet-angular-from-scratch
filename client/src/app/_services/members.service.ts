import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MembersService {

    public baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public getMembers(): Observable<Member[]> {
        return this.http.get<Member[]>(`${this.baseUrl}users`);
    }

    public getMember(username: string): Observable<Member> {
        return this.http.get<Member>(`${this.baseUrl}users/${username}`);
    }
}
