import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements ControlValueAccessor {
    @Input() public label = '';
    @Input() public type = 'text';

    constructor(@Self() public ngControl: NgControl) {
        this.ngControl.valueAccessor = this;
    }

    public writeValue(obj: any): void { }
    public registerOnChange(fn: any): void { }
    public registerOnTouched(fn: any): void { }

    public get control(): FormControl {
        return this.ngControl.control as FormControl;
    }
}
