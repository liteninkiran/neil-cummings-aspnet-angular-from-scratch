import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

    public model: any = {
        username: 'sarah',
        password: 'password',
    }
    public loggedIn = false;

    constructor(
        private accountService: AccountService,
    ) {

    }

    public ngOnInit(): void {
        this.getCurrentUser();
    }

    public login(): void {
        this.accountService.login(this.model).subscribe({
            next: response => {
                console.log(response);
                this.loggedIn = true;
            },
            error: error => {
                console.log(error);
            },
            complete: () => {

            },
        });
    }

    public logout(): void {
        this.accountService.logout();
        this.loggedIn = false;
    }

    private getCurrentUser(): void {
        this.accountService.currentUser$.subscribe({
            next: user => this.loggedIn = !!user,
            error: error => console.log(error),
        });
    }
}
