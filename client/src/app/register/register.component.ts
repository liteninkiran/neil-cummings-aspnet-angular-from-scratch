import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    @Output() cancelRegister = new EventEmitter<boolean>()

    public registerForm: FormGroup = new FormGroup({});
    public maxDate: Date = new Date();
    public validationErrors: string[] | undefined;

    constructor(
        private accountService: AccountService,
        private toastr: ToastrService,
        private fb: FormBuilder,
        private router: Router,
    ) { }

    public ngOnInit(): void {
        this.initialiseForm();
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    }

    public register(): void {
        const dobDateAndTime = this.registerForm.controls['dateOfBirth'].value;
        const dobDateOnly: string | undefined = this.getFormattedDate(dobDateAndTime);
        const values = { ...this.registerForm.value, dateOfBirth: dobDateOnly }
        this.accountService.register(values).subscribe({
            next: () => {
                this.router.navigateByUrl('/members');
            },
            error: (error) => {
                this.validationErrors = error;
            },
        });
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

    private getFormattedDate(dateAndTime: Date | undefined): string | undefined {
        if (!dateAndTime) return;
        const dateOnly = new Date(dateAndTime.setMinutes(dateAndTime.getMinutes() - dateAndTime.getTimezoneOffset()));
        return dateOnly.toISOString().slice(0, 10);
    }
}
