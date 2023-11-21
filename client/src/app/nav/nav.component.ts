import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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

    constructor(
        public accountService: AccountService,
        private router: Router,
        private toastr: ToastrService,
    ) { }

    public ngOnInit(): void { }

    public login(): void {
        this.accountService.login(this.model).subscribe(() => this.router.navigateByUrl('/members'));
    }

    public logout(): void {
        this.accountService.logout();
        this.router.navigateByUrl('/');
    }
}
