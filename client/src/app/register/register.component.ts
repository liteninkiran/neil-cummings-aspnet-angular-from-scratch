import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    @Input() usersFromHomeComponent: any;
    @Output() cancelRegister = new EventEmitter<boolean>()

    public model: any = {}

    constructor(private accountService: AccountService) { }

    public ngOnInit(): void { }

    public register(): void {
        console.log(this.model);
    }

    public cancel(): void {
        this.cancelRegister.emit(false);
    }

}
