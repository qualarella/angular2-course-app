import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'duration',
  templateUrl: './duration.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DurationComponent), multi: true }
  ]
})
export class DurationComponent implements ControlValueAccessor {
  propagateChange: any = () => { };

  @Input('value') _value = 0;

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
}