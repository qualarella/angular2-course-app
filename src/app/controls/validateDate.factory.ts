import { AbstractControl, ValidatorFn } from '@angular/forms';

import * as moment from 'moment/moment';

export function validateDateFactory(): ValidatorFn {
  return (c: AbstractControl) => {
    return moment.utc(c.value, 'MM.DD.YYYY').isValid() ? null : {
      DateValidation: {
        valid: false
      }
    };
  }
}