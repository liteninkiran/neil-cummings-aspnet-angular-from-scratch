import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    public registerMode = false;
    public users: any;

    constructor(private http: HttpClient) { }

    public ngOnInit(): void {
        this.getUsers();
    }

    public registerToggle(): void {
        this.registerMode = !this.registerMode;
    }

    public cancelRegisterMode(event: boolean): void {
        this.registerMode = event;
    }

    private getUsers(): void {
        this.http.get('https://localhost:5001/api/users').subscribe({
            next: response => this.users = response,
            error: error => console.log(error),
            complete: () => {},
        });
    }

}
