import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    @Output() cancelRegister = new EventEmitter<boolean>()

    public model: any = {}
    public registerForm: FormGroup = new FormGroup({});

    constructor(
        private accountService: AccountService,
        private toastr: ToastrService,
        private fb: FormBuilder,
    ) { }

    public ngOnInit(): void {
        this.initialiseForm();
    }

    public register(): void {
        console.log(this.registerForm.value);
        // this.accountService.register(this.model).subscribe({
        //     next: () => this.cancel(),
        //     error: (error: HttpErrorResponse) => {
        //         this.toastr.error(error.error);
        //         console.log(error);
        //     },
        // });
    }

    public cancel(): void {
        this.cancelRegister.emit(false);
    }

    private initialiseForm(): void {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            gender: ['male'],
            knownAs: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            password: ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(8),
            ]],
            confirmPassword: ['', [
                Validators.required,
                this.matchValues('password'),
            ]],
        });

        this.registerForm
            .controls['password']
            .valueChanges
            .subscribe(() =>
                this.registerForm
                    .controls['confirmPassword']
                    .updateValueAndValidity()
            );
    }

    private matchValues(matchTo: string): ValidatorFn {
        return (control: AbstractControl) => {
            return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true };
        }
    }
}
