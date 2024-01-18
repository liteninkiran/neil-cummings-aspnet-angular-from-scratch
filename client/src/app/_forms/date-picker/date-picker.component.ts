import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements ControlValueAccessor {
    @Input() public label = '';
    @Input() public maxDate: Date | undefined;

    public bsConfig: Partial<BsDatepickerConfig> | undefined;

    constructor(@Self() public ngControl: NgControl) {
        this.ngControl.valueAccessor = this;
        this.bsConfig = {
            containerClass: 'theme-red',
            dateInputFormat: 'DD MMMM YYYY',
        }
    }

    public writeValue(obj: any): void { }
    public registerOnChange(fn: any): void { }
    public registerOnTouched(fn: any): void { }

    public get control(): FormControl {
        return this.ngControl.control as FormControl;
    }
}
