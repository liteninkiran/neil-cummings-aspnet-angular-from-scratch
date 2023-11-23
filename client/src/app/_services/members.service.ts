import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Observable, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MembersService {

    public baseUrl = environment.apiUrl;
    public members: Member[] = [];

    constructor(private http: HttpClient) { }

    public getMembers(): Observable<Member[]> {
        if (this.members.length > 0) {
            return of(this.members);
        }
        return this.http.get<Member[]>(`${this.baseUrl}users`).pipe(
            map(members => {
                this.members = members;
                return members;
            })
        );
    }

    public getMember(username: string): Observable<Member> {
        const member = this.members.find(member => member.userName === username);
        if (member !== undefined) return of(member);
        return this.http.get<Member>(`${this.baseUrl}users/${username}`);
    }

    public updateMember(member: Member) {
        return this.http.put(`${this.baseUrl}users`, member).pipe(
            map(() => {
                const index = this.members.indexOf(member);
                this.members[index] = { ...this.members[index], ...member }
            })
        );
    }
}
