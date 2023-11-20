import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    @Output() cancelRegister = new EventEmitter<boolean>()

    public model: any = {}

    constructor(
        private accountService: AccountService,
        private toastr: ToastrService,
    ) { }

    public ngOnInit(): void { }

    public register(): void {
        this.accountService.register(this.model).subscribe({
            next: () => this.cancel(),
            error: (error: HttpErrorResponse) => {
                this.toastr.error(error.error);
                console.log(error);
            },
        });
    }

    public cancel(): void {
        this.cancelRegister.emit(false);
    }
}
