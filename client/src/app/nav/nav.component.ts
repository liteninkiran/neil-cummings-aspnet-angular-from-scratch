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

    constructor(public accountService: AccountService) { }

    public ngOnInit(): void { }

    public login(): void {
        this.accountService.login(this.model).subscribe({
            next: response => {
                console.log(response);
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
    }
}
