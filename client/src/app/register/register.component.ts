import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    @Input() usersFromHomeComponent: any;

    public model: any = {}

    constructor(private accountService: AccountService) { }

    public ngOnInit(): void { }

    public register(): void {
        console.log(this.model);
    }

    public cancel(): void {
        console.log('Cancelled');
    }

}
