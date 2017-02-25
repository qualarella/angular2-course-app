import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { validateDateFactory } from './validateDate.factory';

@Component({
  selector: 'date',
  templateUrl: './date.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateComponent), multi: true }
  ]
})
export class DateComponent implements ControlValueAccessor {
  propagateChange: any = () => { };

  @Input('value') _value = '';

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.propagateChange(val);
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  validate(c: FormControl) {
    let composedValidator = Validators.compose([Validators.pattern('^\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d$'), validateDateFactory()]);

    return composedValidator(c);
  }

  public onCourseCreatedInputChanged(): void {
    let val: string = this.value;

    let regexElements = ['\\d', '\\d', '\\.', '\\d', '\\d', '\\.', '\\d', '\\d', '\\d', '\\d'];
    let checked = false;

    if (val.length > regexElements.length) {
      val = val.substr(0, regexElements.length);
    }

    while (val.length > 0 && !checked) {
      let regexStr = '^' + regexElements.slice(0, val.length).join('') + '$';

      if (new RegExp(regexStr).test(val)) {
        checked = true;
      } else {
        val = val.slice(0, -1);
      }
    }

    this.value = val;
  }
}